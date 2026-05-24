import type { ServiceSection } from "@/data/projectServiceSections";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BrandBoardShowcase, BrandIdentityShowcase } from "@/components/case-study/BrandSection";
import {
  BeforeAfterRow,
  DeviceMockupPair,
  FeaturePills,
  HorizontalMediaStrip,
  MediaMasonry,
  MediaPanelGrid,
  SectionIntro,
  type MediaItem,
} from "./primitives";
import { useProjectTheme } from "@/components/case-study/projectThemeContext";
import { ease } from "./motion";

function mediaFromSection(section: ServiceSection): MediaItem[] {
  return (section.media ?? []).map((m) => ({
    src: m.src,
    alt: m.alt,
    caption: m.caption,
    tall: m.tall,
  }));
}

function primaryWebsiteLink(section: ServiceSection): { href: string; label: string } | null {
  const link =
    section.links?.find((l) => l.label.toLowerCase() === "website") ?? section.links?.[0];
  if (!link) return null;
  try {
    const host = new URL(link.url).hostname.replace(/^www\./, "");
    return { href: link.url, label: host };
  } catch {
    return { href: link.url, label: link.label };
  }
}

export function ServiceSectionView({
  section,
  themeAccent,
  index,
}: {
  section: ServiceSection;
  themeAccent: string;
  index: number;
}) {
  const theme = useProjectTheme();
  const media = mediaFromSection(section);
  const desktop = media[0];
  const mobile = media[1] ?? media[0];
  const websiteCta = section.type === "website-showcase" ? primaryWebsiteLink(section) : null;

  if (section.type === "impact" && !section.beforeAfter) return null;

  return (
    <motion.section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: theme.motion.revealDuration * 0.7, ease: theme.motion.ease }}
      className="border-t py-16 sm:py-24"
      style={{
        borderColor: theme.colors.border,
        background: index % 2 === 1 ? theme.ui.sectionTint : undefined,
      }}
    >
      <SectionIntro
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
        accentClass={themeAccent}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: theme.motion.ease }}
        className="mx-auto mt-10 h-px max-w-xs origin-left sm:mt-12"
        style={{ background: theme.gradients.divider }}
      />

      <motion.div
        className={cn(
          "mt-8 sm:mt-10",
          section.type === "brand-identity" || section.type === "brand-board"
            ? "space-y-0"
            : "space-y-12 sm:mt-16 sm:space-y-16",
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
      >
        {section.type === "brand-identity" && (
          <BrandIdentityShowcase section={section} themeAccent={themeAccent} />
        )}

        {section.type === "brand-board" && (
          <BrandBoardShowcase section={section} themeAccent={themeAccent} />
        )}

        {section.type === "website-showcase" && desktop && mobile && (
          <>
            <DeviceMockupPair
              desktopSrc={desktop.src}
              mobileSrc={mobile.src}
              alt={section.title}
              websiteHref={websiteCta?.href}
              websiteLabel={websiteCta?.label}
              precomposed={section.precomposedDeviceMockups}
              precomposedDesktopBg={section.precomposedDesktopBg}
            />
          </>
        )}

        {section.type === "social-content" && (
          <>
            {media.length > 0 ? <HorizontalMediaStrip items={media} /> : null}
            {section.features?.length ? <FeaturePills features={section.features} /> : null}
          </>
        )}

        {section.type === "media-buying" && section.features?.length ? (
          <FeaturePills features={section.features} />
        ) : null}

        {section.type === "crm-dashboard" && (
          <>
            {media.length > 0 ? <MediaPanelGrid items={media} /> : null}
            {section.features?.length ? <FeaturePills features={section.features} /> : null}
          </>
        )}

        {section.type === "impact" && section.beforeAfter ? (
          <>
            <BeforeAfterRow
              beforeSrc={section.beforeAfter.before}
              afterSrc={section.beforeAfter.after}
              beforeLabel={section.beforeAfter.beforeLabel}
              afterLabel={section.beforeAfter.afterLabel}
            />
            {section.features?.length ? <FeaturePills features={section.features} /> : null}
          </>
        ) : null}
      </motion.div>
    </motion.section>
  );
}
