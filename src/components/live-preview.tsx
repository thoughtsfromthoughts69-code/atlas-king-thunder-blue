import { Monitor, Smartphone } from "lucide-react";
import { isBlankHtml } from "@/lib/html";
import { cn } from "@/lib/utils";

export function LivePreview({
  html,
  mode,
  onMode,
  className,
  framed = true,
}: {
  html: string;
  mode: "phone" | "full";
  onMode: (mode: "phone" | "full") => void;
  className?: string;
  framed?: boolean;
}) {
  const blank = isBlankHtml(html);

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      {framed && (
        <div className="mb-2 flex items-center justify-between">
          <p className="font-hud text-[11px] tracking-[0.22em] text-subtle uppercase">Live preview</p>
          <div className="flex rounded-md border border-border p-0.5">
            <button
              type="button"
              onClick={() => onMode("phone")}
              className={cn(
                "grid size-8 place-items-center rounded-sm transition-colors duration-150",
                mode === "phone" ? "bg-surface-2 text-primary" : "text-subtle",
              )}
              aria-label="Phone preview"
            >
              <Smartphone className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => onMode("full")}
              className={cn(
                "grid size-8 place-items-center rounded-sm transition-colors duration-150",
                mode === "full" ? "bg-surface-2 text-primary" : "text-subtle",
              )}
              aria-label="Full preview"
            >
              <Monitor className="size-4" />
            </button>
          </div>
        </div>
      )}
      <div
        className={cn(
          "relative min-h-[480px] flex-1 overflow-hidden rounded-lg lg:min-h-[560px]",
          blank ? "preview-stage" : "bg-bg-elevated",
        )}
      >
        {blank ? (
          <p className="preview-stage-label">Live preview</p>
        ) : mode === "phone" ? (
          <div className="flex h-full min-h-[480px] items-center justify-center p-4">
            <div className="phone-bezel flex h-[min(100%,640px)] w-[min(100%,340px)] flex-col overflow-hidden rounded-[32px] p-2.5">
              <div className="mx-auto mb-1.5 h-1.5 w-16 rounded-full bg-fg/15" />
              <iframe
                title="Live preview"
                sandbox="allow-scripts"
                srcDoc={html}
                className="min-h-0 w-full flex-1 rounded-[22px] bg-white"
              />
            </div>
          </div>
        ) : (
          <iframe
            title="Live preview"
            sandbox="allow-scripts"
            srcDoc={html}
            className="h-full min-h-[480px] w-full bg-white"
          />
        )}
      </div>
    </div>
  );
}
