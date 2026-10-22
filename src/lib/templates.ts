import apertureOps from "@/templates/aperture-ops.html?raw";
import nightGate from "@/templates/night-gate.html?raw";
import crewPulse from "@/templates/crew-pulse.html?raw";
import helixPlay from "@/templates/helix-play.html?raw";
import strataHud from "@/templates/strata-hud.html?raw";

export type Template = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  html: string;
  swatch: [string, string, string];
};

export const TEMPLATES: Template[] = [
  {
    id: "aperture-ops",
    name: "Aperture Ops",
    tag: "Dashboard",
    blurb: "Status, allocations, crew, and system health.",
    html: apertureOps,
    swatch: ["#f5f8fa", "#1f8a86", "#163447"],
  },
  {
    id: "night-gate",
    name: "Night Gate",
    tag: "Auth",
    blurb: "Dark access panel with HUD framing.",
    html: nightGate,
    swatch: ["#070f1c", "#3ee0c4", "#1d3654"],
  },
  {
    id: "crew-pulse",
    name: "Crew Pulse",
    tag: "Activity",
    blurb: "Team feed with status chips and filters.",
    html: crewPulse,
    swatch: ["#f3f6f8", "#1c8f8a", "#173040"],
  },
  {
    id: "helix-play",
    name: "Helix Play",
    tag: "Media",
    blurb: "Now-playing surface with queue.",
    html: helixPlay,
    swatch: ["#10151c", "#3ee0c4", "#1a222c"],
  },
  {
    id: "strata-hud",
    name: "Strata HUD",
    tag: "Game",
    blurb: "Spatial overlay with meters and brackets.",
    html: strataHud,
    swatch: ["#050b14", "#3ee0c4", "#1c4a68"],
  },
];
