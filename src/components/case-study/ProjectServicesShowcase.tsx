import { ServiceSectionView } from "@/components/case-study/ServiceSectionViews";
import { useProjectTheme } from "@/components/case-study/ProjectThemeProvider";
import { ServiceBandHeader } from "@/components/case-study/primitives";
import { getProjectServiceConfig } from "@/data/projectServiceSections";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";

export function ProjectServicesShowcase({ project }: { project: Project }) {
  const theme = useProjectTheme();
  const config = getProjectServiceConfig(project.slug);
  if (!config) return null;

  return (
    <div
      className="relative border-t antialiased"
      style={{
        borderColor: theme.colors.border,
        backgroundColor: config.background,
        backgroundImage: config.gradient,
        color: theme.colors.text,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: theme.motion.revealDuration, ease: theme.motion.ease }}
      >
        <ServiceBandHeader
          left={config.intro.left}
          center={config.intro.center}
          right={config.intro.right}
          centerWide
        />
      </motion.div>

      <div className="pb-8 sm:pb-12">
        {config.sections.map((section, index) => (
          <ServiceSectionView
            key={section.id}
            section={section}
            themeAccent={config.accentClass}
            index={index}
          />
        ))}
      </div>

      <div
        className="pointer-events-none h-px w-full"
        style={{ background: theme.gradients.divider }}
      />
    </div>
  );
}
