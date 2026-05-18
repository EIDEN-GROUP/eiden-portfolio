import type { ServiceMetric } from "@/components/case-study/primitives";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenHero from "@/assets/educazen-hero.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/lunja-hero.png";

export type ServiceSectionType =
  | "brand-identity"
  | "brand-board"
  | "website-showcase"
  | "social-content"
  | "media-buying"
  | "crm-dashboard"
  | "english-test"
  | "impact";

export type ServiceSectionTheme =
  | "luxury-dark"
  | "fashion-luxury"
  | "warm-organic"
  | "edu-bright"
  | "edtech-future";

export type ServiceSection = {
  id: string;
  type: ServiceSectionType;
  eyebrow: string;
  title: string;
  description?: string;
  brandBookUrl?: string;
  media?: { src: string; alt: string; caption?: string; tall?: boolean }[];
  brandColors?: string[];
  colorLabels?: string[];
  typography?: { label: string; sample: string; size?: string; sampleClass?: string }[];
  features?: string[];
  metrics?: ServiceMetric[];
  beforeAfter?: { before: string; after: string };
  achievements?: string[];
};

export type ProjectServiceConfig = {
  theme: ServiceSectionTheme;
  intro: { left: string; center: string; right: string };
  accentClass: string;
  background: string;
  gradient?: string;
  sections: ServiceSection[];
};

const THEME_STYLES: Record<
  ServiceSectionTheme,
  Pick<ProjectServiceConfig, "accentClass" | "background" | "gradient">
> = {
  "luxury-dark": {
    accentClass: "text-gold/85",
    background: "#060606",
    gradient:
      "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212,175,95,0.08), transparent 55%)",
  },
  "fashion-luxury": {
    accentClass: "text-beige/90",
    background: "#0c0b0a",
    gradient:
      "radial-gradient(ellipse 90% 50% at 80% 20%, rgba(245,235,220,0.06), transparent 50%)",
  },
  "warm-organic": {
    accentClass: "text-gold/80",
    background: "#0d0a08",
    gradient:
      "radial-gradient(ellipse 80% 55% at 20% 30%, rgba(180,120,70,0.1), transparent 55%)",
  },
  "edu-bright": {
    accentClass: "text-mint/90",
    background: "#080a0c",
    gradient:
      "radial-gradient(ellipse 100% 70% at 50% -10%, rgba(45,212,191,0.1), transparent 55%)",
  },
  "edtech-future": {
    accentClass: "text-teal-light/90",
    background: "#06080a",
    gradient:
      "radial-gradient(ellipse 90% 60% at 70% 0%, rgba(80,180,220,0.12), transparent 50%)",
  },
};

function m(src: string, alt: string, caption?: string, tall?: boolean) {
  return { src, alt, caption, tall };
}

const DMC_CONFIG: ProjectServiceConfig = {
  theme: "luxury-dark",
  intro: {
    left: "EIDEN delivery",
    center: "Brand, website, social content, and paid media — one luxury travel system.",
    right: "DMC",
  },
  ...THEME_STYLES["luxury-dark"],
  sections: [
    {
      id: "dmc-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "A partner-ready mark for Morocco’s luxury journeys.",
      description:
        "Identity built for B2B recognition and traveler trust — logo, palette, and editorial type that hold across collateral and digital.",
      brandColors: ["#0a0f14", "#c9a962", "#1a3d4a", "#f4f0e8"],
      colorLabels: ["Midnight", "Gold", "Atlas teal", "Ivory"],
      typography: [
        {
          label: "Display",
          sample: "Morocco, orchestrated.",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-display font-semibold tracking-[-0.04em]",
        },
        {
          label: "Editorial",
          sample: "Itineraries with intention — every touchpoint composed.",
          sampleClass: "font-editorial italic text-white/70",
        },
      ],
      media: [
        m(dmcHero, "DMC brand mockup", "Brand reveal"),
        m(dmcCover, "DMC collateral", "Partner kit"),
        m(dmcHero, "DMC stationery", "Print system", true),
      ],
    },
    {
      id: "dmc-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A conversion-led site for travelers and travel partners.",
      description:
        "View Morocco’s digital front door — cinematic scroll, clear inquiry paths, and a build optimized for international discovery.",
      features: ["Itinerary storytelling", "Inquiry & booking flows", "Performance-first build", "Partner-ready structure"],
      media: [
        m(dmcHero, "DMC website desktop", "Home"),
        m(dmcCover, "DMC website mobile", "Mobile"),
        m(dmcHero, "DMC booking flow", "Booking"),
        m(dmcCover, "DMC destination page", "Destinations"),
      ],
    },
    {
      id: "dmc-social",
      type: "social-content",
      eyebrow: "Social media content",
      title: "Cinematic storytelling for itineraries, destinations, and partner trust.",
      description:
        "Carousels, reels, and static posts that translate high-touch travel into scroll-native desire — always aligned with the brand system.",
      features: ["Destination reels", "Partner spotlights", "Itinerary carousels", "Story templates"],
      media: [
        m(dmcHero, "DMC Instagram feed", "Feed"),
        m(dmcCover, "DMC reel frame", "Reels"),
        m(dmcHero, "DMC carousel", "Carousel", true),
      ],
    },
    {
      id: "dmc-ads",
      type: "media-buying",
      eyebrow: "Media buying & ads",
      title: "Paid campaigns that turn luxury intent into qualified inquiries.",
      description:
        "Meta and Google funnels with creative testing tied to landing engagement and partner-ready lead quality.",
      metrics: [
        { prefix: "+", value: 186, suffix: "%", label: "qualified leads" },
        { prefix: "-", value: 34, suffix: "%", label: "cost per inquiry" },
        { prefix: "+", value: 4, suffix: "× ROAS", label: "peak performance" },
        { prefix: "+", value: 72, suffix: "%", label: "landing engagement" },
      ],
      media: [
        m(dmcCover, "DMC ad creative", "Meta carousel"),
        m(dmcHero, "DMC Google display", "Display"),
        m(dmcCover, "DMC retargeting", "Retargeting"),
      ],
    },
  ],
};

