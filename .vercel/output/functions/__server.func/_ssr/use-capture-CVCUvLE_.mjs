import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as readComposeTarget, n as COMPOSE_TARGETS } from "./compose-target-Cjtw5KUk.mjs";
import { C as ArrowUp, S as Box, f as LayoutDashboard, m as ImagePlus, n as Waypoints } from "../_libs/lucide-react.mjs";
import { a as Button, o as cn, r as useProjectStore } from "./router-Foc8YXM_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-capture-CVCUvLE_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PromptDock({ value, onChange, onSubmit, onImage, disabled, placeholder = "Describe a change, or a new interface…", labeled = false, inputId = "prompt-input" }) {
	const fileRef = (0, import_react.useRef)(null);
	const submit = (e) => {
		e.preventDefault();
		if (!disabled && value.trim()) onSubmit();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn(labeled && "flex min-h-0 flex-col gap-2"),
		children: [labeled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-hud text-[11px] tracking-[0.22em] text-subtle uppercase",
			children: "Prompt:/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: cn("flex items-end gap-2 rounded-xl border border-border bg-surface p-2"),
			children: [
				onImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/*",
					className: "sr-only",
					onChange: (e) => {
						const file = e.target.files?.[0];
						e.target.value = "";
						if (file) onImage(file);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "shrink-0",
					"aria-label": "Attach screenshot",
					disabled,
					onClick: () => fileRef.current?.click(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: inputId,
					children: "Prompt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: inputId,
					rows: labeled ? 3 : 2,
					value,
					disabled,
					placeholder,
					onChange: (e) => onChange(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
							e.preventDefault();
							if (!disabled && value.trim()) onSubmit();
						}
					},
					className: "min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-fg placeholder:text-subtle outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "primary",
					size: "icon",
					className: "shrink-0 rounded-lg",
					disabled: disabled || !value.trim(),
					"aria-label": "Generate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
				})
			]
		})]
	});
}
var ICONS = {
	ui: LayoutDashboard,
	cnc: Box,
	mindmap: Waypoints
};
function TargetSelect({ value, onChange, showHint = false }) {
	const current = COMPOSE_TARGETS.find((t) => t.id === value) ?? COMPOSE_TARGETS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-hud text-[11px] tracking-[0.22em] text-subtle uppercase",
			children: "Output:/"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-label": "Output type",
			className: "mt-2 grid grid-cols-3 gap-1 rounded-lg border border-border bg-surface p-1",
			children: COMPOSE_TARGETS.map((t) => {
				const Icon = ICONS[t.id];
				const active = t.id === value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "radio",
					"aria-checked": active,
					onClick: () => onChange(t.id),
					className: cn("flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-center transition-colors duration-150", active ? "bg-surface-2 text-primary" : "text-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-4",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-hud text-[10px] tracking-[0.16em] uppercase",
						children: t.label
					})]
				}, t.id);
			})
		}),
		showHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: current.hint
		})
	] });
}
var MAX_EDGE = 1024;
var JPEG_QUALITY = .72;
function compressImageFile(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			try {
				const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
				const w = Math.max(1, Math.round(img.width * scale));
				const h = Math.max(1, Math.round(img.height * scale));
				const canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				const ctx = canvas.getContext("2d");
				if (!ctx) throw new Error("Canvas unavailable");
				ctx.fillStyle = "#0a1528";
				ctx.fillRect(0, 0, w, h);
				ctx.drawImage(img, 0, 0, w, h);
				resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
			} catch (err) {
				reject(err);
			} finally {
				URL.revokeObjectURL(url);
			}
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Could not read that image"));
		};
		img.src = url;
	});
}
async function fetchAsDataUrl(path) {
	const res = await fetch(path);
	if (!res.ok) throw new Error("Could not load sample image");
	const blob = await res.blob();
	return compressImageFile(new File([blob], "sample.png", { type: blob.type || "image/png" }));
}
function useCapture(opts) {
	const navigate = useNavigate();
	const createAndGenerate = useProjectStore((s) => s.createAndGenerate);
	const generatingId = useProjectStore((s) => s.generatingId);
	const galleryRef = (0, import_react.useRef)(null);
	const cameraRef = (0, import_react.useRef)(null);
	const runImage = async (file) => {
		if (generatingId) return;
		const dataUrl = await compressImageFile(file);
		if (opts?.onImage) {
			await opts.onImage(dataUrl);
			return;
		}
		const id = await createAndGenerate({
			name: "Capture",
			source: "image",
			sourcePreview: dataUrl,
			input: {
				mode: "image",
				imageDataUrl: dataUrl,
				target: readComposeTarget()
			}
		});
		navigate({
			to: "/studio/$projectId",
			params: { projectId: id }
		});
	};
	const onChange = (el) => {
		const file = el.files?.[0];
		el.value = "";
		if (file) runImage(file);
	};
	return {
		pickGallery: () => galleryRef.current?.click(),
		pickCamera: () => cameraRef.current?.click(),
		pick: () => galleryRef.current?.click(),
		runImage,
		input: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: galleryRef,
			type: "file",
			accept: "image/*",
			className: "sr-only",
			"aria-hidden": true,
			tabIndex: -1,
			onChange: (e) => onChange(e.currentTarget)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: cameraRef,
			type: "file",
			accept: "image/*",
			capture: "environment",
			className: "sr-only",
			"aria-hidden": true,
			tabIndex: -1,
			onChange: (e) => onChange(e.currentTarget)
		})] }),
		busy: Boolean(generatingId)
	};
}
//#endregion
export { useCapture as a, fetchAsDataUrl as i, TargetSelect as n, compressImageFile as r, PromptDock as t };
