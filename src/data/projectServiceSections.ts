import type { ServiceMetric } from "@/components/case-study/primitives";
import { getProjectTheme } from "@/data/projectThemes";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import educazenkidsBefore from "@/assets/educazenkids-before.svg";
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
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
  achievements?: string[];
};

export type ProjectServiceConfig = {
  theme: ServiceSectionTheme;
  intro: { left: string; center: string; right: string };
  /** @deprecated Prefer theme accent via CSS variables; kept for gradual migration */
  accentClass: string;
  accentColor: string;
  background: string;
  gradient?: string;
  sections: ServiceSection[];
};

function stylesForSlug(slug: string): Pick<ProjectServiceConfig, "accentClass" | "accentColor" | "background" | "gradient"> {
  const t = getProjectTheme(slug);
  return {
    accentClass: "text-[var(--project-accent)]",
    accentColor: t.colors.accent,
    background: t.colors.canvas,
    gradient: t.gradients.section,
  };
}

function m(src: string, alt: string, caption?: string, tall?: boolean) {
  return { src, alt, caption, tall };
}

const DMC_CONFIG: ProjectServiceConfig = {
  theme: "luxury-dark",
  intro: {
    left: "EIDEN delivery",
    center: "Brand, website, and paid media — one hotel consulting system.",
    right: "DMC",
  },
  ...stylesForSlug("dmc-morocco"),
  sections: [
    {
      id: "dmc-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "A partner-ready mark for Morocco’s hotel expertise.",
      description:
        "Identity built for B2B recognition and owner trust — logo, palette, and editorial type that hold across collateral and digital.",
      brandBookUrl: "https://eiden-group.com/brand-books/dmc-brand-book",
      brandColors: ["#2C3830", "#D4B896", "#4A6153", "#E8D5B5"],
      colorLabels: ["Forêt profonde", "Or", "Forêt claire", "Sable"],
      typography: [
        {
          label: "Display · Playfair",
          sample: "DMC Hospitality",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-display font-semibold tracking-[-0.03em]",
        },
        {
          label: "Editorial · Cormorant",
          sample: "Authenticité & Excellence",
          sampleClass: "font-editorial italic opacity-80",
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
      title: "A conversion-led site for hotel owners and operators.",
      description:
        "dmchm.com as the digital front door — expertise, phased services, team credibility, and contact flows optimized for Marrakech and international discovery.",
      features: [
        "Expertise & team storytelling",
        "Service phases & methodology",
        "Contact & inquiry flows",
        "Performance-first build",
      ],
      media: [
        m(dmcHero, "DMC website desktop", "Home"),
        m(dmcCover, "DMC website mobile", "Mobile"),
        m(dmcHero, "DMC services", "Services"),
        m(dmcCover, "DMC expertise", "Expertise"),
      ],
    },
    {
      id: "dmc-ads",
      type: "media-buying",
      eyebrow: "Media buying & ads",
      title: "Paid campaigns that turn hotel-project intent into qualified inquiries.",
      description:
        "Meta and Google funnels with creative testing tied to landing engagement and partner-ready lead quality — structured for owners, operators, and B2B hospitality conversion.",
      features: [
        "Meta & Google acquisition",
        "Creative iteration by market",
        "Retargeting & inquiry funnels",
        "Landing-page alignment",
      ],
    },
  ],
};

const BOPASSAGE_CONFIG: ProjectServiceConfig = {
  theme: "fashion-luxury",
  intro: {
    left: "EIDEN delivery",
    center: "Website and paid media for Agadir’s signature café corridor.",
    right: "Bôpassage",
  },
  ...stylesForSlug("bopassage"),
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
      id: "bop-ads",
      type: "media-buying",
      eyebrow: "Media buying & ads",
      title: "Meta and Google campaigns that fill tables and build habit.",
      description:
        "Performance campaigns aimed at footfall and reservations — brunch discovery, retargeting, and local intent across Agadir Bay.",
      features: [
        "Meta reservation campaigns",
        "Google local intent",
        "Brunch & breakfast discovery",
        "Retargeting for repeat visits",
      ],
    },
  ],
};

