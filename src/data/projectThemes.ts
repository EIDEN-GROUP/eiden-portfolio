import type { CSSProperties } from "react";

/**
 * Per-project visual identity extracted from EIDEN Group brand books.
 * Drives typography, color, motion, and atmosphere on project detail pages.
 */

export type ProjectMotionPreset = {
  ease: readonly [number, number, number, number];
  revealDuration: number;
  heroParallax: [string, string];
  stagger: number;
  spring: { stiffness: number; damping: number; mass: number };
};

export type ProjectTheme = {
  slug: string;
  mood: "luxury" | "lifestyle" | "education" | "corporate" | "edtech";
  brandBookUrl: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    accentAlt: string;
    background: string;
    canvas: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
    heroOverlay: string;
    heroEyebrow: string;
    heroAccent: string;
  };
  fonts: {
    display: string;
    editorial: string;
    body: string;
    label: string;
    /** Google Fonts CSS2 families query (weights included). */
    googleUrl: string;
  };
  gradients: {
    page: string;
    hero: string;
    heroScrim: string;
    section: string;
    progressBar: string;
    divider: string;
    stats: string;
  };
  motion: ProjectMotionPreset;
  ui: {
    cardRadius: string;
    cardBorder: string;
    cardBackground: string;
    sectionTint: string;
    grainOpacity: number;
    heroFilmGrain: boolean;
  };
};

const easeLuxury = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.33, 1, 0.42, 1] as const;
const easeEnergetic = [0.16, 1, 0.3, 1] as const;
const easeCrisp = [0.25, 0.46, 0.45, 0.94] as const;

export const LUNJA_THEME: ProjectTheme = {
  slug: "lunja-village",
  mood: "lifestyle",
  brandBookUrl: "/brand-books/lunja-brand-book.html",
  colors: {
    primary: "#2BBAA5",
    secondary: "#93D3AE",
    accent: "#F96635",
    accentAlt: "#FFD100",
    background: "#1A1208",
    canvas: "#0d1816",
    surface: "#142420",
    surfaceAlt: "#1e3530",
    text: "#FDF8EE",
    textMuted: "rgba(253, 248, 238, 0.55)",
    border: "rgba(43, 186, 165, 0.18)",
    heroOverlay:
      "linear-gradient(to top, rgba(26,18,8,0.94) 0%, rgba(26,18,8,0.45) 45%, rgba(43,186,165,0.12) 100%)",
    heroEyebrow: "rgba(147, 211, 174, 0.9)",
    heroAccent: "#FFD100",
  },
  fonts: {
    display: '"Cormorant Garamond", Georgia, serif',
    editorial: '"Lora", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
    label: '"DM Sans", system-ui, sans-serif',
    googleUrl:
      "family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Great+Vibes&family=Lora:ital,wght@0,400;1,400&family=Pacifico&display=swap",
  },
  gradients: {
    page: "radial-gradient(ellipse 90% 55% at 15% 25%, rgba(43,186,165,0.14), transparent 55%)",
    hero: "radial-gradient(ellipse 80% 50% at 70% 20%, rgba(249,102,53,0.1), transparent 50%)",
    heroScrim:
      "linear-gradient(105deg, rgba(26,18,8,0.75) 0%, transparent 55%), linear-gradient(to top, rgba(26,18,8,0.9), transparent 40%)",
    section: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(43,186,165,0.1), transparent 55%)",
    progressBar:
      "linear-gradient(90deg, rgba(43,186,165,0.6), rgba(255,209,0,0.75), rgba(249,102,53,0.5))",
    divider:
      "linear-gradient(90deg, transparent, rgba(43,186,165,0.35), rgba(255,209,0,0.4), transparent)",
    stats: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(43,186,165,0.08), transparent 55%)",
  },
  motion: {
    ease: easeEnergetic,
    revealDuration: 0.85,
    heroParallax: ["0%", "28%"],
    stagger: 0.09,
    spring: { stiffness: 78, damping: 26, mass: 0.4 },
  },
  ui: {
    cardRadius: "0.75rem",
    cardBorder: "rgba(43, 186, 165, 0.22)",
    cardBackground: "rgba(43, 186, 165, 0.06)",
    sectionTint: "rgba(249, 102, 53, 0.04)",
    grainOpacity: 0.07,
    heroFilmGrain: true,
  },
};

