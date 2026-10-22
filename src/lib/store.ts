import { create, type StoreApi } from "zustand";
import { type ComposeTarget, isComposeTarget, readComposeTarget } from "@/lib/compose-target";
import { composeUi, type ComposeInput } from "@/lib/generate";
import { readGeminiKey, readGeminiModel } from "@/lib/gemini-key";
import { BLANK_HTML, FAILED_HTML, GENERATING_HTML } from "@/lib/html";
import { uid } from "@/lib/utils";

export type ProjectSource = "image" | "prompt" | "template" | "blank";

export type Project = {
  id: string;
  name: string;
  html: string;
  source: ProjectSource;
  sourcePreview?: string;
  target?: ComposeTarget;
  createdAt: number;
  updatedAt: number;
};

type Store = {
  projects: Project[];
  hydrated: boolean;
  generatingId: string | null;
  generatingStartedAt: number | null;
  lastError: string | null;
  hydrate: () => void;
  persist: () => void;
  createBlank: () => string;
  createFromTemplate: (name: string, html: string) => string;
  createAndGenerate: (opts: {
    name: string;
    source: ProjectSource;
    sourcePreview?: string;
    input: ComposeInput;
  }) => Promise<string>;
  refine: (id: string, prompt: string) => Promise<void>;
  generateOn: (id: string, input: ComposeInput) => Promise<void>;
  updateHtml: (id: string, html: string) => void;
  rename: (id: string, name: string) => void;
  setTarget: (id: string, target: ComposeTarget) => void;
  remove: (id: string) => void;
  get: (id: string) => Project | undefined;
  clearError: () => void;
};

const KEY = "html-typeless-projects-v1";

function readStorage(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Project[];
    return Array.isArray(parsed)
      ? parsed.map((p) => ({ ...p, target: isComposeTarget(p.target) ? p.target : "ui" }))
      : [];
  } catch {
    return [];
  }
}

export const useProjectStore = create<Store>((set, get) => ({
  projects: [],
  hydrated: false,
  generatingId: null,
  generatingStartedAt: null,
  lastError: null,

  hydrate: () => {
    if (get().hydrated) return;
    set({ projects: readStorage(), hydrated: true });
  },

  persist: () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(get().projects));
  },

  get: (id) => get().projects.find((p) => p.id === id),
  clearError: () => set({ lastError: null }),

  createBlank: () => {
    const now = Date.now();
    const project: Project = {
      id: uid(),
      name: "Untitled",
      html: BLANK_HTML,
      source: "blank",
      target: readComposeTarget(),
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ projects: [project, ...s.projects] }));
    get().persist();
    return project.id;
  },

  createFromTemplate: (name, html) => {
    const now = Date.now();
    const project: Project = {
      id: uid(),
      name,
      html,
      source: "template",
      target: "ui",
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ projects: [project, ...s.projects] }));
    get().persist();
    return project.id;
  },

  createAndGenerate: async ({ name, source, sourcePreview, input }) => {
    const now = Date.now();
    const target = isComposeTarget(input.target) ? input.target : readComposeTarget();
    const project: Project = {
      id: uid(),
      name,
      html: GENERATING_HTML,
      source,
      sourcePreview,
      target,
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({
      projects: [project, ...s.projects],
      generatingId: project.id,
      generatingStartedAt: now,
      lastError: null,
    }));
    get().persist();
    void finishGeneration(set, get, project.id, { ...input, target }, true);
    return project.id;
  },

  refine: async (id, prompt) => {
    const project = get().projects.find((p) => p.id === id);
    if (!project || get().generatingId) return;
    await finishGeneration(
      set,
      get,
      id,
      { mode: "refine", prompt, html: project.html, target: project.target ?? readComposeTarget() },
      false,
    );
  },

  generateOn: async (id, input) => {
    if (get().generatingId) return;
    const target = isComposeTarget(input.target) ? input.target : get().projects.find((p) => p.id === id)?.target;
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              html: GENERATING_HTML,
              sourcePreview: input.imageDataUrl ?? p.sourcePreview,
              target: target ?? p.target,
              updatedAt: Date.now(),
            }
          : p,
      ),
    }));
    get().persist();
    await finishGeneration(set, get, id, { ...input, target }, true);
  },

  updateHtml: (id, html) => {
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, html, updatedAt: Date.now() } : p,
      ),
    }));
    get().persist();
  },

  setTarget: (id, target) => {
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, target, updatedAt: Date.now() } : p,
      ),
    }));
    get().persist();
  },

  rename: (id, name) => {
    const trimmed = name.trim().slice(0, 48) || "Untitled";
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, name: trimmed, updatedAt: Date.now() } : p,
      ),
    }));
    get().persist();
  },

  remove: (id) => {
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
    get().persist();
  },
}));

type SetFn = StoreApi<Store>["setState"];
type GetFn = StoreApi<Store>["getState"];

async function finishGeneration(
  set: SetFn,
  get: GetFn,
  id: string,
  input: ComposeInput,
  updateTitle: boolean,
) {
  set({ generatingId: id, generatingStartedAt: Date.now(), lastError: null });
  try {
    const result = await composeUi({
      data: {
        ...input,
        geminiKey: readGeminiKey() || undefined,
        geminiModel: readGeminiModel() || undefined,
        target: isComposeTarget(input.target) ? input.target : get().projects.find((p) => p.id === id)?.target ?? readComposeTarget(),
      },
    });
    if (!result.ok) {
      set((s) => ({
        lastError: result.error,
        generatingId: null,
        generatingStartedAt: null,
        projects: s.projects.map((p) =>
          p.id === id ? { ...p, html: FAILED_HTML, updatedAt: Date.now() } : p,
        ),
      }));
      get().persist();
      return;
    }
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              html: result.html,
              name: updateTitle ? result.title || p.name : p.name,
              target: isComposeTarget(input.target) ? input.target : p.target,
              updatedAt: Date.now(),
            }
          : p,
      ),
      generatingId: null,
      generatingStartedAt: null,
      lastError: null,
    }));
    get().persist();
  } catch (err) {
    set((s) => ({
      lastError: err instanceof Error ? err.message : "Generation failed",
      generatingId: null,
      generatingStartedAt: null,
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, html: FAILED_HTML, updatedAt: Date.now() } : p,
      ),
    }));
    get().persist();
  }
}
