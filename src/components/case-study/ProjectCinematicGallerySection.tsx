import { ThreeDHoverGallery } from "@/components/case-study/ThreeDHoverGallery";
import { useProjectTheme } from "@/components/case-study/projectThemeContext";
import { cinematicGalleryFromProject } from "@/data/projectCinematicGallery";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";

const SERVICE_EXPLANATIONS: Record<string, Record<string, string>> = {
  "dmc-morocco": {
    "Website Design & Development":
      "Built a conversion-focused site that presents expertise, services, and clear inquiry paths.",
    "Branding & Visual Identity":
      "Created a premium visual system to keep every touchpoint consistent and recognizable.",
    "Social Media Content Production":
      "Produced content pillars and creatives that communicate hospitality authority clearly.",
    Photography: "Captured high-end imagery to support brand trust across digital and print.",
    "Video Production":
      "Produced cinematic video assets for storytelling, campaigns, and social distribution.",
    "Media Buying & Ads Campaign Management":
      "Managed paid campaigns across channels to generate qualified leads and visibility.",
  },
  bopassage: {
    "Website Design & Development":
      "Designed and developed a booking-friendly site aligned with the in-venue experience.",
    "Social Media Content Production":
      "Built social content that highlights ambiance, menu moments, and daily rituals.",
    Photography:
      "Delivered lifestyle and product photography for campaigns, website, and organic social.",
    "Video Production": "Produced short-form videos and reels to increase reach and engagement.",
    "Media Buying & Advertising Campaigns":
      "Launched and optimized paid campaigns to drive footfall and reservation intent.",
  },
  "lunja-village": {
    "Branding & Visual Identity":
      "Developed a distinct coastal identity system for positioning and recognition.",
    "Social Media Content Production":
      "Produced social content focused on lifestyle storytelling and community energy.",
    Photography: "Created image libraries that capture the place, mood, and guest experience.",
    "Video Production":
      "Produced dynamic video content to showcase the destination and improve engagement.",
    "Media Buying & Digital Advertising":
      "Executed digital ad campaigns to increase booking inquiries and audience quality.",
  },
  "educazen-kids": {
    "Website Design & Development":
      "Built a parent-friendly website with clear program discovery and trust signals.",
    "CRM System Development":
      "Implemented a CRM to centralize lead management, follow-up, and team workflows.",
    "Dashboard Design & Development":
      "Designed and developed dashboards for enrollment visibility and operational decisions.",
    "Social Media Content Production":
      "Produced educational social content tailored to families and caregivers.",
    Photography: "Created authentic photography assets aligned with the inclusive brand tone.",
    "Video Production":
      "Produced informative and emotional video content for awareness and conversion.",
    "Media Buying & Ads Management":
      "Managed performance campaigns to generate enrollment leads at sustainable costs.",
  },
  "eiden-academy": {
    "Website Design & Development":
      "Designed and developed the public academy platform for programs and enrollment.",
    "Dashboard Design & Development":
      "Created operational dashboards for student tracking, analytics, and administration.",
    "Branding & Visual Identity":
      "Established a cohesive identity system for institutional credibility and consistency.",
    "Social Media Content Production":
      "Produced social content to showcase programs, outcomes, and academy culture.",
    Photography: "Delivered photography assets for marketing, platform pages, and campaigns.",
    "Video Production":
      "Produced branded video content for storytelling, promotion, and learner engagement.",
    "English Test System Development":
      "Built the English testing system with structured levels, tracking, and assessment logic.",
  },
};

/** Curated "Social" slides are replaced by the single social-links card with platform icons. */
function isDuplicateSocialStoryItem(item: { category: string }) {
  const category = item.category.trim().toLowerCase();
  return category === "social" || category === "social media";
}

export function ProjectCinematicGallerySection({ project }: { project: Project }) {
  const theme = useProjectTheme();
  const story = cinematicGalleryFromProject(project);

  if (!story?.items.length) return null;
  const socialLinks = project.caseStudy?.social ?? {};
  const websiteHost = project.website
    ? new URL(project.website).hostname.replace(/^www\./, "")
    : undefined;
  const servicesWithExplanation = SERVICE_EXPLANATIONS[project.slug]
    ? Object.entries(SERVICE_EXPLANATIONS[project.slug]!).map(
        ([service, explanation]) => `${service}: ${explanation}`,
      )
    : project.services;
  const items = story.items
    .filter((item) => !isDuplicateSocialStoryItem(item))
    .map((item) => ({
      ...item,
      services: item.services ?? servicesWithExplanation,
      cta:
        item.cta ??
        (project.website
          ? { label: `Visit ${websiteHost ?? "website"}`, href: project.website }
          : undefined),
    }));
  const finalItems = [
    ...items,
    {
      id: `${project.slug}-social-links`,
      src: story.items[0]?.src ?? project.cover,
      alt: `${project.title} social media links`,
      category: "Social media",
      title: `${project.title} on social`,
      description: "Follow on Instagram, Facebook, and TikTok.",
      socialLinks: {
        instagram: socialLinks.instagram,
        facebook: socialLinks.facebook,
        tiktok: socialLinks.tiktok,
      },
    },
  ];

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

        <ThreeDHoverGallery
          items={finalItems}
          theme={{
            accent: theme.colors.accent,
            text: theme.colors.text,
            textMuted: theme.colors.textMuted,
            border: theme.colors.border,
            background: "transparent",
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
      </div>
    </section>
  );
}