export const EDUCAZEN_THEME: ProjectTheme = {
  slug: "educazen-kids",
  mood: "education",
  brandBookUrl: "/brand-books/educazenkids-brand-book.html",
  colors: {
    primary: "#E91E8C",
    secondary: "#9C4DCC",
    accent: "#26A69A",
    accentAlt: "#F9A825",
    background: "#0a080c",
    canvas: "#0e0a10",
    surface: "#16101a",
    surfaceAlt: "#1e1424",
    text: "#F8F4F6",
    textMuted: "rgba(248, 244, 246, 0.55)",
    border: "rgba(233, 30, 140, 0.18)",
    heroOverlay:
      "linear-gradient(to top, rgba(10,8,12,0.94) 0%, rgba(22,16,26,0.5) 48%, rgba(123,31,162,0.12) 100%)",
    heroEyebrow: "rgba(233, 30, 140, 0.9)",
    heroAccent: "#26A69A",
  },
  fonts: {
    display: '"Nunito", system-ui, sans-serif',
    editorial: '"Playfair Display", Georgia, serif',
    body: '"Quicksand", system-ui, sans-serif',
    label: '"Cormorant Garamond", Georgia, serif',
    googleUrl:
      "family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Nunito:wght@600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Quicksand:wght@400;500;600;700&display=swap",
  },
  gradients: {
    page: "radial-gradient(ellipse 90% 55% at 75% 0%, rgba(123,31,162,0.14), transparent 52%)",
    hero: "radial-gradient(ellipse 75% 50% at 15% 85%, rgba(38,166,154,0.12), transparent 55%)",
    heroScrim:
      "linear-gradient(110deg, rgba(10,8,12,0.82) 0%, transparent 52%), linear-gradient(to top, rgba(10,8,12,0.92), transparent 38%)",
    section: "radial-gradient(ellipse 100% 65% at 50% -8%, rgba(194,24,91,0.1), transparent 55%)",
    progressBar:
      "linear-gradient(90deg, rgba(233,30,140,0.65), rgba(156,77,204,0.6), rgba(38,166,154,0.55))",
    divider:
      "linear-gradient(90deg, transparent, rgba(233,30,140,0.35), rgba(249,168,37,0.35), transparent)",
    stats: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(123,31,162,0.1), transparent 55%)",
  },
  motion: {
    ease: easeSoft,
    revealDuration: 1,
    heroParallax: ["0%", "18%"],
    stagger: 0.11,
    spring: { stiffness: 56, damping: 30, mass: 0.5 },
  },
  ui: {
    cardRadius: "1.25rem",
    cardBorder: "rgba(233, 30, 140, 0.22)",
    cardBackground: "rgba(30, 20, 36, 0.65)",
    sectionTint: "rgba(123, 31, 162, 0.06)",
    grainOpacity: 0.03,
    heroFilmGrain: false,
  },
};

export const BOPASSAGE_THEME: ProjectTheme = {
  slug: "bopassage",
  mood: "lifestyle",
  brandBookUrl: "/brand-books/bopassage-brand-book.html",
  colors: {
    primary: "#18312e",
    secondary: "#6b8c74",
    accent: "#b8973a",
    accentAlt: "#d4b06a",
    background: "#0f1f1c",
    canvas: "#121f1c",
    surface: "#18312e",
    surfaceAlt: "#1e3b37",
    text: "#f5eedf",
    textMuted: "rgba(245, 238, 223, 0.52)",
    border: "rgba(184, 151, 58, 0.16)",
    heroOverlay:
      "linear-gradient(to top, rgba(24,49,46,0.95) 0%, rgba(24,49,46,0.4) 50%, rgba(107,140,116,0.08) 100%)",
    heroEyebrow: "rgba(212, 176, 106, 0.88)",
    heroAccent: "#d4b06a",
  },
  fonts: {
    display: '"Playfair Display", Georgia, serif',
    editorial: '"Cormorant Garamond", Georgia, serif',
    body: '"Montserrat", system-ui, sans-serif',
    label: '"Montserrat", system-ui, sans-serif',
    googleUrl:
      "family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap",
  },
  gradients: {
    page: "radial-gradient(ellipse 90% 50% at 80% 20%, rgba(184,151,58,0.08), transparent 50%)",
    hero: "radial-gradient(ellipse 85% 55% at 30% 70%, rgba(107,140,116,0.12), transparent 55%)",
    heroScrim:
      "linear-gradient(100deg, rgba(24,49,46,0.8) 0%, transparent 52%), linear-gradient(to top, rgba(15,31,28,0.92), transparent 38%)",
    section: "radial-gradient(ellipse 90% 50% at 80% 20%, rgba(245,235,220,0.05), transparent 50%)",
    progressBar:
      "linear-gradient(90deg, rgba(107,140,116,0.5), rgba(212,176,106,0.7), rgba(184,151,58,0.55))",
    divider:
      "linear-gradient(90deg, transparent, rgba(184,151,58,0.35), rgba(212,176,106,0.25), transparent)",
    stats: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(184,151,58,0.07), transparent 55%)",
  },
  motion: {
    ease: easeLuxury,
    revealDuration: 1.05,
    heroParallax: ["0%", "20%"],
    stagger: 0.08,
    spring: { stiffness: 64, damping: 28, mass: 0.42 },
  },
  ui: {
    cardRadius: "0.375rem",
    cardBorder: "rgba(184, 151, 58, 0.2)",
    cardBackground: "rgba(30, 59, 55, 0.35)",
    sectionTint: "rgba(245, 238, 223, 0.02)",
    grainOpacity: 0.04,
    heroFilmGrain: true,
  },
};

