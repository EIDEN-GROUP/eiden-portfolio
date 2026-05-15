/** Gallery + project detail: covers, routing slugs, and case-study metadata. */
import type { CaseStudyResultTileInput } from "@/data/projectCaseStudy";
import bopassageWeb from "@/assets/bopassage-web.png";
import educazenkidsWeb from "@/assets/educazenkids-web.png";
import lunjaWeb from "@/assets/lunja.png";
import medicalbayWeb from "@/assets/medicalbay.png";

const CDN = "https://cdn.prod.website-files.com/66387c0fa39192a87e403b2a";

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
  /** Optional override for the opening “client voice” block (defaults from project summary + client name). */
  openingReview?: {
    eyebrow?: string;
    quote?: string;
    author?: string;
    role?: string;
  };
  /** Optional override for the closing review block (defaults from final statement + client name). */
  closingReview?: {
    eyebrow?: string;
    quote?: string;
    author?: string;
    role?: string;
  };
};

export const projects = [
  {
    slug: "all-accor",
    title: "All Accor Morocco",
    cover: `${CDN}/69b2f1fc6db78ce1c7606beb_mischka-mockup.webp`,
    summary:
      "Brand and digital elevation for Accor’s Morocco footprint cohesive guest-facing narratives across properties.",
    tagline: "Hospitality leadership, expressed with regional soul.",
    category: "Hospitality",
    year: "2024",
    index: "01",
    services: ["Brand architecture", "Digital experience", "Campaign narrative"],
    website: "https://www.accor.com",
  },
  {
    slug: "bopassage",
    title: "BoPassage",
    cover: bopassageWeb,
    summary:
      "Retail and placemaking for a signature passage clarity of positioning, visual language, and conversion pathways.",
    tagline: "A destination corridor that moves people and revenue.",
    category: "Retail & placemaking",
    year: "2024",
    index: "02",
    services: ["Positioning", "Visual identity", "Growth ops"],
    website: "https://bopassage.com/",
  },
  {
    slug: "madaef",
    title: "Madaef",
    cover: `${CDN}/69b2f37c75035210d7e5b80c_VISIO%20Mockup.png`,
    summary:
      "Executive-grade storytelling for a Moroccan industrial champion credibility, clarity, and stakeholder alignment.",
    tagline: "Industrial strength with a credible public voice.",
    category: "Industry",
    year: "2023",
    index: "03",
    services: ["Strategic narrative", "Corporate communication", "Stakeholder design"],
    website: "https://www.madaef.ma/",
  },
  {
    slug: "anisal",
    title: "Anisal",
    cover: `${CDN}/69b2f58ae51cbaee09cd98aa_SM%20Mockup.png`,
    summary:
      "Brand systems for a consumer-facing label packaging logic, tone, and shelf presence tuned for growth.",
    tagline: "Flavor-forward branding built for scale.",
    category: "Consumer brand",
    year: "2024",
    index: "04",
    services: ["Brand identity", "Packaging systems", "Launch playbook"],
    website: "https://byanisal.com/",
  },
  {
    slug: "medical-bay",
    title: "Medical Bay",
    cover: medicalbayWeb,
    summary:
      "Patient-centric digital and brand infrastructure for a clinical operator trust, precision, and accessibility.",
    tagline: "Clinical excellence, communicated with calm authority.",
    category: "Health",
    year: "2024",
    index: "05",
    services: ["Service design", "Digital UX", "Compliance-minded content"],
    website: "https://www.medicalbay.ma/",
  },
  {
    slug: "educazen-kids",
    title: "EducazenKids",
    cover: educazenkidsWeb,
    summary:
      "Learning brand for families warm pedagogy, structured journeys, and digital touchpoints parents rely on.",
    tagline: "Where childhood curiosity meets structured growth.",
    category: "Education",
    year: "2023",
    index: "06",
    services: ["Brand & narrative", "Parent journeys", "Digital product"],
    website: "https://educazenkids.com/",
  },
  {
    slug: "lunja-village",
    title: "Lunja Village",
    cover: lunjaWeb,
    summary:
      "Hospitality positioning for a coastal destination story, visual world, and booking-led experience design.",
    tagline: "Seaside living, framed as a signature escape.",
    category: "Hospitality",
    year: "2024",
    index: "07",
    services: ["Destination brand", "Experience design", "Commercial storytelling"],
    website: "https://www.lunjavillage.com/",
  },
  {
    slug: "dmc-morocco",
    title: "DMC Morocco",
    cover: `${CDN}/69b2f96cc5a7990d1e6d434b_Lunar%20Luxe.webp`,
    summary:
      "Luxury DMC narrative high-touch itineraries, partner-ready collateral, and conversion-focused digital surfaces.",
    tagline: "Morocco’s luxury journeys, orchestrated end to end.",
    category: "Travel",
    year: "2023",
    index: "08",
    services: ["Luxury positioning", "Partner enablement", "Performance surfaces"],
    website: "https://www.viewmorocco.com/",
  },
  {
    slug: "chill-out",
    title: "Chill Out",
    cover: `${CDN}/69b2fa6841563eda67506e3c_Mayerfield.webp`,
    summary:
      "Lifestyle F&B brand atmosphere, social velocity, and operational clarity for repeat visitation.",
    tagline: "The room temperature brand everyone talks about.",
    category: "Lifestyle",
    year: "2024",
    index: "09",
    services: ["Concept & naming", "Brand world", "Retention mechanics"],
    website: "https://eiden-group.com/",
  },
  {
    slug: "cabinet",
    title: "Cabinet Conseil",
    cover: `${CDN}/69b2fb0fe1732bc5367d1838_72bbc9197558093.Y3JvcCwxNTQ0LDEyMDcsMCwz.png`,
    summary:
      "Advisory firm identity discretion, senior counsel cues, and proposal-ready brand architecture.",
    tagline: "Counsel that reads as authority, not noise.",
    category: "Professional services",
    year: "2023",
    index: "10",
    services: ["Brand platform", "Thought leadership", "BD collateral"],
    website: "https://eiden-group.com/",
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
