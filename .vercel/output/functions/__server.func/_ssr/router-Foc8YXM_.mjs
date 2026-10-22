import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, _ as lazyRouteComponent, f as Scripts, g as Outlet, h as createRouter, p as HeadContent, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { i as geminiModelLabel, r as GEMINI_MODEL_OPTIONS, s as sanitizeGeminiKey, t as GEMINI_MODEL } from "./gemini-model-C5wbpTtE.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { _ as verifyGeminiKey, d as readComposeTarget, h as useComposeTarget, i as GENERATING_HTML, o as createSsrRpc, r as FAILED_HTML, t as BLANK_HTML, u as isComposeTarget } from "./compose-target-Cjtw5KUk.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { p as KeyRound, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini-key-BOlk_Tfk.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function formatTime(ts) {
	return new Date(ts).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide select-none whitespace-nowrap disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-[scale,background-color,color,box-shadow,border-color] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			hero: "border border-primary/70 bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(62,224,196,0.18),0_0_24px_rgba(62,224,196,0.16)] hover:bg-primary/15 hover:shadow-[0_0_0_1px_rgba(62,224,196,0.28),0_0_28px_rgba(62,224,196,0.22)] uppercase",
			primary: "bg-primary text-primary-fg hover:bg-primary-hover",
			steel: "border border-border-strong bg-surface text-fg hover:bg-surface-2",
			ghost: "text-muted hover:text-fg hover:bg-surface/80",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-md",
			md: "h-11 px-4 text-sm rounded-lg",
			lg: "h-12 px-5 text-base rounded-lg",
			hero: "h-14 px-8 text-lg rounded-xl tracking-[0.22em]",
			icon: "size-11 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "steel",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var KEY$1 = "html-typeless-gemini-key-v1";
var MODEL_KEY = "html-typeless-gemini-model-v1";
function maskGeminiKey(key) {
	const t = key.trim();
	if (t.length < 8) return "••••";
	return `${t.slice(0, 4)}••••${t.slice(-4)}`;
}
function readKey() {
	if (typeof window === "undefined") return "";
	try {
		return localStorage.getItem(KEY$1)?.trim() ?? "";
	} catch {
		return "";
	}
}
function readModel() {
	if (typeof window === "undefined") return "auto";
	try {
		return localStorage.getItem(MODEL_KEY)?.trim() || "auto";
	} catch {
		return "auto";
	}
}
var useGeminiKey = create((set) => ({
	geminiKey: "",
	geminiModel: "auto",
	hydrated: false,
	panelOpen: false,
	hydrate: () => set({
		geminiKey: readKey(),
		geminiModel: readModel(),
		hydrated: true
	}),
	setKey: (key) => {
		const next = sanitizeGeminiKey(key);
		try {
			if (next) localStorage.setItem(KEY$1, next);
			else localStorage.removeItem(KEY$1);
		} catch {}
		set({ geminiKey: next });
	},
	setModel: (model) => {
		const next = model.trim() || "auto";
		try {
			localStorage.setItem(MODEL_KEY, next);
		} catch {}
		set({ geminiModel: next });
	},
	clear: () => {
		try {
			localStorage.removeItem(KEY$1);
			localStorage.removeItem(MODEL_KEY);
		} catch {}
		set({
			geminiKey: "",
			geminiModel: "auto"
		});
	},
	openPanel: () => set({ panelOpen: true }),
	closePanel: () => set({ panelOpen: false })
}));
function readGeminiKey() {
	return readKey();
}
function readGeminiModel() {
	return readModel();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Foc8YXM_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
function ApiKeyPanel() {
	const open = useGeminiKey((s) => s.panelOpen);
	const close = useGeminiKey((s) => s.closePanel);
	const stored = useGeminiKey((s) => s.geminiKey);
	const storedModel = useGeminiKey((s) => s.geminiModel);
	const setKey = useGeminiKey((s) => s.setKey);
	const setModel = useGeminiKey((s) => s.setModel);
	const clear = useGeminiKey((s) => s.clear);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [draftModel, setDraftModel] = (0, import_react.useState)("auto");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const inputId = (0, import_react.useId)();
	const modelId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setDraft("");
		setDraftModel(storedModel || "auto");
		const onKey = (e) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		open,
		close,
		storedModel
	]);
	if (!open) return null;
	const connect = async () => {
		const key = sanitizeGeminiKey(draft) || stored;
		if (!key) {
			toast.error("Paste a Gemini API key first.");
			return;
		}
		setBusy(true);
		try {
			const result = await verifyGeminiKey({ data: {
				key,
				model: draftModel
			} });
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			setKey(key);
			setModel(draftModel === "auto" ? "auto" : result.model);
			setDraft("");
			toast.success(`${geminiModelLabel(result.model)} connected`);
			close();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not verify that key.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-end p-3 sm:place-items-center sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/70",
			"aria-label": "Close settings",
			onClick: close
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "gemini-key-title",
			className: "relative z-10 w-full max-w-md rounded-xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-hud text-[11px] tracking-[0.22em] text-primary uppercase",
						children: "Automation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "gemini-key-title",
						className: "mt-1 font-sans text-xl font-semibold",
						children: "Gemini API key"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Close",
						onClick: close,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Image-to-code uses the latest Gemini model (",
						GEMINI_MODEL,
						"). The key stays on this device and is sent only when you generate."
					]
				}),
				stored ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-primary",
					children: [
						"Connected · ",
						maskGeminiKey(stored),
						" · ",
						geminiModelLabel(storedModel)
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted",
					children: "No personal key saved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: inputId,
					className: "mt-4 block text-sm font-semibold text-fg",
					children: "API key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: inputId,
					type: "password",
					autoComplete: "off",
					spellCheck: false,
					value: draft,
					disabled: busy,
					placeholder: "AIza…",
					onChange: (e) => setDraft(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") connect();
					},
					className: "mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 font-mono text-sm text-fg outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: modelId,
					className: "mt-4 block text-sm font-semibold text-fg",
					children: "Model"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: modelId,
					value: draftModel,
					disabled: busy,
					onChange: (e) => setDraftModel(e.target.value),
					className: "mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 font-mono text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
					children: GEMINI_MODEL_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: m.id,
						children: [m.label, m.id === "gemini-3.8-flash" ? " · latest" : ""]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-subtle",
					children: [
						"Create a key in",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://aistudio.google.com/apikey",
							target: "_blank",
							rel: "noreferrer",
							className: "text-steel underline-offset-2 hover:underline",
							children: "Google AI Studio"
						}),
						". Connect checks the key against live Gemini models."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "primary",
						className: "flex-1",
						disabled: busy,
						onClick: () => void connect(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), busy ? "Checking" : stored && !draft.trim() ? "Save Gemini" : "Connect Gemini"]
					}), stored ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "steel",
						disabled: busy,
						onClick: () => {
							clear();
							setDraftModel("auto");
							toast.message("Gemini key removed from this device.");
						},
						children: "Clear"
					}) : null]
				})
			]
		})]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var getAiStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("6354698b79df99bfbb6558aa409dec853a4525a110efb456c8100c8f678b63e2"));