export const DMC_THEME: ProjectTheme = {
  slug: "dmc-morocco",
  mood: "luxury",
  brandBookUrl: "/brand-books/dmc-brand-book.html",
  colors: {
    primary: "#2C3830",
    secondary: "#4A6153",
    accent: "#D4B896",
    accentAlt: "#B89B74",
    background: "#060806",
    canvas: "#0a0e0c",
    surface: "#2C3830",
    surfaceAlt: "#3D4F44",
    text: "#F5F0E8",
    textMuted: "rgba(245, 240, 232, 0.5)",
    border: "rgba(212, 184, 150, 0.14)",
    heroOverlay:
      "linear-gradient(to top, rgba(44,56,48,0.96) 0%, rgba(44,56,48,0.42) 48%, rgba(74,97,83,0.1) 100%)",
    heroEyebrow: "rgba(212, 184, 150, 0.88)",
    heroAccent: "#D4B896",
  },
  fonts: {
    display: '"Playfair Display", Georgia, serif',
    editorial: '"Cormorant Garamond", Georgia, serif',
    body: '"Source Sans 3", system-ui, sans-serif',
    label: '"Source Sans 3", system-ui, sans-serif',
    googleUrl:
      "family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap",
  },
  gradients: {
    page: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212,184,150,0.09), transparent 55%)",
    hero: "radial-gradient(ellipse 90% 50% at 60% 30%, rgba(74,97,83,0.15), transparent 55%)",
    heroScrim:
      "linear-gradient(105deg, rgba(44,56,48,0.82) 0%, transparent 58%), linear-gradient(to top, rgba(6,8,6,0.9), transparent 42%)",
    section: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212,175,95,0.08), transparent 55%)",
    progressBar:
      "linear-gradient(90deg, rgba(74,97,83,0.55), rgba(212,184,150,0.75), rgba(184,155,116,0.5))",
    divider:
      "linear-gradient(90deg, transparent, rgba(212,184,150,0.4), rgba(184,155,116,0.25), transparent)",
    stats: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(212,184,150,0.07), transparent 55%)",
  },
  motion: {
    ease: easeLuxury,
    revealDuration: 1.1,
    heroParallax: ["0%", "22%"],
    stagger: 0.07,
    spring: { stiffness: 58, damping: 30, mass: 0.48 },
  },
  ui: {
    cardRadius: "0.25rem",
    cardBorder: "rgba(212, 184, 150, 0.18)",
    cardBackground: "rgba(44, 56, 48, 0.4)",
    sectionTint: "rgba(212, 184, 150, 0.03)",
    grainOpacity: 0.03,
    heroFilmGrain: false,
  },
};

