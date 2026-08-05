import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LayoutGrid, List, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "@/components/site/Footer";
import { visibleProjects, ADDITIONAL_WEB_DESIGN_SLUGS, type Project } from "@/data/projects";
import { getProjectTheme } from "@/data/projectThemes";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "index";

/** Everything a visitor might plausibly type, flattened once per project. */
function haystack(p: Project) {
  return [p.title, p.category, p.tagline, p.summary, p.year, p.index, ...p.services]
    .join(" ")
    .toLowerCase();
}

const SEARCH_INDEX = new Map(visibleProjects.map((p) => [p.slug, haystack(p)]));

/** A project is Web design if it's categorised as such or ships a website via the secondary mapping. */
function isWebDesign(p: Project): boolean {
  return p.category === "Web design" || ADDITIONAL_WEB_DESIGN_SLUGS.has(p.slug);
}

/** Category membership — includes the secondary "Web design" grouping. */
function matchesCategory(p: Project, cat: string): boolean {
  if (cat === "all") return true;
  if (p.category === cat) return true;
  return cat === "Web design" && isWebDesign(p);
}

const CATEGORIES = (() => {
  const allCats = Array.from(new Set([...visibleProjects.map((p) => p.category), "Web design"]));
  return [
    { label: "All work", value: "all", count: visibleProjects.length },
    ...allCats
      .map((label) => ({
        label,
        value: label,
        count: visibleProjects.filter((p) => matchesCategory(p, label)).length,
      }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label)),
  ];
})();

function useProjectAccent(slug: string) {
  return useMemo(() => getProjectTheme(slug).colors.accent, [slug]);
}