const BOPASSAGE_CONFIG: ProjectServiceConfig = {
  theme: "fashion-luxury",
  intro: {
    left: "EIDEN delivery",
    center: "Website, social content, and paid media for Agadir’s signature café corridor.",
    right: "Bôpassage",
  },
  ...THEME_STYLES["fashion-luxury"],
  sections: [
    {
      id: "bop-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A digital home for menus, reservations, and the Founty experience.",
      description:
        "bopassage.com — warm editorial layout, mobile-first booking paths, and a site that mirrors the botanical calm of the restaurant.",
      features: ["Menu & brunch showcase", "Reservation flows", "Editorial storytelling", "Mobile-first UX"],
      media: [
        m(bopassageHero, "Bôpassage desktop", "Desktop"),
        m(bopassageCover, "Bôpassage mobile", "Mobile"),
        m(bopassageHero, "Bôpassage tenant page", "Tenants"),
      ],
    },
    {
      id: "bop-social",
      type: "social-content",
      eyebrow: "Social media content",
      title: "Warm, evocative posts that make people want to sit down and stay.",
      description:
        "Instagram-first content — golden-hour plates, morning coffee rituals, and captions written in Bô Passage’s intimate, Agadir-rooted voice.",
      features: ["Feed & stories", "Reels & coulisses", "Menu highlights", "Local Agadir tone"],
      media: [
        m(bopassageCover, "Bôpassage Instagram", "Feed"),
        m(bopassageHero, "Bôpassage reel", "Reels"),
        m(bopassageCover, "Bôpassage story", "Stories", true),
      ],
    },
    {
      id: "bop-ads",
      type: "media-buying",
      eyebrow: "Media buying & ads",
      title: "Meta and Google campaigns that fill tables and build habit.",
      description:
        "Performance creative aimed at footfall and reservations — brunch discovery, retargeting, and local intent in Agadir Bay.",
      metrics: [
        { prefix: "+", value: 156, suffix: "%", label: "footfall intent" },
        { prefix: "+", value: 89, suffix: "%", label: "social reach" },
        { prefix: "-", value: 28, suffix: "%", label: "CPA" },
        { prefix: "+", value: 3, suffix: "× ROAS", label: "campaigns" },
      ],
      media: [
        m(bopassageCover, "Bôpassage ad", "Meta"),
        m(bopassageHero, "Bôpassage display", "Google"),
      ],
    },
  ],
};

