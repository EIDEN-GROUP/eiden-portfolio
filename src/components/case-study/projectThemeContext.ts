import type { ProjectTheme } from "@/data/projectThemes";
import { createContext, useContext } from "react";

export const ProjectThemeContext = createContext<ProjectTheme | null>(null);

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
