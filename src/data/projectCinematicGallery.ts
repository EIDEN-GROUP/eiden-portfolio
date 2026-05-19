import type { Project } from "@/data/projects";
import bopassageBrandPalette from "@/assets/bopassage-brand-palette.png";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import bopassageOohColumn from "@/assets/bopassage-ooh-column.png";
import bopassageSocialInstagram from "@/assets/bopassage-social-instagram.png";
import bopassageSocialSavoryMorning from "@/assets/bopassage-social-savory-morning.png";
import bopassageSocialSlowsDown from "@/assets/bopassage-social-slows-down.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenHero from "@/assets/educazen-hero.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/lunja-hero.png";

export type CinematicGalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  description: string;
  cta?: { label: string; href: string };
};

export type CinematicGalleryStory = {
  eyebrow: string;
  headline: string;
  subhead: string;
  items: readonly CinematicGalleryItem[];
};

const STORIES: Record<string, CinematicGalleryStory> = {
  bopassage: {
    eyebrow: "Visual story",
    headline: "L'endroit qu'on revient toujours.",
    subhead:
      "Botanical warmth, golden-hour plates, and editorial social — one hospitality world from Founty to feed.",
    items: [
      {
        id: "bop-hero",
        src: bopassageHero,
        alt: "Bô Passage interior",
        category: "Hospitality",
        title: "The room, translated online",
        description:
          "A website and visual system that mirror the calm of the restaurant — menus, reservations, and morning light.",
        cta: { label: "Visit bopassage.com", href: "https://bopassage.com/" },
      },
      {
        id: "bop-social-ig",
        src: bopassageSocialInstagram,
        alt: "Bô Passage Instagram",
        category: "Social",
        title: "Feed as invitation",
        description: "Instagram grids built to feel like sitting down — not scrolling past another café.",
      },
      {
        id: "bop-social-slow",
        src: bopassageSocialSlowsDown,
        alt: "Bô Passage social creative",
        category: "Social",
        title: "Time slows down",
        description: "Evocative copy and warm frames that sell the pause, not just the plate.",
      },
      {
        id: "bop-brand",
        src: bopassageBrandPalette,
        alt: "Bô Passage brand palette",
        category: "Brand",
        title: "Forêt & or",
        description: "Forest green and café gold — the duo that holds every touchpoint together.",
      },
      {
        id: "bop-morning",
        src: bopassageSocialSavoryMorning,
        alt: "Bô Passage morning social",
        category: "Content",
        title: "Savory mornings",
        description: "Brunch rituals captured with the same intimacy guests feel at the table.",
      },
      {
        id: "bop-ooh",
        src: bopassageOohColumn,
        alt: "Bô Passage outdoor",
        category: "Campaign",
        title: "Founty, visible",
        description: "Out-of-home and campaign frames that anchor Bô Passage in Agadir Bay.",
      },
    ],
  },
  "dmc-morocco": {
    eyebrow: "Visual story",
    headline: "Morocco’s hotel expertise, composed with intent.",
    subhead:
      "Partner-ready identity, operational storytelling, and a digital front door built for owners and operators.",
    items: [
      {
        id: "dmc-hero",
        src: dmcHero,
        alt: "DMC Hospitality",
        category: "Hospitality",
        title: "DMC Hospitality",
        description:
          "A conversion-led site for hotel owners and partners — expertise, services, and clear contact paths.",
        cta: { label: "Visit dmchm.com", href: "https://dmchm.com/" },
      },
      {
        id: "dmc-cover",
        src: dmcCover,
        alt: "DMC collateral",
        category: "Brand",
        title: "Authenticité & excellence",
        description: "Forest and gold — editorial type that holds across collateral and digital.",
      },
      {
        id: "dmc-journey",
        src: dmcHero,
        alt: "DMC expertise",
        category: "Expertise",
        title: "From pré-ouverture to optimisation",
        description:
          "Every frame supports high-touch hotel consulting — structured services, team credibility, and Moroccan context.",
      },
    ],
  },
  "educazen-kids": {
    eyebrow: "Visual story",
    headline: "Inclusive education, made visible.",
    subhead:
      "Warm digital presence for parents — programs, psychosocial care, and enrollment paths that build trust.",
    items: [
      {
        id: "edu-hero",
        src: educazenHero,
        alt: "EducazenKids website",
        category: "Digital",
        title: "A parent-trusted front door",
        description:
          "Clear program discovery, team visibility, and forms parents complete with confidence.",
        cta: { label: "educazenkids.com", href: "https://educazenkids.com/" },
      },
      {
        id: "edu-cover",
        src: educazenkidsCover,
        alt: "EducazenKids brand",
        category: "Brand",
        title: "Puzzle of potentials",
        description: "Magenta, violet, teal, and gold — inclusivity encoded in every visual layer.",
      },
      {
        id: "edu-crm",
        src: educazenHero,
        alt: "EducazenKids platform",
        category: "Product",
        title: "Enrollment, centralized",
        description: "CRM and dashboard so Agadir's team runs outreach without scattered tools.",
      },
    ],
  },
  "eiden-academy": {
    eyebrow: "Visual story",
    headline: "The architecture of savoir.",
    subhead:
      "Institutional credibility meets product-grade edtech — brand, platform, and assessment in one motion.",
    items: [
      {
        id: "ea-hero",
        src: eidenHero,
        alt: "Eiden Academy",
        category: "Edtech",
        title: "Programs that scale",
        description:
          "Public platform for catalog, instructors, and enrollment — serious enough for partners, human for learners.",
      },
      {
        id: "ea-cover",
        src: eidenAcademyCover,
        alt: "Eiden Academy guidelines",
        category: "Brand",
        title: "Vert foncé & sarcelle",
        description: "Authority through structure — typography and palette built for executive education.",
      },
      {
        id: "ea-learn",
        src: eidenHero,
        alt: "Eiden Academy learning",
        category: "Product",
        title: "Learner dashboards",
        description: "Progress, cohorts, and admin consoles that make delivery repeatable at scale.",
      },
    ],
  },
  "lunja-village": {
    eyebrow: "Visual story",
    headline: "Surf & nomad — find your swell.",
    subhead:
      "Retro-beach identity, Atlantic energy, and content that sounds like a friend who knows the tide.",
    items: [
      {
        id: "lunja-hero",
        src: lunjaHero,
        alt: "Lunja Village",
        category: "Hospitality",
        title: "Imi Ouddar, alive",
        description:
          "Keppel teal, film grain, and golden hour — a brand built for makers, surfers, and long stays.",
        cta: { label: "lunjavillage.com", href: "https://www.lunjavillage.com/" },
      },
      {
        id: "lunja-cover",
        src: lunjaCover,
        alt: "Lunja mood board",
        category: "Brand board",
        title: "Coastal reference",
        description: "Mood, texture, and type composed before every shoot and post.",
      },
      {
        id: "lunja-atlantic",
        src: lunjaHero,
        alt: "Lunja Atlantic",
        category: "Social",
        title: "Atlantic energy",
        description: "UGC-forward grids and reels — never a hotel brochure, always the tribe.",
      },
    ],
  },
};

export function getCinematicGallery(slug: string): CinematicGalleryStory | undefined {
  return STORIES[slug];
}

/** Fallback from project gallery when no curated story exists. */
export function cinematicGalleryFromProject(project: Project): CinematicGalleryStory | undefined {
  const curated = STORIES[project.slug];
  if (curated) return curated;

  const gallery = project.caseStudy?.gallery;
  if (!gallery?.length) return undefined;

  return {
    eyebrow: "Visual story",
    headline: project.tagline,
    subhead: project.summary,
    items: gallery.map((src, i) => ({
      id: `${project.slug}-${i}`,
      src,
      alt: `${project.title} deliverable ${i + 1}`,
      category: project.category,
      title: project.title,
      description: project.summary,
      ...(project.website && i === 0
        ? { cta: { label: "View project", href: project.website } }
        : {}),
    })),
  };
}
