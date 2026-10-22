import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Cog, MonitorSmartphone } from "lucide-react";
import type { ReactNode } from "react";
import { HtmlMark } from "@/components/html-mark";
import { HudBottom, HudTop } from "@/components/hud-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const navigate = useNavigate();

  return (
    <main className="circuit-field relative flex min-h-dvh flex-col overflow-hidden">
      <div className="scanlines absolute inset-0" />
      <div className="spatial-floor" aria-hidden="true" />
      <HudTop />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-8 sm:px-10">
        <div className="stagger-in">
          <HtmlMark />
          <p className="mt-6 font-hud text-xl tracking-[0.14em] text-primary uppercase sm:text-3xl sm:tracking-[0.18em]">
            Typeless / Automation
          </p>
          <p className="mt-4 max-w-xl font-sans text-sm tracking-[0.14em] text-muted uppercase sm:text-base sm:tracking-[0.22em]">
            Game engine + UI/UX graphic design
          </p>
          <h1 className="mt-5 max-w-lg font-sans text-2xl font-semibold leading-snug text-steel sm:text-4xl">
            3D Spatial Integrated Development Environment (IDE)
          </h1>
          <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
            <FeatureChip icon={<Cog className="size-3.5" />} label="Automation" />
            <FeatureChip icon={<Box className="size-3.5" />} label="3D Spatial" />
            <FeatureChip icon={<MonitorSmartphone className="size-3.5" />} label="UI/UX" />
          </ul>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-base text-muted">
              Drop a screenshot. Get production HTML in about 30 seconds. Edit typeless — by camera, prompt, or template.
            </p>
            <Button
              variant="hero"
              size="hero"
              className="w-full shrink-0 sm:w-auto"
              onClick={() => navigate({ to: "/hub" })}
            >
              Start here
            </Button>
          </div>
        </div>
      </div>
      <HudBottom />
    </main>
  );
}

function FeatureChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-[11px] tracking-[0.16em] text-steel uppercase">
      {icon}
      {label}
    </li>
  );
}
