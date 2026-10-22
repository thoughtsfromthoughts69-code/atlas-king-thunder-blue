import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{c as t,d as n,f as r,h as i,i as a,m as o,u as s,v as c,y as l}from"./gemini-key-S_giAyak.js";import{a as u,n as d,o as f,t as p,u as m}from"./store-jLl54AHF.js";import{a as h,i as g,o as _,r as v,t as y}from"./use-capture-CuBvT_E1.js";import{r as b,t as x}from"./hud-chrome-BrNBOvVt.js";var S=o(`camera`,[[`path`,{d:`M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z`,key:`1tc9qg`}],[`circle`,{cx:`12`,cy:`13`,r:`3`,key:`1vg3eu`}]]),C=o(`loader`,[[`path`,{d:`M12 2v4`,key:`3427ic`}],[`path`,{d:`m16.2 7.8 2.9-2.9`,key:`r700ao`}],[`path`,{d:`M18 12h4`,key:`wj9ykh`}],[`path`,{d:`m16.2 16.2 2.9 2.9`,key:`1bxg5t`}],[`path`,{d:`M12 18v4`,key:`jadmvz`}],[`path`,{d:`m4.9 19.1 2.9-2.9`,key:`bwix9q`}],[`path`,{d:`M2 12h4`,key:`j09sii`}],[`path`,{d:`m4.9 4.9 2.9 2.9`,key:`giyufr`}]]),w=e(l()),T=c();function E({html:e,title:t}){return(0,T.jsx)(`div`,{className:`template-thumb`,"aria-hidden":`true`,children:(0,T.jsx)(`iframe`,{title:`${t} preview`,sandbox:`allow-scripts`,srcDoc:e,tabIndex:-1})})}var D=[{id:`aperture-ops`,name:`Aperture Ops`,tag:`Dashboard`,blurb:`Status, allocations, crew, and system health.`,html:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Aperture Ops</title>
<style>
  :root { --ink:#14202b; --muted:#5d7280; --line:#e4edf2; --paper:#eef3f6; --card:#fff; --teal:#1f8a86; --teal-2:#2aa39a; --navy:#163447; --chip:#e7f6f4; }
  *{box-sizing:border-box} html,body{margin:0;background:var(--paper);color:var(--ink);font-family:ui-sans-serif,system-ui,sans-serif}
  body{padding:16px 16px 32px}
  h1{font-size:22px;margin:0 0 4px;letter-spacing:-.02em}
  .sub{color:var(--muted);font-size:13px;margin:0 0 16px}
  .grid{display:grid;gap:12px}
  .card{background:var(--card);border-radius:20px;padding:16px;box-shadow:0 1px 0 rgba(20,32,43,.04),0 10px 28px rgba(20,32,43,.06)}
  .card h2{font-size:13px;margin:0 0 12px;color:var(--navy);font-weight:650}
  .bar{height:8px;background:#e8eef2;border-radius:99px;overflow:hidden}
  .bar>i{display:block;height:100%;width:62%;background:linear-gradient(90deg,var(--teal),var(--teal-2));border-radius:99px}
  .meta{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:8px}
  .row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line)}
  .row:first-of-type{border-top:0;padding-top:0}
  .av{width:36px;height:36px;border-radius:50%;background:#d7ecea;color:var(--teal);display:grid;place-items:center;font-size:11px;font-weight:700;flex-shrink:0}
  .who{flex:1;min-width:0} .who b{display:block;font-size:13px} .who span{font-size:11px;color:var(--muted)}
  .chip{font-size:10px;padding:5px 9px;border-radius:99px;background:var(--chip);color:var(--teal);font-weight:650}
  .chip.late{background:#f8efe0;color:#9a6a22}
  .pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .donut{width:88px;height:88px;border-radius:50%;margin:0 auto 8px;position:relative}
  .d72{background:conic-gradient(var(--teal) 0 72%, #cfe3e2 72% 100%)}
  .d89{background:conic-gradient(#2c6d9a 0 89%, #d5e3ee 89% 100%)}
  .donut:after{content:attr(data-n);position:absolute;inset:18px;background:#fff;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;color:var(--navy)}
  .stat{background:#f3f7f8;border-radius:14px;padding:12px;text-align:center}
  .stat b{display:block;font-size:20px;color:var(--teal)}
  .stat span{font-size:11px;color:var(--muted)}
  svg.spark{width:100%;height:92px;display:block}
  .health{margin:0;padding:0}
  .health li{list-style:none;display:flex;justify-content:space-between;padding:8px 0;font-size:13px;border-bottom:1px solid var(--line)}
  .dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px}
  .ok{background:#2aa39a} .warn{background:#d39b3a}
  .navy{background:var(--navy);color:#eef6fa;border-radius:20px;padding:16px}
  .navy h2{color:#c5e4e0}
  .navy .row{border-top-color:#2b4b5c}
  .navy .who span{color:#8fb0bc}
  @media(min-width:720px){
    .grid{grid-template-columns:repeat(2,1fr)}
    .span{grid-column:1/-1}
    body{padding:28px}
  }
</style>
</head>
<body>
  <h1>Aperture Ops</h1>
  <p class="sub">Project status · live resource view</p>
  <div class="grid">
    <section class="card span">
      <h2>Project Status</h2>
      <div class="bar"><i></i></div>
      <div class="meta"><span>Progress starting</span><span>62% to 80%</span></div>
    </section>
    <section class="card">
      <h2>Resource Allocations</h2>
      <div class="pair">
        <div><div class="donut d72" data-n="72%"></div><div class="stat"><b>Design</b><span>Crew load</span></div></div>
        <div><div class="donut d89" data-n="89%"></div><div class="stat"><b>Build</b><span>Pipeline</span></div></div>
      </div>
    </section>
    <section class="card">
      <h2>Team Activity</h2>
      <div class="row"><div class="av">PL</div><div class="who"><b>Priya Loan</b><span>Status updated · 12m</span></div><span class="chip">Active</span></div>
      <div class="row"><div class="av">SS</div><div class="who"><b>Shina Smith</b><span>Completed · 2h</span></div><span class="chip">Done</span></div>
      <div class="row"><div class="av">MR</div><div class="who"><b>Mei R.</b><span>Hold on tokens · 41m</span></div><span class="chip late">Hold</span></div>
    </section>
    <section class="card span">
      <h2>Performance Analytics</h2>
      <svg class="spark" viewBox="0 0 300 92" preserveAspectRatio="none" aria-hidden="true">
        <polyline fill="none" stroke="#c5d5dc" stroke-width="2" points="0,64 50,56 100,62 150,44 200,50 250,32 300,38"/>
        <polyline fill="none" stroke="#1f8a86" stroke-width="2.5" points="0,74 50,66 100,52 150,54 200,36 250,40 300,22"/>
      </svg>
      <div class="meta"><span>Jan</span><span>Apr · 75% trend</span></div>
    </section>
    <section class="card">
      <h2>System Health</h2>
      <ul class="health">
        <li><span><i class="dot ok"></i>API gateway</span><span>99.9%</span></li>
        <li><span><i class="dot ok"></i>Build workers</span><span>Stable</span></li>
        <li><span><i class="dot warn"></i>Preview cache</span><span>Warming</span></li>
      </ul>
    </section>
    <section class="navy">
      <h2>Notifications</h2>
      <div class="row"><div class="av">N</div><div class="who"><b>Preview ready</b><span>Ops board compiled</span></div></div>
      <div class="row"><div class="av">A</div><div class="who"><b>Allocations</b><span>Design load +4%</span></div></div>
    </section>
  </div>
</body>
</html>
`,swatch:[`#f5f8fa`,`#1f8a86`,`#163447`]},{id:`night-gate`,name:`Night Gate`,tag:`Auth`,blurb:`Dark access panel with HUD framing.`,html:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Night Gate</title>
<style>
  :root{--bg:#070f1c;--panel:#0d1a2e;--line:#1d3654;--text:#e7f3ff;--muted:#86a0b8;--accent:#3ee0c4}
  *{box-sizing:border-box} html,body{margin:0;height:100%;background:radial-gradient(1200px 600px at 80% -10%, #123056 0%, var(--bg) 55%);color:var(--text);font-family:ui-sans-serif,system-ui,sans-serif}
  body{min-height:100dvh;display:grid;place-items:center;padding:24px}
  .panel{width:min(100%,400px);background:color-mix(in oklab, var(--panel) 88%, transparent);border:1px solid var(--line);border-radius:24px;padding:28px 24px 24px}
  .kicker{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin:0 0 10px}
  h1{margin:0 0 8px;font-size:28px;letter-spacing:-.03em}
  p{margin:0 0 22px;color:var(--muted);font-size:14px;line-height:1.5}
  label{display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:0 0 6px}
  input{width:100%;height:48px;border-radius:12px;border:1px solid var(--line);background:#081525;color:var(--text);padding:0 14px;margin-bottom:14px;font-size:16px}
  input:focus{outline:2px solid color-mix(in oklab, var(--accent) 50%, transparent);border-color:var(--accent)}
  button{width:100%;height:52px;border:0;border-radius:14px;background:var(--accent);color:#04201c;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:14px}
  .row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin:12px 2px 0}
  a{color:var(--accent);text-decoration:none}
</style>
</head>
<body>
  <form class="panel" onsubmit="event.preventDefault()">
    <p class="kicker">Access node 812</p>
    <h1>Night Gate</h1>
    <p>Sign in to the spatial workspace. Sessions persist on this device.</p>
    <label for="email">Email</label>
    <input id="email" type="email" autocomplete="username" placeholder="you@studio.io" value="ada@aperture.io"/>
    <label for="pw">Passphrase</label>
    <input id="pw" type="password" autocomplete="current-password" placeholder="••••••••" value="••••••••"/>
    <button type="submit">Enter workspace</button>
    <div class="row"><span>SSO available</span><a href="#">Recover access</a></div>
  </form>
</body>
</html>
`,swatch:[`#070f1c`,`#3ee0c4`,`#1d3654`]},{id:`crew-pulse`,name:`Crew Pulse`,tag:`Activity`,blurb:`Team feed with status chips and filters.`,html:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Crew Pulse</title>
<style>
  :root{--bg:#f3f6f8;--card:#fff;--ink:#173040;--muted:#617888;--teal:#1c8f8a;--line:#e6eef2}
  *{box-sizing:border-box} html,body{margin:0;background:var(--bg);color:var(--ink);font-family:ui-sans-serif,system-ui,sans-serif}
  header{padding:20px 18px 8px;display:flex;justify-content:space-between;align-items:end}
  h1{margin:0;font-size:24px;letter-spacing:-.03em} .sub{color:var(--muted);font-size:13px}
  .chips{display:flex;gap:8px;padding:12px 18px 4px;overflow:auto}
  .chips button{border:0;background:#fff;border-radius:999px;padding:8px 14px;font-size:13px;color:var(--muted);min-height:40px}
  .chips .on{background:#163447;color:#fff}
  ul{list-style:none;margin:8px 16px 24px;padding:0;display:grid;gap:10px}
  li{background:var(--card);border-radius:18px;padding:14px;display:flex;gap:12px;align-items:center;box-shadow:0 8px 24px rgba(23,48,64,.04)}
  .av{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;font-weight:700;color:#fff;flex-shrink:0}
  .t1{background:#1c8f8a} .t2{background:#2c6d9a} .t3{background:#345c78} .t4{background:#0f3a48}
  b{display:block;font-size:15px} span{font-size:12px;color:var(--muted)}
  .tag{margin-left:auto;font-size:11px;padding:6px 10px;border-radius:999px;background:#e7f4f3;color:var(--teal);font-weight:650}
  .late{background:#f8efe0;color:#9a6a22}
</style>
</head>
<body>
  <header>
    <div><h1>Crew Pulse</h1><div class="sub">4 updates in the last hour</div></div>
  </header>
  <div class="chips">
    <button class="on">All</button>
    <button>Design</button>
    <button>Build</button>
    <button>Review</button>
  </div>
  <ul>
    <li><div class="av t1">AL</div><div><b>Amina L.</b><span>Shipped the resource card · 12m</span></div><span class="tag">Done</span></li>
    <li><div class="av t2">JK</div><div><b>Jonas K.</b><span>Moved health checks to live · 28m</span></div><span class="tag">Review</span></li>
    <li><div class="av t3">MR</div><div><b>Mei R.</b><span>Blocked on preview tokens · 41m</span></div><span class="tag late">Hold</span></li>
    <li><div class="av t4">TS</div><div><b>Theo S.</b><span>Started spatial layout pass · 1h</span></div><span class="tag">Active</span></li>
  </ul>
</body>
</html>
`,swatch:[`#f3f6f8`,`#1c8f8a`,`#173040`]},{id:`helix-play`,name:`Helix Play`,tag:`Media`,blurb:`Now-playing surface with queue.`,html:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Helix Play</title>
<style>
  :root{--bg:#10151c;--card:#1a222c;--text:#eef3f7;--muted:#8b9aaa;--accent:#3ee0c4}
  *{box-sizing:border-box} html,body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,sans-serif}
  body{min-height:100dvh;padding:20px 20px 32px;display:flex;flex-direction:column;gap:18px}
  .art{height:220px;border-radius:28px;background:radial-gradient(circle at 30% 30%, #3ee0c4 0%, #1a6a9a 42%, #122033 100%);display:grid;place-items:center}
  .art span{width:84px;height:84px;border-radius:50%;border:2px solid rgba(255,255,255,.35);display:grid;place-items:center}
  .art i{width:0;height:0;border-left:22px solid #fff;border-top:14px solid transparent;border-bottom:14px solid transparent;margin-left:6px}
  h1{margin:8px 0 0;font-size:26px;letter-spacing:-.03em}
  .by{color:var(--muted);font-size:14px}
  .time{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:8px}
  .track{height:6px;background:#2a3440;border-radius:99px;overflow:hidden}
  .track b{display:block;width:38%;height:100%;background:var(--accent)}
  .controls{display:flex;justify-content:center;align-items:center;gap:22px;margin-top:8px}
  .controls button{width:52px;height:52px;border-radius:50%;border:0;background:var(--card);color:var(--text);font-size:16px}
  .controls .main{width:68px;height:68px;background:var(--accent);color:#04201c;font-weight:800}
  .queue{background:var(--card);border-radius:20px;padding:8px 6px}
  .q{display:flex;justify-content:space-between;padding:12px 12px;font-size:14px}
  .q span{color:var(--muted);font-size:12px}
</style>
</head>
<body>
  <div class="art" aria-hidden="true"><span><i></i></span></div>
  <div>
    <div class="by">Now playing</div>
    <h1>Signal Drift</h1>
    <div class="by">Vesper Line · Spatial Mix</div>
    <div class="time"><span>1:24</span><span>3:41</span></div>
    <div class="track"><b></b></div>
  </div>
  <div class="controls">
    <button type="button" aria-label="Previous">|&#9664;</button>
    <button class="main" type="button" aria-label="Pause">II</button>
    <button type="button" aria-label="Next">&#9654;|</button>
  </div>
  <div class="queue">
    <div class="q">Night Circuit <span>2:58</span></div>
    <div class="q">Teal Horizon <span>4:12</span></div>
    <div class="q">Gate 812 <span>3:07</span></div>
  </div>
</body>
</html>
`,swatch:[`#10151c`,`#3ee0c4`,`#1a222c`]},{id:`strata-hud`,name:`Strata HUD`,tag:`Game`,blurb:`Spatial overlay with meters and brackets.`,html:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Strata HUD</title>
<style>
  :root{--bg:#050b14;--line:#1c4a68;--text:#d9f4ff;--muted:#7ea8c0;--accent:#3ee0c4}
  *{box-sizing:border-box} html,body{margin:0;height:100%;background:radial-gradient(800px 400px at 50% 120%, #12324a 0%, var(--bg) 55%);color:var(--text);font-family:ui-sans-serif,system-ui,sans-serif}
  body{min-height:100dvh;padding:18px;display:grid;grid-template-rows:auto 1fr auto}
  header,footer{display:flex;justify-content:space-between;align-items:center;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .frame{border:1px solid var(--line);border-radius:20px;display:grid;place-items:center;position:relative;overflow:hidden}
  .frame:before,.frame:after{content:"";position:absolute;width:18px;height:18px;border:2px solid var(--accent)}
  .frame:before{top:12px;left:12px;border-right:0;border-bottom:0}
  .frame:after{bottom:12px;right:12px;border-left:0;border-top:0}
  .core{text-align:center}
  .core b{display:block;font-size:48px;letter-spacing:.08em;color:var(--accent)}
  .core span{letter-spacing:.24em;text-transform:uppercase;font-size:11px;color:var(--muted)}
  .meters{display:flex;gap:10px}
  .m{background:rgba(14,32,48,.7);border:1px solid var(--line);border-radius:12px;padding:10px 12px;min-width:88px}
  .m em{display:block;font-style:normal;font-size:16px;color:var(--text)}
</style>
</head>
<body>
  <header><span>Strata // HUD</span><span>Link 99.2</span></header>
  <div class="frame">
    <div class="core"><b>04:12</b><span>Objective window</span></div>
  </div>
  <footer>
    <div class="meters">
      <div class="m">Hull<em>86%</em></div>
      <div class="m">Heat<em>Low</em></div>
      <div class="m">Range<em>1.4km</em></div>
    </div>
  </footer>
</body>
</html>
`,swatch:[`#050b14`,`#3ee0c4`,`#1c4a68`]}];function O(){let e=i(),{pickGallery:o,pickCamera:c,runImage:l,input:O,busy:k}=y(),A=p(e=>e.projects),j=p(e=>e.createFromTemplate),M=p(e=>e.createAndGenerate),N=p(e=>e.createBlank),P=p(e=>e.generatingId),[F,I]=(0,w.useState)(``),[L,R]=(0,w.useState)(null),[z,B]=(0,w.useState)(!1),V=a(e=>e.geminiKey),H=a(e=>e.geminiModel),U=a(e=>e.openPanel),W=f(e=>e.target),G=f(e=>e.setTarget),K=!!(L?.grok||L?.geminiEnv||V);(0,w.useEffect)(()=>{d().then(e=>R({grok:e.grok,geminiEnv:e.geminiEnv,model:e.model}))},[]),(0,w.useEffect)(()=>{let e=e=>{let t=[...e.clipboardData?.files??[]].find(e=>e.type.startsWith(`image/`));t&&(e.preventDefault(),l(t))};return window.addEventListener(`paste`,e),()=>window.removeEventListener(`paste`,e)},[l]);let q=t=>{let n=D.find(e=>e.id===t);if(!n)return;let r=j(n.name,n.html);e({to:`/studio/$projectId`,params:{projectId:r}})},J=async()=>{let t=F.trim();if(!t||k)return;let n=await M({name:t.slice(0,32),source:`prompt`,input:{mode:`prompt`,prompt:t,target:W}});I(``),e({to:`/studio/$projectId`,params:{projectId:n}})},Y=async()=>{if(!k)try{let t=await v(`/samples/ops-board.png`),n=await M({name:`Ops board`,source:`image`,sourcePreview:t,input:{mode:`image`,imageDataUrl:t,target:W}});e({to:`/studio/$projectId`,params:{projectId:n}})}catch{m.error(`Could not load the demo screenshot.`)}},X=A[0]?.id;return(0,T.jsxs)(`div`,{className:`circuit-field min-h-dvh pb-28`,children:[O,(0,T.jsx)(b,{}),(0,T.jsxs)(`div`,{className:`mx-auto w-full max-w-6xl px-4 py-5 sm:px-8`,children:[(0,T.jsx)(`p`,{className:`font-hud text-[11px] tracking-[0.28em] text-primary uppercase`,children:`Spatial library`}),(0,T.jsx)(`h1`,{className:`mt-1 font-sans text-3xl font-semibold tracking-tight text-fg`,children:`Image to code in 30 seconds`}),(0,T.jsx)(`p`,{className:`mt-2 max-w-xl text-muted`,children:`Shoot a UI on Android, drop a screenshot, or open a spatial template. The workspace compiles HTML and previews it on a phone frame.`}),L&&!K&&(0,T.jsxs)(`div`,{className:`mt-3 flex flex-col gap-2 rounded-lg border border-border bg-surface px-3 py-3 sm:flex-row sm:items-center sm:justify-between`,children:[(0,T.jsx)(`p`,{className:`text-sm text-muted`,children:`Add a Gemini API key to compile screenshots and prompts. Templates still open instantly.`}),(0,T.jsx)(s,{variant:`primary`,size:`sm`,onClick:U,children:`Add key`})]}),L&&K&&(V||L.geminiEnv)&&(0,T.jsxs)(`p`,{className:`mt-3 text-sm text-primary`,children:[t(H===`auto`?L.model:H),` is ready to compose.`]}),(0,T.jsx)(`div`,{className:`mt-5 max-w-xl`,children:(0,T.jsx)(g,{value:W,onChange:G,showHint:!0})}),(0,T.jsxs)(`section`,{onDragOver:e=>{e.preventDefault(),B(!0)},onDragLeave:()=>B(!1),onDrop:e=>{e.preventDefault(),B(!1);let t=[...e.dataTransfer.files].find(e=>e.type.startsWith(`image/`));t&&l(t)},className:n(`mt-6 rounded-xl border border-dashed p-5 transition-[border-color,background-color] duration-150`,z?`border-primary bg-primary/10`:`border-border-strong bg-surface/60`),children:[(0,T.jsxs)(`div`,{className:`flex flex-col gap-4 lg:flex-row lg:items-center`,children:[(0,T.jsx)(`div`,{className:`flex size-14 items-center justify-center rounded-lg border border-border bg-bg-elevated text-primary`,children:(0,T.jsx)(_,{className:`size-6`})}),(0,T.jsxs)(`div`,{className:`flex-1`,children:[(0,T.jsx)(`h2`,{className:`text-lg font-semibold`,children:`Capture a screenshot`}),(0,T.jsx)(`p`,{className:`text-sm text-muted`,children:`Camera, photos, paste, or drag. Typeless from here — no code required.`})]}),(0,T.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 sm:flex sm:flex-row`,children:[(0,T.jsxs)(s,{variant:`primary`,onClick:c,disabled:k,className:`col-span-2 sm:col-span-1`,children:[(0,T.jsx)(S,{className:`size-4`}),`Camera`]}),(0,T.jsx)(s,{variant:`steel`,onClick:o,disabled:k,children:`Photos`}),(0,T.jsx)(s,{variant:`steel`,onClick:()=>void Y(),disabled:k,className:`col-span-2 sm:col-span-1`,children:`Try demo`})]})]}),(0,T.jsx)(`div`,{className:`mt-4`,children:(0,T.jsx)(h,{value:F,onChange:I,onSubmit:()=>void J(),disabled:k,placeholder:u(W).placeholder})})]}),(0,T.jsxs)(`section`,{className:`mt-8`,children:[(0,T.jsxs)(`div`,{className:`mb-3 flex items-end justify-between`,children:[(0,T.jsx)(`h2`,{className:`font-sans text-lg font-semibold`,children:`Spatial templates`}),(0,T.jsx)(s,{variant:`ghost`,size:`sm`,onClick:()=>{let t=N();e({to:`/studio/$projectId`,params:{projectId:t}})},children:`Blank canvas`})]}),(0,T.jsx)(`div`,{className:`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3`,children:D.map(e=>(0,T.jsxs)(`button`,{type:`button`,onClick:()=>q(e.id),className:`group rounded-xl border border-border bg-surface p-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.98]`,children:[(0,T.jsx)(E,{html:e.html,title:e.name}),(0,T.jsxs)(`div`,{className:`mt-3 flex items-start justify-between gap-2`,children:[(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`p`,{className:`font-semibold text-fg`,children:e.name}),(0,T.jsx)(`p`,{className:`text-sm text-muted`,children:e.blurb})]}),(0,T.jsx)(`span`,{className:`rounded-full bg-bg px-2 py-1 text-[10px] tracking-[0.14em] text-steel uppercase`,children:e.tag})]})]},e.id))})]}),A.length>0&&(0,T.jsxs)(`section`,{className:`mt-8`,children:[(0,T.jsx)(`h2`,{className:`mb-3 font-sans text-lg font-semibold`,children:`Recents`}),(0,T.jsx)(`ul`,{className:`grid gap-2`,children:A.slice(0,8).map(t=>(0,T.jsx)(`li`,{children:(0,T.jsxs)(`button`,{type:`button`,onClick:()=>e({to:`/studio/$projectId`,params:{projectId:t.id}}),className:`flex w-full items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3 text-left`,children:[t.sourcePreview?(0,T.jsx)(`img`,{src:t.sourcePreview,alt:``,className:`size-10 rounded-md object-cover`}):(0,T.jsx)(`span`,{className:`grid size-10 place-items-center rounded-md bg-bg-elevated text-primary`,children:t.id===P?(0,T.jsx)(C,{className:`size-4 animate-spin`}):(0,T.jsx)(_,{className:`size-4`})}),(0,T.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,T.jsx)(`span`,{className:`block truncate font-semibold`,children:t.name}),(0,T.jsxs)(`span`,{className:`text-xs tracking-wide text-subtle uppercase`,children:[u(t.target??`ui`).short,` · `,t.source,` · `,r(t.updatedAt)]})]})]})},t.id))})]})]}),(0,T.jsx)(x,{active:`library`,onLibrary:()=>{},onCapture:c,onWorkspace:()=>{X?e({to:`/studio/$projectId`,params:{projectId:X}}):m.message(`Open a template or capture a screen first.`)}})]})}export{O as component};