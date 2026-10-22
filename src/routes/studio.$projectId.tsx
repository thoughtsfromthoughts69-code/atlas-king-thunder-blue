import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Copy, Download, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CodeEditor } from "@/components/code-editor";
import { GenMeter } from "@/components/gen-meter";
import { BottomDock, HudTop } from "@/components/hud-chrome";
import { LivePreview } from "@/components/live-preview";
import { PromptDock } from "@/components/prompt-dock";
import { TargetSelect } from "@/components/target-select";
import { Button } from "@/components/ui/button";
import { targetMeta, useComposeTarget } from "@/lib/compose-target";
import { compressImageFile } from "@/lib/image-client";
import { useProjectStore } from "@/lib/store";
import { useCapture } from "@/lib/use-capture";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio/$projectId")({ component: StudioPage });

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
  const { pickCamera, input } = useCapture({
    onImage: async (dataUrl) => {
      await generateOn(projectId, {
        mode: "image",
        imageDataUrl: dataUrl,
        target: useProjectStore.getState().projects.find((p) => p.id === projectId)?.target,
      });
    },
  });

  const globalTarget = useComposeTarget((s) => s.target);
  const setGlobalTarget = useComposeTarget((s) => s.setTarget);

  const [tab, setTab] = useState<"code" | "preview">("preview");
  const [device, setDevice] = useState<"phone" | "full">("phone");
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState(project?.name ?? "");

  useEffect(() => {
    if (project) setTitle(project.name);
  }, [project?.name, project]);

  useEffect(() => {
    if (project?.target) setGlobalTarget(project.target);
  }, [project?.id, project?.target, setGlobalTarget]);

  useEffect(() => {
    const current = useProjectStore.getState().projects.find((p) => p.id === projectId);
    if (!current) return;
    setDevice(current.target === "cnc" || current.target === "mindmap" ? "full" : "phone");
  }, [projectId]);

  useEffect(() => {
    if (!lastError) return;
    toast.error(lastError);
    clearError();
  }, [lastError, clearError]);

  useEffect(() => {
    if (hydrated && !project) {
      void navigate({ to: "/hub" });
    }
  }, [hydrated, project, navigate]);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith("image/"));
      if (!file) return;
      e.preventDefault();
      void compressImageFile(file).then((dataUrl) =>
        generateOn(projectId, {
          mode: "image",
          imageDataUrl: dataUrl,
          target: useProjectStore.getState().projects.find((p) => p.id === projectId)?.target,
        }),
      );
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [generateOn, projectId]);

  if (!project) {
    return (
      <div className="circuit-field grid min-h-dvh place-items-center text-muted">
        Loading workspace
      </div>
    );
  }

  const busy = generatingId === project.id;
  const output = project.target ?? globalTarget;
  const placeholder = targetMeta(output).placeholder;

  const changeTarget = (next: typeof output) => {
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

  const applyImage = async (file: File) => {
    const dataUrl = await compressImageFile(file);
    await generateOn(project.id, {
      mode: "image",
      imageDataUrl: dataUrl,
      target: project.target ?? globalTarget,
    });
  };

  return (
    <div className="circuit-field relative flex min-h-dvh flex-col pb-24">
      {input}
      <HudTop />
      <div className="flex items-center gap-2 border-b border-border px-2 py-2 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back to library"
          onClick={() => navigate({ to: "/hub" })}
        >
          <ChevronLeft className="size-5" />
        </Button>
        {project.sourcePreview && (
          <img
            src={project.sourcePreview}
            alt="Source screenshot"
            className="hidden size-9 rounded-md object-cover sm:block"
          />
        )}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => rename(project.id, title)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
          className="min-w-0 flex-1 bg-transparent font-semibold tracking-wide outline-none"
          aria-label="Project name"
        />
        <Button variant="ghost" size="icon" aria-label="Copy HTML" onClick={() => void copyCode()}>
          <Copy className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Download HTML" onClick={download}>
          <Download className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete project"
          onClick={() => {
            remove(project.id);
            void navigate({ to: "/hub" });
          }}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-3 py-3 sm:px-5">
        <div className="mb-3 max-w-xl">
          <TargetSelect value={output} onChange={changeTarget} />
        </div>
        <div className="mb-3 lg:hidden">
          <PromptDock
            value={prompt}
            onChange={setPrompt}
            disabled={busy}
            labeled
            inputId="prompt-mobile"
            placeholder={placeholder}
            onImage={(file) => void applyImage(file)}
            onSubmit={() => {
              const text = prompt.trim();
              if (!text) return;
              setPrompt("");
              void refine(project.id, text);
            }}
          />
        </div>

        <div className="flex rounded-lg border border-border p-1 lg:hidden">
          <TabBtn active={tab === "code"} onClick={() => setTab("code")}>
            Code editor
          </TabBtn>
          <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>
            Live preview
          </TabBtn>
        </div>

        <div className="relative mt-3 grid min-h-[62dvh] flex-1 gap-3 lg:grid-cols-2">
          <section
            className={cn(
              "min-h-0 flex-col",
              tab === "code" ? "flex" : "hidden lg:flex",
            )}
          >
            <p className="mb-2 font-hud text-[11px] tracking-[0.22em] text-subtle uppercase">
              Code editor:/
            </p>
            <CodeEditor
              value={project.html}
              onChange={(html) => updateHtml(project.id, html)}
              className="min-h-[52dvh] flex-1"
            />
          </section>
          <section
            className={cn(
              "relative min-h-0 flex-col",
              tab === "preview" ? "flex" : "hidden lg:flex",
            )}
          >
            <div className="mb-3 hidden lg:block">
              <PromptDock
                value={prompt}
                onChange={setPrompt}
                disabled={busy}
                labeled
                inputId="prompt-desktop"
                placeholder={placeholder}
                onImage={(file) => void applyImage(file)}
                onSubmit={() => {
                  const text = prompt.trim();
                  if (!text) return;
                  setPrompt("");
                  void refine(project.id, text);
                }}
              />
            </div>
            <LivePreview
              html={project.html}
              mode={device}
              onMode={setDevice}
              className="min-h-[52dvh] flex-1"
            />
          </section>
          <GenMeter startedAt={generatingStartedAt} active={busy} />
        </div>
      </div>

      <BottomDock
        active="workspace"
        onLibrary={() => navigate({ to: "/hub" })}
        onCapture={pickCamera}
        onWorkspace={() => {}}
      />
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 flex-1 rounded-md text-sm tracking-[0.14em] uppercase transition-colors duration-150",
        active ? "bg-surface-2 text-primary" : "text-muted",
      )}
    >
      {children}
    </button>
  );
}
