import { useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useMemo } from "react";
import { projectPath, projects } from "@/data/projects";

const CircularGallery = lazy(() => import("@/components/CircularGallery"));

export function Projects() {
  const navigate = useNavigate();

  const galleryItems = useMemo(
    () =>
      projects.map((p) => ({
        image: p.cover,
        text: p.title,
        slug: p.slug,
      })),
    [],
  );

  const onItemNavigate = useCallback(
    (slug: string) => {
      navigate({ to: `/projects/${slug}` });
    },
    [navigate],
  );

  return (
    <section
      id="projects"
      style={{ background: "oklch(0.07 0.012 165)" }}
      className="relative py-20 sm:py-28"
    >
      <div className="mb-10 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-14">
        <p className="font-label text-[12px] uppercase tracking-[0.5em] text-white/50">
          Selected mandates · {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div className="relative w-full" style={{ height: "clamp(620px, 75svh, 820px)" }}>
        <Suspense fallback={<div className="h-full w-full" aria-hidden />}>
          <CircularGallery
            items={galleryItems}
            onItemNavigate={onItemNavigate}
            bend={1}
            textColor="#ffffff"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </Suspense>
      </div>
    </section>
  );
}
