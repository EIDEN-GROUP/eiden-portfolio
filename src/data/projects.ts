/** Gallery + project detail: covers, routing slugs, and case-study metadata. */
import type { CaseStudyResultTileInput } from "@/data/projectCaseStudy";
import bopassageBrandPalette from "@/assets/bopassage-brand-palette.png";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import bopassageSocialBalance from "@/assets/bopassage-social-balance.png";
import bopassageSocialInstagram from "@/assets/bopassage-social-instagram.png";
import bopassageSocialMatcha from "@/assets/bopassage-social-matcha.png";
import bopassageSocialSlowsDown from "@/assets/bopassage-social-slows-down.png";
import bopassageSocialWaffle from "@/assets/bopassage-social-waffle.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import dmcHeroDetail from "@/assets/dmc-hero-2.png";
import dmcSocialC from "@/assets/dmc-social-c.png";
import dmcSocialD from "@/assets/dmc-social-d.png";
import dmcSocialExcellence from "@/assets/dmc-social-excellence.png";
import dmcSocialM from "@/assets/dmc-social-m.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenkidsScroll1 from "@/assets/educazenkids-scroll-1.png";
import educazenkidsScroll2 from "@/assets/educazenkids-scroll-2.png";
import educazenkidsScroll3 from "@/assets/educazenkids-scroll-3.png";
import educazenkidsWebsiteBanner from "@/assets/educazenkids-website-banner.png";
import educazenHero from "@/assets/educazen-hero.png";
import eidenAcademyBrandCarousel from "@/assets/eiden-academy-brand-carousel.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenAcademySocialAiIntegration from "@/assets/eiden-academy-social-ai-integration.png";
import eidenAcademySocialAiTools from "@/assets/eiden-academy-social-ai-tools.png";
import eidenAcademySocialEcommerce from "@/assets/eiden-academy-social-ecommerce.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/image lunja village portfoliio.png";
import lunjaSocial1 from "@/assets/lunja-social-1.png";
import lunjaSocial2 from "@/assets/lunja-social-2.png";
import lunjaSocial3 from "@/assets/lunja-social-3.png";
import lunjaSocial4 from "@/assets/lunja-social-4.png";
import lunjaSocial5 from "@/assets/lunja-social-5.png";
import lunjaSocial6 from "@/assets/lunja-social-6.png";
import lunjaSocial7 from "@/assets/lunja-social-7.png";

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
    summary: "Website, social, and paid media to fill tables.",
    tagline: "L'endroit où on revient toujours   now with a digital layer to match.",
    category: "Retail & placemaking",
    year: "2024",
    index: "01",
    services: ["Website design & development", "Social media content", "Media buying & ads"],
    website: "https://bopassage.com/",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/bo.passage/",
        facebook: "https://www.facebook.com/bopassage",
        tiktok: "https://www.tiktok.com/@bopassage",
      },
      gallery: [
        bopassageSocialBalance,
        bopassageSocialWaffle,
        bopassageSocialMatcha,
        bopassageSocialInstagram,
        bopassageSocialSlowsDown,
        bopassageHero,
        bopassageCover,
      ],
      resultGallery: [
        {
          src: bopassageSocialBalance,
          alt: "Bô Passage — A perfect balance of taste & freshness",
          caption: "Balance",
          variant: "hero",
        },
        {
          src: bopassageSocialWaffle,
          alt: "Bô Passage — Indulge in sweetness",
          caption: "Dessert",
          variant: "tall",
        },
        {
          src: bopassageSocialMatcha,
          alt: "Bô Passage — Matcha moment",
          caption: "Matcha",
          variant: "sm",
        },
        {
          src: bopassageSocialInstagram,
          alt: "Bô Passage Instagram",
          caption: "Social",
          variant: "wide",
        },
        { src: bopassageHero, alt: "Bô Passage interior", caption: "Hospitality", variant: "tall" },
        { src: bopassageCover, alt: "Bô Passage brand", caption: "Brand", variant: "sm" },
      ],
      challenge:
        "Bô Passage had the atmosphere and the food   but no site, no consistent social rhythm, and no paid layer to turn discovery into reservations.",
      goals:
        "Launch bopassage.com, build an Instagram presence that feels like the room, and run Meta and Google campaigns aimed at brunch habit and table bookings.",
      context:
        "Café & restaurant · Founty, Agadir   delivery focused on web, social content, and media buying only.",
      stats: [
        { prefix: "+", value: 156, suffix: "%", label: "footfall intent" },
        { prefix: "+", value: 89, suffix: "%", label: "social reach" },
        { prefix: "+", value: 64, suffix: "%", label: "brand visibility" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Our site finally feels like the restaurant   warm, clear, easy to book. Social and ads bring people in who actually stay for brunch.",
        author: "Bôpassage",
        role: "Café & restaurant",
      },
    },
  },
  {
    slug: "dmc-morocco",
    title: "DMC",
    cover: dmcCover,
    detailHero: dmcHeroDetail,
    summary: "Morocco hospitality brand with DMC website and performance media.",
    tagline: "Authenticité & excellence   hotel expertise from mark to inquiry.",
    category: "Hospitality",
    year: "2023",
    index: "02",
    services: [
      "Website design & development",
      "Branding",
      "Social media content",
      "Media buying & ads",
    ],
    website: "https://dmchm.com/",
    caseStudy: {
      gallery: [dmcSocialExcellence, dmcSocialD, dmcSocialM, dmcSocialC, dmcHero, dmcCover],
      resultGallery: [
        {
          src: dmcSocialExcellence,
          alt: "DMC Hospitality — L'excellence en hôtellerie depuis 2012",
          caption: "Brand campaign",
          variant: "hero",
        },
        { src: dmcSocialD, alt: "DMC Hospitality — D", caption: "Expertise", variant: "tall" },
        { src: dmcSocialM, alt: "DMC Hospitality — M", caption: "Management", variant: "sm" },
        { src: dmcSocialC, alt: "DMC Hospitality — C", caption: "Consulting", variant: "wide" },
        { src: dmcHero, alt: "DMC Hospitality website", caption: "Website", variant: "tall" },
        { src: dmcCover, alt: "DMC Hospitality collateral", caption: "Collateral", variant: "sm" },
      ],
      challenge:
        "DMC Hospitality needed one coherent system   a mark partners trust, a site that explains pré-ouverture through optimisation with clarity, and social plus paid that bring qualified hotel projects.",
      goals:
        "Unify branding and dmchm.com, present team expertise and service phases with confidence, and scale qualified inquiries from owners and operators across Morocco.",
      context:
        "Conseil & gestion hôtelière · Maroc   branding, website, social content, and media buying delivered as one composed funnel.",
      stats: [
        { prefix: "+", value: 186, suffix: "%", label: "qualified leads" },
        { prefix: "+", value: 240, suffix: "%", label: "engagement" },
        { prefix: "+", value: 95, suffix: "%", label: "partner satisfaction" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Partners recognize us instantly   brand, site, social, and campaigns all speak the same language of hotel excellence, and project inquiries are sharper.",
        author: "DMC Hospitality",
        role: "Hotel consulting",
      },
    },
  },
  {
    slug: "educazen-kids",
    title: "EducazenKids",
    cover: educazenkidsCover,
    detailHero: educazenHero,
    summary: "Parent-trusted platform with CRM and growth media for Agadir families.",
    tagline: "L'enseignement sur mesure   with the digital stack to match.",
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
      resultGallery: [
        {
          src: educazenkidsWebsiteBanner,
          alt: "EducazenKids website homepage",
          caption: "Website",
          variant: "hero",
        },
        {
          src: educazenHero,
          alt: "EducazenKids website desktop",
          caption: "Programs",
          variant: "tall",
        },
        {
          src: educazenkidsCover,
          alt: "EducazenKids website mobile",
          caption: "Mobile",
          variant: "sm",
        },
        {
          src: educazenkidsScroll1,
          alt: "EducazenKids social  travailler ensemble pour des apprentissages épanouis",
          caption: "Social content",
          variant: "wide",
        },
        {
          src: educazenkidsScroll2,
          alt: "EducazenKids social  grandir avec un esprit serein et un corps épanoui",
          caption: "Brand campaign",
          variant: "tall",
        },
        {
          src: educazenkidsScroll3,
          alt: "EducazenKids social  curiosité, grandir à son rythme",
          caption: "Social creative",
          variant: "sm",
        },
      ],
      challenge:
        "Parents needed a warm, credible digital front door   while the team juggled leads, follow-up, and outreach across tools that did not talk to each other.",
      goals:
        "Launch educazenkids.com, centralize enrollment in a CRM dashboard, publish inclusive social content, and drive enrollment leads through paid media.",
      context:
        "Centre éducatif & psychosocial · Agadir   website, CRM & dashboard, social content, and media buying.",
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
    summary: "Learning brand with dashboard and institutional platform.",
    tagline: "Institutional knowledge, delivered as a platform students return to.",
    category: "Education & talent",
    year: "2024",
    index: "04",
    services: [
      "Website design & development",
      "Dashboard system",
      "Branding",
      "Social media content",
    ],
    website: "https://eiden-group.com/",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/eiden.group/",
        facebook: "https://www.facebook.com/eiden.group/",
        tiktok: "https://www.tiktok.com/@eiden.group",
      },
      gallery: [
        eidenAcademyBrandCarousel,
        eidenAcademySocialAiTools,
        eidenAcademySocialAiIntegration,
        eidenAcademySocialEcommerce,
        eidenHero,
        eidenAcademyCover,
      ],
      resultGallery: [
        {
          src: eidenAcademyBrandCarousel,
          alt: "Eiden Academy — De la connaissance aux compétences réelles",
          caption: "Brand",
          variant: "hero",
        },
        {
          src: eidenAcademySocialAiTools,
          alt: "Eiden Academy — Master AI Tools & Applications",
          caption: "AI formation",
          variant: "tall",
        },
        {
          src: eidenAcademySocialAiIntegration,
          alt: "Eiden Academy — Formation intégration IA",
          caption: "AI integration",
          variant: "sm",
        },
        {
          src: eidenAcademySocialEcommerce,
          alt: "Eiden Academy — Formation E-Commerce & Marketplace",
          caption: "E-commerce",
          variant: "wide",
        },
        { src: eidenHero, alt: "Eiden Academy platform", caption: "Platform", variant: "tall" },
        {
          src: eidenAcademyCover,
          alt: "Eiden Academy guidelines",
          caption: "Guidelines",
          variant: "sm",
        },
      ],
      challenge:
        "Eiden Academy needed to scale group expertise beyond slides   a credible brand, public site, internal dashboards, social proof, and assessment learners would actually finish.",
      goals:
        "Ship branding and the public platform, build admin and student dashboards, and grow professional social content.",
      context:
        "Education & talent · EIDEN Group   branding, website, dashboard system, and social content.",
      stats: [
        { prefix: "+", value: 210, suffix: "%", label: "student engagement" },
        { prefix: "+", value: 88, suffix: "%", label: "course completion" },
        { prefix: "+", value: 74, suffix: "%", label: "completion rate" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Brand, site, dashboards, and social feel like one product   students engage, and our team runs programs with clarity.",
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
    summary: "Imi Ouddar identity with social content and booking media.",
    tagline: "Surf & nomad cottages   bold on the feed, warm before arrival.",
    category: "Hospitality",
    year: "2024",
    index: "05",
    services: ["Branding", "Social media content", "Media buying"],
    website: "https://www.lunjavillage.com/",
    caseStudy: {
      gallery: [
        lunjaHero,
        lunjaCover,
        lunjaSocial2,
        lunjaSocial3,
        lunjaSocial5,
        lunjaSocial6,
        lunjaSocial7,
      ],
      resultGallery: [
        {
          src: lunjaSocial1,
          alt: "Lunja Village  N'attends plus yoga",
          caption: "Social",
          variant: "hero",
        },
        { src: lunjaSocial2, alt: "Lunja Village  Vague en vue", caption: "Surf", variant: "tall" },
        {
          src: lunjaSocial3,
          alt: "Lunja Village  sunset surfboards",
          caption: "Golden hour",
          variant: "sm",
        },
        {
          src: lunjaSocial4,
          alt: "Lunja Village  Taghazout skate park",
          caption: "Skate",
          variant: "wide",
        },
        {
          src: lunjaSocial5,
          alt: "Lunja Village  stay a little longer",
          caption: "Coast",
          variant: "tall",
        },
        {
          src: lunjaSocial6,
          alt: "Lunja Village  summer view Taghazout",
          caption: "Taghazout",
          variant: "sm",
        },
        {
          src: lunjaSocial7,
          alt: "Lunja Village  clear minds",
          caption: "Wellness",
          variant: "hero",
        },
      ],
      challenge:
        "Lunja needed a distinctive coastal identity and a content engine that could compete with generic surf camps   without a website rebuild in scope.",
      goals:
        "Deliver brand identity, publish golden-hour social that builds tribe, and run paid media toward booking inquiries from nomads and surfers.",
      context:
        "Hospitality · Imi Ouddar, Taghazout   branding, social media content, and media buying.",
      stats: [
        { prefix: "+", value: 142, suffix: "%", label: "booking inquiries" },
        { prefix: "+", value: 78, suffix: "%", label: "ad engagement" },
        { prefix: "+", value: 120, suffix: "%", label: "brand warmth" },
      ],
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "The brand keeps every shoot on brief, social feels like the cottages, and ads bring guests who already understand the vibe.",
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
