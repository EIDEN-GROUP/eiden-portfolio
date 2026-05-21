import type { Project } from "@/data/projects";
import bopassageBrandPalette from "@/assets/bopassage-brand-palette.png";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import bopassageOohColumn from "@/assets/bopassage-ooh-column.png";
import bopassageSocialInstagram from "@/assets/bopassage-social-instagram.png";
import bopassageSocialBalance from "@/assets/bopassage-social-balance.png";
import bopassageSocialMatcha from "@/assets/bopassage-social-matcha.png";
import bopassageSocialSavoryMorning from "@/assets/bopassage-social-savory-morning.png";
import bopassageSocialSlowsDown from "@/assets/bopassage-social-slows-down.png";
import bopassageSocialWaffle from "@/assets/bopassage-social-waffle.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import dmcSocialC from "@/assets/dmc-social-c.png";
import dmcSocialD from "@/assets/dmc-social-d.png";
import dmcSocialExcellence from "@/assets/dmc-social-excellence.png";
import dmcSocialM from "@/assets/dmc-social-m.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenHero from "@/assets/educazen-hero.png";
import eidenAcademyBrandCarousel from "@/assets/eiden-academy-brand-carousel.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenAcademySocialAiIntegration from "@/assets/eiden-academy-social-ai-integration.png";
import eidenAcademySocialAiTools from "@/assets/eiden-academy-social-ai-tools.png";
import eidenAcademySocialEcommerce from "@/assets/eiden-academy-social-ecommerce.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/lunja-hero.png";
import lunjaSocial2 from "@/assets/lunja-social-2.png";
import lunjaSocial5 from "@/assets/lunja-social-5.png";
import lunjaSocial6 from "@/assets/lunja-social-6.png";
import medicalBayLobby from "@/assets/medical-bay-lobby.png";
import medicalBayOffice from "@/assets/medical-bay-office.png";
import medicalBayReception from "@/assets/medical-bay-reception.png";

