import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { ApiKeyPanel } from "@/components/api-key-panel";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useComposeTarget } from "@/lib/compose-target";
import { useGeminiKey } from "@/lib/gemini-key";
import { useProjectStore } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "HTML TYPELESS IDE";

function HydrateProjects() {
  const hydrate = useProjectStore((s) => s.hydrate);
  const hydrateKeys = useGeminiKey((s) => s.hydrate);
  const hydrateTarget = useComposeTarget((s) => s.hydrate);
  useEffect(() => {
    hydrate();
    hydrateKeys();
    hydrateTarget();
  }, [hydrate, hydrateKeys, hydrateTarget]);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#050b18" },
      {
        name: "description",
        content: "30-second image-to-code generator and typeless spatial IDE.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <HydrateProjects />
          <Outlet />
          <ApiKeyPanel />
          <Toaster
            theme="dark"
            position="top-center"
            toastOptions={{
              style: {
                background: "#0c1b32",
                border: "1px solid #1c3658",
                color: "#e8f4ff",
                fontFamily: "Rajdhani, sans-serif",
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
