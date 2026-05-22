import type { ServiceMetric } from "@/components/case-study/primitives";
import { getProjectTheme } from "@/data/projectThemes";
import bopassageBrandPalette from "@/assets/bopassage-brand-palette.png";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import bopassageSocialBalance from "@/assets/bopassage-social-balance.png";
import bopassageSocialMatcha from "@/assets/bopassage-social-matcha.png";
import bopassageSocialWaffle from "@/assets/bopassage-social-waffle.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import dmcSocialC from "@/assets/dmc-social-c.png";
import dmcSocialD from "@/assets/dmc-social-d.png";
import dmcSocialExcellence from "@/assets/dmc-social-excellence.png";
import dmcSocialM from "@/assets/dmc-social-m.png";
import educazenkidsBefore from "@/assets/educazenkids-before.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenkidsLogo from "@/assets/educazenkids-logo.png";
import educazenkidsScroll1 from "@/assets/educazenkids-scroll-1.png";
import educazenkidsScroll2 from "@/assets/educazenkids-scroll-2.png";
import educazenHero from "@/assets/educazen-hero.png";
import medicalBayBrandLogo1 from "@/assets/medical-bay-brand-logo-1.jpg";
import medicalBayBrandLogo2 from "@/assets/medical-bay-brand-logo-2.png";
import medicalBayBrandLogo3 from "@/assets/medical-bay-brand-logo-3.png";
import medicalBayLobby from "@/assets/medical-bay-lobby.png";
import medicalBayOffice from "@/assets/medical-bay-office.png";
import medicalBayReception from "@/assets/medical-bay-reception.png";
import eidenAcademyBrandCarousel from "@/assets/eiden-academy-brand-carousel.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenAcademySocialAiIntegration from "@/assets/eiden-academy-social-ai-integration.png";
import eidenAcademySocialAiTools from "@/assets/eiden-academy-social-ai-tools.png";
import eidenAcademySocialEcommerce from "@/assets/eiden-academy-social-ecommerce.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/lunja-hero.png";
import lunjaLogo from "@/assets/lunja-logo.png";

export type ServiceLink = {
  label: string;
  url: string;
};

export type ServiceSectionType =
  | "brand-identity"
  | "brand-board"
  | "website-showcase"
  | "social-content"
  | "media-buying"
  | "crm-dashboard"
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
  typography?: {
    label: string;
    sample: string;
    size?: string;
    sampleClass?: string;
    /** Explicit family for type specimens (e.g. Great Vibes) without changing project editorial. */
    fontFamily?: string;
  }[];
  features?: string[];
  links?: ServiceLink[];
  metrics?: ServiceMetric[];
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
  achievements?: string[];
  /** Brand identity media grid only — default is mosaic (tall left + stacked right). */
  brandMediaLayout?: "mosaic" | "featured-row";
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

