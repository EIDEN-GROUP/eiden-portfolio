import {
  getProjectTheme,
  projectThemeCssVars,
  type ProjectTheme,
} from "@/data/projectThemes";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";

const ProjectThemeContext = createContext<ProjectTheme | null>(null);

const loadedFontUrls = new Set<string>();

function useProjectFonts(theme: ProjectTheme) {
  useEffect(() => {
    const href = `https://fonts.googleapis.com/css2?${theme.fonts.googleUrl}`;
    if (loadedFontUrls.has(href)) return;
    loadedFontUrls.add(href);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  }, [theme.fonts.googleUrl]);
}

export function ProjectThemeProvider({
  slug,
  children,
  className,
  style,
}: {
  slug: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const theme = useMemo(() => getProjectTheme(slug), [slug]);
  useProjectFonts(theme);

  return (
    <ProjectThemeContext.Provider value={theme}>
      <div
        data-project-theme={slug}
        data-project-mood={theme.mood}
        className={className}
        style={{ ...projectThemeCssVars(theme), ...style }}
      >
        {children}
      </div>
    </ProjectThemeContext.Provider>
  );
}

export function useProjectTheme(): ProjectTheme {
  const ctx = useContext(ProjectThemeContext);
  if (!ctx) {
    throw new Error("useProjectTheme must be used within ProjectThemeProvider");
  }
  return ctx;
}

export function useProjectThemeOptional(): ProjectTheme | null {
  return useContext(ProjectThemeContext);
}