export type CinematicGalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  description: string;
  services?: readonly string[];
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  };
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
    headline: "The place you always come back to.",
    subhead:
      "Botanical warmth, golden-hour plates, and editorial social   one hospitality world from Founty to feed.",
    items: [
      {
        id: "bop-hero",
        src: bopassageHero,
        alt: "Bô Passage interior",
        category: "Hospitality",
        title: "The room, translated online",
        description:
          "A website and visual system that mirror the calm of the restaurant   menus, reservations, and morning light.",
        cta: { label: "Visit bopassage.com", href: "https://bopassage.com/" },
      },
      {
        id: "bop-social-ig",
        src: bopassageSocialInstagram,
        alt: "Bô Passage Instagram",
        category: "Social",
        title: "Feed as invitation",
        description:
          "Instagram grids built to feel like sitting down   not scrolling past another café.",
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
        title: "Forest & gold",
        description: "Forest green and café gold   the duo that holds every touchpoint together.",
      },
      {
        id: "bop-balance",
        src: bopassageSocialBalance,
        alt: "Bô Passage balance",
        category: "Content",
        title: "Taste & freshness",
        description: "A perfect balance of plate and place   editorial food meets the Founty room.",
      },
      {
        id: "bop-waffle",
        src: bopassageSocialWaffle,
        alt: "Bô Passage dessert",
        category: "Content",
        title: "Indulge in sweetness",
        description: "Dessert frames that sell the pause, not just the plate.",
      },
      {
        id: "bop-matcha",
        src: bopassageSocialMatcha,
        alt: "Bô Passage matcha",
        category: "Campaign",
        title: "Matcha moment",
        description: "Golden-hour drinks content built for the feed and the reservation.",
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
    headline: "Hotel expertise, finally with a voice.",
    subhead:
      "Partner-ready identity, operational storytelling, and a B2B digital presence built for hotel owners and international operators.",
    items: [
      {
        id: "dmc-hero",
        src: dmcHero,
        alt: "DMC Hospitality",
        category: "Hospitality",
        title: "DMC Hospitality",
        description:
          "A conversion-led site for hotel owners and partners   expertise, services, and clear contact paths.",
        cta: { label: "Visit dmchm.com", href: "https://dmchm.com/" },
      },
      {
        id: "dmc-excellence",
        src: dmcSocialExcellence,
        alt: "DMC brand campaign",
        category: "Brand",
        title: "Excellence in hospitality",
        description:
          "Forest and gold   editorial campaigns built for owners who expect Moroccan authenticity.",
      },
      {
        id: "dmc-letter-d",
        src: dmcSocialD,
        alt: "DMC expertise",
        category: "Expertise",
        title: "International expertise",
        description: "B2B frames that signal high-touch consulting for hotel owners and operators.",
      },
      {
        id: "dmc-letter-m",
        src: dmcSocialM,
        alt: "DMC management",
        category: "Campaign",
        title: "Tailored support",
        description:
          "Partnership storytelling   structured services and team credibility in every post.",
      },
      {
        id: "dmc-letter-c",
        src: dmcSocialC,
        alt: "DMC consulting",
        category: "Consulting",
        title: "Authenticity & sustainability",
        description:
          "Social content that converts curiosity into qualified hotel project inquiries.",
      },
    ],
  },
  "educazen-kids": {
    eyebrow: "Visual story",
    headline: "Inclusive education, made visible.",
    subhead:
      "Warm digital presence for parents   programmes, psychosocial care, and enrolment paths that build trust.",
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
        description: "Magenta, violet, teal, and gold   inclusivity encoded in every visual layer.",
      },
      {
        id: "edu-crm",
        src: educazenHero,
        alt: "EducazenKids platform",
        category: "Product",
        title: "Enrolment, centralised",
        description: "CRM and dashboard so the team runs outreach without scattered tools.",
      },
    ],
  },
  "eiden-academy": {
    eyebrow: "Visual story",
    headline: "Where operators learn what schools don't teach.",
    subhead:
      "Digital skills training built for professionals and teams in Morocco marketing, AI, e-commerce, and leadership, delivered in-person, online, and on-site for corporate groups.",
    items: [
      {
        id: "ea-hero",
        src: eidenHero,
        alt: "Eiden Academy",
        category: "Edtech",
        title: "Skills you deploy the next day",
        description:
          "Marketing, AI, e-commerce, leadership practical courses for professionals and teams who can't afford to just sit on theory.",
      },
      {
        id: "ea-brand",
        src: eidenAcademyBrandCarousel,
        alt: "Eiden Academy brand",
        category: "Brand",
        title: "From knowledge to real skills",
        description:
          "Institutional crest and campaign system authority through structure and executive education.",
      },
      {
        id: "ea-ai",
        src: eidenAcademySocialAiTools,
        alt: "Master AI Tools",
        category: "Programs",
        title: "Master AI Tools",
        description:
          "3-day AI workshop 15+ tools, 100% practical, built for immediate application.",
      },
      {
        id: "ea-ecommerce",
        src: eidenAcademySocialEcommerce,
        alt: "E-Commerce & Marketplace",
        category: "Programs",
        title: "E-Commerce & Marketplace",
        description: "Training for digital sales SEO, social, and marketplace expertise. ",
      },
      {
        id: "ea-learn",
        src: eidenAcademySocialAiIntegration,
        alt: "AI Integration",
        category: "Campaign",
        title: "AI Integration",
        description: "Feed-ready training frames that convert curiosity into programme sign-ups.",
      },
    ],
  },
  "lunja-village": {
    eyebrow: "Visual story",
    headline: "Surf & nomad   find your swell.",
    subhead:
      "Retro-beach identity, Atlantic energy, and content that sounds like a friend who knows the tide.",
    items: [
      {
        id: "lunja-hero",
        src: lunjaHero,
        alt: "Lunja Village",
        category: "Hospitality",
        title: "Imi Ouaddar, alive",
        description:
          "Keppel teal, film grain, and golden hour   a brand built for makers, surfers, and long stays.",
        cta: { label: "lunjavillage.com", href: "https://www.lunjavillage.com/" },
      },
      {
        id: "lunja-brand-visual",
        src: lunjaCover,
        alt: "Lunja brand",
        category: "Brand",
        title: "Coastal identity",
        description: "Keppel, coral, and film grain   the visual system behind every post.",
      },
      {
        id: "lunja-surf",
        src: lunjaSocial2,
        alt: "Lunja surf social",
        category: "Content",
        title: "Wave incoming",
        description: "Surf culture frames that feel like the Atlantic, not a generic resort ad.",
      },
      {
        id: "lunja-coast",
        src: lunjaSocial5,
        alt: "Lunja coastal social",
        category: "Campaign",
        title: "Stay a little longer",
        description: "Golden-hour storytelling for nomads, surfers, and long-stay guests.",
      },
      {
        id: "lunja-summer",
        src: lunjaSocial6,
        alt: "Lunja Taghazout social",
        category: "Campaign",
        title: "Summer view",
        description: "Taghazout beach energy   authentic, bright, and built for the feed.",
      },
    ],
  },
  "medical-bay": {
    eyebrow: "Visual story",
    headline: "A medical centre, architected.",
    subhead:
      "Brand environment, patient experience, and digital infrastructure designed as one operating system   from first click to follow-up.",
    items: [
      {
        id: "mb-hero",
        src: medicalBayLobby,
        alt: "Medical Bay lobby",
        category: "Healthcare",
        title: "Medical Bay",
        description:
          "A conversion-led presence for patients and partners   services, trust, and clear paths to care.",
        cta: { label: "Visit medicalbay.ma", href: "https://medicalbay.ma/" },
      },
      {
        id: "mb-reception",
        src: medicalBayReception,
        alt: "Medical Bay reception",
        category: "Patient experience",
        title: "Front desk, designed",
        description:
          "Reception and wayfinding that signal clinical excellence and human warmth from the first step inside.",
      },
      {
        id: "mb-office",
        src: medicalBayOffice,
        alt: "Medical Bay consultation office",
        category: "Brand",
        title: "Trust in the room",
        description:
          "Consultation spaces and brand voice aligned with WHO-grade care standards and Moroccan patient expectations.",
      },
      {
        id: "mb-lobby",
        src: medicalBayLobby,
        alt: "Medical Bay brand environment",
        category: "Identity",
        title: "Identity in space",
        description:
          "Logo, wood, glass, and teal   environmental branding that carries the system into every touchpoint.",
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
