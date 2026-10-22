import { ArrowUp, ImagePlus } from "lucide-react";
import { useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PromptDock({
  value,
  onChange,
  onSubmit,
  onImage,
  disabled,
  placeholder = "Describe a change, or a new interface…",
  labeled = false,
  inputId = "prompt-input",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onImage?: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
  labeled?: boolean;
  inputId?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!disabled && value.trim()) onSubmit();
  };

  return (
    <div className={cn(labeled && "flex min-h-0 flex-col gap-2")}>
      {labeled && (
        <p className="font-hud text-[11px] tracking-[0.22em] text-subtle uppercase">Prompt:/</p>
      )}
      <form
        onSubmit={submit}
        className={cn(
          "flex items-end gap-2 rounded-xl border border-border bg-surface p-2",
        )}
      >
        {onImage && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) onImage(file);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              aria-label="Attach screenshot"
              disabled={disabled}
              onClick={() => fileRef.current?.click()}
            >
              <ImagePlus className="size-5" />
            </Button>
          </>
        )}
        <label className="sr-only" htmlFor={inputId}>
          Prompt
        </label>
        <textarea
          id={inputId}
          rows={labeled ? 3 : 2}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              if (!disabled && value.trim()) onSubmit();
            }
          }}
          className="min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-fg placeholder:text-subtle outline-none"
        />
        <Button
          type="submit"
          variant="primary"
          size="icon"
          className="shrink-0 rounded-lg"
          disabled={disabled || !value.trim()}
          aria-label="Generate"
        >
          <ArrowUp className="size-5" />
        </Button>
      </form>
    </div>
  );
}