export const MEDICAL_BAY_THEME: ProjectTheme = {
  slug: "medical-bay",
  mood: "corporate",
  brandBookUrl: "/brand-books/medical-bay-brand-guidelines.html",
  colors: {
    primary: "#0D1A18",
    secondary: "#2BBAA5",
    accent: "#2BBAA5",
    accentAlt: "#4DCFBB",
    background: "#060c10",
    canvas: "#081210",
    surface: "#0D1A18",
    surfaceAlt: "#1F9187",
    text: "#FAFDF8",
    textMuted: "rgba(250, 253, 248, 0.55)",
    border: "rgba(43, 186, 165, 0.22)",
    heroOverlay:
      "linear-gradient(to top, rgba(13,26,24,0.96) 0%, rgba(13,26,24,0.42) 48%, rgba(43,186,165,0.12) 100%)",
    heroEyebrow: "rgba(43, 186, 165, 0.92)",
    heroAccent: "#4DCFBB",
  },
  fonts: {
    display: '"Montserrat", system-ui, sans-serif',
    editorial: '"Cormorant Garamond", Georgia, serif',
    body: '"DM Sans", "Inter", system-ui, sans-serif',
    label: '"Montserrat", system-ui, sans-serif',
    googleUrl:
      "family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Montserrat:wght@500;600;700;800&display=swap",
  },
  gradients: {
    page: "radial-gradient(ellipse 90% 55% at 75% 0%, rgba(43,186,165,0.14), transparent 52%)",
    hero: "radial-gradient(ellipse 80% 50% at 20% 80%, rgba(77,207,187,0.08), transparent 55%)",
    heroScrim:
      "linear-gradient(110deg, rgba(13,26,24,0.88) 0%, transparent 52%), linear-gradient(to top, rgba(6,12,16,0.92), transparent 38%)",
    section: "radial-gradient(ellipse 100% 65% at 50% -8%, rgba(43,186,165,0.1), transparent 55%)",
    progressBar:
      "linear-gradient(90deg, rgba(43,186,165,0.65), rgba(77,207,187,0.55), rgba(13,26,24,0.5))",
    divider:
      "linear-gradient(90deg, transparent, rgba(43,186,165,0.35), rgba(77,207,187,0.35), transparent)",
    stats: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(43,186,165,0.08), transparent 55%)",
  },
  motion: {
    ease: easeCrisp,
    revealDuration: 0.9,
    heroParallax: ["0%", "18%"],
    stagger: 0.07,
    spring: { stiffness: 72, damping: 28, mass: 0.42 },
  },
  ui: {
    cardRadius: "0.25rem",
    cardBorder: "rgba(74, 166, 162, 0.22)",
    cardBackground: "rgba(15, 42, 74, 0.45)",
    sectionTint: "rgba(74, 166, 162, 0.04)",
    grainOpacity: 0.025,
    heroFilmGrain: false,
  },
};

export const EIDEN_ACADEMY_THEME: ProjectTheme = {
  slug: "eiden-academy",
  mood: "edtech",
  brandBookUrl: "https://eiden-group.com/brand-books/eiden-academy-brand-guidelines-v2",
  colors: {
    primary: "#122620",
    secondary: "#0c5752",
    accent: "#d7bb93",
    accentAlt: "#0c5752",
    background: "#060a09",
    canvas: "#080c0b",
    surface: "#122620",
    surfaceAlt: "#0c5752",
    text: "#f5f1e8",
    textMuted: "rgba(245, 241, 232, 0.52)",
    border: "rgba(12, 87, 82, 0.22)",
    heroOverlay:
      "linear-gradient(to top, rgba(18,38,32,0.96) 0%, rgba(18,38,32,0.38) 50%, rgba(12,87,82,0.12) 100%)",
    heroEyebrow: "rgba(12, 87, 82, 0.95)",
    heroAccent: "#d7bb93",
  },
  fonts: {
    display: '"Montserrat", system-ui, sans-serif',
    editorial: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    label: '"Montserrat", system-ui, sans-serif',
    googleUrl: "family=Montserrat:wght@400;500;600;700&display=swap",
  },
  gradients: {
    page: "radial-gradient(ellipse 90% 60% at 70% 0%, rgba(12,87,82,0.14), transparent 50%)",
    hero: "radial-gradient(ellipse 85% 55% at 25% 75%, rgba(215,187,147,0.08), transparent 55%)",
    heroScrim:
      "linear-gradient(110deg, rgba(18,38,32,0.85) 0%, transparent 55%), linear-gradient(to top, rgba(6,10,9,0.92), transparent 40%)",
    section: "radial-gradient(ellipse 90% 60% at 70% 0%, rgba(12,87,82,0.12), transparent 50%)",
    progressBar:
      "linear-gradient(90deg, rgba(12,87,82,0.65), rgba(215,187,147,0.7), rgba(107,107,107,0.35))",
    divider:
      "linear-gradient(90deg, transparent, rgba(12,87,82,0.45), rgba(215,187,147,0.35), transparent)",
    stats: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(12,87,82,0.09), transparent 55%)",
  },
  motion: {
    ease: easeCrisp,
    revealDuration: 0.75,
    heroParallax: ["0%", "16%"],
    stagger: 0.06,
    spring: { stiffness: 88, damping: 32, mass: 0.38 },
  },
  ui: {
    cardRadius: "4px",
    cardBorder: "rgba(12, 87, 82, 0.28)",
    cardBackground: "rgba(18, 38, 32, 0.55)",
    sectionTint: "rgba(12, 87, 82, 0.04)",
    grainOpacity: 0.02,
    heroFilmGrain: false,
  },
};

