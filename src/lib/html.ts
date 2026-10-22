const TITLE_RE = /<!--\s*title:\s*([^>]+?)\s*-->/i;
const FENCE_RE = /```(?:html)?\s*([\s\S]*?)```/i;
const DOC_RE = /<!DOCTYPE html[\s\S]*<\/html>/i;
const HTML_RE = /<html[\s\S]*<\/html>/i;

export function extractTitle(text: string, fallback = "Untitled"): string {
  const m = text.match(TITLE_RE);
  if (!m?.[1]) return fallback;
  return m[1].replace(/\s+/g, " ").trim().slice(0, 48) || fallback;
}

export function extractHtml(text: string): string {
  const fromFence = text.match(FENCE_RE)?.[1]?.trim();
  const raw = fromFence || text.trim();
  const doc = raw.match(DOC_RE)?.[0] || raw.match(HTML_RE)?.[0];
  if (doc) return doc.trim();
  if (raw.includes("<") && raw.includes(">")) return wrapFragment(raw);
  return wrapFragment(`<p>${escapeHtml(raw)}</p>`);
}

function wrapFragment(inner: string) {
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

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    if (c === "&") return "&" + "amp;";
    if (c === "<") return "&" + "lt;";
    if (c === ">") return "&" + "gt;";
    if (c === '"') return "&" + "quot;";
    return "&#39;";
  });
}

export function isBlankHtml(html: string) {
  return html.includes("Awaiting interface");
}

export const BLANK_HTML = `<!DOCTYPE html>
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

export const GENERATING_HTML = `<!DOCTYPE html>
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

export const FAILED_HTML = `<!DOCTYPE html>
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
