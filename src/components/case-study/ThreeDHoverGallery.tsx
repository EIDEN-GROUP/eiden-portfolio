import type { CinematicGalleryItem } from "@/data/projectCinematicGallery";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type KeyboardEvent,
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

const ease = [0.22, 1, 0.36, 1] as const;

const springTransition = (spring: ThreeDHoverGalleryTheme["spring"]): Transition => ({
  type: "spring",
  ...spring,
});

/** Narrow ellipse under the card — shadow reads at the bottom only, not on the sides. */
function GalleryCardBottomShadow({
  isActive,
  accent,
}: {
  isActive: boolean;
  accent: string;
}) {
  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-1.5 left-[18%] right-[18%] z-0 h-1.5 rounded-[100%] blur-[3px] transition-opacity duration-500",
          isActive ? "bg-black/50" : "bg-black/40",
        )}
      />
      {isActive ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1 left-[30%] right-[30%] z-0 h-1 rounded-[100%] blur-[5px] opacity-30"
          style={{ background: accent }}
        />
      ) : null}
    </>
  );
}

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
  index,
  layout = "overlay",
}: {
  item: CinematicGalleryItem;
  theme: ThreeDHoverGalleryTheme;
  visible: boolean;
  index: number;
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
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.04 },
            },
          }}
          className={cn(
            "z-20 flex flex-col",
            isOverlay
              ? "pointer-events-none absolute inset-0 justify-end"
              : "relative justify-start py-2 pointer-events-auto",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
            aria-hidden
          />

          <div
            className={cn(
              "relative mt-auto border-t border-white/[0.1] bg-black/50 backdrop-blur-md",
              socialCard ? "px-5 py-6 sm:px-7 sm:py-8" : "px-5 py-5 sm:px-7 sm:py-6",
            )}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
              }}
              className="flex items-center justify-between gap-3"
            >
              <span
                className="inline-flex items-center gap-2 border px-2.5 py-1 font-label text-[8px] uppercase tracking-[0.42em]"
                style={{ borderColor: theme.accent, color: theme.accent }}
              >
                {item.category}
              </span>
              <span
                className="font-mono text-[10px] tabular-nums tracking-[0.2em]"
                style={{ color: theme.textMuted }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>

            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-3 font-display text-xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-2xl"
              style={{ color: theme.text }}
            >
              {item.title}
            </motion.h3>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.04 } },
              }}
              className="mt-2 max-w-md font-editorial text-sm leading-relaxed sm:text-[15px]"
              style={{ color: theme.textMuted }}
            >
              {compactDescription}
            </motion.p>

            {socialEntries.length ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }}
                className={cn(
                  "mt-4 flex flex-wrap gap-2",
                  socialCard && "mt-5 justify-center gap-3 sm:gap-4",
                )}
              >
                {socialEntries.map(({ id, href, label, Icon }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — ${item.title}`}
                    className={cn(
                      "pointer-events-auto transition-all duration-500 hover:scale-105",
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
                      className={
                        socialCard ? "h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" : "h-3 w-3"
                      }
                    />
                    {!socialCard ? label : null}
                  </a>
                ))}
              </motion.div>
            ) : null}

            {item.cta && !hideCta ? (
              <motion.a
                href={item.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
                className="pointer-events-auto mt-5 inline-flex w-fit items-center gap-2 border px-4 py-2.5 font-label text-[9px] uppercase tracking-[0.36em] transition-all duration-500 hover:gap-3"
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
          </div>
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
      aria-label={`${item.title} — ${item.category}`}
      aria-pressed={isActive}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      transition={springTransition(theme.spring)}
      className={cn(
        "group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center overflow-visible outline-none [transform-style:preserve-3d]",
        "ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-[var(--gallery-ring)]",
        isActive ? "cursor-default" : "cursor-pointer",
      )}
      style={
        {
          width: isActive ? "min(28rem, 42vw)" : "min(20rem, 31vw)",
          height: isActive ? "min(36rem, 72vh)" : "min(26rem, 56vh)",
          zIndex: 40 - abs,
          "--gallery-ring": theme.accent,
        } as React.CSSProperties
      }
      animate={
        reduceMotion
          ? {
              x: spread * 140,
              scale: isActive ? 1 : 0.94,
              opacity: isActive ? 1 : 0.75,
            }
          : {
              x: offset * 124,
              scale: isActive ? 1.04 : 0.92 - abs * 0.03,
              rotateY: offset * -12,
              z: isActive ? 100 : 50 - abs * 10,
              opacity: isActive ? 1 : Math.max(0.55, 0.88 - abs * 0.14),
            }
      }
      whileHover={!isActive ? { scale: 0.94 - abs * 0.03 + 0.02 } : undefined}
    >
      <div className="relative h-full w-full">
        <div
          className={cn(
            "relative z-[1] h-full w-full overflow-hidden border bg-[#0a0a0a] transition-[border-color] duration-700",
            isActive ? "border-white/25" : "border-white/[0.12]",
          )}
        >
        <motion.img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          draggable={false}
          animate={{ scale: isActive ? 1.03 : 1 }}
          transition={{ duration: 1.2, ease }}
        />

        {/* Top index strip */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-black/40 px-4 py-2.5 backdrop-blur-sm sm:px-5">
          <span
            className="font-label text-[8px] uppercase tracking-[0.4em]"
            style={{ color: theme.accent }}
          >
            {item.category}
          </span>
          <span
            className="font-mono text-[10px] tabular-nums tracking-[0.18em]"
            style={{ color: theme.textMuted }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20"
          animate={{ opacity: isActive ? 0.5 : 0.75 }}
          transition={{ duration: 0.5 }}
        />

        <GalleryCardOverlay
          item={item}
          theme={theme}
          visible={isActive}
          index={index}
          layout="overlay"
        />

        {!isActive ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.08] bg-black/55 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
            <p
              className="font-display text-base font-semibold tracking-[-0.03em] sm:text-lg"
              style={{ color: theme.text }}
            >
              {item.title}
            </p>
          </div>
        ) : null}
        </div>
        <GalleryCardBottomShadow isActive={isActive} accent={theme.accent} />
      </div>
    </motion.button>
  );
}

function MobileGalleryCard({
  item,
  index,
  total,
  isActive,
  theme,
}: {
  item: CinematicGalleryItem;
  index: number;
  total: number;
  isActive: boolean;
  theme: ThreeDHoverGalleryTheme;
}) {
  return (
    <motion.article
      layout
      animate={{
        scale: isActive ? 1 : 0.96,
        opacity: isActive ? 1 : 0.72,
      }}
      transition={springTransition(theme.spring)}
      className="relative snap-center shrink-0 overflow-visible"
      style={{ width: "min(84vw, 22.5rem)" }}
    >
      <div className="relative w-full">
        <div
          className={cn(
            "relative z-[1] block w-full overflow-hidden border bg-[#0a0a0a] text-left transition-[border-color] duration-500",
            isActive ? "border-white/25" : "border-white/[0.1]",
          )}
        >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <motion.img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
            animate={{ scale: isActive ? 1.04 : 1 }}
            transition={{ duration: 0.9, ease }}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/[0.08] bg-black/45 px-4 py-2 backdrop-blur-sm">
            <span
              className="font-label text-[8px] uppercase tracking-[0.38em]"
              style={{ color: theme.accent }}
            >
              {item.category}
            </span>
            <span
              className="font-mono text-[9px] tabular-nums tracking-[0.16em]"
              style={{ color: theme.textMuted }}
            >
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
          </div>

          {isActive ? (
            <GalleryCardOverlay
              item={item}
              theme={theme}
              visible
              index={index}
              layout="overlay"
            />
          ) : (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-black/50 px-4 py-3 backdrop-blur-sm">
              <p
                className="font-display text-base font-semibold tracking-[-0.03em]"
                style={{ color: theme.text }}
              >
                {item.title}
              </p>
            </div>
          )}
        </div>
        </div>
        <GalleryCardBottomShadow isActive={isActive} accent={theme.accent} />
      </div>
    </motion.article>
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
  const [swipeHintDismissed, setSwipeHintDismissed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);

  const count = items.length;

  const dismissSwipeHint = useCallback(() => {
    setSwipeHintDismissed(true);
  }, []);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const el = mobileScrollerRef.current;
      if (!el) {
        setActiveIndex(idx);
        return;
      }
      const card = el.querySelector<HTMLElement>("[data-cinematic-card]");
      if (!card) {
        setActiveIndex(idx);
        return;
      }
      const gap = 16;
      const w = card.offsetWidth + gap;
      el.scrollTo({ left: idx * w, behavior: reduceMotion ? "auto" : "smooth" });
      setActiveIndex(idx);
      dismissSwipeHint();
    },
    [dismissSwipeHint, reduceMotion],
  );

  const syncActiveFromScroll = useCallback(() => {
    const el = mobileScrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-cinematic-card]");
    if (!card) return;
    const gap = 16;
    const w = card.offsetWidth + gap;
    const idx = Math.round(el.scrollLeft / w);
    if (idx >= 0 && idx < count) setActiveIndex(idx);
    dismissSwipeHint();
  }, [count, dismissSwipeHint]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (isMobile) {
        scrollToIndex((activeIndex + dir + count) % count);
        return;
      }
      setActiveIndex((i) => (i + dir + count) % count);
    },
    [activeIndex, count, isMobile, scrollToIndex],
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
        className="relative z-10 flex flex-col justify-start px-[max(1rem,env(safe-area-inset-left))] py-8 pr-[max(1rem,env(safe-area-inset-right))] sm:py-10 lg:min-h-[min(92svh,58rem)] lg:justify-center lg:px-12 lg:py-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease }}
      >
        {!isMobile ? (
          <>
            <motion.div
              className="relative mx-auto w-full max-w-6xl [perspective:1600px]"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease }}
            >
              {/* Ambient backdrop */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[min(50vh,24rem)] w-[min(90%,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
                style={{
                  background: `radial-gradient(ellipse at center, color-mix(in srgb, ${theme.accent} 40%, transparent), transparent 70%)`,
                }}
                aria-hidden
              />

              <div className="relative mx-auto h-[min(76vh,44rem)] w-full max-w-6xl">
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

            <motion.div
              className="mx-auto mt-10 flex max-w-5xl items-center justify-between gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    animate={{
                      width: i === activeIndex ? 32 : 8,
                      opacity: i === activeIndex ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.45, ease }}
                    className="h-1.5 rounded-full"
                    style={{
                      background: i === activeIndex ? theme.accent : theme.border,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => go(-1)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springTransition(theme.spring)}
                  className="grid h-11 w-11 place-items-center rounded-full border bg-white/[0.03] transition-colors hover:bg-white/[0.06]"
                  style={{ borderColor: theme.border, color: theme.text }}
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => go(1)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springTransition(theme.spring)}
                  className="grid h-11 w-11 place-items-center rounded-full border bg-white/[0.03] transition-colors hover:bg-white/[0.06]"
                  style={{ borderColor: theme.border, color: theme.text }}
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </motion.button>
               
              </div>
            </motion.div>
          </>
        ) : (
          <div className="relative">
            {count > 1 ? (
              <>
                {activeIndex > 0 ? (
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6= from-black/55 to-transparent sm:w-8"
                    aria-hidden
                  />
                ) : null}
                {activeIndex < count - 1 ? (
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 from-black/65 to-transparent sm:w-12"
                    aria-hidden
                  />
                ) : null}

                <AnimatePresence>
                  {!swipeHintDismissed && activeIndex < count - 1 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.45, ease }}
                      className="pointer-events-none absolute inset-x-0 top-[42%] z-20 flex justify-end px-5 sm:px-6"
                      aria-hidden
                    >
                      <motion.div
                        animate={reduceMotion ? undefined : { x: [0, 7, 0] }}
                        transition={
                          reduceMotion
                            ? undefined
                            : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
                        }
                        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md"
                      >
                        <span
                          className="font-label text-[8px] uppercase tracking-[0.34em]"
                          style={{ color: theme.textMuted }}
                        >
                          Swipe
                        </span>
                        <ChevronRight className="h-3 w-3" style={{ color: theme.accent }} />
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </>
            ) : null}

            <div
              ref={mobileScrollerRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Visual story slides — swipe horizontally to browse"
              data-lenis-prevent
              data-lenis-prevent-touch
              onScroll={syncActiveFromScroll}
              onTouchStart={dismissSwipeHint}
              className="-mx-[max(1rem,env(safe-area-inset-left))] flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-[max(1rem,env(safe-area-inset-left))] pb-2 pr-[max(1rem,env(safe-area-inset-right))] scroll-px-[max(1rem,env(safe-area-inset-left))] snap-x snap-mandatory scrollbar-none [-webkit-overflow-scrolling:touch] [touch-action:pan-x] active:cursor-grabbing"
            >
              {items.map((item, i) => (
                <div key={item.id} data-cinematic-card className="snap-center shrink-0">
                  <MobileGalleryCard
                    item={item}
                    index={i}
                    total={count}
                    isActive={i === activeIndex}
                    theme={theme}
                  />
                </div>
              ))}
            </div>

            {count > 1 ? (
              <motion.div
                className="mt-5 flex flex-col items-center gap-5 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="flex items-center justify-center gap-2">
                  {items.map((_, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1} of ${count}`}
                      aria-current={i === activeIndex ? "true" : undefined}
                      onClick={() => scrollToIndex(i)}
                      animate={{
                        width: i === activeIndex ? 28 : 8,
                        opacity: i === activeIndex ? 1 : 0.45,
                      }}
                      transition={{ duration: 0.45, ease }}
                      className="h-1.5 rounded-full"
                      style={{
                        background: i === activeIndex ? theme.accent : theme.border,
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => go(-1)}
                    whileTap={{ scale: 0.96 }}
                    transition={springTransition(theme.spring)}
                    className="grid h-11 w-11 place-items-center rounded-full border bg-white/[0.03] transition-colors active:bg-white/[0.08]"
                    style={{ borderColor: theme.border, color: theme.text }}
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  </motion.button>
                  <span
                    className="min-w-[3.5rem] text-center font-mono text-[10px] tabular-nums tracking-[0.18em]"
                    style={{ color: theme.textMuted }}
                    aria-live="polite"
                  >
                    {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                  <motion.button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => go(1)}
                    whileTap={{ scale: 0.96 }}
                    transition={springTransition(theme.spring)}
                    className="grid h-11 w-11 place-items-center rounded-full border bg-white/[0.03] transition-colors active:bg-white/[0.08]"
                    style={{ borderColor: theme.border, color: theme.text }}
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </motion.div>
            ) : null}
          </div>
        )}
      </motion.div>
    </section>
  );
}
