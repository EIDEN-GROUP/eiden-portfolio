import { ServiceSectionView } from "@/components/case-study/ServiceSectionViews";
import { ServiceBandHeader } from "@/components/case-study/primitives";
import { getProjectServiceConfig } from "@/data/projectServiceSections";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";
import { ease } from "./motion";

export function ProjectServicesShowcase({ project }: { project: Project }) {
  const config = getProjectServiceConfig(project.slug);
  if (!config) return null;

  return (
    <div
      className="relative border-t border-white/[0.08] text-white antialiased"
      style={{
        backgroundColor: config.background,
        backgroundImage: config.gradient,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease }}
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

      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </div>
  );
}