function GridCard({ p, i }: { p: Project; i: number }) {
  const accent = useProjectAccent(p.slug);
  const reduce = useReducedMotion();

  return (
    <motion.li
      layout={!reduce}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : Math.min(i * 0.035, 0.28),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <Link
        to={`/projects/${p.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${p.title} — ${p.category}`}
      >
        {/* Accent bleed, revealed on hover/focus */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[1.25rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40 group-focus-visible:opacity-40"
          style={{ background: `radial-gradient(60% 60% at 50% 40%, ${accent}, transparent 70%)` }}
        />

        <div
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition-colors duration-500 group-hover:border-white/25 group-focus-visible:border-white/40"
          style={{ aspectRatio: "7 / 9" }}
        >
          <img
            src={p.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          <span
            className="absolute left-4 top-4 font-label text-[10px] uppercase tracking-[0.34em] text-white/70"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            {p.index}
          </span>

          <span
            className="absolute right-4 top-4 rounded-full px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.24em] backdrop-blur-md"
            style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
          >
            {p.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
              {p.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 font-editorial text-sm italic leading-snug text-white/60">
              {p.tagline}
            </p>
          </div>

          <span
            className="absolute bottom-5 right-5 grid h-9 w-9 translate-y-2 place-items-center rounded-full border border-white/25 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ background: `${accent}1f` }}
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={1.6} />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

function IndexRow({ p, i }: { p: Project; i: number }) {
  const accent = useProjectAccent(p.slug);
  const reduce = useReducedMotion();

  return (
    <motion.li
      layout={!reduce}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        delay: reduce ? 0 : Math.min(i * 0.03, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative border-b border-white/10 last:border-b-0"
    >
      <Link
        to={`/projects/${p.slug}`}
        className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors sm:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)_5rem_2.5rem] sm:gap-6 sm:py-6"
      >
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/35 tabular-nums">
          {p.index}
        </span>

        <span className="min-w-0">
          <span className="block truncate font-display text-lg font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-white sm:text-2xl">
            {p.title}
          </span>
          <span className="mt-0.5 block truncate font-editorial text-xs italic text-white/45 sm:hidden">
            {p.category}
          </span>
        </span>

        <span className="hidden min-w-0 sm:block">
          <span className="block truncate font-body text-xs text-white/45">
            {p.services.slice(0, 3).join(" · ")}
          </span>
        </span>

        <span
          className="hidden font-label text-[10px] uppercase tracking-[0.24em] sm:block"
          style={{ color: accent }}
        >
          {p.year}
        </span>

        <span className="justify-self-end text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </Link>

      {/* Accent underline sweeps in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: accent }}
      />
    </motion.li>
  );
}

export function ProjectsIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<ViewMode>("grid");
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses search, Escape clears it — quick scanning without reaching for the mouse.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && typing) {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return visibleProjects.filter((p) => {
      if (!matchesCategory(p, category)) return false;
      if (!terms.length) return true;
      const hay = SEARCH_INDEX.get(p.slug) ?? "";
      return terms.every((t) => hay.includes(t));
    });
  }, [query, category]);

  const clear = useCallback(() => {
    setQuery("");
    setCategory("all");
  }, []);

  const filtering = query.trim().length > 0 || category !== "all";

  return (
    <>
      <main className="min-h-screen" style={{ background: "oklch(0.07 0.012 165)" }}>
        {/* ── Masthead ───────────────────────────────────────────── */}
        <header className="relative overflow-hidden px-[max(1rem,env(safe-area-inset-left))] pb-10 pr-[max(1rem,env(safe-area-inset-right))] pt-[calc(7rem+env(safe-area-inset-top))] sm:px-12 sm:pb-14 sm:pt-[calc(9rem+env(safe-area-inset-top))]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 15% 0%, rgba(215,187,147,0.10), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <p className="mb-5 font-label text-[10px] uppercase tracking-[0.5em] text-gold">
              The index · {String(visibleProjects.length).padStart(2, "0")} mandates
            </p>
            <h1
              className="font-display font-bold leading-[0.92] tracking-[-0.045em] text-white"
              style={{ fontSize: "clamp(2.75rem, 11vw, 8rem)" }}
            >
              Every project,
              <br />
              <span className="text-white/35">in one place.</span>
            </h1>
            <p className="mt-6 max-w-xl font-editorial text-base leading-relaxed text-white/50 sm:text-lg">
              Brand systems, websites and the operating layers underneath them. Search it, filter
              it, or just scroll.
            </p>
          </div>
        </header>

        {/* ── Controls ───────────────────────────────────────────── */}
        <div className="sticky top-0 z-30 border-y border-white/10 bg-[oklch(0.07_0.012_165)]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-[max(1rem,env(safe-area-inset-left))] py-4 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-sm">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                strokeWidth={1.5}
                aria-hidden
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, services, years…"
                aria-label="Search projects"
                className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-16 font-body text-sm text-white placeholder:text-white/35 transition-colors focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/45 transition-colors hover:text-white"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              ) : (
                <kbd
                  className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-white/15 px-1.5 py-0.5 font-label text-[10px] text-white/35 sm:block"
                  aria-hidden
                >
                  /
                </kbd>
              )}
            </div>

            {/* Categories + view toggle */}
            <div className="flex items-center gap-3 overflow-x-auto lg:overflow-visible">
              <ul className="flex shrink-0 items-center gap-2">
                {CATEGORIES.map((c) => {
                  const active = category === c.value;
                  return (
                    <li key={c.value}>
                      <button
                        type="button"
                        onClick={() => setCategory(c.value)}
                        aria-pressed={active}
                        className={cn(
                          "whitespace-nowrap rounded-full border px-3.5 py-2 font-label text-[10px] uppercase tracking-[0.18em] transition-all duration-300",
                          active
                            ? "border-gold/70 bg-gold/15 text-gold"
                            : "border-white/12 text-white/50 hover:border-white/30 hover:text-white/80",
                        )}
                      >
                        {c.label}
                        <span className="ml-1.5 tabular-nums opacity-50">{c.count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="ml-auto hidden shrink-0 items-center gap-1 rounded-full border border-white/12 p-1 lg:flex">
                {(
                  [
                    ["grid", LayoutGrid, "Grid view"],
                    ["index", List, "Index view"],
                  ] as const
                ).map(([mode, Icon, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setView(mode)}
                    aria-pressed={view === mode}
                    aria-label={label}
                    className={cn(
                      "rounded-full p-2 transition-colors",
                      view === mode
                        ? "bg-white/12 text-white"
                        : "text-white/40 hover:text-white/70",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Results ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-10 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 sm:py-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p
              aria-live="polite"
              className="font-label text-[10px] uppercase tracking-[0.34em] text-white/40"
            >
              {results.length === visibleProjects.length
                ? `Showing all ${results.length}`
                : `${results.length} of ${visibleProjects.length}`}
            </p>
            {filtering ? (
              <button
                type="button"
                onClick={clear}
                className="font-label text-[10px] uppercase tracking-[0.28em] text-gold transition-opacity hover:opacity-70"
              >
                Reset
              </button>
            ) : null}
          </div>

          {results.length === 0 ? (
            <div className="border border-white/10 px-6 py-20 text-center">
              <p className="font-display text-2xl font-bold text-white/80">Nothing matches that.</p>
              <p className="mt-3 font-editorial text-sm italic text-white/45">
                Try a shorter term, or reset the filters.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-6 rounded-full border border-gold/60 px-5 py-2.5 font-label text-[10px] uppercase tracking-[0.28em] text-gold transition-colors hover:bg-gold/10"
              >
                Reset filters
              </button>
            </div>
          ) : view === "grid" ? (
            <motion.ul
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <GridCard key={p.slug} p={p} i={i} />
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.ul layout className="border-t border-white/10">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <IndexRow key={p.slug} p={p} i={i} />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
