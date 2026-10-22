export const GEMINI_MODEL = "gemini-3.8-flash";

export const GEMINI_MODEL_OPTIONS = [
  { id: "auto", label: "Latest available" },
  { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash" },
  { id: "gemini-3.7-flash", label: "Gemini 3.7 Flash" },
  { id: "gemini-3.6-flash", label: "Gemini 3.6 Flash" },
  { id: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro" },
  { id: "gemini-3.5-flash", label: "Gemini 3.5 Flash" },
  { id: "gemini-3.5-flash-lite", label: "Gemini 3.5 Flash-Lite" },
  { id: "gemini-3-flash-preview", label: "Gemini 3 Flash" },
  { id: "gemini-3.1-flash-lite", label: "Gemini 3.1 Flash-Lite" },
] as const;

export const GEMINI_MODEL_IDS = GEMINI_MODEL_OPTIONS.filter((m) => m.id !== "auto").map((m) => m.id);

export function sanitizeGeminiKey(raw: string): string {
  let k = raw.trim();
  k = k.replace(/^["']|["']$/g, "").trim();
  k = k.replace(/^(?:GEMINI_API_KEY|GOOGLE_API_KEY|API_KEY)\s*=\s*/i, "").trim();
  k = k.replace(/^Bearer\s+/i, "").trim();
  return k.replace(/\s+/g, "");
}

export function normalizeGeminiModelId(name: string): string {
  return name.replace(/^models\//, "").trim();
}

export function geminiModelLabel(id: string): string {
  const found = GEMINI_MODEL_OPTIONS.find((m) => m.id === id);
  return found?.label ?? (id || "Gemini");
}

export function pickGeminiModel(available: string[], preferred?: string): string {
  const set = new Set(available.map(normalizeGeminiModelId));
  const pref = preferred?.trim();
  if (pref && pref !== "auto" && (set.size === 0 || set.has(pref))) return pref;
  for (const id of GEMINI_MODEL_IDS) {
    if (set.has(id)) return id;
  }
  const loose = available
    .map(normalizeGeminiModelId)
    .find((id) => /^gemini-\d/.test(id) && !/embedding|tts|image|robotics|audio/i.test(id));
  return loose || GEMINI_MODEL;
}
