import { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

export function CodeEditor({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  className?: string;
}) {
  const lines = useMemo(() => Math.max(1, value.split("\n").length), [value]);
  const gutterRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const sync = () => {
    if (gutterRef.current && areaRef.current) {
      gutterRef.current.scrollTop = areaRef.current.scrollTop;
    }
  };

  return (
    <div className={cn("code-stage flex min-h-0 overflow-hidden rounded-lg", className)}>
      <p className="code-watermark" aria-hidden="true">
        HTML
        <br />
        CODE /
        <br />
        LIVE
        <br />
        PREVIEW
      </p>
      <div
        ref={gutterRef}
        className="relative z-10 w-10 shrink-0 overflow-hidden border-r border-border py-3 text-right font-mono text-[11px] leading-6 text-subtle tabular-nums select-none"
        aria-hidden
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="pr-2">
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        ref={areaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={sync}
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          e.preventDefault();
          const el = e.currentTarget;
          const start = el.selectionStart;
          const end = el.selectionEnd;
          const next = `${value.slice(0, start)}  ${value.slice(end)}`;
          onChange(next);
          requestAnimationFrame(() => {
            el.selectionStart = el.selectionEnd = start + 2;
          });
        }}
        spellCheck={false}
        wrap="off"
        aria-label="HTML source"
        className="relative z-10 min-h-0 min-w-0 flex-1 resize-none bg-transparent px-3 py-3 font-mono text-[12px] leading-6 text-fg/90 outline-none"
      />
    </div>
  );
}
