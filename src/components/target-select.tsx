import { Box, LayoutDashboard, Waypoints } from "lucide-react";
import { COMPOSE_TARGETS, type ComposeTarget } from "@/lib/compose-target";
import { cn } from "@/lib/utils";

const ICONS = {
  ui: LayoutDashboard,
  cnc: Box,
  mindmap: Waypoints,
} as const;

export function TargetSelect({
  value,
  onChange,
  showHint = false,
}: {
  value: ComposeTarget;
  onChange: (target: ComposeTarget) => void;
  showHint?: boolean;
}) {
  const current = COMPOSE_TARGETS.find((t) => t.id === value) ?? COMPOSE_TARGETS[0];

  return (
    <div>
      <p className="font-hud text-[11px] tracking-[0.22em] text-subtle uppercase">Output:/</p>
      <div
        role="radiogroup"
        aria-label="Output type"
        className="mt-2 grid grid-cols-3 gap-1 rounded-lg border border-border bg-surface p-1"
      >
        {COMPOSE_TARGETS.map((t) => {
          const Icon = ICONS[t.id];
          const active = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(t.id)}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-center transition-colors duration-150",
                active ? "bg-surface-2 text-primary" : "text-muted hover:text-fg",
              )}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              <span className="font-hud text-[10px] tracking-[0.16em] uppercase">{t.label}</span>
            </button>
          );
        })}
      </div>
      {showHint && <p className="mt-2 text-sm text-muted">{current.hint}</p>}
    </div>
  );
}
