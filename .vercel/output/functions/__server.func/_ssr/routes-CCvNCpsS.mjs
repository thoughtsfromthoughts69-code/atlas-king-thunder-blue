import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Box, l as MonitorSmartphone, y as Cog } from "../_libs/lucide-react.mjs";
import { a as Button, o as cn } from "./router-Foc8YXM_.mjs";
import { n as HudBottom, r as HudTop } from "./hud-chrome-Th9i-2_d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CCvNCpsS.js
var import_jsx_runtime = require_jsx_runtime();
function HtmlMark({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("html-mark html-mark-face", className),
		"aria-label": "HTML",
		children: "HTML"
	});
}
function Splash() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "circuit-field relative flex min-h-dvh flex-col overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanlines absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "spatial-floor",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudTop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-8 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlMark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-hud text-xl tracking-[0.14em] text-primary uppercase sm:text-3xl sm:tracking-[0.18em]",
							children: "Typeless / Automation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl font-sans text-sm tracking-[0.14em] text-muted uppercase sm:text-base sm:tracking-[0.22em]",
							children: "Game engine + UI/UX graphic design"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 max-w-lg font-sans text-2xl font-semibold leading-snug text-steel sm:text-4xl",
							children: "3D Spatial Integrated Development Environment (IDE)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-6 flex list-none flex-wrap gap-2 p-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureChip, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cog, { className: "size-3.5" }),
									label: "Automation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureChip, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5" }),
									label: "3D Spatial"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureChip, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorSmartphone, { className: "size-3.5" }),
									label: "UI/UX"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-base text-muted",
								children: "Drop a screenshot. Get production HTML in about 30 seconds. Edit typeless — by camera, prompt, or template."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "hero",
								size: "hero",
								className: "w-full shrink-0 sm:w-auto",
								onClick: () => navigate({ to: "/hub" }),
								children: "Start here"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudBottom, {})
		]
	});
}
function FeatureChip({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-[11px] tracking-[0.16em] text-steel uppercase",
		children: [icon, label]
	});
}
//#endregion
export { Splash as component };
