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
  brandBookUrl: "https://eiden-group.com/brand-books/lunja-brand-book",
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
    editorial: '"Great Vibes", cursive',
    body: '"DM Sans", system-ui, sans-serif',
    label: '"DM Sans", system-ui, sans-serif',
    googleUrl:
      "family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Great+Vibes&family=Lora:ital,wght@0,400;1,400&display=swap",
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
  brandBookUrl: "https://eiden-group.com/brand-books/educazenkids-brand-book",
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
  brandBookUrl: "https://eiden-group.com/brand-books/bopassage-brand-book",
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
  brandBookUrl: "https://eiden-group.com/brand-books/dmc-brand-book",
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

const THEME_BY_SLUG: Record<string, ProjectTheme> = {
  "lunja-village": LUNJA_THEME,
  "educazen-kids": EDUCAZEN_THEME,
  bopassage: BOPASSAGE_THEME,
  "dmc-morocco": DMC_THEME,
  "eiden-academy": EIDEN_ACADEMY_THEME,
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
