import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide select-none whitespace-nowrap disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-[scale,background-color,color,box-shadow,border-color] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        hero:
          "border border-primary/70 bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(62,224,196,0.18),0_0_24px_rgba(62,224,196,0.16)] hover:bg-primary/15 hover:shadow-[0_0_0_1px_rgba(62,224,196,0.28),0_0_28px_rgba(62,224,196,0.22)] uppercase",
        primary:
          "bg-primary text-primary-fg hover:bg-primary-hover",
        steel:
          "border border-border-strong bg-surface text-fg hover:bg-surface-2",
        ghost:
          "text-muted hover:text-fg hover:bg-surface/80",
        danger:
          "bg-danger/15 text-danger hover:bg-danger/25",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-11 px-4 text-sm rounded-lg",
        lg: "h-12 px-5 text-base rounded-lg",
        hero: "h-14 px-8 text-lg rounded-xl tracking-[0.22em]",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: { variant: "steel", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
