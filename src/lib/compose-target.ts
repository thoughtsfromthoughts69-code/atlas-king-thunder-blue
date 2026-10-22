import { create } from "zustand";

export type ComposeTarget = "ui" | "cnc" | "mindmap";

export const COMPOSE_TARGETS: {
  id: ComposeTarget;
  label: string;
  short: string;
  hint: string;
  placeholder: string;
}[] = [
  {
    id: "ui",
    label: "AAA UI",
    short: "UI",
    hint: "Shipped-grade interfaces",
    placeholder: "Describe an interface — no typing in code required",
  },
  {
    id: "cnc",
    label: "CNC 3D",
    short: "CNC",
    hint: "Milled procedural models",
    placeholder: "Name a part, vehicle, or environment to mill…",
  },
  {
    id: "mindmap",
    label: "Mind map",
    short: "MAP",
    hint: "Expand one word into a build",
    placeholder: "One word or phrase to expand into an app, game, or model…",
  },
];

const KEY = "html-typeless-target-v1";

export function isComposeTarget(value: unknown): value is ComposeTarget {
  return value === "ui" || value === "cnc" || value === "mindmap";
}

export function targetMeta(id: ComposeTarget) {
  return COMPOSE_TARGETS.find((t) => t.id === id) ?? COMPOSE_TARGETS[0];
}

function readTarget(): ComposeTarget {
  if (typeof window === "undefined") return "ui";
  try {
    const raw = localStorage.getItem(KEY);
    return isComposeTarget(raw) ? raw : "ui";
  } catch {
    return "ui";
  }
}

type Store = {
  target: ComposeTarget;
  hydrated: boolean;
  hydrate: () => void;
  setTarget: (target: ComposeTarget) => void;
};

export const useComposeTarget = create<Store>((set) => ({
  target: "ui",
  hydrated: false,
  hydrate: () => set({ target: readTarget(), hydrated: true }),
  setTarget: (target) => {
    try {
      localStorage.setItem(KEY, target);
    } catch {
      /* private mode */
    }
    set({ target });
  },
}));

export function readComposeTarget(): ComposeTarget {
  return readTarget();
}

const SHARED_OUTPUT = `Output rules:
1. First line exactly: <!-- title: 2-4 word name -->
2. Then a complete HTML5 document starting with <!DOCTYPE html>
3. No markdown, no fences, no commentary
4. Inline CSS in <style>. Google Fonts <link> is allowed.
5. Must look finished at 390px wide and scale up to desktop.
6. Semantic HTML, visible labels, tap targets ≥44px.
7. If refining, apply the change and return the full updated document.`;

export function systemFor(target: ComposeTarget): string {
  if (target === "cnc") {
    return `You are a procedural 3D machinist inside HTML TYPELESS IDE.
Turn a screenshot or a short brief into one self-contained AAA CNC-milled 3D model or environment in the browser.

${SHARED_OUTPUT}
8. Load Three.js from exactly: https://unpkg.com/three@0.160.0/build/three.min.js as a classic <script src>. No import maps, no examples/jsm, no other libraries.
9. Write orbit yourself: pointer-drag rotate, wheel zoom, touch one-finger rotate and pinch zoom. Start the camera on a 3/4 product view.
10. Geometry is 100% procedural (Box, Cylinder, Lathe, Extrude, CSG-like stacking). No GLTF, no images as meshes, no placeholders.
11. Visual language: CNC mill, not a toy. Anodized aluminum, toolpath grooves, ball-nose fillets, chamfers, vises or a T-slot table, brushed metal, cool shop lighting. Dark mill-bay environment.
12. Animate a slow idle turn or mill-head motion. Handle resize. RequestAnimationFrame. Full viewport canvas.
13. If an image is provided, mill that object or environment, not a generic cube.
14. If the brief is an environment (hangar, gate, arena), mill the space as architectural CNC massing with walkable scale.`;
  }
  if (target === "mindmap") {
    return `You are a systems designer inside HTML TYPELESS IDE.
Expand one word or a short phrase into an interactive mind map for building an app, a game, or a 3D model.

${SHARED_OUTPUT}
5. Center node is the seed. First ring is App, Game, and Model unless the seed is clearly only one of those — then deepen that branch.
6. At least 12 nodes across 3 depths: product surfaces, systems, screens or mechanics, and assets.
7. SVG or HTML with bezier links. HUD chrome, dark spatial field, cyan/steel accents. No emoji. No lorem.
8. Click/tap a node to expand or collapse children. Selected node shows a one-line build note.
9. Layout must work at 390px (pan + pinch or overflow scroll) and on desktop.
10. Use the screenshot only as a seed if provided; the map is the product, not a recreation of the screenshot.
11. Copy must be specific and buildable (named screens, systems, materials), not vague strategy talk.`;
  }
  return `You are a AAA product designer and UI engineer inside HTML TYPELESS IDE.
Turn a screenshot or a short brief into one self-contained, shipped-grade web interface.

${SHARED_OUTPUT}
8. Recreate layout, color, type, spacing, and hierarchy faithfully when a screenshot is given.
9. Use believable product copy, not lorem ipsum. No emoji.
10. AAA bar: cinematic but restrained lighting, real hierarchy, density of a shipped app (Linear / Stripe / Apple), not a template dashboard.
11. Inline all CSS in <style>. No external JS libraries. Micro-interactions via CSS.`;
}

export function userTextFor(
  target: ComposeTarget,
  mode: "image" | "prompt" | "refine",
  prompt?: string,
  html?: string,
): string {
  const note = prompt?.trim();
  if (mode === "refine") {
    return `Keep this as a ${targetMeta(target).label} output. Apply this change:\n${note || "Polish the visual design."}\n\nExisting document:\n${(html ?? "").slice(0, 80000)}`;
  }
  if (target === "cnc") {
    if (mode === "image") {
      return note || "Mill this screenshot as a pixel-faithful CNC-grade procedural 3D model or environment. Match silhouette, parts, and materials.";
    }
    return note || "Mill a hero CNC-machined device on a T-slot table with vises, toolpath grooves, and shop lighting.";
  }
  if (target === "mindmap") {
    if (mode === "image") {
      return note || "Read the screenshot, extract the core product word, and expand it into a mind map for building the app, game, or model.";
    }
    return note || "Expand the seed 'Aperture' into a mind map for an app, a game, and a 3D model.";
  }
  if (mode === "image") {
    return note || "Recreate this UI screenshot as a pixel-faithful, AAA production HTML page. Match structure, colors, type, cards, charts, and spacing.";
  }
  return note || "Design a polished mobile dashboard with status cards and a clear primary action.";
}
