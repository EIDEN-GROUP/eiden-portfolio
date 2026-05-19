/** Gallery + project detail: covers, routing slugs, and case-study metadata. */
import type { CaseStudyResultTileInput } from "@/data/projectCaseStudy";
import bopassageBrandPalette from "@/assets/bopassage-brand-palette.png";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import bopassageSocialInstagram from "@/assets/bopassage-social-instagram.png";
import bopassageSocialSlowsDown from "@/assets/bopassage-social-slows-down.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenHero from "@/assets/educazen-hero.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/lunja-hero.png";

/** Optional overrides for the project detail case study body. */
export type ProjectCaseStudyOverride = {
  /** Masonry “results” tiles (web, CRM, app…). Omit to derive from gallery images. */
  resultGallery?: readonly CaseStudyResultTileInput[];
  client?: string;
  location?: string;
  timeline?: string;
  challenge?: string;
  goals?: string;
  context?: string;
  gallery?: readonly string[];
  social?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  };
  stats?: readonly {
    prefix: string;
    value: number;
    suffix: string;
    label: string;
  }[];
  finalStatement?: string;
  openingReview?: {
    eyebrow?: string;
    quote?: string;
    author?: string;
    role?: string;
  };
  closingReview?: {
    eyebrow?: string;
    quote?: string;
    author?: string;
    role?: string;
  };
};

