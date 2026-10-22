import { create } from "zustand";
import { sanitizeGeminiKey } from "@/lib/gemini-model";

export { GEMINI_MODEL, GEMINI_MODEL_OPTIONS, geminiModelLabel, sanitizeGeminiKey } from "@/lib/gemini-model";

const KEY = "html-typeless-gemini-key-v1";
const MODEL_KEY = "html-typeless-gemini-model-v1";

export function maskGeminiKey(key: string): string {
  const t = key.trim();
  if (t.length < 8) return "••••";
  return `${t.slice(0, 4)}••••${t.slice(-4)}`;
}

function readKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}

function readModel(): string {
  if (typeof window === "undefined") return "auto";
  try {
    return localStorage.getItem(MODEL_KEY)?.trim() || "auto";
  } catch {
    return "auto";
  }
}

type Store = {
  geminiKey: string;
  geminiModel: string;
  hydrated: boolean;
  panelOpen: boolean;
  hydrate: () => void;
  setKey: (key: string) => void;
  setModel: (model: string) => void;
  clear: () => void;
  openPanel: () => void;
  closePanel: () => void;
};

export const useGeminiKey = create<Store>((set) => ({
  geminiKey: "",
  geminiModel: "auto",
  hydrated: false,
  panelOpen: false,
  hydrate: () => set({ geminiKey: readKey(), geminiModel: readModel(), hydrated: true }),
  setKey: (key) => {
    const next = sanitizeGeminiKey(key);
    try {
      if (next) localStorage.setItem(KEY, next);
      else localStorage.removeItem(KEY);
    } catch {
      /* private mode */
    }
    set({ geminiKey: next });
  },
  setModel: (model) => {
    const next = model.trim() || "auto";
    try {
      localStorage.setItem(MODEL_KEY, next);
    } catch {
      /* private mode */
    }
    set({ geminiModel: next });
  },
  clear: () => {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(MODEL_KEY);
    } catch {
      /* private mode */
    }
    set({ geminiKey: "", geminiModel: "auto" });
  },
  openPanel: () => set({ panelOpen: true }),
  closePanel: () => set({ panelOpen: false }),
}));

export function readGeminiKey(): string {
  return readKey();
}

export function readGeminiModel(): string {
  return readModel();
}
