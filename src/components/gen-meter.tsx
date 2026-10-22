import { useEffect, useState } from "react";

const STAGES = [
  "Analyzing layout",
  "Mapping color tokens",
  "Composing markup",
  "Binding styles",
  "Polishing interface",
];

const R = 52;
const C = 2 * Math.PI * R;

export function GenMeter({ startedAt, active }: { startedAt: number | null; active: boolean }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(id);
  }, [active]);

  if (!active || !startedAt) return null;

  const elapsed = Math.max(0, now - startedAt);
  const seconds = elapsed / 1000;
  const progress = Math.min(0.96, seconds / 30);
  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(seconds / 6))];
  const remain = Math.max(0, 30 - Math.floor(seconds));

  return (
    <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-bg/70">
      <div className="pointer-events-auto flex flex-col items-center gap-4 rounded-xl border border-border bg-bg-elevated/95 px-8 py-7">
        <div className="relative size-32">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(62,224,196,0.12)" strokeWidth="4" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="#3ee0c4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center font-hud text-2xl tabular-nums text-primary">
            {remain}
          </div>
        </div>
        <p className="font-sans text-sm tracking-[0.2em] text-muted uppercase">{stage}</p>
        <p className="max-w-xs text-center text-xs text-subtle">
          Image to code in about 30 seconds. Keep this workspace open.
        </p>
      </div>
    </div>
  );
}