const LUNJA_CONFIG: ProjectServiceConfig = {
  theme: "warm-organic",
  intro: {
    left: "EIDEN delivery",
    center: "Brand identity, brand board, social content, and media buying for surf & nomad living.",
    right: "Lunja",
  },
  ...THEME_STYLES["warm-organic"],
  sections: [
    {
      id: "lunja-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Retro-beach identity for Imi Ouddar’s surf & nomad cottages.",
      description:
        "Full brand system — Keppel teal, film-grain photography direction, and a bold voice built for makers, surfers, and long-stay guests.",
      brandBookUrl: "https://eiden-group.com/brand-books/lunja-brand-book",
      brandColors: ["#2BBAA5", "#FDF5D3", "#FFD100", "#F96635"],
      colorLabels: ["Keppel", "Crème douce", "Jo&Joe yellow", "Corail"],
      typography: [
        {
          label: "Display",
          sample: "Surf & Nomad Cottages",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-display font-semibold tracking-[-0.04em]",
        },
        {
          label: "Script",
          sample: "Imi Ouddar · Taghazout",
          sampleClass: "font-editorial italic text-white/70",
        },
      ],
      media: [
        m(lunjaHero, "Lunja logo", "Logo"),
        m(lunjaCover, "Lunja mockup", "Mockup"),
      ],
    },
    {
      id: "lunja-board",
      type: "brand-board",
      eyebrow: "Brand board",
      title: "Mood, texture, and type composed into one coastal reference.",
      description:
        "A living board of photography, palette, and typographic pairings — the visual shorthand teams use before every shoot and post.",
      brandBookUrl: "https://eiden-group.com/brand-books/lunja-brand-book",
      media: [
        m(lunjaHero, "Lunja board hero", "Mood"),
        m(lunjaCover, "Lunja texture", "Texture"),
        m(lunjaHero, "Lunja type", "Type"),
        m(lunjaCover, "Lunja palette", "Palette"),
        m(lunjaHero, "Lunja photography", "Photo", true),
      ],
    },
    {
      id: "lunja-social",
      type: "social-content",
      eyebrow: "Social media content",
      title: "Atlantic energy in every frame — UGC, reels, and tribe-building posts.",
      description:
        "Golden-hour grids, nomad day-in-the-life reels, and captions that sound like a friend who knows the swell — never a hotel brochure.",
      features: ["Instagram grid", "Reels & stories", "UGC amplification", "WhatsApp community tone"],
      media: [
        m(lunjaHero, "Lunja Instagram", "Feed"),
        m(lunjaCover, "Lunja reel", "Reels"),
        m(lunjaHero, "Lunja story", "Stories", true),
      ],
    },
    {
      id: "lunja-ads",
      type: "media-buying",
      eyebrow: "Media buying",
      title: "Paid campaigns targeting nomads, surfers, and booking intent.",
      description:
        "Meta and Google growth across UK, France, and Germany — surf camp, coliving, and remote-work keywords tied to inquiry volume.",
      metrics: [
        { prefix: "+", value: 142, suffix: "%", label: "booking inquiries" },
        { prefix: "+", value: 78, suffix: "%", label: "ad engagement" },
        { prefix: "+", value: 3, suffix: "× ROAS", label: "bookings" },
      ],
      media: [m(lunjaCover, "Lunja ad", "Creative"), m(lunjaHero, "Lunja retarget", "Retarget")],
    },
  ],
};

const EDUCAZEN_CONFIG: ProjectServiceConfig = {
  theme: "edu-bright",
  intro: {
    left: "EIDEN delivery",
    center: "Website, CRM & dashboard, social content, and enrollment-focused media buying.",
    right: "EducazenKids",
  },
  ...THEME_STYLES["edu-bright"],
  sections: [
    {
      id: "edu-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A parent-trusted site for programs, team, and enrollment.",
      description:
        "educazenkids.com — bright, accessible UI with clear paths to programs, the psychosocial pole, and EducaBlog resources parents rely on.",
      features: ["Program discovery", "Team & pole psychosocial", "EducaBlog", "Enrollment forms"],
      media: [
        m(educazenHero, "EducazenKids desktop", "Desktop"),
        m(educazenkidsCover, "EducazenKids mobile", "Mobile"),
        m(educazenHero, "EducazenKids programs", "Programs"),
      ],
    },
    {
      id: "edu-crm",
      type: "crm-dashboard",
      eyebrow: "CRM & dashboard",
      title: "One console for leads, parents, and team follow-up.",
      description:
        "Pipeline visibility, parent communication, and campaign analytics — built so Agadir’s team runs enrollment without scattered tools.",
      features: ["Lead pipeline", "Parent CRM", "Campaign analytics", "Team workflows"],
      metrics: [
        { prefix: "+", value: 67, suffix: "%", label: "admin efficiency" },
        { prefix: "+", value: 41, suffix: "%", label: "response speed" },
      ],
      media: [
        m(educazenHero, "EducazenKids dashboard", "Dashboard"),
        m(educazenkidsCover, "EducazenKids analytics", "Analytics", true),
        m(educazenHero, "EducazenKids CRM", "CRM"),
      ],
    },
    {
      id: "edu-social",
      type: "social-content",
      eyebrow: "Social media content",
      title: "Reassuring, inclusive content for parents discovering neuro-atypical paths.",
      description:
        "Pastel carousels, center-life reels, and empathetic captions — expertise without jargon, always centered on the child’s potential.",
      features: ["Instagram carousels", "Parent testimonials", "EducaTips reels", "Facebook community"],
      media: [
        m(educazenkidsCover, "EducazenKids feed", "Feed"),
        m(educazenHero, "EducazenKids carousel", "Carousel"),
        m(educazenkidsCover, "EducazenKids reel", "Reels", true),
      ],
    },
    {
      id: "edu-ads",
      type: "media-buying",
      eyebrow: "Media buying",
      title: "Enrollment campaigns across Meta and Google.",
      description:
        "Lead-focused funnels for Agadir families and expat parents — creative that explains HPI, TDAH, and DYS with warmth, not alarm.",
      metrics: [
        { prefix: "+", value: 198, suffix: "%", label: "enrollment leads" },
        { prefix: "+", value: 52, suffix: "%", label: "reach" },
        { prefix: "+", value: 3, suffix: "× ROAS", label: "growth" },
      ],
      media: [m(educazenkidsCover, "EducazenKids ads", "Ads")],
    },
  ],
};

