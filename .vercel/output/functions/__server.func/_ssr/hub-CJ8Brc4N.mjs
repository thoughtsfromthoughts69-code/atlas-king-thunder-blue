import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as geminiModelLabel } from "./gemini-model-C5wbpTtE.mjs";
import { h as useComposeTarget, m as targetMeta } from "./compose-target-Cjtw5KUk.mjs";
import { m as ImagePlus, u as Loader, x as Camera } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useGeminiKey, i as getAiStatus, o as cn, r as useProjectStore, s as formatTime } from "./router-Foc8YXM_.mjs";
import { r as HudTop, t as BottomDock } from "./hud-chrome-Th9i-2_d.mjs";
import { a as useCapture, i as fetchAsDataUrl, n as TargetSelect, t as PromptDock } from "./use-capture-CVCUvLE_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hub-CJ8Brc4N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TemplateThumb({ html, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "template-thumb",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: `${title} preview`,
			sandbox: "allow-scripts",
			srcDoc: html,
			tabIndex: -1
		})
	});
}
var TEMPLATES = [
	{
		id: "aperture-ops",
		name: "Aperture Ops",
		tag: "Dashboard",
		blurb: "Status, allocations, crew, and system health.",
		html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Aperture Ops</title>\n<style>\n  :root { --ink:#14202b; --muted:#5d7280; --line:#e4edf2; --paper:#eef3f6; --card:#fff; --teal:#1f8a86; --teal-2:#2aa39a; --navy:#163447; --chip:#e7f6f4; }\n  *{box-sizing:border-box} html,body{margin:0;background:var(--paper);color:var(--ink);font-family:ui-sans-serif,system-ui,sans-serif}\n  body{padding:16px 16px 32px}\n  h1{font-size:22px;margin:0 0 4px;letter-spacing:-.02em}\n  .sub{color:var(--muted);font-size:13px;margin:0 0 16px}\n  .grid{display:grid;gap:12px}\n  .card{background:var(--card);border-radius:20px;padding:16px;box-shadow:0 1px 0 rgba(20,32,43,.04),0 10px 28px rgba(20,32,43,.06)}\n  .card h2{font-size:13px;margin:0 0 12px;color:var(--navy);font-weight:650}\n  .bar{height:8px;background:#e8eef2;border-radius:99px;overflow:hidden}\n  .bar>i{display:block;height:100%;width:62%;background:linear-gradient(90deg,var(--teal),var(--teal-2));border-radius:99px}\n  .meta{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:8px}\n  .row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line)}\n  .row:first-of-type{border-top:0;padding-top:0}\n  .av{width:36px;height:36px;border-radius:50%;background:#d7ecea;color:var(--teal);display:grid;place-items:center;font-size:11px;font-weight:700;flex-shrink:0}\n  .who{flex:1;min-width:0} .who b{display:block;font-size:13px} .who span{font-size:11px;color:var(--muted)}\n  .chip{font-size:10px;padding:5px 9px;border-radius:99px;background:var(--chip);color:var(--teal);font-weight:650}\n  .chip.late{background:#f8efe0;color:#9a6a22}\n  .pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n  .donut{width:88px;height:88px;border-radius:50%;margin:0 auto 8px;position:relative}\n  .d72{background:conic-gradient(var(--teal) 0 72%, #cfe3e2 72% 100%)}\n  .d89{background:conic-gradient(#2c6d9a 0 89%, #d5e3ee 89% 100%)}\n  .donut:after{content:attr(data-n);position:absolute;inset:18px;background:#fff;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;color:var(--navy)}\n  .stat{background:#f3f7f8;border-radius:14px;padding:12px;text-align:center}\n  .stat b{display:block;font-size:20px;color:var(--teal)}\n  .stat span{font-size:11px;color:var(--muted)}\n  svg.spark{width:100%;height:92px;display:block}\n  .health{margin:0;padding:0}\n  .health li{list-style:none;display:flex;justify-content:space-between;padding:8px 0;font-size:13px;border-bottom:1px solid var(--line)}\n  .dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px}\n  .ok{background:#2aa39a} .warn{background:#d39b3a}\n  .navy{background:var(--navy);color:#eef6fa;border-radius:20px;padding:16px}\n  .navy h2{color:#c5e4e0}\n  .navy .row{border-top-color:#2b4b5c}\n  .navy .who span{color:#8fb0bc}\n  @media(min-width:720px){\n    .grid{grid-template-columns:repeat(2,1fr)}\n    .span{grid-column:1/-1}\n    body{padding:28px}\n  }\n</style>\n</head>\n<body>\n  <h1>Aperture Ops</h1>\n  <p class=\"sub\">Project status · live resource view</p>\n  <div class=\"grid\">\n    <section class=\"card span\">\n      <h2>Project Status</h2>\n      <div class=\"bar\"><i></i></div>\n      <div class=\"meta\"><span>Progress starting</span><span>62% to 80%</span></div>\n    </section>\n    <section class=\"card\">\n      <h2>Resource Allocations</h2>\n      <div class=\"pair\">\n        <div><div class=\"donut d72\" data-n=\"72%\"></div><div class=\"stat\"><b>Design</b><span>Crew load</span></div></div>\n        <div><div class=\"donut d89\" data-n=\"89%\"></div><div class=\"stat\"><b>Build</b><span>Pipeline</span></div></div>\n      </div>\n    </section>\n    <section class=\"card\">\n      <h2>Team Activity</h2>\n      <div class=\"row\"><div class=\"av\">PL</div><div class=\"who\"><b>Priya Loan</b><span>Status updated · 12m</span></div><span class=\"chip\">Active</span></div>\n      <div class=\"row\"><div class=\"av\">SS</div><div class=\"who\"><b>Shina Smith</b><span>Completed · 2h</span></div><span class=\"chip\">Done</span></div>\n      <div class=\"row\"><div class=\"av\">MR</div><div class=\"who\"><b>Mei R.</b><span>Hold on tokens · 41m</span></div><span class=\"chip late\">Hold</span></div>\n    </section>\n    <section class=\"card span\">\n      <h2>Performance Analytics</h2>\n      <svg class=\"spark\" viewBox=\"0 0 300 92\" preserveAspectRatio=\"none\" aria-hidden=\"true\">\n        <polyline fill=\"none\" stroke=\"#c5d5dc\" stroke-width=\"2\" points=\"0,64 50,56 100,62 150,44 200,50 250,32 300,38\"/>\n        <polyline fill=\"none\" stroke=\"#1f8a86\" stroke-width=\"2.5\" points=\"0,74 50,66 100,52 150,54 200,36 250,40 300,22\"/>\n      </svg>\n      <div class=\"meta\"><span>Jan</span><span>Apr · 75% trend</span></div>\n    </section>\n    <section class=\"card\">\n      <h2>System Health</h2>\n      <ul class=\"health\">\n        <li><span><i class=\"dot ok\"></i>API gateway</span><span>99.9%</span></li>\n        <li><span><i class=\"dot ok\"></i>Build workers</span><span>Stable</span></li>\n        <li><span><i class=\"dot warn\"></i>Preview cache</span><span>Warming</span></li>\n      </ul>\n    </section>\n    <section class=\"navy\">\n      <h2>Notifications</h2>\n      <div class=\"row\"><div class=\"av\">N</div><div class=\"who\"><b>Preview ready</b><span>Ops board compiled</span></div></div>\n      <div class=\"row\"><div class=\"av\">A</div><div class=\"who\"><b>Allocations</b><span>Design load +4%</span></div></div>\n    </section>\n  </div>\n</body>\n</html>\n",
		swatch: [
			"#f5f8fa",
			"#1f8a86",
			"#163447"
		]
	},
	{
		id: "night-gate",
		name: "Night Gate",
		tag: "Auth",
		blurb: "Dark access panel with HUD framing.",
		html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Night Gate</title>\n<style>\n  :root{--bg:#070f1c;--panel:#0d1a2e;--line:#1d3654;--text:#e7f3ff;--muted:#86a0b8;--accent:#3ee0c4}\n  *{box-sizing:border-box} html,body{margin:0;height:100%;background:radial-gradient(1200px 600px at 80% -10%, #123056 0%, var(--bg) 55%);color:var(--text);font-family:ui-sans-serif,system-ui,sans-serif}\n  body{min-height:100dvh;display:grid;place-items:center;padding:24px}\n  .panel{width:min(100%,400px);background:color-mix(in oklab, var(--panel) 88%, transparent);border:1px solid var(--line);border-radius:24px;padding:28px 24px 24px}\n  .kicker{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin:0 0 10px}\n  h1{margin:0 0 8px;font-size:28px;letter-spacing:-.03em}\n  p{margin:0 0 22px;color:var(--muted);font-size:14px;line-height:1.5}\n  label{display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:0 0 6px}\n  input{width:100%;height:48px;border-radius:12px;border:1px solid var(--line);background:#081525;color:var(--text);padding:0 14px;margin-bottom:14px;font-size:16px}\n  input:focus{outline:2px solid color-mix(in oklab, var(--accent) 50%, transparent);border-color:var(--accent)}\n  button{width:100%;height:52px;border:0;border-radius:14px;background:var(--accent);color:#04201c;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:14px}\n  .row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin:12px 2px 0}\n  a{color:var(--accent);text-decoration:none}\n</style>\n</head>\n<body>\n  <form class=\"panel\" onsubmit=\"event.preventDefault()\">\n    <p class=\"kicker\">Access node 812</p>\n    <h1>Night Gate</h1>\n    <p>Sign in to the spatial workspace. Sessions persist on this device.</p>\n    <label for=\"email\">Email</label>\n    <input id=\"email\" type=\"email\" autocomplete=\"username\" placeholder=\"you@studio.io\" value=\"ada@aperture.io\"/>\n    <label for=\"pw\">Passphrase</label>\n    <input id=\"pw\" type=\"password\" autocomplete=\"current-password\" placeholder=\"••••••••\" value=\"••••••••\"/>\n    <button type=\"submit\">Enter workspace</button>\n    <div class=\"row\"><span>SSO available</span><a href=\"#\">Recover access</a></div>\n  </form>\n</body>\n</html>\n",
		swatch: [
			"#070f1c",
			"#3ee0c4",
			"#1d3654"
		]
	},
	{
		id: "crew-pulse",
		name: "Crew Pulse",
		tag: "Activity",
		blurb: "Team feed with status chips and filters.",
		html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Crew Pulse</title>\n<style>\n  :root{--bg:#f3f6f8;--card:#fff;--ink:#173040;--muted:#617888;--teal:#1c8f8a;--line:#e6eef2}\n  *{box-sizing:border-box} html,body{margin:0;background:var(--bg);color:var(--ink);font-family:ui-sans-serif,system-ui,sans-serif}\n  header{padding:20px 18px 8px;display:flex;justify-content:space-between;align-items:end}\n  h1{margin:0;font-size:24px;letter-spacing:-.03em} .sub{color:var(--muted);font-size:13px}\n  .chips{display:flex;gap:8px;padding:12px 18px 4px;overflow:auto}\n  .chips button{border:0;background:#fff;border-radius:999px;padding:8px 14px;font-size:13px;color:var(--muted);min-height:40px}\n  .chips .on{background:#163447;color:#fff}\n  ul{list-style:none;margin:8px 16px 24px;padding:0;display:grid;gap:10px}\n  li{background:var(--card);border-radius:18px;padding:14px;display:flex;gap:12px;align-items:center;box-shadow:0 8px 24px rgba(23,48,64,.04)}\n  .av{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;font-weight:700;color:#fff;flex-shrink:0}\n  .t1{background:#1c8f8a} .t2{background:#2c6d9a} .t3{background:#345c78} .t4{background:#0f3a48}\n  b{display:block;font-size:15px} span{font-size:12px;color:var(--muted)}\n  .tag{margin-left:auto;font-size:11px;padding:6px 10px;border-radius:999px;background:#e7f4f3;color:var(--teal);font-weight:650}\n  .late{background:#f8efe0;color:#9a6a22}\n</style>\n</head>\n<body>\n  <header>\n    <div><h1>Crew Pulse</h1><div class=\"sub\">4 updates in the last hour</div></div>\n  </header>\n  <div class=\"chips\">\n    <button class=\"on\">All</button>\n    <button>Design</button>\n    <button>Build</button>\n    <button>Review</button>\n  </div>\n  <ul>\n    <li><div class=\"av t1\">AL</div><div><b>Amina L.</b><span>Shipped the resource card · 12m</span></div><span class=\"tag\">Done</span></li>\n    <li><div class=\"av t2\">JK</div><div><b>Jonas K.</b><span>Moved health checks to live · 28m</span></div><span class=\"tag\">Review</span></li>\n    <li><div class=\"av t3\">MR</div><div><b>Mei R.</b><span>Blocked on preview tokens · 41m</span></div><span class=\"tag late\">Hold</span></li>\n    <li><div class=\"av t4\">TS</div><div><b>Theo S.</b><span>Started spatial layout pass · 1h</span></div><span class=\"tag\">Active</span></li>\n  </ul>\n</body>\n</html>\n",
		swatch: [
			"#f3f6f8",
			"#1c8f8a",
			"#173040"
		]
	},
	{
		id: "helix-play",
		name: "Helix Play",
		tag: "Media",
		blurb: "Now-playing surface with queue.",
		html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Helix Play</title>\n<style>\n  :root{--bg:#10151c;--card:#1a222c;--text:#eef3f7;--muted:#8b9aaa;--accent:#3ee0c4}\n  *{box-sizing:border-box} html,body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,sans-serif}\n  body{min-height:100dvh;padding:20px 20px 32px;display:flex;flex-direction:column;gap:18px}\n  .art{height:220px;border-radius:28px;background:radial-gradient(circle at 30% 30%, #3ee0c4 0%, #1a6a9a 42%, #122033 100%);display:grid;place-items:center}\n  .art span{width:84px;height:84px;border-radius:50%;border:2px solid rgba(255,255,255,.35);display:grid;place-items:center}\n  .art i{width:0;height:0;border-left:22px solid #fff;border-top:14px solid transparent;border-bottom:14px solid transparent;margin-left:6px}\n  h1{margin:8px 0 0;font-size:26px;letter-spacing:-.03em}\n  .by{color:var(--muted);font-size:14px}\n  .time{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:8px}\n  .track{height:6px;background:#2a3440;border-radius:99px;overflow:hidden}\n  .track b{display:block;width:38%;height:100%;background:var(--accent)}\n  .controls{display:flex;justify-content:center;align-items:center;gap:22px;margin-top:8px}\n  .controls button{width:52px;height:52px;border-radius:50%;border:0;background:var(--card);color:var(--text);font-size:16px}\n  .controls .main{width:68px;height:68px;background:var(--accent);color:#04201c;font-weight:800}\n  .queue{background:var(--card);border-radius:20px;padding:8px 6px}\n  .q{display:flex;justify-content:space-between;padding:12px 12px;font-size:14px}\n  .q span{color:var(--muted);font-size:12px}\n</style>\n</head>\n<body>\n  <div class=\"art\" aria-hidden=\"true\"><span><i></i></span></div>\n  <div>\n    <div class=\"by\">Now playing</div>\n    <h1>Signal Drift</h1>\n    <div class=\"by\">Vesper Line · Spatial Mix</div>\n    <div class=\"time\"><span>1:24</span><span>3:41</span></div>\n    <div class=\"track\"><b></b></div>\n  </div>\n  <div class=\"controls\">\n    <button type=\"button\" aria-label=\"Previous\">|&#9664;</button>\n    <button class=\"main\" type=\"button\" aria-label=\"Pause\">II</button>\n    <button type=\"button\" aria-label=\"Next\">&#9654;|</button>\n  </div>\n  <div class=\"queue\">\n    <div class=\"q\">Night Circuit <span>2:58</span></div>\n    <div class=\"q\">Teal Horizon <span>4:12</span></div>\n    <div class=\"q\">Gate 812 <span>3:07</span></div>\n  </div>\n</body>\n</html>\n",
		swatch: [
			"#10151c",
			"#3ee0c4",
			"#1a222c"
		]
	},
	{
		id: "strata-hud",
		name: "Strata HUD",
		tag: "Game",
		blurb: "Spatial overlay with meters and brackets.",
		html: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Strata HUD</title>\n<style>\n  :root{--bg:#050b14;--line:#1c4a68;--text:#d9f4ff;--muted:#7ea8c0;--accent:#3ee0c4}\n  *{box-sizing:border-box} html,body{margin:0;height:100%;background:radial-gradient(800px 400px at 50% 120%, #12324a 0%, var(--bg) 55%);color:var(--text);font-family:ui-sans-serif,system-ui,sans-serif}\n  body{min-height:100dvh;padding:18px;display:grid;grid-template-rows:auto 1fr auto}\n  header,footer{display:flex;justify-content:space-between;align-items:center;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}\n  .frame{border:1px solid var(--line);border-radius:20px;display:grid;place-items:center;position:relative;overflow:hidden}\n  .frame:before,.frame:after{content:\"\";position:absolute;width:18px;height:18px;border:2px solid var(--accent)}\n  .frame:before{top:12px;left:12px;border-right:0;border-bottom:0}\n  .frame:after{bottom:12px;right:12px;border-left:0;border-top:0}\n  .core{text-align:center}\n  .core b{display:block;font-size:48px;letter-spacing:.08em;color:var(--accent)}\n  .core span{letter-spacing:.24em;text-transform:uppercase;font-size:11px;color:var(--muted)}\n  .meters{display:flex;gap:10px}\n  .m{background:rgba(14,32,48,.7);border:1px solid var(--line);border-radius:12px;padding:10px 12px;min-width:88px}\n  .m em{display:block;font-style:normal;font-size:16px;color:var(--text)}\n</style>\n</head>\n<body>\n  <header><span>Strata // HUD</span><span>Link 99.2</span></header>\n  <div class=\"frame\">\n    <div class=\"core\"><b>04:12</b><span>Objective window</span></div>\n  </div>\n  <footer>\n    <div class=\"meters\">\n      <div class=\"m\">Hull<em>86%</em></div>\n      <div class=\"m\">Heat<em>Low</em></div>\n      <div class=\"m\">Range<em>1.4km</em></div>\n    </div>\n  </footer>\n</body>\n</html>\n",
		swatch: [
			"#050b14",
			"#3ee0c4",
			"#1c4a68"
		]
	}
];
function Hub() {
	const navigate = useNavigate();
	const { pickGallery, pickCamera, runImage, input, busy } = useCapture();
	const projects = useProjectStore((s) => s.projects);
	const createFromTemplate = useProjectStore((s) => s.createFromTemplate);
	const createAndGenerate = useProjectStore((s) => s.createAndGenerate);
	const createBlank = useProjectStore((s) => s.createBlank);
	const generatingId = useProjectStore((s) => s.generatingId);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [ai, setAi] = (0, import_react.useState)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const geminiKey = useGeminiKey((s) => s.geminiKey);
	const geminiModel = useGeminiKey((s) => s.geminiModel);
	const openPanel = useGeminiKey((s) => s.openPanel);
	const target = useComposeTarget((s) => s.target);
	const setTarget = useComposeTarget((s) => s.setTarget);
	const canGenerate = Boolean(ai?.grok || ai?.geminiEnv || geminiKey);
	(0, import_react.useEffect)(() => {
		getAiStatus().then((s) => setAi({
			grok: s.grok,
			geminiEnv: s.geminiEnv,
			model: s.model
		}));
	}, []);
	(0, import_react.useEffect)(() => {
		const onPaste = (e) => {
			const file = [...e.clipboardData?.files ?? []].find((f) => f.type.startsWith("image/"));
			if (file) {
				e.preventDefault();
				runImage(file);
			}
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [runImage]);
	const openTemplate = (id) => {
		const t = TEMPLATES.find((x) => x.id === id);
		if (!t) return;
		const projectId = createFromTemplate(t.name, t.html);
		navigate({
			to: "/studio/$projectId",
			params: { projectId }
		});
	};
	const runPrompt = async () => {
		const text = prompt.trim();
		if (!text || busy) return;
		const id = await createAndGenerate({
			name: text.slice(0, 32),
			source: "prompt",
			input: {
				mode: "prompt",
				prompt: text,
				target
			}
		});
		setPrompt("");
		navigate({
			to: "/studio/$projectId",
			params: { projectId: id }
		});
	};
	const runDemo = async () => {
		if (busy) return;
		try {
			const dataUrl = await fetchAsDataUrl("/samples/ops-board.png");
			const id = await createAndGenerate({
				name: "Ops board",
				source: "image",
				sourcePreview: dataUrl,
				input: {
					mode: "image",
					imageDataUrl: dataUrl,
					target
				}
			});
			navigate({
				to: "/studio/$projectId",
				params: { projectId: id }
			});
		} catch {
			toast.error("Could not load the demo screenshot.");
		}
	};
	const lastId = projects[0]?.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "circuit-field min-h-dvh pb-28",
		children: [
			input,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudTop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-6xl px-4 py-5 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-hud text-[11px] tracking-[0.28em] text-primary uppercase",
						children: "Spatial library"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-sans text-3xl font-semibold tracking-tight text-fg",
						children: "Image to code in 30 seconds"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-muted",
						children: "Shoot a UI on Android, drop a screenshot, or open a spatial template. The workspace compiles HTML and previews it on a phone frame."
					}),
					ai && !canGenerate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-col gap-2 rounded-lg border border-border bg-surface px-3 py-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Add a Gemini API key to compile screenshots and prompts. Templates still open instantly."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "sm",
							onClick: openPanel,
							children: "Add key"
						})]
					}),
					ai && canGenerate && (geminiKey || ai.geminiEnv) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-primary",
						children: [geminiModelLabel(geminiModel === "auto" ? ai.model : geminiModel), " is ready to compose."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetSelect, {
							value: target,
							onChange: setTarget,
							showHint: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragging(true);
						},
						onDragLeave: () => setDragging(false),
						onDrop: (e) => {
							e.preventDefault();
							setDragging(false);
							const file = [...e.dataTransfer.files].find((f) => f.type.startsWith("image/"));
							if (file) runImage(file);
						},
						className: cn("mt-6 rounded-xl border border-dashed p-5 transition-[border-color,background-color] duration-150", dragging ? "border-primary bg-primary/10" : "border-border-strong bg-surface/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 lg:flex-row lg:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-14 items-center justify-center rounded-lg border border-border bg-bg-elevated text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold",
										children: "Capture a screenshot"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Camera, photos, paste, or drag. Typeless from here — no code required."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 sm:flex sm:flex-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "primary",
											onClick: pickCamera,
											disabled: busy,
											className: "col-span-2 sm:col-span-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), "Camera"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "steel",
											onClick: pickGallery,
											disabled: busy,
											children: "Photos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "steel",
											onClick: () => void runDemo(),
											disabled: busy,
											className: "col-span-2 sm:col-span-1",
											children: "Try demo"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptDock, {
								value: prompt,
								onChange: setPrompt,
								onSubmit: () => void runPrompt(),
								disabled: busy,
								placeholder: targetMeta(target).placeholder
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-sans text-lg font-semibold",
								children: "Spatial templates"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									const id = createBlank();
									navigate({
										to: "/studio/$projectId",
										params: { projectId: id }
									});
								},
								children: "Blank canvas"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openTemplate(t.id),
								className: "group rounded-xl border border-border bg-surface p-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.98]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateThumb, {
									html: t.html,
									title: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-fg",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: t.blurb
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-bg px-2 py-1 text-[10px] tracking-[0.14em] text-steel uppercase",
										children: t.tag
									})]
								})]
							}, t.id))
						})]
					}),
					projects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 font-sans text-lg font-semibold",
							children: "Recents"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: projects.slice(0, 8).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => navigate({
									to: "/studio/$projectId",
									params: { projectId: p.id }
								}),
								className: "flex w-full items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3 text-left",
								children: [p.sourcePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.sourcePreview,
									alt: "",
									className: "size-10 rounded-md object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 place-items-center rounded-md bg-bg-elevated text-primary",
									children: p.id === generatingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-semibold",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs tracking-wide text-subtle uppercase",
										children: [
											targetMeta(p.target ?? "ui").short,
											" · ",
											p.source,
											" · ",
											formatTime(p.updatedAt)
										]
									})]
								})]
							}) }, p.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomDock, {
				active: "library",
				onLibrary: () => {},
				onCapture: pickCamera,
				onWorkspace: () => {
					if (lastId) navigate({
						to: "/studio/$projectId",
						params: { projectId: lastId }
					});
					else toast.message("Open a template or capture a screen first.");
				}
			})
		]
	});
}
//#endregion
export { Hub as component };