/**
 * Web-design projects share one gradient/motion grammar and differ only by the
 * tokens lifted from each shipped site's own stylesheet, so they are built from
 * a factory instead of seven near-identical literals.
 */
type WebThemeInput = {
  slug: string;
  mood: ProjectTheme["mood"];
  /** `r, g, b` triples, used to derive the scrims and gradients. */
  rgb: { background: string; accent: string; secondary: string };
  colors: Pick<
    ProjectTheme["colors"],
    | "primary"
    | "secondary"
    | "accent"
    | "accentAlt"
    | "background"
    | "canvas"
    | "surface"
    | "surfaceAlt"
    | "text"
  >;
  fonts: ProjectTheme["fonts"];
  motion?: Partial<ProjectMotionPreset>;
  cardRadius?: string;
};

function makeWebTheme(input: WebThemeInput): ProjectTheme {
  const { rgb, colors } = input;
  const bg = rgb.background;
  const ac = rgb.accent;
  const sc = rgb.secondary;

  return {
    slug: input.slug,
    mood: input.mood,
    brandBookUrl: "",
    colors: {
      ...colors,
      text: colors.text,
      textMuted: `color-mix(in srgb, ${colors.text} 54%, transparent)`,
      border: `rgba(${ac}, 0.2)`,
      heroOverlay: `linear-gradient(to top, rgba(${bg},0.94) 0%, rgba(${bg},0.42) 52%, rgba(${ac},0.1) 100%)`,
      heroEyebrow: colors.accent,
      heroAccent: colors.accent,
    },
    fonts: input.fonts,
    gradients: {
      page: `radial-gradient(ellipse 90% 55% at 72% 0%, rgba(${ac},0.12), transparent 52%)`,
      hero: `radial-gradient(ellipse 80% 50% at 22% 78%, rgba(${sc},0.1), transparent 55%)`,
      heroScrim: `linear-gradient(108deg, rgba(${bg},0.82) 0%, transparent 56%), linear-gradient(to top, rgba(${bg},0.94), transparent 42%)`,
      section: `radial-gradient(ellipse 100% 65% at 50% -8%, rgba(${ac},0.09), transparent 55%)`,
      progressBar: `linear-gradient(90deg, rgba(${ac},0.7), rgba(${sc},0.55), rgba(${bg},0.4))`,
      divider: `linear-gradient(90deg, transparent, rgba(${ac},0.4), rgba(${sc},0.3), transparent)`,
      stats: `radial-gradient(ellipse 120% 80% at 50% -20%, rgba(${ac},0.08), transparent 55%)`,
    },
    motion: {
      ease: easeLuxury,
      revealDuration: 0.85,
      heroParallax: ["0%", "17%"],
      stagger: 0.065,
      spring: { stiffness: 78, damping: 30, mass: 0.4 },
      ...input.motion,
    },
    ui: {
      cardRadius: input.cardRadius ?? "0.25rem",
      cardBorder: `rgba(${ac}, 0.24)`,
      cardBackground: `rgba(${sc}, 0.14)`,
      sectionTint: `rgba(${ac}, 0.04)`,
      grainOpacity: 0.022,
      heroFilmGrain: false,
    },
  };
}