function stylesForSlug(
  slug: string,
): Pick<ProjectServiceConfig, "accentClass" | "accentColor" | "background" | "gradient"> {
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
    center:
      "Brand, website, and content engine for a hospitality consultancy operating across Morocco.",
    right: "DMC",
  },
  ...stylesForSlug("dmc-morocco"),
  sections: [
    {
      id: "dmc-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Authenticité & excellence — hospitality consultancy identity for Morocco.",
      description:
        "Charte graphique DMC Hospitality Morocco: forêt profonde et or ancien, Playfair + Cormorant + Source Sans 3. Plus de 20 ans d'expertise hôtelière au Maroc, traduits en un système B2B partenaire-ready.",
      brandBookUrl: "/brand-books/dmc-brand-book.html",
      brandColors: ["#2C3830", "#D4B896", "#4A6153", "#FAF5EE"],
      colorLabels: ["Forêt Profonde", "Or", "Forêt Claire", "Crème"],
      typography: [
        {
          label: "Display · Playfair Display",
          sample: "DMC Hospitality",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-semibold tracking-[-0.03em]",
          fontFamily: '"Playfair Display", serif',
        },
        {
          label: "Editorial · Cormorant Garamond",
          sample: "Authenticité & Excellence",
          sampleClass: "italic opacity-90",
          fontFamily: '"Cormorant Garamond", serif',
        },
        {
          label: "Body · Source Sans 3",
          sample: "Notre passion au service de votre projet hôtelier",
          sampleClass: "font-medium tracking-[0.01em] opacity-85",
          fontFamily: '"Source Sans 3", sans-serif',
        },
      ],
      media: [
        m(dmcCover, "DMC Hospitality brand guidelines", "Guidelines"),
        m(dmcHero, "DMC Hospitality brand", "Brand"),
        m(dmcSocialExcellence, "DMC brand application", "Application"),
      ],
      links: [
        { label: "DMC Brand Book", url: "/brand-books/dmc-brand-book.html" },
        { label: "Website", url: "https://dmchm.com/" },
      ],
    },
    {
      id: "dmc-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A conversion-led site for hotel owners and operators.",
      description:
        "dmchm.com as the digital front door   expertise, phased services, team credibility, and contact flows built for Moroccan and international hotel operators.",
      features: [
        "Expertise & team storytelling",
        "Service phases & methodology",
        "Contact & inquiry flows",
        "Performance-first build",
      ],
      media: [
        m(dmcHero, "DMC website desktop", "Home"),
        m(dmcCover, "DMC website mobile", "Mobile"),
        m(dmcSocialExcellence, "DMC hospitality campaign", "Campaign"),
        m(dmcSocialD, "DMC expertise", "Expertise"),
        m(dmcSocialM, "DMC partnership", "Partnership"),
        m(dmcSocialC, "DMC consulting", "Consulting"),
      ],
      links: [
        { label: "Website", url: "https://dmchm.com/" },
        { label: "DMC Brand Book", url: "/brand-books/dmc-brand-book.html" },
        { label: "Website", url: "https://dmchm.com/" },
      ],
    },
  ],
};

const BOPASSAGE_CONFIG: ProjectServiceConfig = {
  theme: "fashion-luxury",
  intro: {
    left: "EIDEN delivery",
    center:
      "Website, voice, paid media, and revenue optimisation for Agadir's signature café corridor.",
    right: "Bôpassage",
  },
  ...stylesForSlug("bopassage"),
  sections: [
    {
      id: "bop-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Forêt & or — identity for Agadir's signature café corridor.",
      description:
        "Charte 2025: Playfair + Cormorant + Montserrat, palette forêt (#18312e) et or café (#b8973a). Bô Passage n'est pas un restaurant de plus — c'est un endroit.",
      brandBookUrl: "/brand-books/bopassage-brand-book.html",
      brandColors: ["#18312e", "#b8973a", "#f5eedf", "#6b8c74"],
      colorLabels: ["Forêt", "Or du Café", "Ivoire", "Sauge"],
      typography: [
        {
          label: "Display · Playfair Display",
          sample: "Bô Passage",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "italic opacity-95",
          fontFamily: '"Playfair Display", serif',
        },
        {
          label: "Editorial · Cormorant Garamond",
          sample: "L'endroit qu'on aime.",
          sampleClass: "italic opacity-90",
          fontFamily: '"Cormorant Garamond", serif',
        },
        {
          label: "UI · Montserrat",
          sample: "Café & Restaurant · Agadir",
          sampleClass: "font-semibold uppercase tracking-[0.18em] opacity-85",
          fontFamily: '"Montserrat", sans-serif',
          size: "clamp(1rem, 2.5vw, 1.35rem)",
        },
      ],
      brandMediaLayout: "featured-row",
      media: [
        m(bopassageBrandPalette, "Bô Passage logo and palette", "Logo · Palette"),
        m(bopassageHero, "Bô Passage brand", "Brand"),
        m(bopassageCover, "Bô Passage identity", "Identity"),
      ],
      links: [
        { label: "Bô Passage Brand Book", url: "/brand-books/bopassage-brand-book.html" },
        { label: "Website", url: "https://bopassage.com/" },
      ],
    },
    {
      id: "bop-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A digital home for menus, reservations, and the Founty experience.",
      description:
        "bopassage.com   warm editorial layout, mobile-first booking paths, and a site that mirrors the botanical calm of the restaurant. Built to convert curious scrollers into booked tables.",
      features: [
        "Menu & brunch showcase",
        "Reservation flows",
        "Editorial storytelling",
        "Mobile-first UX",
      ],
      media: [
        m(bopassageHero, "Bôpassage desktop", "Desktop"),
        m(bopassageCover, "Bôpassage mobile", "Mobile"),
        m(bopassageSocialBalance, "Bô Passage balance campaign", "Balance"),
        m(bopassageSocialWaffle, "Bô Passage dessert", "Dessert"),
        m(bopassageSocialMatcha, "Bô Passage matcha", "Matcha"),
      ],
      links: [
        { label: "Website", url: "https://bopassage.com/" },
        {
          label: "Bô Passage Brand Book",
          url: "/brand-books/bopassage-brand-book.html",
        },
      ],
    },
  ],
};

