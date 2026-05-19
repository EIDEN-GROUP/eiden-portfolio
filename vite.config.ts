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
  if (id.includes("react-dom") || id.includes("/react/")) return "vendor-react";
  return "vendor-misc";
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
