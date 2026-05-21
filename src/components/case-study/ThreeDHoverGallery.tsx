import type { CinematicGalleryItem } from "@/data/projectCinematicGallery";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
} from "react";

export type ThreeDHoverGalleryTheme = {
  accent: string;
  text: string;
  textMuted: string;
  border: string;
  background: string;
  gradient?: string;
  spring: { stiffness: number; damping: number; mass: number };
};

type ThreeDHoverGalleryProps = {
  items: readonly CinematicGalleryItem[];
  theme: ThreeDHoverGalleryTheme;
  autoplay?: boolean;
  autoplayMs?: number;
  className?: string;
};

const springTransition = (spring: ThreeDHoverGalleryTheme["spring"]): Transition => ({
  type: "spring",
  ...spring,
});

type SocialEntry = {
  id: string;
  href: string;
  label: string;
  Icon: (props: { className?: string }) => ReactElement;
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.2-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H8v3.2h2.6V22h2.9z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M14.9 3h2.7c.2 1.8 1.5 3.3 3.2 3.7v2.8c-1.4-.1-2.8-.6-3.9-1.5v6.3a5.5 5.5 0 1 1-5.5-5.5c.2 0 .5 0 .7.1v2.8a2.8 2.8 0 1 0 2.8 2.8V3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

function compactText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function socialEntriesFromLinks(links: CinematicGalleryItem["socialLinks"]): SocialEntry[] {
  if (!links) return [];
  return [
    links.linkedin?.trim()
      ? { id: "linkedin", href: links.linkedin.trim(), label: "LinkedIn", Icon: LinkedInIcon }
      : null,
    links.instagram?.trim()
      ? { id: "instagram", href: links.instagram.trim(), label: "Instagram", Icon: InstagramIcon }
      : null,
    links.facebook?.trim()
      ? { id: "facebook", href: links.facebook.trim(), label: "Facebook", Icon: FacebookIcon }
      : null,
    links.tiktok?.trim()
      ? { id: "tiktok", href: links.tiktok.trim(), label: "TikTok", Icon: TikTokIcon }
      : null,
    links.website?.trim()
      ? { id: "website", href: links.website.trim(), label: "Website", Icon: Globe }
      : null,
  ].filter(Boolean) as SocialEntry[];
}

function isSocialMediaCard(item: CinematicGalleryItem): boolean {
  const category = item.category.trim().toLowerCase();
  return category.includes("social") || item.id.endsWith("-social-links");
}

function GalleryCardOverlay({
  item,
  theme,
  visible,
  layout = "overlay",
}: {
  item: CinematicGalleryItem;
  theme: ThreeDHoverGalleryTheme;
  visible: boolean;
  layout?: "overlay" | "inline";
}) {
  const isOverlay = layout === "overlay";
  const socialCard = isSocialMediaCard(item);
  const compactDescription = compactText(item.description, socialCard ? 72 : 105);
  const hideCta =
    socialCard ||
    item.category.trim().toLowerCase() === "hospitality" ||
    item.category.trim().toLowerCase() === "brand";
  const socialEntries = socialEntriesFromLinks(item.socialLinks);

  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "z-20 flex flex-col",
            isOverlay
              ? "pointer-events-none absolute inset-0 justify-end p-5 sm:p-7 md:p-8"
              : "relative justify-start py-2 pointer-events-auto",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/72 to-black/35"
            aria-hidden
          />
          <p
            className="relative font-label text-[9px] uppercase tracking-[0.48em]"
            style={{ color: theme.accent }}
          >
            {item.category}
          </p>
          <h3
            className="relative mt-2 font-display text-xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-2xl md:text-[1.65rem]"
            style={{ color: theme.text }}
          >
            {item.title}
          </h3>
          <p
            className="relative mt-2 max-w-md font-editorial text-sm leading-relaxed sm:text-[14px]"
            style={{ color: theme.text }}
          >
            {compactDescription}
          </p>
          {socialEntries.length ? (
            <div
              className={cn(
                "relative mt-4 flex flex-wrap gap-2",
                socialCard && "mt-5 justify-center gap-3 sm:gap-4",
              )}
            >
              {socialEntries.map(({ id, href, label, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}  ${item.title}`}
                  className={cn(
                    "pointer-events-auto transition-opacity hover:opacity-90",
                    socialCard
                      ? "grid h-11 w-11 place-items-center rounded-full border sm:h-12 sm:w-12"
                      : "inline-flex items-center gap-1.5 border px-3 py-1.5 font-label text-[8px] uppercase tracking-[0.24em]",
                  )}
                  style={{
                    borderColor: theme.accent,
                    color: theme.text,
                    borderRadius: socialCard ? "9999px" : "2px",
                  }}
                >
                  <Icon
                    className={socialCard ? "h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" : "h-3 w-3"}
                  />
                  {!socialCard ? label : null}
                </a>
              ))}
            </div>
          ) : null}
          {item.cta && !hideCta ? (
            <motion.a
              href={item.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="pointer-events-auto relative mt-5 inline-flex w-fit items-center gap-2 border px-4 py-2.5 font-label text-[9px] uppercase tracking-[0.36em] transition-opacity hover:opacity-90"
              style={{
                borderColor: theme.accent,
                color: theme.text,
                borderRadius: "2px",
              }}
            >
              {item.cta.label}
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </motion.a>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DesktopGalleryCard({
  item,
  index,
  activeIndex,
  total,
  theme,
  onActivate,
  reduceMotion,
}: {
  item: CinematicGalleryItem;
  index: number;
  activeIndex: number;
  total: number;
  theme: ThreeDHoverGalleryTheme;
  onActivate: (index: number) => void;
  reduceMotion: boolean;
}) {
  const offset = index - activeIndex;
  const abs = Math.abs(offset);
  const isActive = offset === 0;
  const center = (total - 1) / 2;
  const spread = index - center;

  return (
    <motion.button
      type="button"
      aria-label={`${item.title} â€” ${item.category}`}
      aria-pressed={isActive}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      transition={springTransition(theme.spring)}
      className={cn(
        "group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center overflow-hidden rounded-lg shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] outline-none [transform-style:preserve-3d]",
        "ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-[var(--gallery-ring)]",
        isActive ? "cursor-default" : "cursor-pointer",
      )}
      style={
        {
          width: isActive ? "min(26rem, 40vw)" : "min(19rem, 30vw)",
          height: isActive ? "min(33rem, 68vh)" : "min(25rem, 54vh)",
          zIndex: 30 - abs,
          filter: isActive
            ? "brightness(1.05) saturate(1.08)"
            : `grayscale(${Math.min(0.65, 0.25 + abs * 0.2)}) brightness(${Math.max(0.45, 0.72 - abs * 0.12)})`,
          "--gallery-ring": theme.accent,
        } as React.CSSProperties
      }
      animate={
        reduceMotion
          ? { x: spread * 140, scale: isActive ? 1 : 0.94, opacity: isActive ? 1 : 0.65 }
          : {
              x: offset * 118,
              scale: isActive ? 1.06 : 0.9 - abs * 0.04,
              rotateY: offset * -14,
              z: isActive ? 80 : 40 - abs * 8,
            }
      }
    >
      <img
        src={item.src}
        alt={item.alt}
        className="h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/56 to-black/18"
        animate={{ opacity: isActive ? 1 : 0.86 }}
      />
      <GalleryCardOverlay item={item} theme={theme} visible={isActive} layout="overlay" />
    </motion.button>
  );
}

function MobileGalleryCard({
  item,
  isActive,
  theme,
}: {
  item: CinematicGalleryItem;
  isActive: boolean;
  theme: ThreeDHoverGalleryTheme;
}) {
  return (
    <article
      className={cn(
        "snap-center shrink-0 overflow-hidden rounded-lg shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] transition-[filter,transform] duration-500 [touch-action:pan-x]",
        isActive ? "scale-100" : "scale-[0.97] opacity-80",
      )}
      style={{
        width: "min(85vw, 22rem)",
        filter: isActive ? "brightness(1.02)" : "grayscale(0.5) brightness(0.7)",
      }}
    >
      <div className="relative block w-full text-left">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
            aria-hidden
          />
          {isActive ? (
            <GalleryCardOverlay item={item} theme={theme} visible layout="overlay" />
          ) : (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
              <p
                className="font-label text-[8px] uppercase tracking-[0.4em]"
                style={{ color: theme.accent }}
              >
                {item.category}
              </p>
              <p
                className="mt-1 font-display text-lg font-semibold tracking-[-0.03em]"
                style={{ color: theme.text }}
              >
                {item.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ThreeDHoverGallery({
  items,
  theme,
  autoplay = true,
  autoplayMs = 5200,
  className,
}: ThreeDHoverGalleryProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);

  const count = items.length;

  const syncActiveFromScroll = useCallback(() => {
    const el = mobileScrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-cinematic-card]");
    if (!card) return;
    const gap = 16;
    const w = card.offsetWidth + gap;
    const idx = Math.round(el.scrollLeft / w);
    if (idx >= 0 && idx < count) setActiveIndex(idx);
  }, [count]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActiveIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!autoplay || paused || reduceMotion || isMobile || count < 2) return;
    const id = window.setInterval(() => go(1), autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayMs, paused, reduceMotion, isMobile, count, go]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  if (!count) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Cinematic brand story"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!sectionRef.current?.contains(e.relatedTarget)) setPaused(false);
      }}
      className={cn("relative outline-none", className)}
    >
      <motion.div
        className="relative z-10 flex flex-col justify-start px-[max(1rem,env(safe-area-inset-left))] py-8 pr-[max(1rem,env(safe-area-inset-right))] sm:py-10 lg:min-h-[min(92svh,56rem)] lg:justify-center lg:px-12 lg:py-24"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {!isMobile ? (
          <>
            <motion.div
              className="relative mx-auto w-full max-w-6xl [perspective:1400px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative mx-auto h-[min(72vh,42rem)] w-full max-w-6xl">
                {items.map((item, i) => (
                  <DesktopGalleryCard
                    key={item.id}
                    item={item}
                    index={i}
                    activeIndex={activeIndex}
                    total={count}
                    theme={theme}
                    onActivate={setActiveIndex}
                    reduceMotion={!!reduceMotion}
                  />
                ))}
              </div>
            </motion.div>

            <div className="mx-auto mt-10 flex max-w-5xl items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? 28 : 8,
                      background: i === activeIndex ? theme.accent : theme.border,
                      opacity: i === activeIndex ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => go(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border transition-opacity hover:opacity-100"
                  style={{ borderColor: theme.border, color: theme.textMuted, opacity: 0.7 }}
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => go(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border transition-opacity hover:opacity-100"
                  style={{ borderColor: theme.border, color: theme.textMuted, opacity: 0.7 }}
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span
                  className="hidden font-label text-[8px] uppercase tracking-[0.42em] sm:inline"
                  style={{ color: theme.textMuted }}
                >
                  <ArrowLeft className="mr-1 inline h-3 w-3 opacity-50" strokeWidth={1.5} />
                  Arrow keys
                  <ArrowRight className="ml-1 inline h-3 w-3 opacity-50" strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              ref={mobileScrollerRef}
              data-lenis-prevent
              data-lenis-prevent-touch
              onScroll={syncActiveFromScroll}
              className="-mx-[max(1rem,env(safe-area-inset-left))] flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-[max(1rem,env(safe-area-inset-left))] pb-4 pr-[max(1rem,env(safe-area-inset-right))] scroll-px-[max(1rem,env(safe-area-inset-left))] snap-x snap-proximity scrollbar-none [-webkit-overflow-scrolling:touch] [touch-action:pan-x] active:cursor-grabbing"
            >
              {items.map((item, i) => (
                <div key={item.id} data-cinematic-card className="snap-center shrink-0">
                  <MobileGalleryCard item={item} isActive={i === activeIndex} theme={theme} />
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