const LUNJA_CONFIG: ProjectServiceConfig = {
  theme: "warm-organic",
  intro: {
    left: "EIDEN delivery",
    center:
      "Brand, marketing, revenue, media buying, systems, and reputation for a coastal village transformation.",
    right: "Lunja",
  },
  ...stylesForSlug("lunja-village"),
  sections: [
    {
      id: "lunja-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Retro-beach identity for Imi Ouaddar's surf & nomad village.",
      description:
        "Charte Lunja Village: Keppel, coral et amber sur vanilla — Qaiken, Pacifico, Great Vibes et DM Sans. Une voix solaire pour makers, surfers et long-stay guests.",
      brandBookUrl: "/brand-books/lunja-brand-book.html",
      brandColors: ["#2BBAA5", "#F96635", "#FFD100", "#FDF5D3"],
      colorLabels: ["Keppel", "Coral", "Amber", "Vanilla"],
      typography: [
        {
          label: "Wordmark · Pacifico",
          sample: "Lunja Village",
          size: "clamp(2rem, 5vw, 3.25rem)",
          sampleClass: "leading-none opacity-95",
          fontFamily: '"Pacifico", cursive',
        },
        {
          label: "Script · Great Vibes",
          sample: "Surf & Nomad Cottages",
          sampleClass: "text-[clamp(1.75rem,4vw,2.75rem)] leading-none opacity-90",
          fontFamily: '"Great Vibes", cursive',
        },
        {
          label: "Body · DM Sans",
          sample: "Imi Ouaddar · Taghazout",
          sampleClass: "font-medium tracking-[0.02em] opacity-85",
          fontFamily: '"DM Sans", sans-serif',
        },
      ],
      media: [
        m(lunjaLogo, "Lunja Village logo", "Logo"),
        m(lunjaCover, "Lunja Village brand", "Brand"),
        m(lunjaHero, "Lunja Village identity", "Identity"),
      ],
      links: [
        { label: "Website", url: "https://www.lunjavillage.com/" },
        { label: "Lunja Village Brand Book", url: "/brand-books/lunja-brand-book.html" },
      ],
    },
  ],
};

