import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as normalizeGeminiModelId, o as pickGeminiModel, s as sanitizeGeminiKey } from "./gemini-model-C5wbpTtE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini-D6XnQ8h3.js
var LIST_URL = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200";
function geminiError(status, body) {
	const msg = typeof body === "string" ? body.replace(/\s+/g, " ").slice(0, 180) : body.error?.message?.replace(/\s+/g, " ").slice(0, 180);
	const invalid = /api key not valid|invalid api key|api_key_invalid/i.test(msg ?? "");
	if (status === 429) return "Gemini is busy. Wait a moment and try again.";
	if (status === 401 || status === 403 || invalid) return "That Gemini API key was rejected. Check it in Settings.";
	if (status === 404) return "That Gemini model is not available for this key.";
	return msg ? `Gemini error (${status}): ${msg}` : `Gemini error ${status}`;
}
async function listGeminiModels(apiKey) {
	const res = await fetch(LIST_URL, {
		method: "GET",
		headers: { "x-goog-api-key": apiKey },
		signal: AbortSignal.timeout(2e4)
	});
	const raw = await res.text().catch(() => "");
	let parsed = {};
	try {
		parsed = JSON.parse(raw);
	} catch {
		parsed = {};
	}
	if (!res.ok) return {
		ok: false,
		error: geminiError(res.status, parsed.error ? { error: parsed.error } : raw)
	};
	return {
		ok: true,
		models: (parsed.models ?? []).filter((m) => (m.supportedGenerationMethods ?? ["generateContent"]).includes("generateContent")).map((m) => normalizeGeminiModelId(m.name ?? "")).filter(Boolean)
	};
}
var verifyGeminiKey_createServerFn_handler = createServerRpc({
	id: "f37ec45a043821ec4521c300929fe704acc8b3d39e4a44ee25d961805a19bd0a",
	name: "verifyGeminiKey",
	filename: "src/lib/gemini.ts"
}, (opts) => verifyGeminiKey.__executeServer(opts));
var verifyGeminiKey = createServerFn({ method: "POST" }).validator((input) => {
	const key = sanitizeGeminiKey(input.key ?? "");
	if (key.length < 20 || key.length > 256) throw new Error("That does not look like a Gemini API key.");
	return {
		key,
		model: input.model?.trim() || "auto"
	};
}).handler(verifyGeminiKey_createServerFn_handler, async ({ data }) => {
	try {
		const listed = await listGeminiModels(data.key);
		if (!listed.ok) return listed;
		return {
			ok: true,
			model: pickGeminiModel(listed.models, data.model)
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : "Could not reach Gemini.";
		if (msg.includes("Timeout") || msg.includes("aborted")) return {
			ok: false,
			error: "Gemini timed out while checking the key."
		};
		return {
			ok: false,
			error: msg
		};
	}
});
//#endregion
export { verifyGeminiKey_createServerFn_handler };
