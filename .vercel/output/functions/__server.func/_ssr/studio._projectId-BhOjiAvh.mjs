import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useComposeTarget, l as isBlankHtml, m as targetMeta } from "./compose-target-Cjtw5KUk.mjs";
import { a as Smartphone, b as ChevronLeft, c as Monitor, g as Download, i as Trash2, v as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, n as Route, o as cn, r as useProjectStore } from "./router-Foc8YXM_.mjs";
import { r as HudTop, t as BottomDock } from "./hud-chrome-Th9i-2_d.mjs";
import { a as useCapture, n as TargetSelect, r as compressImageFile, t as PromptDock } from "./use-capture-CVCUvLE_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio._projectId-BhOjiAvh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CodeEditor({ value, onChange, className }) {
	const lines = (0, import_react.useMemo)(() => Math.max(1, value.split("\n").length), [value]);
	const gutterRef = (0, import_react.useRef)(null);
	const areaRef = (0, import_react.useRef)(null);
	const sync = () => {
		if (gutterRef.current && areaRef.current) gutterRef.current.scrollTop = areaRef.current.scrollTop;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("code-stage flex min-h-0 overflow-hidden rounded-lg", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "code-watermark",
				"aria-hidden": "true",
				children: [
					"HTML",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"CODE /",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"LIVE",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"PREVIEW"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: gutterRef,
				className: "relative z-10 w-10 shrink-0 overflow-hidden border-r border-border py-3 text-right font-mono text-[11px] leading-6 text-subtle tabular-nums select-none",
				"aria-hidden": true,
				children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pr-2",
					children: i + 1
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				ref: areaRef,
				value,
				onChange: (e) => onChange(e.target.value),
				onScroll: sync,
				onKeyDown: (e) => {
					if (e.key !== "Tab") return;
					e.preventDefault();
					const el = e.currentTarget;
					const start = el.selectionStart;
					const end = el.selectionEnd;
					onChange(`${value.slice(0, start)}  ${value.slice(end)}`);
					requestAnimationFrame(() => {
						el.selectionStart = el.selectionEnd = start + 2;
					});
				},
				spellCheck: false,
				wrap: "off",
				"aria-label": "HTML source",
				className: "relative z-10 min-h-0 min-w-0 flex-1 resize-none bg-transparent px-3 py-3 font-mono text-[12px] leading-6 text-fg/90 outline-none"
			})
		]
	});
}
var STAGES = [
	"Analyzing layout",
	"Mapping color tokens",
	"Composing markup",
	"Binding styles",
	"Polishing interface"
];
var R = 52;
var C = 2 * Math.PI * R;
function GenMeter({ startedAt, active }) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const id = window.setInterval(() => setNow(Date.now()), 100);
		return () => window.clearInterval(id);
	}, [active]);
	if (!active || !startedAt) return null;
	const seconds = Math.max(0, now - startedAt) / 1e3;
	const progress = Math.min(.96, seconds / 30);
	const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(seconds / 6))];
	const remain = Math.max(0, 30 - Math.floor(seconds));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-30 grid place-items-center bg-bg/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex flex-col items-center gap-4 rounded-xl border border-border bg-bg-elevated/95 px-8 py-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative size-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 120 120",
						className: "size-full -rotate-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "60",
							cy: "60",
							r: R,
							fill: "none",
							stroke: "rgba(62,224,196,0.12)",
							strokeWidth: "4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "60",
							cy: "60",
							r: R,
							fill: "none",
							stroke: "#3ee0c4",
							strokeWidth: "4",
							strokeLinecap: "round",
							strokeDasharray: C,
							strokeDashoffset: C * (1 - progress)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center font-hud text-2xl tabular-nums text-primary",
						children: remain
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-sm tracking-[0.2em] text-muted uppercase",
					children: stage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-center text-xs text-subtle",
					children: "Image to code in about 30 seconds. Keep this workspace open."
				})
			]
		})
	});
}
function LivePreview({ html, mode, onMode, className, framed = true }) {
	const blank = isBlankHtml(html);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-col", className),
		children: [framed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-hud text-[11px] tracking-[0.22em] text-subtle uppercase",
				children: "Live preview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-md border border-border p-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onMode("phone"),
					className: cn("grid size-8 place-items-center rounded-sm transition-colors duration-150", mode === "phone" ? "bg-surface-2 text-primary" : "text-subtle"),
					"aria-label": "Phone preview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onMode("full"),
					className: cn("grid size-8 place-items-center rounded-sm transition-colors duration-150", mode === "full" ? "bg-surface-2 text-primary" : "text-subtle"),
					"aria-label": "Full preview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative min-h-[480px] flex-1 overflow-hidden rounded-lg lg:min-h-[560px]", blank ? "preview-stage" : "bg-bg-elevated"),
			children: blank ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "preview-stage-label",
				children: "Live preview"
			}) : mode === "phone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full min-h-[480px] items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "phone-bezel flex h-[min(100%,640px)] w-[min(100%,340px)] flex-col overflow-hidden rounded-[32px] p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-1.5 h-1.5 w-16 rounded-full bg-fg/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Live preview",
						sandbox: "allow-scripts",
						srcDoc: html,
						className: "min-h-0 w-full flex-1 rounded-[22px] bg-white"
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Live preview",
				sandbox: "allow-scripts",
				srcDoc: html,
				className: "h-full min-h-[480px] w-full bg-white"
			})
		})]
	});
}
function StudioPage() {
	const { projectId } = Route.useParams();
	const navigate = useNavigate();
	const hydrated = useProjectStore((s) => s.hydrated);
	const project = useProjectStore((s) => s.projects.find((p) => p.id === projectId));
	const updateHtml = useProjectStore((s) => s.updateHtml);
	const rename = useProjectStore((s) => s.rename);
	const setProjectTarget = useProjectStore((s) => s.setTarget);
	const remove = useProjectStore((s) => s.remove);
	const refine = useProjectStore((s) => s.refine);
	const generateOn = useProjectStore((s) => s.generateOn);
	const generatingId = useProjectStore((s) => s.generatingId);
	const generatingStartedAt = useProjectStore((s) => s.generatingStartedAt);
	const lastError = useProjectStore((s) => s.lastError);
	const clearError = useProjectStore((s) => s.clearError);
	const { pickCamera, input } = useCapture({ onImage: async (dataUrl) => {
		await generateOn(projectId, {
			mode: "image",
			imageDataUrl: dataUrl,
			target: useProjectStore.getState().projects.find((p) => p.id === projectId)?.target
		});
	} });
	const globalTarget = useComposeTarget((s) => s.target);
	const setGlobalTarget = useComposeTarget((s) => s.setTarget);
	const [tab, setTab] = (0, import_react.useState)("preview");
	const [device, setDevice] = (0, import_react.useState)("phone");
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)(project?.name ?? "");
	(0, import_react.useEffect)(() => {
		if (project) setTitle(project.name);
	}, [project?.name, project]);
	(0, import_react.useEffect)(() => {
		if (project?.target) setGlobalTarget(project.target);
	}, [
		project?.id,
		project?.target,
		setGlobalTarget
	]);
	(0, import_react.useEffect)(() => {
		const current = useProjectStore.getState().projects.find((p) => p.id === projectId);
		if (!current) return;
		setDevice(current.target === "cnc" || current.target === "mindmap" ? "full" : "phone");
	}, [projectId]);
	(0, import_react.useEffect)(() => {
		if (!lastError) return;
		toast.error(lastError);
		clearError();
	}, [lastError, clearError]);
	(0, import_react.useEffect)(() => {
		if (hydrated && !project) navigate({ to: "/hub" });
	}, [
		hydrated,
		project,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		const onPaste = (e) => {
			const file = [...e.clipboardData?.files ?? []].find((f) => f.type.startsWith("image/"));
			if (!file) return;
			e.preventDefault();
			compressImageFile(file).then((dataUrl) => generateOn(projectId, {
				mode: "image",
				imageDataUrl: dataUrl,
				target: useProjectStore.getState().projects.find((p) => p.id === projectId)?.target
			}));
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [generateOn, projectId]);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "circuit-field grid min-h-dvh place-items-center text-muted",
		children: "Loading workspace"
	});
	const busy = generatingId === project.id;
	const output = project.target ?? globalTarget;
	const placeholder = targetMeta(output).placeholder;
	const changeTarget = (next) => {
		setGlobalTarget(next);
		setProjectTarget(project.id, next);
		setDevice(next === "cnc" || next === "mindmap" ? "full" : "phone");
	};
	const copyCode = async () => {
		await navigator.clipboard.writeText(project.html);
		toast.success("HTML copied");
	};
	const download = () => {
		const blob = new Blob([project.html], { type: "text/html" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.html`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const applyImage = async (file) => {
		const dataUrl = await compressImageFile(file);
		await generateOn(project.id, {
			mode: "image",
			imageDataUrl: dataUrl,
			target: project.target ?? globalTarget
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "circuit-field relative flex min-h-dvh flex-col pb-24",
		children: [
			input,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudTop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-2 py-2 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Back to library",
						onClick: () => navigate({ to: "/hub" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					project.sourcePreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: project.sourcePreview,
						alt: "Source screenshot",
						className: "hidden size-9 rounded-md object-cover sm:block"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						onBlur: () => rename(project.id, title),
						onKeyDown: (e) => {
							if (e.key === "Enter") e.target.blur();
						},
						className: "min-w-0 flex-1 bg-transparent font-semibold tracking-wide outline-none",
						"aria-label": "Project name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Copy HTML",
						onClick: () => void copyCode(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Download HTML",
						onClick: download,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Delete project",
						onClick: () => {
							remove(project.id);
							navigate({ to: "/hub" });
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-7xl flex-1 flex-col px-3 py-3 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetSelect, {
							value: output,
							onChange: changeTarget
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptDock, {
							value: prompt,
							onChange: setPrompt,
							disabled: busy,
							labeled: true,
							inputId: "prompt-mobile",
							placeholder,
							onImage: (file) => void applyImage(file),
							onSubmit: () => {
								const text = prompt.trim();
								if (!text) return;
								setPrompt("");
								refine(project.id, text);
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-lg border border-border p-1 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
							active: tab === "code",
							onClick: () => setTab("code"),
							children: "Code editor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
							active: tab === "preview",
							onClick: () => setTab("preview"),
							children: "Live preview"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-3 grid min-h-[62dvh] flex-1 gap-3 lg:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: cn("min-h-0 flex-col", tab === "code" ? "flex" : "hidden lg:flex"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 font-hud text-[11px] tracking-[0.22em] text-subtle uppercase",
									children: "Code editor:/"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeEditor, {
									value: project.html,
									onChange: (html) => updateHtml(project.id, html),
									className: "min-h-[52dvh] flex-1"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: cn("relative min-h-0 flex-col", tab === "preview" ? "flex" : "hidden lg:flex"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-3 hidden lg:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptDock, {
										value: prompt,
										onChange: setPrompt,
										disabled: busy,
										labeled: true,
										inputId: "prompt-desktop",
										placeholder,
										onImage: (file) => void applyImage(file),
										onSubmit: () => {
											const text = prompt.trim();
											if (!text) return;
											setPrompt("");
											refine(project.id, text);
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePreview, {
									html: project.html,
									mode: device,
									onMode: setDevice,
									className: "min-h-[52dvh] flex-1"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenMeter, {
								startedAt: generatingStartedAt,
								active: busy
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomDock, {
				active: "workspace",
				onLibrary: () => navigate({ to: "/hub" }),
				onCapture: pickCamera,
				onWorkspace: () => {}
			})
		]
	});
}
function TabBtn({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-10 flex-1 rounded-md text-sm tracking-[0.14em] uppercase transition-colors duration-150", active ? "bg-surface-2 text-primary" : "text-muted"),
		children
	});
}
//#endregion
export { StudioPage as component };