const EDUCAZEN_CONFIG: ProjectServiceConfig = {
  theme: "edu-bright",
  intro: {
    left: "EIDEN delivery",
    center:
      "Brand refresh, website, CRM, marketing strategy, and Meta Ads for an inclusive education leader.",
    right: "EducazenKids",
  },
  ...stylesForSlug("educazen-kids"),
  sections: [
    {
      id: "edu-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "Warm, inclusive identity parents trust at first glance.",
      description:
        "Charte EducazenKids: quatre couleurs puzzle (magenta, violet, teal, or) — Nunito, Playfair et Quicksand. Centre éducatif & psychosocial à Agadir, moderne et inclusif.",
      brandBookUrl: "/brand-books/educazenkids-brand-book.html",
      brandColors: ["#C2185B", "#7B1FA2", "#00897B", "#F9A825"],
      colorLabels: ["Magenta", "Violet", "Teal", "Or"],
      typography: [
        {
          label: "Display · Nunito",
          sample: "EducazenKids",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-extrabold tracking-[-0.02em]",
          fontFamily: '"Nunito", sans-serif',
        },
        {
          label: "Editorial · Playfair Display",
          sample: "L'enseignement sur mesure",
          sampleClass: "italic opacity-90",
          fontFamily: '"Playfair Display", serif',
        },
        {
          label: "Body · Quicksand",
          sample: "Centre éducatif & psychosocial · Agadir",
          sampleClass: "font-medium tracking-[0.01em] opacity-85",
          fontFamily: '"Quicksand", sans-serif',
        },
      ],
      media: [
        m(educazenkidsLogo, "EducazenKids logo", "Logo"),
        m(educazenkidsScroll1, "EducazenKids brand", "Brand"),
        m(educazenkidsScroll2, "EducazenKids application", "Application"),
      ],
      links: [
        { label: "EducazenKids Brand Book", url: "/brand-books/educazenkids-brand-book.html" },
        { label: "Website", url: "https://educazenkids.eiden-group.workers.dev/" },
      ],
    },
    {
      id: "edu-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A parent-trusted site for programs, team, and enrollment.",
      description:
        "educazenkids.com   bright, accessible UI with clear paths to programmes, the psychosocial pole, and EducaBlog resources parents rely on.",
      features: ["Programme discovery", "Team & psychosocial pole", "EducaBlog", "Enrolment forms"],
      media: [
        m(educazenHero, "EducazenKids desktop", "Desktop"),
        m(educazenkidsCover, "EducazenKids mobile", "Mobile"),
      ],
      links: [{ label: "Website", url: "https://educazenkids.eiden-group.workers.dev/" }],
    },
    {
      id: "edu-impact",
      type: "impact",
      eyebrow: "Website redesign",
      title: "From a dated presence to a parent-trusted enrollment platform.",
      description:
        "The previous site lacked clear programme paths, psychosocial positioning, and enrolment flows. We rebuilt educazenkids.com around the brand system   accessible UI, EducaBlog, and forms parents complete with confidence.",
      beforeAfter: {
        before: educazenkidsBefore,
        after: educazenHero,
        beforeLabel: "Previous website",
        afterLabel: "educazenkids.eiden-group.workers.dev",
      },
      features: [
        "Clear programme & psychosocial pole pages",
        "Enrolment-first information architecture",
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
        "Pipeline visibility, parent communication, and campaign analytics   built so the team runs enrolment without scattered tools.",
      features: ["Lead pipeline", "Parent CRM", "Campaign analytics", "Team workflows"],
      media: [
        m(educazenHero, "EducazenKids dashboard", "Dashboard"),
        m(educazenkidsScroll1, "EducazenKids CRM", "CRM"),
      ],
    },
    {
      id: "edu-dashboard",
      type: "crm-dashboard",
      eyebrow: "Enrolment funnel",
      title: "From first touch to signed registration no manual chasing.",
      description:
        "Complete enrolment system built so leads don't fall through the cracks and the team isn't following up via WhatsApp threads and missed calls.",
      features: ["Lead capture", "Automated follow-up", "Registration flow", "Payment tracking"],
    },
    {
      id: "edu-media-buying",
      type: "media-buying",
      eyebrow: "Media Buying",
      title: "Enrollment campaigns across Meta and Google.",
      description:
        "Lead-focused funnels for Agadir families   messaging that explains giftedness, ADHD, and dyslexia with warmth, not alarm.",
      features: [
        "Meta lead generation",
        "Google search intent",
        "Parent-focused ad copy",
        "Enrolment landing alignment",
      ],
    },
  ],
};

const EIDEN_ACADEMY_CONFIG: ProjectServiceConfig = {
  theme: "edtech-future",
  intro: {
    left: "EIDEN delivery",
    center:
      "A complete academy brand, curriculum, website, enrolment funnel, and corporate arm built from zero under the EIDEN Group umbrella.",
    right: "Academy",
  },
  ...stylesForSlug("eiden-academy"),
  sections: [
    {
      id: "ea-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title:
        "A brand that carries the authority of the group behind it while standing clearly on its own.",
      description:
        "Full brand identity from zero name, logo, visual system, colour language, and tone of voice positioned as The Architecture of Knowledge. Distinct mental category. No competitor in Morocco currently occupies it.",
      brandBookUrl: "https://eiden-group.com/brand-books/eiden-academy-brand-guidelines-v2",
      brandColors: ["#122620", "#0c5752", "#d7bb93", "#f5f1e8"],
      colorLabels: ["Dark Green", "Teal", "Gold", "Cream"],
      media: [
        m(eidenAcademyBrandCarousel, "Eiden Academy crest", "Brand"),
        m(eidenHero, "Eiden Academy brand", "Identity"),
        m(eidenAcademyCover, "Eiden guidelines", "Guidelines"),
      ],
      links: [
        { label: "Branding", url: "https://eiden-group.com/" },
        {
          label: "EIDEN Academy Brand Guidelines",
          url: "https://eiden-group.com/brand-books/eiden-academy-brand-guidelines-v2",
        },
      ],
    },
    {
      id: "ea-web",
      type: "website-showcase",
      eyebrow: "Website design & development",
      title: "A converting platform not just a presence.",
      description:
        "Course catalogue, programme pages, MICE offering, and lead capture so every visitor has a direct path from discovery to enrolled, with nothing in the way.",
      features: ["Programme catalogue", "Instructor profiles", "Enrolment", "Resource hub"],
      media: [
        m(eidenHero, "Eiden Academy web", "Desktop"),
        m(eidenAcademyCover, "Eiden Academy mobile", "Mobile"),
        m(eidenAcademySocialAiTools, "Eiden Academy programs", "Programs"),
        m(eidenAcademySocialAiIntegration, "Eiden Academy AI track", "AI"),
        m(eidenAcademySocialEcommerce, "Eiden Academy e-commerce", "E-commerce"),
        m(eidenAcademyBrandCarousel, "Eiden Academy brand", "Brand"),
      ],
      links: [
        { label: "Website", url: "https://eiden-group.com/academy" },
        { label: "Eiden Academy", url: "https://eiden-group.com/academy" },
      ],
    },
    {
      id: "ea-dashboard",
      type: "crm-dashboard",
      eyebrow: "Dashboard Design & Development",
      title: "From first touch to signed registration no manual chasing.",
      description:
        "Cohort analytics, content management, and role-based views   the internal layer that scales curriculum delivery across the group.",
      features: ["Student progress", "Admin console", "Cohort analytics", "Content management"],
      media: [
        m(eidenHero, "Eiden dashboard", "Dashboard"),
        m(eidenAcademyCover, "Eiden admin", "Admin", true),
        m(eidenHero, "Eiden analytics", "Analytics"),
      ],
    },
  ],
};

const MEDICAL_BAY_CONFIG: ProjectServiceConfig = {
  theme: "luxury-dark",
  intro: {
    left: "EIDEN delivery",
    center:
      "Architecture, brand, website, CRM, marketing, and patient experience for a new-generation medical centre.",
    right: "Medical Bay",
  },
  ...stylesForSlug("medical-bay"),
  sections: [
    {
      id: "mb-brand",
      type: "brand-identity",
      eyebrow: "Branding",
      title: "From clinical excellence to a structured brand.",
      description:
        "Medical Bay is built from the ground up as a layered system. The brand carries the calm and authority a patient needs to trust the first click. The website is engineered as a real patient funnel service clarity, practitioner credibility, frictionless booking. The CRM holds the patient journey across appointments, reminders, files, and follow-ups. The marketing engine reaches the right communities in the right tone. Every layer talks to every other.",
      brandBookUrl: "/brand-books/medical-bay-brand-guidelines.html",
      brandColors: ["#2BBAA5", "#0D1A18", "#E8F5F3", "#FAFDF8"],
      colorLabels: ["Teal Primaire", "Ink", "Mist", "Cream"],
      typography: [
        {
          label: "Display · Montserrat",
          sample: "MEDICAL BAY",
          size: "clamp(2rem, 5vw, 3.5rem)",
          sampleClass: "font-semibold uppercase tracking-[-0.03em]",
          fontFamily: '"Montserrat", sans-serif',
        },
        {
          label: "Editorial · Cormorant Garamond",
          sample: "Votre santé, notre priorité.",
          sampleClass: "italic opacity-90",
          fontFamily: '"Cormorant Garamond", serif',
        },
        {
          label: "Body · DM Sans",
          sample: "Tourisme médical & soins d'excellence",
          sampleClass: "font-medium tracking-[0.02em] opacity-85",
          fontFamily: '"DM Sans", sans-serif',
        },
      ],
      media: [
        m(medicalBayBrandLogo1, "Medical Bay logo on teal", "Logo · Teal"),
        m(medicalBayBrandLogo2, "Medical Bay logo on ink", "Logo · Ink"),
        m(medicalBayBrandLogo3, "Medical Bay logo on mist", "Logo · Mist"),
      ],
      links: [
        {
          label: "Medical Bay Brand Guidelines",
          url: "/brand-books/medical-bay-brand-guidelines.html",
        },
        { label: "Website", url: "https://medicalbay.vercel.app/" },
      ],
    },
    {
      id: "mb-web",
      type: "website-showcase",
      eyebrow: "Website",
      title: "A patient funnel, not a brochure.",
      description:
        "medicalbay.ma   clear service paths, appointment logic, and trust signals so discovery converts into booked consultations without friction.",
      features: [
        "Service & specialty discovery",
        "Appointment inquiry flows",
        "Team & facility credibility",
        "Performance-first build",
      ],
      media: [
        m(medicalBayLobby, "Medical Bay website desktop", "Desktop"),
        m(medicalBayReception, "Medical Bay website mobile", "Mobile"),
        m(medicalBayOffice, "Medical Bay patient journey", "Journey"),
      ],
      links: [{ label: "Website", url: "https://medicalbay.ma/" }],
    },
    {
      id: "mb-crm",
      type: "crm-dashboard",
      eyebrow: "CRM & operational systems",
      title: "Appointments, follow-ups, and ops in one layer.",
      description:
        "CRM built for clinical operations   booking pipelines, patient follow-up, and team visibility so excellence isn't held together in spreadsheets.",
      features: [
        "Appointment scheduling",
        "Patient follow-up",
        "Team workflows",
        "Operational reporting",
      ],
      media: [
        m(medicalBayReception, "Medical Bay CRM", "CRM"),
        m(medicalBayOffice, "Medical Bay operations", "Operations", true),
        m(medicalBayLobby, "Medical Bay patient records", "Records"),
      ],
    },
    {
      id: "mb-marketing",
      type: "media-buying",
      eyebrow: "Marketing strategy",
      title: "Reach the right communities in the right tone.",
      description:
        "Marketing architecture and paid media tuned for healthcare trust   community targeting, creative restraint, and funnels tied to real appointment demand.",
      features: [
        "Community targeting",
        "Brand-safe creative",
        "Funnel & attribution",
        "Revenue optimisation",
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
  "medical-bay": MEDICAL_BAY_CONFIG,
};

export function getProjectServiceConfig(slug: string): ProjectServiceConfig | undefined {
  return CONFIG_BY_SLUG[slug];
}
