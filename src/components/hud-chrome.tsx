import type { ReactNode } from "react";
import { Box, Cpu, Globe, LayoutGrid, Radio, Settings2 } from "lucide-react";
import { useGeminiKey } from "@/lib/gemini-key";
import { cn } from "@/lib/utils";

export function HudTop({ right }: { right?: string }) {
  const openPanel = useGeminiKey((s) => s.openPanel);
  const connected = useGeminiKey((s) => Boolean(s.geminiKey));

  return (
    <header className="relative z-10 flex h-11 items-center justify-between gap-3 border-b border-border px-3 text-[11px] tracking-[0.18em] text-subtle uppercase">
      <div className="flex items-center gap-2.5 text-steel">
        <Globe className="size-3.5" strokeWidth={1.75} />
        <Radio className="size-3.5" strokeWidth={1.75} />
        <Cpu className="size-3.5" strokeWidth={1.75} />
        <LayoutGrid className="size-3.5" strokeWidth={1.75} />
        <Box className="size-3.5" strokeWidth={1.75} />
      </div>
      <div className="hud-line absolute left-1/4 right-1/4 top-1/2 h-px -translate-y-1/2" />
      <div className="flex items-center gap-3">
        <span className="font-hud tabular-nums text-primary">{right ?? "812"}</span>
        <button
          type="button"
          onClick={openPanel}
          className="relative grid size-11 place-items-center rounded-md text-steel transition-colors duration-150 hover:bg-surface hover:text-primary"
          aria-label="Gemini API key settings"
        >
          <Settings2 className="size-3.5" strokeWidth={1.75} />
          {connected && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" aria-hidden />
          )}
        </button>
      </div>
    </header>
  );
}

export function HudBottom() {
  return (
    <footer className="relative z-10 flex h-8 items-center justify-between border-t border-border px-3 text-[10px] tracking-[0.2em] text-subtle uppercase">
      <span>Typeless / Automation</span>
      <span className="text-steel">Spatial IDE · Android</span>
    </footer>
  );
}

export function BottomDock({
  active,
  onLibrary,
  onCapture,
  onWorkspace,
}: {
  active: "library" | "capture" | "workspace";
  onLibrary: () => void;
  onCapture: () => void;
  onWorkspace: () => void;
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-lg items-end justify-around">
        <DockBtn label="Library" active={active === "library"} onClick={onLibrary}>
          <LayoutGrid className="size-5" strokeWidth={1.75} />
        </DockBtn>
        <button
          type="button"
          onClick={onCapture}
          className={cn(
            "relative -mt-5 flex size-14 items-center justify-center rounded-full border border-primary/70 bg-primary text-primary-fg shadow-[0_0_24px_rgba(62,224,196,0.25)] transition-[scale] duration-150 ease-out active:scale-[0.96]",
            active === "capture" && "ring-2 ring-primary/40",
          )}
          aria-label="Capture screenshot"
        >
          <span className="font-hud text-lg leading-none">+</span>
        </button>
        <DockBtn label="Workspace" active={active === "workspace"} onClick={onWorkspace}>
          <Cpu className="size-5" strokeWidth={1.75} />
        </DockBtn>
      </div>
    </nav>
  );
}

function DockBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-16 flex-col items-center gap-1 px-3 py-1 text-[11px] tracking-[0.16em] uppercase transition-colors duration-150",
        active ? "text-primary" : "text-subtle",
      )}
    >
      {children}
      {label}
    </button>
  );
}
