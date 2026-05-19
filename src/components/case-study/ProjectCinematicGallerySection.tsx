import { ThreeDHoverGallery } from "@/components/case-study/ThreeDHoverGallery";
import { useProjectTheme } from "@/components/case-study/projectThemeContext";
import { cinematicGalleryFromProject } from "@/data/projectCinematicGallery";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";

export function ProjectCinematicGallerySection({ project }: { project: Project }) {
  const theme = useProjectTheme();
  const story = cinematicGalleryFromProject(project);

  if (!story?.items.length) return null;

  return (
    <section
      aria-label="Cinematic brand storytelling"
      className="relative border-t"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] pb-4 pt-14 pr-[max(1rem,env(safe-area-inset-right))] sm:pb-6 sm:pt-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.85, ease: theme.motion.ease }}
          className="max-w-3xl"
        >
          <p
            className="font-label text-[9px] uppercase tracking-[0.52em]"
            style={{ color: theme.colors.accent }}
          >
            {story.eyebrow}
          </p>
          <h2
            className="mt-4 font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.04em]"
            style={{ color: theme.colors.text }}
          >
            {story.headline}
          </h2>
          <p
            className="mt-4 max-w-2xl font-editorial text-base leading-relaxed sm:text-lg"
            style={{ color: theme.colors.textMuted }}
          >
            {story.subhead}
          </p>
        </motion.div>
      </div>

      <ThreeDHoverGallery
        items={story.items}
        theme={{
          accent: theme.colors.accent,
          text: theme.colors.text,
          textMuted: theme.colors.textMuted,
          border: theme.colors.border,
          background: theme.colors.background,
          gradient: theme.gradients.page,
          spring: theme.motion.spring,
        }}
        autoplay={theme.mood !== "education"}
        autoplayMs={theme.mood === "lifestyle" ? 4800 : 5600}
      />

      <motion.div
        className="pointer-events-none mx-auto mt-2 h-px max-w-5xl"
        style={{ background: theme.gradients.divider }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: theme.motion.ease }}
      />
    </section>
  );
}
