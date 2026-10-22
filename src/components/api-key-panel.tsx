import { KeyRound, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { verifyGeminiKey } from "@/lib/gemini";
import {
  GEMINI_MODEL,
  GEMINI_MODEL_OPTIONS,
  geminiModelLabel,
  maskGeminiKey,
  sanitizeGeminiKey,
  useGeminiKey,
} from "@/lib/gemini-key";

export function ApiKeyPanel() {
  const open = useGeminiKey((s) => s.panelOpen);
  const close = useGeminiKey((s) => s.closePanel);
  const stored = useGeminiKey((s) => s.geminiKey);
  const storedModel = useGeminiKey((s) => s.geminiModel);
  const setKey = useGeminiKey((s) => s.setKey);
  const setModel = useGeminiKey((s) => s.setModel);
  const clear = useGeminiKey((s) => s.clear);
  const [draft, setDraft] = useState("");
  const [draftModel, setDraftModel] = useState("auto");
  const [busy, setBusy] = useState(false);
  const inputId = useId();
  const modelId = useId();

  useEffect(() => {
    if (!open) return;
    setDraft("");
    setDraftModel(storedModel || "auto");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, storedModel]);

  if (!open) return null;

  const connect = async () => {
    const key = sanitizeGeminiKey(draft) || stored;
    if (!key) {
      toast.error("Paste a Gemini API key first.");
      return;
    }
    setBusy(true);
    try {
      const result = await verifyGeminiKey({ data: { key, model: draftModel } });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setKey(key);
      setModel(draftModel === "auto" ? "auto" : result.model);
      setDraft("");
      toast.success(`${geminiModelLabel(result.model)} connected`);
      close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not verify that key.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-end p-3 sm:place-items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-bg/70"
        aria-label="Close settings"
        onClick={close}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="gemini-key-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-border)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-hud text-[11px] tracking-[0.22em] text-primary uppercase">Automation</p>
            <h2 id="gemini-key-title" className="mt-1 font-sans text-xl font-semibold">
              Gemini API key
            </h2>
          </div>
          <Button variant="ghost" size="icon" aria-label="Close" onClick={close}>
            <X className="size-4" />
          </Button>
        </div>
        <p className="mt-2 text-sm text-muted">
          Image-to-code uses the latest Gemini model ({GEMINI_MODEL}). The key stays on this device and is sent only when you generate.
        </p>
        {stored ? (
          <p className="mt-3 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-primary">
            Connected · {maskGeminiKey(stored)} · {geminiModelLabel(storedModel)}
          </p>
        ) : (
          <p className="mt-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted">
            No personal key saved.
          </p>
        )}
        <label htmlFor={inputId} className="mt-4 block text-sm font-semibold text-fg">
          API key
        </label>
        <input
          id={inputId}
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={draft}
          disabled={busy}
          placeholder="AIza…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void connect();
          }}
          className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 font-mono text-sm text-fg outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/70"
        />
        <label htmlFor={modelId} className="mt-4 block text-sm font-semibold text-fg">
          Model
        </label>
        <select
          id={modelId}
          value={draftModel}
          disabled={busy}
          onChange={(e) => setDraftModel(e.target.value)}
          className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 font-mono text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        >
          {GEMINI_MODEL_OPTIONS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
              {m.id === GEMINI_MODEL ? " · latest" : ""}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-subtle">
          Create a key in{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-steel underline-offset-2 hover:underline"
          >
            Google AI Studio
          </a>
          . Connect checks the key against live Gemini models.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button variant="primary" className="flex-1" disabled={busy} onClick={() => void connect()}>
            <KeyRound className="size-4" />
            {busy ? "Checking" : stored && !draft.trim() ? "Save Gemini" : "Connect Gemini"}
          </Button>
          {stored ? (
            <Button
              variant="steel"
              disabled={busy}
              onClick={() => {
                clear();
                setDraftModel("auto");
                toast.message("Gemini key removed from this device.");
              }}
            >
              Clear
            </Button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
