import { createServerFn } from "@tanstack/react-start";
import { composeWithGemini, resolveGeminiKey } from "@/lib/gemini";
import { GEMINI_MODEL } from "@/lib/gemini-model";
import { extractHtml, extractTitle } from "@/lib/html";
import { isComposeTarget, systemFor, userTextFor, type ComposeTarget } from "@/lib/compose-target";

export type ComposeMode = "image" | "prompt" | "refine";

export type ComposeInput = {
  mode: ComposeMode;
  prompt?: string;
  imageDataUrl?: string;
  html?: string;
  geminiKey?: string;
  geminiModel?: string;
  target?: ComposeTarget;
};

export type ComposeResult =
  | { ok: true; html: string; title: string }
  | { ok: false; error: string };

function resolveTarget(input: ComposeInput): ComposeTarget {
  return isComposeTarget(input.target) ? input.target : "ui";
}

export const getAiStatus = createServerFn({ method: "GET" }).handler(async () => {
  return {
    grok: Boolean(process.env.XAI_API_KEY),
    geminiEnv: Boolean(process.env.GEMINI_API_KEY),
    model: GEMINI_MODEL,
  };
});

export const composeUi = createServerFn({ method: "POST" })
  .validator((input: ComposeInput) => {
    if (input.imageDataUrl && input.imageDataUrl.length > 1_800_000) {
      throw new Error("Image is too large. Try a smaller screenshot.");
    }
    if (input.prompt && input.prompt.length > 4000) {
      throw new Error("Prompt is too long.");
    }
    if (input.geminiKey && input.geminiKey.length > 256) {
      throw new Error("API key is too long.");
    }
    if (input.geminiModel && input.geminiModel.length > 80) {
      throw new Error("Model id is too long.");
    }
    if (input.target && !isComposeTarget(input.target)) {
      throw new Error("Unknown output type.");
    }
    return input;
  })
  .handler(async ({ data }): Promise<ComposeResult> => {
    const target = resolveTarget(data);
    const system = systemFor(target);
    const text = userTextFor(target, data.mode, data.prompt, data.html);
    const geminiKey = resolveGeminiKey(data.geminiKey);

    if (geminiKey) {
      try {
        return await composeWithGemini(
          geminiKey,
          system,
          text,
          data.mode === "image" ? data.imageDataUrl : undefined,
          data.geminiModel,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed";
        if (msg.includes("Timeout") || msg.includes("aborted")) {
          return { ok: false, error: "Gemini timed out. Try a simpler screen." };
        }
        return { ok: false, error: msg };
      }
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error: "Add a Gemini API key in Settings to generate.",
      };
    }

    const content: unknown[] = [];
    if (data.mode === "image" && data.imageDataUrl) {
      content.push({
        type: "image_url",
        image_url: { url: data.imageDataUrl, detail: "high" },
      });
    }
    content.push({ type: "text", text });

    const messages = [
      { role: "system", content: system },
      { role: "user", content },
    ];
    const maxTokens = target === "ui" ? 6000 : 8000;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          messages,
          temperature: target === "mindmap" ? 0.4 : 0.25,
          max_tokens: maxTokens,
        }),
        signal: AbortSignal.timeout(90_000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        if (res.status === 400 && data.mode === "image") {
          return retryNativeImage(apiKey, data, system, text, maxTokens);
        }
        return { ok: false, error: parseApiError(res.status, errText) };
      }

      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const raw = body.choices?.[0]?.message?.content ?? "";
      if (!raw.trim()) return { ok: false, error: "The model returned an empty page." };
      return {
        ok: true,
        html: extractHtml(raw),
        title: extractTitle(raw, "Generated UI"),
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      if (msg.includes("Timeout") || msg.includes("aborted")) {
        return { ok: false, error: "Generation timed out. Try a simpler screen." };
      }
      return { ok: false, error: msg };
    }
  });

async function retryNativeImage(
  apiKey: string,
  data: ComposeInput,
  system: string,
  text: string,
  maxTokens: number,
): Promise<ComposeResult> {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: [
            { type: "input_image", image_url: data.imageDataUrl, detail: "high" },
            { type: "input_text", text },
          ],
        },
      ],
      temperature: 0.25,
      max_tokens: maxTokens,
    }),
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return { ok: false, error: parseApiError(res.status, errText) };
  }
  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = body.choices?.[0]?.message?.content ?? "";
  if (!raw.trim()) return { ok: false, error: "The model returned an empty page." };
  return { ok: true, html: extractHtml(raw), title: extractTitle(raw, "Generated UI") };
}

function parseApiError(status: number, body: string): string {
  if (status === 429) return "The generator is busy. Wait a moment and try again.";
  if (status === 401 || status === 403) return "AI is not available in this environment.";
  const clipped = body.replace(/\s+/g, " ").slice(0, 180);
  return clipped ? `Generator error (${status}): ${clipped}` : `Generator error ${status}`;
}