const EIDEN_ACADEMY_CONFIG: ProjectServiceConfig = {
  theme: "edtech-future",
  intro: {
    left: "EIDEN delivery",
    center: "Branding, website, dashboard system, social content, and English assessment.",
    right: "Academy",
  },
  ...THEME_STYLES["edtech-future"],
  sections: [
    {
      id: "ea-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Institutional credibility with a forward-looking edtech signal.",
      description:
        "Logo, teal-and-violet palette, and typographic hierarchy that positions Eiden Academy as both serious and inviting to learners.",
      brandColors: ["#06080c", "#3dd6c6", "#8b7cf8", "#e8ecf4"],
      colorLabels: ["Void", "Signal teal", "Insight violet", "Paper"],
      media: [m(eidenHero, "Eiden Academy brand", "Brand"), m(eidenAcademyCover, "Eiden guidelines", "Guidelines")],
    },
    {
      id: "ea-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "Program storytelling and enrollment on a scroll-native platform.",
      description:
        "The public face of the academy — catalog, instructors, resources, and flows that make institutional training feel like a product worth returning to.",
      features: ["Program catalog", "Instructor profiles", "Enrollment", "Resource hub"],
      media: [
        m(eidenHero, "Eiden Academy web", "Desktop"),
        m(eidenAcademyCover, "Eiden Academy mobile", "Mobile"),
        m(eidenHero, "Eiden Academy learning", "Learning"),
      ],
    },
    {
      id: "ea-dashboard",
      type: "crm-dashboard",
      eyebrow: "Dashboard system",
      title: "Student progress and admin operations in one live console.",
      description:
        "Cohort analytics, content management, and role-based views — the internal layer that scales curriculum delivery across the group.",
      features: ["Student progress", "Admin console", "Cohort analytics", "Content management"],
      metrics: [
        { prefix: "+", value: 74, suffix: "%", label: "completion rate" },
        { prefix: "+", value: 58, suffix: "%", label: "admin throughput" },
      ],
      media: [
        m(eidenHero, "Eiden dashboard", "Dashboard"),
        m(eidenAcademyCover, "Eiden admin", "Admin", true),
        m(eidenHero, "Eiden analytics", "Analytics"),
      ],
    },
    {
      id: "ea-social",
      type: "social-content",
      eyebrow: "Social media content",
      title: "Content that positions the academy as a credible talent pipeline.",
      description:
        "Program highlights, student outcomes, and thought-leadership posts — professional enough for partners, human enough for learners.",
      features: ["Program spotlights", "Learner stories", "LinkedIn & Instagram", "Enrollment CTAs"],
      media: [
        m(eidenAcademyCover, "Eiden Academy social", "Feed"),
        m(eidenHero, "Eiden Academy reel", "Reels"),
        m(eidenAcademyCover, "Eiden Academy carousel", "Carousel", true),
      ],
    },
    {
      id: "ea-test",
      type: "english-test",
      eyebrow: "English test system",
      title: "Gamified English assessment with levels learners want to complete.",
      description:
        "Adaptive quizzes, progress rings, and certification paths — assessment designed as motivation, not a barrier.",
      features: ["Adaptive quizzes", "Progress rings", "Certification paths", "Leaderboards"],
      media: [
        m(eidenAcademyCover, "English test UI", "Quiz"),
        m(eidenHero, "English test progress", "Progress"),
        m(eidenAcademyCover, "English test results", "Results"),
      ],
    },
  ],
};

const CONFIG_BY_SLUG: Record<string, ProjectServiceConfig> = {
  "dmc-morocco": DMC_CONFIG,
  bopassage: BOPASSAGE_CONFIG,
  "lunja-village": LUNJA_CONFIG,
  "educazen-kids": EDUCAZEN_CONFIG,
  "eiden-academy": EIDEN_ACADEMY_CONFIG,
};

export function getProjectServiceConfig(slug: string): ProjectServiceConfig | undefined {
  return CONFIG_BY_SLUG[slug];
}
