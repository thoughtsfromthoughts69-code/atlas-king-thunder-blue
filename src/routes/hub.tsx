import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, ImagePlus, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BottomDock, HudTop } from "@/components/hud-chrome";
import { PromptDock } from "@/components/prompt-dock";
import { TemplateThumb } from "@/components/template-thumb";
import { TargetSelect } from "@/components/target-select";
import { Button } from "@/components/ui/button";
import { targetMeta, useComposeTarget } from "@/lib/compose-target";
import { fetchAsDataUrl } from "@/lib/image-client";
import { getAiStatus } from "@/lib/generate";
import { geminiModelLabel, useGeminiKey } from "@/lib/gemini-key";
import { useProjectStore } from "@/lib/store";
import { TEMPLATES } from "@/lib/templates";
import { useCapture } from "@/lib/use-capture";
import { cn, formatTime } from "@/lib/utils";

export const Route = createFileRoute("/hub")({ component: Hub });

function Hub() {
  const navigate = useNavigate();
  const { pickGallery, pickCamera, runImage, input, busy } = useCapture();
  const projects = useProjectStore((s) => s.projects);
  const createFromTemplate = useProjectStore((s) => s.createFromTemplate);
  const createAndGenerate = useProjectStore((s) => s.createAndGenerate);
  const createBlank = useProjectStore((s) => s.createBlank);
  const generatingId = useProjectStore((s) => s.generatingId);
  const [prompt, setPrompt] = useState("");
  const [ai, setAi] = useState<{ grok: boolean; geminiEnv: boolean; model: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const geminiKey = useGeminiKey((s) => s.geminiKey);
  const geminiModel = useGeminiKey((s) => s.geminiModel);
  const openPanel = useGeminiKey((s) => s.openPanel);
  const target = useComposeTarget((s) => s.target);
  const setTarget = useComposeTarget((s) => s.setTarget);
  const canGenerate = Boolean(ai?.grok || ai?.geminiEnv || geminiKey);

  useEffect(() => {
    void getAiStatus().then((s) => setAi({ grok: s.grok, geminiEnv: s.geminiEnv, model: s.model }));
  }, []);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith("image/"));
      if (file) {
        e.preventDefault();
        void runImage(file);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [runImage]);

  const openTemplate = (id: string) => {
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    const projectId = createFromTemplate(t.name, t.html);
    void navigate({ to: "/studio/$projectId", params: { projectId } });
  };

  const runPrompt = async () => {
    const text = prompt.trim();
    if (!text || busy) return;
    const id = await createAndGenerate({
      name: text.slice(0, 32),
      source: "prompt",
      input: { mode: "prompt", prompt: text, target },
    });
    setPrompt("");
    void navigate({ to: "/studio/$projectId", params: { projectId: id } });
  };

  const runDemo = async () => {
    if (busy) return;
    try {
      const dataUrl = await fetchAsDataUrl("/samples/ops-board.png");
      const id = await createAndGenerate({
        name: "Ops board",
        source: "image",
        sourcePreview: dataUrl,
        input: { mode: "image", imageDataUrl: dataUrl, target },
      });
      void navigate({ to: "/studio/$projectId", params: { projectId: id } });
    } catch {
      toast.error("Could not load the demo screenshot.");
    }
  };

  const lastId = projects[0]?.id;

  return (
    <div className="circuit-field min-h-dvh pb-28">
      {input}
      <HudTop />
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-8">
        <p className="font-hud text-[11px] tracking-[0.28em] text-primary uppercase">Spatial library</p>
        <h1 className="mt-1 font-sans text-3xl font-semibold tracking-tight text-fg">
          Image to code in 30 seconds
        </h1>
        <p className="mt-2 max-w-xl text-muted">
          Shoot a UI on Android, drop a screenshot, or open a spatial template. The workspace compiles HTML and previews it on a phone frame.
        </p>
        {ai && !canGenerate && (
          <div className="mt-3 flex flex-col gap-2 rounded-lg border border-border bg-surface px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Add a Gemini API key to compile screenshots and prompts. Templates still open instantly.
            </p>
            <Button variant="primary" size="sm" onClick={openPanel}>
              Add key
            </Button>
          </div>
        )}
        {ai && canGenerate && (geminiKey || ai.geminiEnv) && (
          <p className="mt-3 text-sm text-primary">
            {geminiModelLabel(geminiModel === "auto" ? ai.model : geminiModel)} is ready to compose.
          </p>
        )}

        <div className="mt-5 max-w-xl">
          <TargetSelect value={target} onChange={setTarget} showHint />
        </div>

        <section
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = [...e.dataTransfer.files].find((f) => f.type.startsWith("image/"));
            if (file) void runImage(file);
          }}
          className={cn(
            "mt-6 rounded-xl border border-dashed p-5 transition-[border-color,background-color] duration-150",
            dragging ? "border-primary bg-primary/10" : "border-border-strong bg-surface/60",
          )}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex size-14 items-center justify-center rounded-lg border border-border bg-bg-elevated text-primary">
              <ImagePlus className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Capture a screenshot</h2>
              <p className="text-sm text-muted">
                Camera, photos, paste, or drag. Typeless from here — no code required.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
              <Button variant="primary" onClick={pickCamera} disabled={busy} className="col-span-2 sm:col-span-1">
                <Camera className="size-4" />
                Camera
              </Button>
              <Button variant="steel" onClick={pickGallery} disabled={busy}>
                Photos
              </Button>
              <Button variant="steel" onClick={() => void runDemo()} disabled={busy} className="col-span-2 sm:col-span-1">
                Try demo
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <PromptDock
              value={prompt}
              onChange={setPrompt}
              onSubmit={() => void runPrompt()}
              disabled={busy}
              placeholder={targetMeta(target).placeholder}
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-sans text-lg font-semibold">Spatial templates</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const id = createBlank();
                void navigate({ to: "/studio/$projectId", params: { projectId: id } });
              }}
            >
              Blank canvas
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => openTemplate(t.id)}
                className="group rounded-xl border border-border bg-surface p-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.98]"
              >
                <TemplateThumb html={t.html} title={t.name} />
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-fg">{t.name}</p>
                    <p className="text-sm text-muted">{t.blurb}</p>
                  </div>
                  <span className="rounded-full bg-bg px-2 py-1 text-[10px] tracking-[0.14em] text-steel uppercase">
                    {t.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 font-sans text-lg font-semibold">Recents</h2>
            <ul className="grid gap-2">
              {projects.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() =>
                      navigate({ to: "/studio/$projectId", params: { projectId: p.id } })
                    }
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3 text-left"
                  >
                    {p.sourcePreview ? (
                      <img
                        src={p.sourcePreview}
                        alt=""
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-md bg-bg-elevated text-primary">
                        {p.id === generatingId ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <ImagePlus className="size-4" />
                        )}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{p.name}</span>
                      <span className="text-xs tracking-wide text-subtle uppercase">
                        {targetMeta(p.target ?? "ui").short} · {p.source} · {formatTime(p.updatedAt)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <BottomDock
        active="library"
        onLibrary={() => {}}
        onCapture={pickCamera}
        onWorkspace={() => {
          if (lastId) void navigate({ to: "/studio/$projectId", params: { projectId: lastId } });
          else toast.message("Open a template or capture a screen first.");
        }}
      />
    </div>
  );
}
