import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Box, _ as Cpu, d as LayoutGrid, h as Globe, o as Settings2, s as Radio } from "../_libs/lucide-react.mjs";
import { c as useGeminiKey, o as cn } from "./router-Foc8YXM_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hud-chrome-Th9i-2_d.js
var import_jsx_runtime = require_jsx_runtime();
function HudTop({ right }) {
	const openPanel = useGeminiKey((s) => s.openPanel);
	const connected = useGeminiKey((s) => Boolean(s.geminiKey));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-10 flex h-11 items-center justify-between gap-3 border-b border-border px-3 text-[11px] tracking-[0.18em] text-subtle uppercase",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 text-steel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
						className: "size-3.5",
						strokeWidth: 1.75
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
						className: "size-3.5",
						strokeWidth: 1.75
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
						className: "size-3.5",
						strokeWidth: 1.75
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {
						className: "size-3.5",
						strokeWidth: 1.75
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						className: "size-3.5",
						strokeWidth: 1.75
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hud-line absolute left-1/4 right-1/4 top-1/2 h-px -translate-y-1/2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-hud tabular-nums text-primary",
					children: right ?? "812"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: openPanel,
					className: "relative grid size-11 place-items-center rounded-md text-steel transition-colors duration-150 hover:bg-surface hover:text-primary",
					"aria-label": "Gemini API key settings",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {
						className: "size-3.5",
						strokeWidth: 1.75
					}), connected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary",
						"aria-hidden": true
					})]
				})]
			})
		]
	});
}
function HudBottom() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative z-10 flex h-8 items-center justify-between border-t border-border px-3 text-[10px] tracking-[0.2em] text-subtle uppercase",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Typeless / Automation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-steel",
			children: "Spatial IDE · Android"
		})]
	});
}
function BottomDock({ active, onLibrary, onCapture, onWorkspace }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2",
		"aria-label": "Primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-lg items-end justify-around",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockBtn, {
					label: "Library",
					active: active === "library",
					onClick: onLibrary,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {
						className: "size-5",
						strokeWidth: 1.75
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCapture,
					className: cn("relative -mt-5 flex size-14 items-center justify-center rounded-full border border-primary/70 bg-primary text-primary-fg shadow-[0_0_24px_rgba(62,224,196,0.25)] transition-[scale] duration-150 ease-out active:scale-[0.96]", active === "capture" && "ring-2 ring-primary/40"),
					"aria-label": "Capture screenshot",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-hud text-lg leading-none",
						children: "+"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockBtn, {
					label: "Workspace",
					active: active === "workspace",
					onClick: onWorkspace,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
						className: "size-5",
						strokeWidth: 1.75
					})
				})
			]
		})
	});
}
function DockBtn({ label, active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex min-w-16 flex-col items-center gap-1 px-3 py-1 text-[11px] tracking-[0.16em] uppercase transition-colors duration-150", active ? "text-primary" : "text-subtle"),
		children: [children, label]
	});
}
//#endregion
export { HudBottom as n, HudTop as r, BottomDock as t };
