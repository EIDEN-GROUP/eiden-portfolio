// @lovable.dev/vite-tanstack-config already includes the following   do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Split large runtime deps so no single chunk exceeds Vite's 500 kB warning. */
function vendorChunk(id: string): string | undefined {
  if (!id.includes("node_modules")) return;
  if (id.includes("framer-motion")) return "vendor-motion";
  if (id.includes("gsap")) return "vendor-gsap";
  if (id.includes("swiper")) return "vendor-swiper";
  if (id.includes("lenis")) return "vendor-lenis";
  if (id.includes("/ogl/") || id.includes("\\ogl\\")) return "vendor-ogl";
  if (id.includes("@tanstack")) return "vendor-router";
  // Keep the full React runtime in one chunk (scheduler, etc.) to avoid a circular
  // vendor-misc ↔ vendor-react split that breaks Rollup in production builds.
  if (/[/\\](react|react-dom|scheduler|react-is|use-sync-external-store)([/\\]|$)/.test(id)) {
    return "vendor-react";
  }
  // Let Rollup assign remaining node_modules; a catch-all "vendor-misc" caused cycles.
  return undefined;
}

export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: vendorChunk,
        },
      },
    },
  },
});
