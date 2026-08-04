import { useEffect } from "react";

const loadedFontshareUrls = new Set<string>();

/**
 * Loads the project typefaces that aren't on Google Fonts (Satoshi, Britney,
 * Excon, Tanker, Telma). Called at page level rather than inside the case-study
 * body so the hero is set in the real face too, not just the type specimens.
 */
export function useFontshare(query: string | undefined) {
  useEffect(() => {
    if (!query) return;
    const href = `https://api.fontshare.com/v2/css?${query}`;
    if (loadedFontshareUrls.has(href)) return;
    loadedFontshareUrls.add(href);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  }, [query]);
}