var composeUi = createServerFn({ method: "POST" }).validator((input) => {
	if (input.imageDataUrl && input.imageDataUrl.length > 18e5) throw new Error("Image is too large. Try a smaller screenshot.");
	if (input.prompt && input.prompt.length > 4e3) throw new Error("Prompt is too long.");
	if (input.geminiKey && input.geminiKey.length > 256) throw new Error("API key is too long.");
	if (input.geminiModel && input.geminiModel.length > 80) throw new Error("Model id is too long.");
	if (input.target && !isComposeTarget(input.target)) throw new Error("Unknown output type.");
	return input;
}).handler(createSsrRpc("59048a762ee683b1f8b0a133de539d5561652469d9f0f9d0bce851dcd43b515c"));
var KEY = "html-typeless-projects-v1";
function readStorage() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map((p) => ({
			...p,
			target: isComposeTarget(p.target) ? p.target : "ui"
		})) : [];
	} catch {
		return [];
	}
}
var useProjectStore = create((set, get) => ({
	projects: [],
	hydrated: false,
	generatingId: null,
	generatingStartedAt: null,
	lastError: null,
	hydrate: () => {
		if (get().hydrated) return;
		set({
			projects: readStorage(),
			hydrated: true
		});
	},
	persist: () => {
		if (typeof window === "undefined") return;
		localStorage.setItem(KEY, JSON.stringify(get().projects));
	},
	get: (id) => get().projects.find((p) => p.id === id),
	clearError: () => set({ lastError: null }),
	createBlank: () => {
		const now = Date.now();
		const project = {
			id: uid(),
			name: "Untitled",
			html: BLANK_HTML,
			source: "blank",
			target: readComposeTarget(),
			createdAt: now,
			updatedAt: now
		};
		set((s) => ({ projects: [project, ...s.projects] }));
		get().persist();
		return project.id;
	},
	createFromTemplate: (name, html) => {
		const now = Date.now();
		const project = {
			id: uid(),
			name,
			html,
			source: "template",
			target: "ui",
			createdAt: now,
			updatedAt: now
		};
		set((s) => ({ projects: [project, ...s.projects] }));
		get().persist();
		return project.id;
	},
	createAndGenerate: async ({ name, source, sourcePreview, input }) => {
		const now = Date.now();
		const target = isComposeTarget(input.target) ? input.target : readComposeTarget();
		const project = {
			id: uid(),
			name,
			html: GENERATING_HTML,
			source,
			sourcePreview,
			target,
			createdAt: now,
			updatedAt: now
		};
		set((s) => ({
			projects: [project, ...s.projects],
			generatingId: project.id,
			generatingStartedAt: now,
			lastError: null
		}));
		get().persist();
		finishGeneration(set, get, project.id, {
			...input,
			target
		}, true);
		return project.id;
	},
	refine: async (id, prompt) => {
		const project = get().projects.find((p) => p.id === id);
		if (!project || get().generatingId) return;
		await finishGeneration(set, get, id, {
			mode: "refine",
			prompt,
			html: project.html,
			target: project.target ?? readComposeTarget()
		}, false);
	},
	generateOn: async (id, input) => {
		if (get().generatingId) return;
		const target = isComposeTarget(input.target) ? input.target : get().projects.find((p) => p.id === id)?.target;
		set((s) => ({ projects: s.projects.map((p) => p.id === id ? {
			...p,
			html: GENERATING_HTML,
			sourcePreview: input.imageDataUrl ?? p.sourcePreview,
			target: target ?? p.target,
			updatedAt: Date.now()
		} : p) }));
		get().persist();
		await finishGeneration(set, get, id, {
			...input,
			target
		}, true);
	},
	updateHtml: (id, html) => {
		set((s) => ({ projects: s.projects.map((p) => p.id === id ? {
			...p,
			html,
			updatedAt: Date.now()
		} : p) }));
		get().persist();
	},
	setTarget: (id, target) => {
		set((s) => ({ projects: s.projects.map((p) => p.id === id ? {
			...p,
			target,
			updatedAt: Date.now()
		} : p) }));
		get().persist();
	},
	rename: (id, name) => {
		const trimmed = name.trim().slice(0, 48) || "Untitled";
		set((s) => ({ projects: s.projects.map((p) => p.id === id ? {
			...p,
			name: trimmed,
			updatedAt: Date.now()
		} : p) }));
		get().persist();
	},
	remove: (id) => {
		set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
		get().persist();
	}
}));
async function finishGeneration(set, get, id, input, updateTitle) {
	set({
		generatingId: id,
		generatingStartedAt: Date.now(),
		lastError: null
	});
	try {
		const result = await composeUi({ data: {
			...input,
			geminiKey: readGeminiKey() || void 0,
			geminiModel: readGeminiModel() || void 0,
			target: isComposeTarget(input.target) ? input.target : get().projects.find((p) => p.id === id)?.target ?? readComposeTarget()
		} });
		if (!result.ok) {
			set((s) => ({
				lastError: result.error,
				generatingId: null,
				generatingStartedAt: null,
				projects: s.projects.map((p) => p.id === id ? {
					...p,
					html: FAILED_HTML,
					updatedAt: Date.now()
				} : p)
			}));
			get().persist();
			return;
		}
		set((s) => ({
			projects: s.projects.map((p) => p.id === id ? {
				...p,
				html: result.html,
				name: updateTitle ? result.title || p.name : p.name,
				target: isComposeTarget(input.target) ? input.target : p.target,
				updatedAt: Date.now()
			} : p),
			generatingId: null,
			generatingStartedAt: null,
			lastError: null
		}));
		get().persist();
	} catch (err) {
		set((s) => ({
			lastError: err instanceof Error ? err.message : "Generation failed",
			generatingId: null,
			generatingStartedAt: null,
			projects: s.projects.map((p) => p.id === id ? {
				...p,
				html: FAILED_HTML,
				updatedAt: Date.now()
			} : p)
		}));
		get().persist();
	}
}
var styles_default = "/assets/styles-CMiAo-f_.css";
var APP_NAME = "HTML TYPELESS IDE";
function HydrateProjects() {
	const hydrate = useProjectStore((s) => s.hydrate);
	const hydrateKeys = useGeminiKey((s) => s.hydrate);
	const hydrateTarget = useComposeTarget((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
		hydrateKeys();
		hydrateTarget();
	}, [
		hydrate,
		hydrateKeys,
		hydrateTarget
	]);
	return null;
}
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#050b18"
			},
			{
				name: "description",
				content: "30-second image-to-code generator and typeless spatial IDE."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateProjects, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyPanel, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						theme: "dark",
						position: "top-center",
						toastOptions: { style: {
							background: "#0c1b32",
							border: "1px solid #1c3658",
							color: "#e8f4ff",
							fontFamily: "Rajdhani, sans-serif"
						} }
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$2 = () => import("./routes-CCvNCpsS.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./hub-CJ8Brc4N.mjs");
var Route$1 = createFileRoute("/hub")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./studio._projectId-BhOjiAvh.mjs");
var Route = createFileRoute("/studio/$projectId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	HubRoute: Route$1.update({
		id: "/hub",
		path: "/hub",
		getParentRoute: () => Route$3
	}),
	StudioProjectIdRoute: Route.update({
		id: "/studio/$projectId",
		path: "/studio/$projectId",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Button as a, useGeminiKey as c, getAiStatus as i, Route as n, cn as o, useProjectStore as r, formatTime as s, router_exports as t };
