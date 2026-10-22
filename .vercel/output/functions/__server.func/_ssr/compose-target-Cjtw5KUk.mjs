import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as normalizeGeminiModelId, n as GEMINI_MODEL_IDS, o as pickGeminiModel, s as sanitizeGeminiKey } from "./gemini-model-C5wbpTtE.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compose-target-Cjtw5KUk.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TITLE_RE = /<!--\s*title:\s*([^>]+?)\s*-->/i;
var FENCE_RE = /```(?:html)?\s*([\s\S]*?)```/i;
var DOC_RE = /<!DOCTYPE html[\s\S]*<\/html>/i;
var HTML_RE = /<html[\s\S]*<\/html>/i;
function extractTitle(text, fallback = "Untitled") {
	const m = text.match(TITLE_RE);
	if (!m?.[1]) return fallback;
	return m[1].replace(/\s+/g, " ").trim().slice(0, 48) || fallback;
}
function extractHtml(text) {
	const raw = text.match(FENCE_RE)?.[1]?.trim() || text.trim();
	const doc = raw.match(DOC_RE)?.[0] || raw.match(HTML_RE)?.[0];
	if (doc) return doc.trim();
	if (raw.includes("<") && raw.includes(">")) return wrapFragment(raw);
	return wrapFragment(`<p>${escapeHtml(raw)}</p>`);
}
function wrapFragment(inner) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Untitled</title>
<style>
  html,body{margin:0;min-height:100%;background:#0b1220;color:#e8f4ff;font-family:system-ui,sans-serif}
  body{padding:24px}
</style>
</head>
<body>${inner}</body>
</html>`;
}
function escapeHtml(s) {
	return s.replace(/[&<>"']/g, (c) => {
		if (c === "&") return "&amp;";
		if (c === "<") return "&lt;";
		if (c === ">") return "&gt;";
		if (c === "\"") return "&quot;";
		return "&#39;";
	});
}
function isBlankHtml(html) {
	return html.includes("Awaiting interface");
}
var BLANK_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Untitled</title>
<style>
  :root { color-scheme: dark; }
  html,body{margin:0;min-height:100%;background:#07111f;color:#d7e7f6;font-family:system-ui,sans-serif}
  body{min-height:100dvh;display:grid;place-items:center}
  p{letter-spacing:.18em;text-transform:uppercase;font-size:12px;opacity:.55}
</style>
</head>
<body>
  <p>Awaiting interface</p>
</body>
</html>`;
var GENERATING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Composing</title>
<style>
  html,body{margin:0;height:100%;background:#07111f;color:#8ad7c8;font-family:system-ui,sans-serif}
  body{display:grid;place-items:center}
  .ring{width:64px;height:64px;border-radius:50%;border:1px solid rgba(62,224,196,.25);border-top-color:#3ee0c4;animation:spin 1s linear infinite}
  p{margin-top:18px;letter-spacing:.22em;text-transform:uppercase;font-size:11px;opacity:.7}
  @keyframes spin { to { transform: rotate(360deg) } }
  @media (prefers-reduced-motion: reduce) { .ring { animation: none } }
</style>
</head>
<body>
  <div>
    <div class="ring"></div>
    <p>Composing interface</p>
  </div>
</body>
</html>`;
var FAILED_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Not composed</title>
<style>
  html,body{margin:0;height:100%;background:#07111f;color:#c9d8e6;font-family:system-ui,sans-serif}
  body{display:grid;place-items:center;padding:24px;text-align:center}
  h1{font-size:18px;margin:0 0 8px;color:#e8f4ff}
  p{margin:0;font-size:14px;opacity:.75;max-width:32ch;line-height:1.5}
</style>
</head>
<body>
  <div>
    <h1>Interface not composed</h1>
    <p>Try another screenshot, a shorter prompt, or open a spatial template.</p>
  </div>
</body>
</html>`;
var LIST_URL = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200";
function resolveGeminiKey(userKey) {
	const fromUser = sanitizeGeminiKey(userKey ?? "");
	if (fromUser) return fromUser;
	return process.env.GEMINI_API_KEY?.trim() || void 0;
}
function parseDataUrl(dataUrl) {
	const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
	if (!m?.[1] || !m[2]) return null;
	return {
		mimeType: m[1],
		data: m[2]
	};
}
function generateUrl(model) {
	return `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
}
function extractGeminiText(body) {
	const parts = body.candidates?.[0]?.content?.parts ?? [];
	const visible = parts.filter((p) => !p.thought && Boolean(p.text)).map((p) => p.text ?? "").join("\n").trim();
	if (visible) return visible;
	return parts.filter((p) => Boolean(p.text)).map((p) => p.text ?? "").join("\n").trim();
}
function geminiError(status, body) {
	const msg = typeof body === "string" ? body.replace(/\s+/g, " ").slice(0, 180) : body.error?.message?.replace(/\s+/g, " ").slice(0, 180);
	const invalid = /api key not valid|invalid api key|api_key_invalid/i.test(msg ?? "");
	if (status === 429) return "Gemini is busy. Wait a moment and try again.";
	if (status === 401 || status === 403 || invalid) return "That Gemini API key was rejected. Check it in Settings.";
	if (status === 404) return "That Gemini model is not available for this key.";
	return msg ? `Gemini error (${status}): ${msg}` : `Gemini error ${status}`;
}
function isAuthFailure(error) {
	return /rejected|not valid|invalid api key/i.test(error);
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
function modelAttempts(preferred, available) {
	const first = pickGeminiModel(available ?? [], preferred);
	const ranked = [first, ...GEMINI_MODEL_IDS.filter((id) => id !== first)];
	if (available && available.length) {
		const set = new Set(available);
		const known = ranked.filter((id) => set.has(id));
		if (known.length) return known.slice(0, 3);
	}
	return ranked.slice(0, 3);
}
var verifyGeminiKey = createServerFn({ method: "POST" }).validator((input) => {
	const key = sanitizeGeminiKey(input.key ?? "");
	if (key.length < 20 || key.length > 256) throw new Error("That does not look like a Gemini API key.");
	return {
		key,
		model: input.model?.trim() || "auto"
	};
}).handler(createSsrRpc("f37ec45a043821ec4521c300929fe704acc8b3d39e4a44ee25d961805a19bd0a"));
async function generateOnce(apiKey, model, system, text, imageDataUrl, stripExtras = false) {
	const parts = [{ text }];
	if (imageDataUrl) {
		const parsed = parseDataUrl(imageDataUrl);
		if (!parsed) return {
			ok: false,
			error: "Could not read that screenshot."
		};
		const imagePart = { inlineData: {
			mimeType: parsed.mimeType,
			data: parsed.data
		} };
		if (!stripExtras) imagePart.mediaResolution = { level: "media_resolution_medium" };
		parts.unshift(imagePart);
	}
	const generationConfig = {
		maxOutputTokens: 65536,
		temperature: .2
	};
	if (!stripExtras) generationConfig.thinkingConfig = { thinkingLevel: "low" };
	const res = await fetch(generateUrl(model), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-goog-api-key": apiKey
		},
		body: JSON.stringify({
			systemInstruction: { parts: [{ text: system }] },
			contents: [{
				role: "user",
				parts
			}],
			generationConfig
		}),
		signal: AbortSignal.timeout(12e4)
	});
	const rawText = await res.text().catch(() => "");
	let body = {};
	try {
		body = JSON.parse(rawText);
	} catch {
		body = {};
	}
	if (!res.ok) return {
		ok: false,
		error: geminiError(res.status, body.error ? body : rawText),
		status: res.status
	};
	if (body.promptFeedback?.blockReason) return {
		ok: false,
		error: "Gemini blocked that screenshot. Try another image."
	};
	const finishReason = body.candidates?.[0]?.finishReason;
	const raw = extractGeminiText(body);
	if (!raw) {
		if (finishReason === "MAX_TOKENS") return {
			ok: false,
			error: "Gemini ran out of output tokens before writing the page.",
			finishReason
		};
		if (finishReason === "SAFETY") return {
			ok: false,
			error: "Gemini blocked that screenshot. Try another image.",
			finishReason
		};
		return {
			ok: false,
			error: "Gemini returned an empty page.",
			finishReason
		};
	}
	return {
		ok: true,
		html: extractHtml(raw),
		title: extractTitle(raw, "Generated UI"),
		finishReason
	};
}
async function composeWithGemini(apiKey, system, text, imageDataUrl, preferredModel) {
	let available;
	try {
		const listed = await listGeminiModels(apiKey);
		if (listed.ok) available = listed.models;
		else if (isAuthFailure(listed.error)) return listed;
	} catch {
		available = void 0;
	}
	const attempts = modelAttempts(preferredModel, available);
	let lastError = "Gemini did not respond.";
	for (const model of attempts) try {
		let result = await generateOnce(apiKey, model, system, text, imageDataUrl, false);
		if (!result.ok && result.status === 400) result = await generateOnce(apiKey, model, system, text, imageDataUrl, true);
		if (result.ok) return result;
		lastError = result.error;
		if (isAuthFailure(result.error)) return result;
		if (result.error.includes("blocked")) return result;
		if (result.error.includes("timed out") || result.error.includes("Timeout")) return {
			ok: false,
			error: "Gemini timed out. Try a simpler screen."
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : "Generation failed";
		if (msg.includes("Timeout") || msg.includes("aborted")) return {
			ok: false,
			error: "Gemini timed out. Try a simpler screen."
		};
		lastError = msg;
	}
	return {
		ok: false,
		error: lastError
	};
}
var COMPOSE_TARGETS = [
	{
		id: "ui",
		label: "AAA UI",
		short: "UI",
		hint: "Shipped-grade interfaces",
		placeholder: "Describe an interface — no typing in code required"
	},
	{
		id: "cnc",
		label: "CNC 3D",
		short: "CNC",
		hint: "Milled procedural models",
		placeholder: "Name a part, vehicle, or environment to mill…"
	},
	{
		id: "mindmap",
		label: "Mind map",
		short: "MAP",
		hint: "Expand one word into a build",
		placeholder: "One word or phrase to expand into an app, game, or model…"
	}
];
var KEY = "html-typeless-target-v1";
function isComposeTarget(value) {
	return value === "ui" || value === "cnc" || value === "mindmap";
}
function targetMeta(id) {
	return COMPOSE_TARGETS.find((t) => t.id === id) ?? COMPOSE_TARGETS[0];
}
function readTarget() {
	if (typeof window === "undefined") return "ui";
	try {
		const raw = localStorage.getItem(KEY);
		return isComposeTarget(raw) ? raw : "ui";
	} catch {
		return "ui";
	}
}
var useComposeTarget = create((set) => ({
	target: "ui",
	hydrated: false,
	hydrate: () => set({
		target: readTarget(),
		hydrated: true
	}),
	setTarget: (target) => {
		try {
			localStorage.setItem(KEY, target);
		} catch {}
		set({ target });
	}
}));
function readComposeTarget() {
	return readTarget();
}
var SHARED_OUTPUT = `Output rules:
1. First line exactly: <!-- title: 2-4 word name -->
2. Then a complete HTML5 document starting with <!DOCTYPE html>
3. No markdown, no fences, no commentary
4. Inline CSS in <style>. Google Fonts <link> is allowed.
5. Must look finished at 390px wide and scale up to desktop.
6. Semantic HTML, visible labels, tap targets ≥44px.
7. If refining, apply the change and return the full updated document.`;
function systemFor(target) {
	if (target === "cnc") return `You are a procedural 3D machinist inside HTML TYPELESS IDE.
Turn a screenshot or a short brief into one self-contained AAA CNC-milled 3D model or environment in the browser.

${SHARED_OUTPUT}
8. Load Three.js from exactly: https://unpkg.com/three@0.160.0/build/three.min.js as a classic <script src>. No import maps, no examples/jsm, no other libraries.
9. Write orbit yourself: pointer-drag rotate, wheel zoom, touch one-finger rotate and pinch zoom. Start the camera on a 3/4 product view.
10. Geometry is 100% procedural (Box, Cylinder, Lathe, Extrude, CSG-like stacking). No GLTF, no images as meshes, no placeholders.
11. Visual language: CNC mill, not a toy. Anodized aluminum, toolpath grooves, ball-nose fillets, chamfers, vises or a T-slot table, brushed metal, cool shop lighting. Dark mill-bay environment.
12. Animate a slow idle turn or mill-head motion. Handle resize. RequestAnimationFrame. Full viewport canvas.
13. If an image is provided, mill that object or environment, not a generic cube.
14. If the brief is an environment (hangar, gate, arena), mill the space as architectural CNC massing with walkable scale.`;
	if (target === "mindmap") return `You are a systems designer inside HTML TYPELESS IDE.
Expand one word or a short phrase into an interactive mind map for building an app, a game, or a 3D model.

${SHARED_OUTPUT}
5. Center node is the seed. First ring is App, Game, and Model unless the seed is clearly only one of those — then deepen that branch.
6. At least 12 nodes across 3 depths: product surfaces, systems, screens or mechanics, and assets.
7. SVG or HTML with bezier links. HUD chrome, dark spatial field, cyan/steel accents. No emoji. No lorem.
8. Click/tap a node to expand or collapse children. Selected node shows a one-line build note.
9. Layout must work at 390px (pan + pinch or overflow scroll) and on desktop.
10. Use the screenshot only as a seed if provided; the map is the product, not a recreation of the screenshot.
11. Copy must be specific and buildable (named screens, systems, materials), not vague strategy talk.`;
	return `You are a AAA product designer and UI engineer inside HTML TYPELESS IDE.
Turn a screenshot or a short brief into one self-contained, shipped-grade web interface.

${SHARED_OUTPUT}
8. Recreate layout, color, type, spacing, and hierarchy faithfully when a screenshot is given.
9. Use believable product copy, not lorem ipsum. No emoji.
10. AAA bar: cinematic but restrained lighting, real hierarchy, density of a shipped app (Linear / Stripe / Apple), not a template dashboard.
11. Inline all CSS in <style>. No external JS libraries. Micro-interactions via CSS.`;
}
function userTextFor(target, mode, prompt, html) {
	const note = prompt?.trim();
	if (mode === "refine") return `Keep this as a ${targetMeta(target).label} output. Apply this change:\n${note || "Polish the visual design."}\n\nExisting document:\n${(html ?? "").slice(0, 8e4)}`;
	if (target === "cnc") {
		if (mode === "image") return note || "Mill this screenshot as a pixel-faithful CNC-grade procedural 3D model or environment. Match silhouette, parts, and materials.";
		return note || "Mill a hero CNC-machined device on a T-slot table with vises, toolpath grooves, and shop lighting.";
	}
	if (target === "mindmap") {
		if (mode === "image") return note || "Read the screenshot, extract the core product word, and expand it into a mind map for building the app, game, or model.";
		return note || "Expand the seed 'Aperture' into a mind map for an app, a game, and a 3D model.";
	}
	if (mode === "image") return note || "Recreate this UI screenshot as a pixel-faithful, AAA production HTML page. Match structure, colors, type, cards, charts, and spacing.";
	return note || "Design a polished mobile dashboard with status cards and a clear primary action.";
}
//#endregion
export { verifyGeminiKey as _, composeWithGemini as a, extractTitle as c, readComposeTarget as d, resolveGeminiKey as f, userTextFor as g, useComposeTarget as h, GENERATING_HTML as i, isBlankHtml as l, targetMeta as m, COMPOSE_TARGETS as n, createSsrRpc as o, systemFor as p, FAILED_HTML as r, extractHtml as s, BLANK_HTML as t, isComposeTarget as u };