/** ORSEN — architectural materials. Anthracite plates, rouge signal, Satoshi only. */
export const ORSEN_THEME = makeWebTheme({
  slug: "orsen",
  mood: "corporate",
  rgb: { background: "24, 24, 24", accent: "200, 30, 44", secondary: "185, 184, 180" },
  colors: {
    primary: "#232323",
    secondary: "#B9B8B4",
    accent: "#C81E2C",
    accentAlt: "#F6F5F3",
    background: "#181818",
    canvas: "#1d1d1d",
    surface: "#232323",
    surfaceAlt: "#2c2c2c",
    text: "#F6F5F3",
  },
  fonts: {
    display: '"Satoshi", "Archivo", system-ui, sans-serif',
    editorial: '"Satoshi", "Archivo", system-ui, sans-serif',
    body: '"Satoshi", "Archivo", system-ui, sans-serif',
    label: '"Satoshi", "Archivo", system-ui, sans-serif',
    googleUrl: "family=Archivo:wght@400;500;600;700;800;900&display=swap",
  },
  motion: { ease: easeCrisp, revealDuration: 0.7, stagger: 0.05 },
  cardRadius: "2px",
});

/** LITHOS — la matière, racontée avec soin. Calcaire, laiton, terracotta, espresso. */
export const LITHOS_THEME = makeWebTheme({
  slug: "lithos-materiaux",
  mood: "luxury",
  rgb: { background: "34, 30, 24", accent: "183, 98, 63", secondary: "168, 133, 71" },
  colors: {
    primary: "#302b22",
    secondary: "#A88547",
    accent: "#B7623F",
    accentAlt: "#dcd2c2",
    background: "#221e18",
    canvas: "#28231c",
    surface: "#302b22",
    surfaceAlt: "#3a3329",
    text: "#e9e4dc",
  },
  fonts: {
    display: '"Britney", "Archivo Narrow", "Archivo", system-ui, sans-serif',
    editorial: '"Archivo Narrow", system-ui, sans-serif',
    body: '"Archivo Narrow", system-ui, sans-serif',
    label: '"Archivo Narrow", system-ui, sans-serif',
    googleUrl: "family=Archivo+Narrow:wght@400;500;600;700&display=swap",
  },
  cardRadius: "2px",
});

/** Résidence Rihab — boutique aparthotel. Forest, sage, cream, Fraunces. */
export const RIHAB_THEME = makeWebTheme({
  slug: "rihab-residence",
  mood: "luxury",
  rgb: { background: "13, 32, 51", accent: "129, 161, 188", secondary: "213, 213, 213" },
  colors: {
    primary: "#153149",
    secondary: "#d5d5d5",
    accent: "#81A1BC",
    accentAlt: "#f7f6f0",
    background: "#0d2033",
    canvas: "#112a41",
    surface: "#153149",
    surfaceAlt: "#1c3f5c",
    text: "#f7f6f0",
  },
  fonts: {
    display: '"Fraunces", Georgia, serif',
    editorial: '"Fraunces", Georgia, serif',
    body: '"Excon", "Archivo", system-ui, sans-serif',
    label: '"Excon", "Archivo", system-ui, sans-serif',
    googleUrl:
      "family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Archivo:wght@400;500;600&display=swap",
  },
  motion: { revealDuration: 0.95, stagger: 0.075 },
  cardRadius: "0.75rem",
});

const LUNJA_FAMILY_FONTS: ProjectTheme["fonts"] = {
  display: '"Barlow Condensed", system-ui, sans-serif',
  editorial: '"Caveat Brush", cursive',
  body: '"DM Sans", system-ui, sans-serif',
  label: '"Barlow Condensed", system-ui, sans-serif',
  googleUrl:
    "family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Caveat+Brush&family=DM+Sans:wght@400;500;700&display=swap",
};

/** Lunja Village Vibes — coral, teal, chillout yellow. */
export const LUNJA_VIBES_THEME = makeWebTheme({
  slug: "lunja-village-vibes",
  mood: "lifestyle",
  rgb: { background: "12, 22, 20", accent: "242, 92, 42", secondary: "30, 158, 138" },
  colors: {
    primary: "#1E9E8A",
    secondary: "#0F4A42",
    accent: "#F25C2A",
    accentAlt: "#FBF304",
    background: "#0c1614",
    canvas: "#0f1d1a",
    surface: "#0F4A42",
    surfaceAlt: "#155e54",
    text: "#F4EFE4",
  },
  fonts: LUNJA_FAMILY_FONTS,
  motion: { ease: easeEnergetic, revealDuration: 0.72, stagger: 0.055 },
});

