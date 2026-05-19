import { getProjectTheme, projectThemeCssVars } from "@/data/projectThemes";
import { ProjectThemeContext } from "@/components/case-study/projectThemeContext";
import { useEffect, useMemo, type CSSProperties, type ReactNode } from "react";

const loadedFontUrls = new Set<string>();

function useProjectFonts(theme: ReturnType<typeof getProjectTheme>) {
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