const LUNJA_CONFIG: ProjectServiceConfig = {
  theme: "warm-organic",
  intro: {
    left: "EIDEN delivery",
    center: "Brand identity, brand board, and media buying for surf & nomad living.",
    right: "Lunja",
  },
  ...stylesForSlug("lunja-village"),
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
          label: "Display · Cormorant",
          sample: "Surf & Nomad Cottages",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-display font-semibold tracking-[-0.04em]",
        },
        {
          label: "Script · Great Vibes",
          sample: "Imi Ouddar · Taghazout",
          sampleClass: "font-editorial text-[clamp(1.75rem,4vw,2.75rem)] leading-none opacity-90",
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
      id: "lunja-ads",
      type: "media-buying",
      eyebrow: "Media buying",
      title: "Paid campaigns targeting nomads, surfers, and booking intent.",
      description:
        "Meta and Google growth across UK, France, and Germany — surf camp, coliving, and remote-work keywords aligned with long-stay booking cycles.",
      features: [
        "UK · France · Germany markets",
        "Surf camp & coliving keywords",
        "Nomad & remote-work targeting",
        "Inquiry-to-booking funnels",
      ],
    },
  ],
};

const EDUCAZEN_CONFIG: ProjectServiceConfig = {
  theme: "edu-bright",
  intro: {
    left: "EIDEN delivery",
    center: "Website, CRM & dashboard, and enrollment-focused media buying.",
    right: "EducazenKids",
  },
  ...stylesForSlug("educazen-kids"),
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
      id: "edu-impact",
      type: "impact",
      eyebrow: "Website redesign",
      title: "From a dated presence to a parent-trusted enrollment platform.",
      description:
        "The previous site lacked clear program paths, psychosocial positioning, and enrollment flows. We rebuilt educazenkids.com around the brand system — accessible UI, EducaBlog, and forms parents complete with confidence.",
      beforeAfter: {
        before: educazenkidsBefore,
        after: educazenHero,
        beforeLabel: "Previous website",
        afterLabel: "educazenkids.com",
      },
      features: [
        "Clear program & pole psychosocial pages",
        "Enrollment-first information architecture",
        "Inclusive, on-brand visual system",
        "Mobile-ready parent experience",
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
      media: [
        m(educazenHero, "EducazenKids dashboard", "Dashboard"),
        m(educazenkidsCover, "EducazenKids analytics", "Analytics", true),
        m(educazenHero, "EducazenKids CRM", "CRM"),
      ],
    },
    {
      id: "edu-ads",
      type: "media-buying",
      eyebrow: "Media buying",
      title: "Enrollment campaigns across Meta and Google.",
      description:
        "Lead-focused funnels for Agadir families and expat parents — messaging that explains HPI, TDAH, and DYS with warmth, not alarm.",
      features: [
        "Meta lead generation",
        "Google search intent",
        "Parent-focused ad copy",
        "Enrollment landing alignment",
      ],
    },
  ],
};

const EIDEN_ACADEMY_CONFIG: ProjectServiceConfig = {
  theme: "edtech-future",
  intro: {
    left: "EIDEN delivery",
    center: "Branding, website, dashboard system, and English assessment.",
    right: "Academy",
  },
  ...stylesForSlug("eiden-academy"),
  sections: [
    {
      id: "ea-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Institutional credibility with a forward-looking edtech signal.",
      description:
        "Logo, teal-and-violet palette, and typographic hierarchy that positions Eiden Academy as both serious and inviting to learners.",
      brandBookUrl: "https://eiden-group.com/brand-books/eiden-academy-brand-guidelines-v2",
      brandColors: ["#122620", "#0c5752", "#d7bb93", "#f5f1e8"],
      colorLabels: ["Vert foncé", "Sarcelle", "Or", "Crème"],
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
      media: [
        m(eidenHero, "Eiden dashboard", "Dashboard"),
        m(eidenAcademyCover, "Eiden admin", "Admin", true),
        m(eidenHero, "Eiden analytics", "Analytics"),
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
