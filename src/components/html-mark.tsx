import { cn } from "@/lib/utils";

export function HtmlMark({ className = "" }: { className?: string }) {
  return (
    <p className={cn("html-mark html-mark-face", className)} aria-label="HTML">
      HTML
    </p>
  );
}