/** Lunja Village Taghazout Bay — golden-hour linen, sun yellow, terracotta, olive. */
export const SERENE_THEME = makeWebTheme({
  slug: "lunja-taghazout-bay",
  mood: "lifestyle",
  rgb: { background: "18, 16, 12", accent: "255, 230, 0", secondary: "196, 106, 69" },
  colors: {
    primary: "#FFE600",
    secondary: "#C46A45",
    accent: "#FFE600",
    accentAlt: "#6E7248",
    background: "#12100c",
    canvas: "#171410",
    surface: "#1f1a14",
    surfaceAlt: "#2a231a",
    text: "#F7F3E8",
  },
  fonts: LUNJA_FAMILY_FONTS,
  motion: { ease: easeSoft, revealDuration: 0.85, stagger: 0.07 },
});

/** CHILLOUT Taghazout lounge bar — linen, chillout yellow, market-umbrella terracotta. */
export const CHILLOUT_THEME = makeWebTheme({
  slug: "chillout-lounge",
  mood: "lifestyle",
  rgb: { background: "20, 16, 16", accent: "255, 230, 0", secondary: "212, 75, 42" },
  colors: {
    primary: "#FFE600",
    secondary: "#D44B2A",
    accent: "#FFE600",
    accentAlt: "#D44B2A",
    background: "#141010",
    canvas: "#1a1410",
    surface: "#221a16",
    surfaceAlt: "#2e231c",
    text: "#F4EFE4",
  },
  fonts: LUNJA_FAMILY_FONTS,
  motion: { ease: easeEnergetic, revealDuration: 0.68, stagger: 0.05 },
});

/** CHILLOUT surf hostel & beer garden — sunrise-to-sunset social club. */
export const VIBESCAPE_THEME = makeWebTheme({
  slug: "chillout-social-club",
  mood: "lifestyle",
  rgb: { background: "28, 21, 18", accent: "240, 224, 0", secondary: "216, 204, 185" },
  colors: {
    primary: "#F0E000",
    secondary: "#d8ccb9",
    accent: "#F0E000",
    accentAlt: "#6b5f52",
    background: "#1c1512",
    canvas: "#221a16",
    surface: "#2a211b",
    surfaceAlt: "#372c23",
    text: "#f7f1e4",
  },
  fonts: LUNJA_FAMILY_FONTS,
  motion: { ease: easeEnergetic, revealDuration: 0.7, stagger: 0.06 },
});

const THEME_BY_SLUG: Record<string, ProjectTheme> = {
  "lunja-village": LUNJA_THEME,
  "educazen-kids": EDUCAZEN_THEME,
  bopassage: BOPASSAGE_THEME,
  "dmc-morocco": DMC_THEME,
  "eiden-academy": EIDEN_ACADEMY_THEME,
  "medical-bay": MEDICAL_BAY_THEME,
  orsen: ORSEN_THEME,
  "lithos-materiaux": LITHOS_THEME,
  "rihab-residence": RIHAB_THEME,
  "lunja-village-vibes": LUNJA_VIBES_THEME,
  "lunja-taghazout-bay": SERENE_THEME,
  "chillout-lounge": CHILLOUT_THEME,
  "chillout-social-club": VIBESCAPE_THEME,
};

/** Fallback when slug has no dedicated theme (should not happen for portfolio projects). */
export const DEFAULT_PROJECT_THEME: ProjectTheme = DMC_THEME;

export function getProjectTheme(slug: string): ProjectTheme {
  return THEME_BY_SLUG[slug] ?? DEFAULT_PROJECT_THEME;
}

/** CSS custom properties for scoping under `.project-themed`. */
export function projectThemeCssVars(theme: ProjectTheme): CSSProperties {
  return {
    "--project-primary": theme.colors.primary,
    "--project-secondary": theme.colors.secondary,
    "--project-accent": theme.colors.accent,
    "--project-accent-alt": theme.colors.accentAlt,
    "--project-bg": theme.colors.background,
    "--project-canvas": theme.colors.canvas,
    "--project-surface": theme.colors.surface,
    "--project-surface-alt": theme.colors.surfaceAlt,
    "--project-text": theme.colors.text,
    "--project-text-muted": theme.colors.textMuted,
    "--project-border": theme.colors.border,
    "--project-font-display": theme.fonts.display,
    "--project-font-editorial": theme.fonts.editorial,
    "--project-font-body": theme.fonts.body,
    "--project-font-label": theme.fonts.label,
    "--project-card-radius": theme.ui.cardRadius,
    "--project-card-border": theme.ui.cardBorder,
    "--project-card-bg": theme.ui.cardBackground,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  } as CSSProperties;
}
