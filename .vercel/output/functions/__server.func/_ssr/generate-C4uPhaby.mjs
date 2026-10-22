import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as GEMINI_MODEL } from "./gemini-model-C5wbpTtE.mjs";
import { a as composeWithGemini, c as extractTitle, f as resolveGeminiKey, g as userTextFor, p as systemFor, s as extractHtml, u as isComposeTarget } from "./compose-target-Cjtw5KUk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-C4uPhaby.js
function resolveTarget(input) {
	return isComposeTarget(input.target) ? input.target : "ui";
}
var getAiStatus_createServerFn_handler = createServerRpc({
	id: "6354698b79df99bfbb6558aa409dec853a4525a110efb456c8100c8f678b63e2",
	name: "getAiStatus",
	filename: "src/lib/generate.ts"
}, (opts) => getAiStatus.__executeServer(opts));
var getAiStatus = createServerFn({ method: "GET" }).handler(getAiStatus_createServerFn_handler, async () => {
	return {
		grok: Boolean(process.env.XAI_API_KEY),
		geminiEnv: Boolean(process.env.GEMINI_API_KEY),
		model: GEMINI_MODEL
	};
});
var composeUi_createServerFn_handler = createServerRpc({
	id: "59048a762ee683b1f8b0a133de539d5561652469d9f0f9d0bce851dcd43b515c",
	name: "composeUi",
	filename: "src/lib/generate.ts"
}, (opts) => composeUi.__executeServer(opts));
var composeUi = createServerFn({ method: "POST" }).validator((input) => {
	if (input.imageDataUrl && input.imageDataUrl.length > 18e5) throw new Error("Image is too large. Try a smaller screenshot.");
	if (input.prompt && input.prompt.length > 4e3) throw new Error("Prompt is too long.");
	if (input.geminiKey && input.geminiKey.length > 256) throw new Error("API key is too long.");
	if (input.geminiModel && input.geminiModel.length > 80) throw new Error("Model id is too long.");
	if (input.target && !isComposeTarget(input.target)) throw new Error("Unknown output type.");
	return input;
}).handler(composeUi_createServerFn_handler, async ({ data }) => {
	const target = resolveTarget(data);
	const system = systemFor(target);
	const text = userTextFor(target, data.mode, data.prompt, data.html);
	const geminiKey = resolveGeminiKey(data.geminiKey);
	if (geminiKey) try {
		return await composeWithGemini(geminiKey, system, text, data.mode === "image" ? data.imageDataUrl : void 0, data.geminiModel);
	} catch (err) {
		const msg = err instanceof Error ? err.message : "Generation failed";
		if (msg.includes("Timeout") || msg.includes("aborted")) return {
			ok: false,
			error: "Gemini timed out. Try a simpler screen."
		};
		return {
			ok: false,
			error: msg
		};
	}
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Add a Gemini API key in Settings to generate."
	};
	const content = [];
	if (data.mode === "image" && data.imageDataUrl) content.push({
		type: "image_url",
		image_url: {
			url: data.imageDataUrl,
			detail: "high"
		}
	});
	content.push({
		type: "text",
		text
	});
	const messages = [{
		role: "system",
		content: system
	}, {
		role: "user",
		content
	}];
	const maxTokens = target === "ui" ? 6e3 : 8e3;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				messages,
				temperature: target === "mindmap" ? .4 : .25,
				max_tokens: maxTokens
			}),
			signal: AbortSignal.timeout(9e4)
		});
		if (!res.ok) {
			const errText = await res.text().catch(() => "");
			if (res.status === 400 && data.mode === "image") return retryNativeImage(apiKey, data, system, text, maxTokens);
			return {
				ok: false,
				error: parseApiError(res.status, errText)
			};
		}
		const raw = (await res.json()).choices?.[0]?.message?.content ?? "";
		if (!raw.trim()) return {
			ok: false,
			error: "The model returned an empty page."
		};
		return {
			ok: true,
			html: extractHtml(raw),
			title: extractTitle(raw, "Generated UI")
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : "Generation failed";
		if (msg.includes("Timeout") || msg.includes("aborted")) return {
			ok: false,
			error: "Generation timed out. Try a simpler screen."
		};
		return {
			ok: false,
			error: msg
		};
	}
});
async function retryNativeImage(apiKey, data, system, text, maxTokens) {
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages: [{
				role: "system",
				content: system
			}, {
				role: "user",
				content: [{
					type: "input_image",
					image_url: data.imageDataUrl,
					detail: "high"
				}, {
					type: "input_text",
					text
				}]
			}],
			temperature: .25,
			max_tokens: maxTokens
		}),
		signal: AbortSignal.timeout(9e4)
	});
	if (!res.ok) {
		const errText = await res.text().catch(() => "");
		return {
			ok: false,
			error: parseApiError(res.status, errText)
		};
	}
	const raw = (await res.json()).choices?.[0]?.message?.content ?? "";
	if (!raw.trim()) return {
		ok: false,
		error: "The model returned an empty page."
	};
	return {
		ok: true,
		html: extractHtml(raw),
		title: extractTitle(raw, "Generated UI")
	};
}
function parseApiError(status, body) {
	if (status === 429) return "The generator is busy. Wait a moment and try again.";
	if (status === 401 || status === 403) return "AI is not available in this environment.";
	const clipped = body.replace(/\s+/g, " ").slice(0, 180);
	return clipped ? `Generator error (${status}): ${clipped}` : `Generator error ${status}`;
}
//#endregion
export { composeUi_createServerFn_handler, getAiStatus_createServerFn_handler };