export const projects = [
  {
    slug: "bopassage",
    title: "Bôpassage",
    cover: bopassageCover,
    detailHero: bopassageHero,
    summary:
      "Website, social content, and paid media for a signature Agadir café — discoverable online, warm on the feed, and built to fill tables.",
    tagline: "L'endroit où on revient toujours — now with a digital layer to match.",
    category: "Retail & placemaking",
    year: "2024",
    index: "01",
    services: [
      "Website design & development",
      "Social media content",
      "Media buying & ads",
    ],
    website: "https://bopassage.com/",
    caseStudy: {
      gallery: [
        bopassageSocialInstagram,
        bopassageSocialSlowsDown,
        bopassageBrandPalette,
        bopassageHero,
        bopassageCover,
      ],
      challenge:
        "Bô Passage had the atmosphere and the food — but no site, no consistent social rhythm, and no paid layer to turn discovery into reservations.",
      goals:
        "Launch bopassage.com, build an Instagram presence that feels like the room, and run Meta and Google campaigns aimed at brunch habit and table bookings.",
      context:
        "Café & restaurant · Founty, Agadir — delivery focused on web, social content, and media buying only.",
      stats: [
        { prefix: "+", value: 156, suffix: "%", label: "footfall intent" },
        { prefix: "+", value: 89, suffix: "%", label: "social reach" },
        { prefix: "+", value: 64, suffix: "%", label: "brand visibility" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Our site finally feels like the restaurant — warm, clear, easy to book. Social and ads bring people in who actually stay for brunch.",
        author: "Bôpassage",
        role: "Café & restaurant",
      },
    },
  },
  {
    slug: "dmc-morocco",
    title: "DMC",
    cover: dmcCover,
    detailHero: dmcHero,
    summary:
      "Full-funnel luxury travel presence — brand identity, View Morocco website, social storytelling, and performance media for partners and high-intent travelers.",
    tagline: "Morocco’s luxury journeys, orchestrated from mark to inquiry.",
    category: "Travel",
    year: "2023",
    index: "02",
    services: [
      "Website design & development",
      "Branding",
      "Social media content",
      "Media buying & ads",
    ],
    website: "https://www.viewmorocco.com/",
    caseStudy: {
      gallery: [dmcHero, dmcCover, dmcHero],
      challenge:
        "A premium DMC needed one coherent system — brand partners could recognize, a site that converts international intent, and social plus paid that feed the pipeline.",
      goals:
        "Unify branding and View Morocco, grow destination storytelling on social, and scale qualified inquiries through Meta and Google.",
      context:
        "Luxury travel · Morocco — branding, website, social content, and media buying delivered as one composed funnel.",
      stats: [
        { prefix: "+", value: 186, suffix: "%", label: "qualified leads" },
        { prefix: "+", value: 240, suffix: "%", label: "engagement" },
        { prefix: "+", value: 95, suffix: "%", label: "partner satisfaction" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Partners recognize us instantly — brand, site, social, and campaigns all speak the same luxury language, and inquiries are sharper.",
        author: "DMC Morocco",
        role: "Luxury travel",
      },
    },
  },
  {
    slug: "educazen-kids",
    title: "EducazenKids",
    cover: educazenkidsCover,
    detailHero: educazenHero,
    summary:
      "Inclusive education brand online — parent-trusted website, CRM for enrollment teams, reassuring social content, and growth media for Agadir families.",
    tagline: "L'enseignement sur mesure — with the digital stack to match.",
    category: "Education",
    year: "2023",
    index: "03",
    services: [
      "Website design & development",
      "CRM & dashboard",
      "Social media content",
      "Media buying",
    ],
    website: "https://educazenkids.com/",
    caseStudy: {
      gallery: [educazenHero, educazenkidsCover, educazenHero],
      challenge:
        "Parents needed a warm, credible digital front door — while the team juggled leads, follow-up, and outreach across tools that did not talk to each other.",
      goals:
        "Launch educazenkids.com, centralize enrollment in a CRM dashboard, publish inclusive social content, and drive enrollment leads through paid media.",
      context:
        "Centre éducatif & psychosocial · Agadir — website, CRM & dashboard, social content, and media buying.",
      stats: [
        { prefix: "+", value: 198, suffix: "%", label: "enrollment leads" },
        { prefix: "+", value: 67, suffix: "%", label: "admin efficiency" },
        { prefix: "+", value: 92, suffix: "%", label: "parent satisfaction" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Parents find us online with confidence, our team runs enrollment from one dashboard, and social plus ads bring families who are truly aligned.",
        author: "EducazenKids",
        role: "Education",
      },
    },
  },
  {
    slug: "eiden-academy",
    title: "Eiden Academy",
    cover: eidenAcademyCover,
    detailHero: eidenHero,
    summary:
      "Group edtech platform — brand, public website, learner dashboard, social presence, and a gamified English test system in one product motion.",
    tagline: "Institutional knowledge, delivered as a platform students return to.",
    category: "Education & talent",
    year: "2024",
    index: "04",
    services: [
      "Website design & development",
      "Dashboard system",
      "Branding",
      "Social media content",
      "English test system",
    ],
    website: "https://eiden-group.com/",
    caseStudy: {
      gallery: [eidenHero, eidenAcademyCover, eidenHero],
      challenge:
        "Eiden Academy needed to scale group expertise beyond slides — a credible brand, public site, internal dashboards, social proof, and assessment learners would actually finish.",
      goals:
        "Ship branding and the public platform, build admin and student dashboards, grow professional social content, and launch the English test system.",
      context:
        "Education & talent · EIDEN Group — branding, website, dashboard system, social content, and English test system.",
      stats: [
        { prefix: "+", value: 210, suffix: "%", label: "student engagement" },
        { prefix: "+", value: 88, suffix: "%", label: "course completion" },
        { prefix: "+", value: 74, suffix: "%", label: "completion rate" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Brand, site, dashboards, social, and the English test feel like one product — students engage, and our team runs programs with clarity.",
        author: "Eiden Academy",
        role: "Edtech",
      },
    },
  },
  {
    slug: "lunja-village",
    title: "Lunja Village",
    cover: lunjaCover,
    detailHero: lunjaHero,
    summary:
      "Surf & nomad brand for Imi Ouddar — identity, brand board, Atlantic social content, and booking-focused media buying for long-stay guests.",
    tagline: "Surf & nomad cottages — bold on the feed, warm before arrival.",
    category: "Hospitality",
    year: "2024",
    index: "05",
    services: ["Branding", "Brand board", "Social media content", "Media buying"],
    website: "https://www.lunjavillage.com/",
    caseStudy: {
      gallery: [lunjaHero, lunjaCover, lunjaHero],
      challenge:
        "Lunja needed a distinctive coastal identity and a content engine that could compete with generic surf camps — without a website rebuild in scope.",
      goals:
        "Deliver brand and brand board, publish golden-hour social that builds tribe, and run paid media toward booking inquiries from nomads and surfers.",
      context:
        "Hospitality · Imi Ouddar, Taghazout — branding, brand board, social media content, and media buying.",
      stats: [
        { prefix: "+", value: 142, suffix: "%", label: "booking inquiries" },
        { prefix: "+", value: 78, suffix: "%", label: "ad engagement" },
        { prefix: "+", value: 120, suffix: "%", label: "brand warmth" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "The brand board keeps every shoot on brief, social feels like the cottages, and ads bring guests who already understand the vibe.",
        author: "Lunja Village",
        role: "Hospitality",
      },
    },
  },
] as const;

export type Project = (typeof projects)[number] & {
  caseStudy?: ProjectCaseStudyOverride;
  website?: string;
};

export function projectPath(slug: string) {
  return `/projects/${slug}` as const;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
