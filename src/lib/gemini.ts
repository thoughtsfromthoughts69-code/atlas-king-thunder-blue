import { createServerFn } from "@tanstack/react-start";
import { extractHtml, extractTitle } from "@/lib/html";
import {
  GEMINI_MODEL_IDS,
  normalizeGeminiModelId,
  pickGeminiModel,
  sanitizeGeminiKey,
} from "@/lib/gemini-model";

const LIST_URL = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200";

export function resolveGeminiKey(userKey?: string): string | undefined {
  const fromUser = sanitizeGeminiKey(userKey ?? "");
  if (fromUser) return fromUser;
  const fromEnv = process.env.GEMINI_API_KEY?.trim();
  return fromEnv || undefined;
}

export function parseDataUrl(dataUrl: string): { mimeType: string; data: string } | null {
  const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!m?.[1] || !m[2]) return null;
  return { mimeType: m[1], data: m[2] };
}

type GeminiPart = { text?: string; thought?: boolean };

type GeminiResponse = {
  candidates?: { content?: { parts?: GeminiPart[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string; code?: number };
};

type ComposeResult = { ok: true; html: string; title: string } | { ok: false; error: string };

function generateUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
}

function extractGeminiText(body: GeminiResponse): string {
  const parts = body.candidates?.[0]?.content?.parts ?? [];
  const visible = parts
    .filter((p) => !p.thought && Boolean(p.text))
    .map((p) => p.text ?? "")
    .join("\n")
    .trim();
  if (visible) return visible;
  return parts
    .filter((p) => Boolean(p.text))
    .map((p) => p.text ?? "")
    .join("\n")
    .trim();
}

function geminiError(status: number, body: GeminiResponse | string): string {
  const msg =
    typeof body === "string"
      ? body.replace(/\s+/g, " ").slice(0, 180)
      : body.error?.message?.replace(/\s+/g, " ").slice(0, 180);
  const invalid = /api key not valid|invalid api key|api_key_invalid/i.test(msg ?? "");
  if (status === 429) return "Gemini is busy. Wait a moment and try again.";
  if (status === 401 || status === 403 || invalid) {
    return "That Gemini API key was rejected. Check it in Settings.";
  }
  if (status === 404) return "That Gemini model is not available for this key.";
  return msg ? `Gemini error (${status}): ${msg}` : `Gemini error ${status}`;
}

function isAuthFailure(error: string) {
  return /rejected|not valid|invalid api key/i.test(error);
}

async function listGeminiModels(apiKey: string): Promise<{ ok: true; models: string[] } | { ok: false; error: string }> {
  const res = await fetch(LIST_URL, {
    method: "GET",
    headers: { "x-goog-api-key": apiKey },
    signal: AbortSignal.timeout(20_000),
  });
  const raw = await res.text().catch(() => "");
  let parsed: { models?: { name?: string; supportedGenerationMethods?: string[] }[]; error?: GeminiResponse["error"] } = {};
  try {
    parsed = JSON.parse(raw) as typeof parsed;
  } catch {
    parsed = {};
  }
  if (!res.ok) return { ok: false, error: geminiError(res.status, parsed.error ? { error: parsed.error } : raw) };
  const models = (parsed.models ?? [])
    .filter((m) => (m.supportedGenerationMethods ?? ["generateContent"]).includes("generateContent"))
    .map((m) => normalizeGeminiModelId(m.name ?? ""))
    .filter(Boolean);
  return { ok: true, models };
}

function modelAttempts(preferred?: string, available?: string[]): string[] {
  const first = pickGeminiModel(available ?? [], preferred);
  const rest = GEMINI_MODEL_IDS.filter((id) => id !== first);
  const ranked = [first, ...rest];
  if (available && available.length) {
    const set = new Set(available);
    const known = ranked.filter((id) => set.has(id));
    if (known.length) return known.slice(0, 3);
  }
  return ranked.slice(0, 3);
}

export const verifyGeminiKey = createServerFn({ method: "POST" })
  .validator((input: { key: string; model?: string }) => {
    const key = sanitizeGeminiKey(input.key ?? "");
    if (key.length < 20 || key.length > 256) {
      throw new Error("That does not look like a Gemini API key.");
    }
    return { key, model: input.model?.trim() || "auto" };
  })
  .handler(async ({ data }): Promise<{ ok: true; model: string } | { ok: false; error: string }> => {
    try {
      const listed = await listGeminiModels(data.key);
      if (!listed.ok) return listed;
      const model = pickGeminiModel(listed.models, data.model);
      return { ok: true, model };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not reach Gemini.";
      if (msg.includes("Timeout") || msg.includes("aborted")) {
        return { ok: false, error: "Gemini timed out while checking the key." };
      }
      return { ok: false, error: msg };
    }
  });

async function generateOnce(
  apiKey: string,
  model: string,
  system: string,
  text: string,
  imageDataUrl?: string,
  stripExtras = false,
): Promise<ComposeResult & { finishReason?: string; status?: number }> {
  const parts: unknown[] = [{ text }];
  if (imageDataUrl) {
    const parsed = parseDataUrl(imageDataUrl);
    if (!parsed) return { ok: false, error: "Could not read that screenshot." };
    const imagePart: Record<string, unknown> = {
      inlineData: { mimeType: parsed.mimeType, data: parsed.data },
    };
    if (!stripExtras) {
      imagePart.mediaResolution = { level: "media_resolution_medium" };
    }
    parts.unshift(imagePart);
  }

  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: 65536,
    temperature: 0.2,
  };
  if (!stripExtras) {
    generationConfig.thinkingConfig = { thinkingLevel: "low" };
  }

  const res = await fetch(generateUrl(model), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts }],
      generationConfig,
    }),
    signal: AbortSignal.timeout(120_000),
  });

  const rawText = await res.text().catch(() => "");
  let body: GeminiResponse = {};
  try {
    body = JSON.parse(rawText) as GeminiResponse;
  } catch {
    body = {};
  }

  if (!res.ok) return { ok: false, error: geminiError(res.status, body.error ? body : rawText), status: res.status };

  if (body.promptFeedback?.blockReason) {
    return { ok: false, error: "Gemini blocked that screenshot. Try another image." };
  }

  const finishReason = body.candidates?.[0]?.finishReason;
  const raw = extractGeminiText(body);
  if (!raw) {
    if (finishReason === "MAX_TOKENS") {
      return { ok: false, error: "Gemini ran out of output tokens before writing the page.", finishReason };
    }
    if (finishReason === "SAFETY") {
      return { ok: false, error: "Gemini blocked that screenshot. Try another image.", finishReason };
    }
    return { ok: false, error: "Gemini returned an empty page.", finishReason };
  }
  return {
    ok: true,
    html: extractHtml(raw),
    title: extractTitle(raw, "Generated UI"),
    finishReason,
  };
}

