//#region node_modules/.nitro/vite/services/ssr/assets/gemini-model-C5wbpTtE.js
var GEMINI_MODEL = "gemini-3.8-flash";
var GEMINI_MODEL_OPTIONS = [
	{
		id: "auto",
		label: "Latest available"
	},
	{
		id: "gemini-3.8-flash",
		label: "Gemini 3.8 Flash"
	},
	{
		id: "gemini-3.7-flash",
		label: "Gemini 3.7 Flash"
	},
	{
		id: "gemini-3.6-flash",
		label: "Gemini 3.6 Flash"
	},
	{
		id: "gemini-3.1-pro-preview",
		label: "Gemini 3.1 Pro"
	},
	{
		id: "gemini-3.5-flash",
		label: "Gemini 3.5 Flash"
	},
	{
		id: "gemini-3.5-flash-lite",
		label: "Gemini 3.5 Flash-Lite"
	},
	{
		id: "gemini-3-flash-preview",
		label: "Gemini 3 Flash"
	},
	{
		id: "gemini-3.1-flash-lite",
		label: "Gemini 3.1 Flash-Lite"
	}
];
var GEMINI_MODEL_IDS = GEMINI_MODEL_OPTIONS.filter((m) => m.id !== "auto").map((m) => m.id);
function sanitizeGeminiKey(raw) {
	let k = raw.trim();
	k = k.replace(/^["']|["']$/g, "").trim();
	k = k.replace(/^(?:GEMINI_API_KEY|GOOGLE_API_KEY|API_KEY)\s*=\s*/i, "").trim();
	k = k.replace(/^Bearer\s+/i, "").trim();
	return k.replace(/\s+/g, "");
}
function normalizeGeminiModelId(name) {
	return name.replace(/^models\//, "").trim();
}
function geminiModelLabel(id) {
	return GEMINI_MODEL_OPTIONS.find((m) => m.id === id)?.label ?? (id || "Gemini");
}
function pickGeminiModel(available, preferred) {
	const set = new Set(available.map(normalizeGeminiModelId));
	const pref = preferred?.trim();
	if (pref && pref !== "auto" && (set.size === 0 || set.has(pref))) return pref;
	for (const id of GEMINI_MODEL_IDS) if (set.has(id)) return id;
	return available.map(normalizeGeminiModelId).find((id) => /^gemini-\d/.test(id) && !/embedding|tts|image|robotics|audio/i.test(id)) || "gemini-3.8-flash";
}
//#endregion
export { normalizeGeminiModelId as a, geminiModelLabel as i, GEMINI_MODEL_IDS as n, pickGeminiModel as o, GEMINI_MODEL_OPTIONS as r, sanitizeGeminiKey as s, GEMINI_MODEL as t };