export async function composeWithGemini(
  apiKey: string,
  system: string,
  text: string,
  imageDataUrl?: string,
  preferredModel?: string,
): Promise<ComposeResult> {
  let available: string[] | undefined;
  try {
    const listed = await listGeminiModels(apiKey);
    if (listed.ok) available = listed.models;
    else if (isAuthFailure(listed.error)) return listed;
  } catch {
    available = undefined;
  }

  const attempts = modelAttempts(preferredModel, available);
  let lastError = "Gemini did not respond.";

  for (const model of attempts) {
    try {
      let result = await generateOnce(apiKey, model, system, text, imageDataUrl, false);
      if (!result.ok && result.status === 400) {
        result = await generateOnce(apiKey, model, system, text, imageDataUrl, true);
      }
      if (result.ok) return result;
      lastError = result.error;
      if (isAuthFailure(result.error)) return result;
      if (result.error.includes("blocked")) return result;
      if (result.error.includes("timed out") || result.error.includes("Timeout")) {
        return { ok: false, error: "Gemini timed out. Try a simpler screen." };
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      if (msg.includes("Timeout") || msg.includes("aborted")) {
        return { ok: false, error: "Gemini timed out. Try a simpler screen." };
      }
      lastError = msg;
    }
  }

  return { ok: false, error: lastError };
}
