import { cn } from "@/lib/utils";
import { motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useProjectThemeOptional } from "@/components/case-study/projectThemeContext";
import { ease, fadeUp, stagger } from "./motion";

export function ServiceBandHeader({
  left,
  center,
  right,
  centerWide,
}: {
  left: string;
  center: string;
  right: string;
  centerWide?: boolean;
}) {
  const theme = useProjectThemeOptional();
  const border = theme?.colors.border ?? "rgba(255,255,255,0.12)";
  const muted = theme?.colors.textMuted ?? "rgba(255,255,255,0.65)";
  const text = theme?.colors.text ?? "rgba(255,255,255,0.82)";

  return (
    <div
      className="flex w-full flex-col gap-6 border-b px-[max(1rem,env(safe-area-inset-left))] py-7 sm:flex-row sm:items-end sm:gap-0 sm:px-8 sm:py-8"
      style={{ borderColor: border }}
    >
      <p
        className="flex-1 font-display text-xs font-normal leading-[150%] tracking-[-0.03em]"
        style={{ color: muted }}
      >
        {left}
      </p>
      <p
        className={cn(
          "mx-auto text-center font-display font-normal tracking-[-0.03em]",
          centerWide
            ? "max-w-[min(100%,40rem)] text-pretty text-[15px] leading-[1.45] sm:max-w-[min(100%,44rem)] sm:text-[17px] sm:leading-[1.5]"
            : "max-w-[min(100%,28rem)] text-xl leading-none tracking-[-0.05em] sm:text-2xl",
        )}
        style={{ color: text }}
      >
        {center}
      </p>
      <p
        className="flex-1 text-left font-display text-xs font-normal leading-[150%] tracking-[-0.03em] sm:text-right"
        style={{ color: muted }}
      >
        {right}
      </p>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const theme = useProjectThemeOptional();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const motionEase = theme?.motion.ease ?? ease;
  const motionDuration = theme?.motion.revealDuration ?? 0.9;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: motionDuration, delay, ease: motionEase },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  accentClass = "text-gold/80",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  accentClass?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8">
      <p className={cn("font-label text-[10px] uppercase tracking-[0.46em]", accentClass)}>
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-display font-semibold leading-[1.05] tracking-[-0.04em] text-white"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 font-editorial text-base italic leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function useCountUp(target: number, active: boolean, durationMs = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    setValue(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);
  return value;
}

export type ServiceMetric = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
};

export function MetricGrid({
  metrics,
  accentClass,
}: {
  metrics: ServiceMetric[];
  accentClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className="grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((m) => (
        <MetricCard key={m.label} metric={m} active={inView} accentClass={accentClass} />
      ))}
    </motion.div>
  );
}

function MetricCard({
  metric,
  active,
  accentClass,
}: {
  metric: ServiceMetric;
  active: boolean;
  accentClass?: string;
}) {
  const n = useCountUp(metric.value, active);
  return (
    <motion.div
      variants={fadeUp}
      className="flex min-h-[9rem] flex-col justify-center bg-[#0a0a0a] px-6 py-8 sm:min-h-[10rem] sm:px-8"
    >
      <p
        className={cn("font-display font-light tracking-[-0.06em] text-white", accentClass)}
        style={{ fontSize: "clamp(2.25rem, 8vw, 4.5rem)" }}
      >
        <span className="text-white/85">{metric.prefix ?? ""}</span>
        {n}
        <span className="text-white/85">{metric.suffix ?? ""}</span>
      </p>
      <p className="mt-2 font-label text-[10px] uppercase tracking-[0.32em] text-white/40">
        {metric.label}
      </p>
    </motion.div>
  );
}

export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
  tall?: boolean;
  objectFit?: "contain" | "cover";
};

/** Full-width editorial cells — matches brand identity / application cards. */
export function MediaPanelGrid({
  items,
  compact,
}: {
  items: MediaItem[];
  /** UI screenshots — fixed 4:3 aspect with a sensible max height (not full-viewport). */
  compact?: boolean;
}) {
  const gridCols =
    items.length <= 1
      ? "sm:grid-cols-1"
      : items.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className={cn(
        "mx-[max(1rem,env(safe-area-inset-left))] mr-[max(1rem,env(safe-area-inset-right))] grid grid-cols-1 gap-px bg-white/[0.08] sm:mx-8 sm:mr-8",
        gridCols,
      )}
    >
      {items.map((item, i) => (
        <motion.figure
          key={`${item.src}-${i}`}
          variants={fadeUp}
          className="group relative overflow-hidden bg-[#0a0a0a]"
        >
          {compact ? (
            <img
              src={item.src}
              alt={item.alt}
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] sm:aspect-[4/3]"
              loading="lazy"
            />
          ) : (
            <div
              className={cn(
                "aspect-[4/3] sm:aspect-auto",
                items.length <= 2 ? "sm:min-h-[min(48vh,28rem)]" : "sm:min-h-[min(40vh,22rem)]",
                item.tall && "sm:min-h-[min(52vh,32rem)]",
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
          {item.caption ? (
            <figcaption className="absolute bottom-0 left-0 right-0 border-t border-white/[0.08] bg-black/40 px-5 py-4 font-label text-[9px] uppercase tracking-[0.38em] text-white/75 backdrop-blur-sm">
              {item.caption}
            </figcaption>
          ) : null}
        </motion.figure>
      ))}
    </motion.div>
  );
}

export function MediaMasonry({ items }: { items: MediaItem[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className="columns-1 gap-4 space-y-4 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:columns-2 sm:px-8 lg:columns-3"
    >
      {items.map((item, i) => (
        <motion.figure
          key={`${item.src}-${i}`}
          variants={fadeUp}
          className="group relative break-inside-avoid overflow-hidden border border-white/[0.1] bg-white/[0.03]"
        >
          <img
            src={item.src}
            alt={item.alt}
            className={cn(
              "w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]",
              item.tall ? "aspect-[3/4]" : "aspect-[4/3]",
            )}
            loading="lazy"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
            whileHover={{ opacity: 1 }}
          />
          {item.caption ? (
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 font-label text-[9px] uppercase tracking-[0.36em] text-white/70">
              {item.caption}
            </figcaption>
          ) : null}
        </motion.figure>
      ))}
    </motion.div>
  );
}

const STRIP_SCROLL_START = 0.04;
const STRIP_SCROLL_RANGE = 0.28;

function scrollLeftForProgress(el: HTMLDivElement, progress: number): number {
  const max = Math.max(0, el.scrollWidth - el.clientWidth);
  return max * (STRIP_SCROLL_START + progress * STRIP_SCROLL_RANGE);
}

export function HorizontalMediaStrip({ items }: { items: MediaItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const userInteractingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const applyScrollProgress = useCallback((progress: number) => {
    const el = scrollerRef.current;
    if (!el || userInteractingRef.current) return;
    el.scrollLeft = scrollLeftForProgress(el, progress);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", applyScrollProgress);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const sync = () => applyScrollProgress(scrollYProgress.get());
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    sync();
    return () => ro.disconnect();
  }, [applyScrollProgress, scrollYProgress, items]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (userInteractingRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    if (dx > dy && dx > 10) userInteractingRef.current = true;
  };

  const endInteraction = () => {
    userInteractingRef.current = false;
  };

  return (
    <div ref={sectionRef} className="overflow-hidden py-4 sm:py-8">
      <div
        ref={scrollerRef}
        data-lenis-prevent
        data-lenis-prevent-touch
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endInteraction}
        onPointerCancel={endInteraction}
        onPointerLeave={endInteraction}
        className="w-full cursor-grab overflow-x-auto overscroll-x-contain scrollbar-none [-webkit-overflow-scrolling:touch] [touch-action:pan-x] active:cursor-grabbing"
      >
        <div className="flex w-max gap-4 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:gap-6 sm:px-8">
          {items.map((item, i) => (
            <figure
              key={`${item.src}-${i}`}
              className="relative h-[min(52vw,22rem)] w-[min(78vw,34rem)] shrink-0 overflow-hidden border border-white/[0.12] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
              {item.caption ? (
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-5 font-label text-[9px] uppercase tracking-[0.38em] text-white/75">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrandBookLink({ href, accentClass }: { href: string; accentClass?: string }) {
  return (
    <Reveal className="px-[max(1rem,env(safe-area-inset-left))] sm:px-8">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 border border-white/15 bg-white/[0.04] px-5 py-3 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]"
      >
        <span
          className={cn(
            "font-label text-[10px] uppercase tracking-[0.32em] text-white/70 transition-colors group-hover:text-white",
            accentClass,
          )}
        >
          View brand book
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
          <ArrowUpRight className="h-3.5 w-3.5 text-white transition-colors group-hover:text-forest-deep" />
        </span>
      </a>
    </Reveal>
  );
}

export function BrandColorRow({ colors, labels }: { colors: string[]; labels?: string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="flex flex-wrap gap-3 px-[max(1rem,env(safe-area-inset-left))] sm:px-8"
    >
      {colors.map((hex, i) => (
        <motion.div key={hex} variants={fadeUp} className="flex flex-col gap-2">
          <div
            className="h-16 w-16 rounded-full border border-white/15 shadow-lg sm:h-20 sm:w-20"
            style={{ backgroundColor: hex }}
          />
          <span className="font-mono text-[10px] tracking-wider text-white/45">
            {labels?.[i] ?? hex}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function FeaturePills({ features }: { features: string[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="flex flex-wrap gap-2 px-[max(1rem,env(safe-area-inset-left))] sm:px-8"
    >
      {features.map((f) => (
        <motion.li
          key={f}
          variants={fadeUp}
          className="border border-white/12 bg-white/[0.04] px-4 py-2 font-label text-[10px] uppercase tracking-[0.28em] text-white/55"
        >
          {f}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function LinksPills({ links }: { links: Array<{ label: string; url: string }> }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="flex flex-wrap gap-2 px-[max(1rem,env(safe-area-inset-left))] sm:px-8"
    >
      {links.map((link) => (
        <motion.li key={link.url} variants={fadeUp}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-white/12 bg-white/[0.04] px-4 py-2 font-label text-[10px] uppercase tracking-[0.28em] text-white/55 transition-all hover:bg-white/[0.08] hover:border-white/25 hover:text-white/75"
          >
            {link.label}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** Single feature image at the same scale as the website device mockup (desktop frame). */
export function WebsiteScaleFeatureMedia({
  item,
  background = "#050505",
}: {
  item: MediaItem;
  background?: string;
}) {
  return (
    <Reveal className="relative mx-auto max-w-5xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease }}
        className="group relative aspect-[16/11] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        style={{ backgroundColor: background }}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
      </motion.div>
    </Reveal>
  );
}

export function DeviceMockupPair({
  desktopSrc,
  mobileSrc,
  alt,
  websiteHref,
  websiteLabel,
  precomposed = false,
  precomposedDesktopBg = "#3d8f7a",
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  websiteHref?: string;
  websiteLabel?: string;
  /** Pre-rendered monitor + phone mockups (full asset), not raw UI crops. */
  precomposed?: boolean;
  precomposedDesktopBg?: string;
}) {
  const interactive = Boolean(websiteHref && websiteLabel);

  const content = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease }}
        className={cn(
          "relative overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]",
          precomposed ? "aspect-[16/11]" : "aspect-[16/10] border border-white/12",
        )}
        style={precomposed ? { backgroundColor: precomposedDesktopBg } : undefined}
      >
        <img
          src={desktopSrc}
          alt={`${alt} desktop`}
          className={cn(
            "h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] object-cover",
          )}
        />
        {interactive ? (
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-0 [@media(hover:none)]:group-active:opacity-100"
            aria-hidden
          >
            <span className="font-label text-[10px] uppercase tracking-[0.42em] text-white/70">
              Visit live site
            </span>
            <span className="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {websiteLabel}
              <ArrowUpRight className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            </span>
          </div>
        ) : null}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 24, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, delay: 0.2, ease }}
        className={cn(
          "pointer-events-none absolute z-10 shadow-2xl",
          precomposed
            ? "-bottom-4 right-[max(1rem,env(safe-area-inset-right))] w-[32%] max-w-[9.5rem] sm:-bottom-8 sm:right-10 sm:max-w-[11rem]"
            : "-bottom-6 right-[max(1.5rem,env(safe-area-inset-right))] w-[28%] max-w-[11rem] overflow-hidden border border-white/15 sm:-bottom-10 sm:right-12 sm:max-w-[13rem]",
        )}
      >
        <img
          src={mobileSrc}
          alt={`${alt} mobile`}
          className={cn("w-full", precomposed ? "object-contain" : "aspect-[9/19] object-cover")}
        />
      </motion.div>
    </>
  );

  return (
    <Reveal className="relative mx-auto max-w-5xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8">
      {interactive ? (
        <a
          href={websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          aria-label={`Visit ${websiteLabel}`}
        >
          {content}
        </a>
      ) : (
        <div className="relative">{content}</div>
      )}
    </Reveal>
  );
}

export function BeforeAfterRow({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className="grid grid-cols-1 gap-4 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:grid-cols-2 sm:gap-6 sm:px-8"
    >
      {[
        { src: beforeSrc, label: beforeLabel },
        { src: afterSrc, label: afterLabel },
      ].map(({ src, label }) => (
        <motion.figure
          key={label}
          variants={fadeUp}
          className="relative overflow-hidden border border-white/10 bg-black/20"
        >
          <img
            src={src}
            alt={label}
            className="aspect-[16/10] w-full object-cover object-top sm:aspect-[4/3]"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 border border-white/20 bg-black/50 px-3 py-1 font-label text-[9px] uppercase tracking-[0.36em] text-white/80 backdrop-blur-sm">
            {label}
          </span>
        </motion.figure>
      ))}
    </motion.div>
  );
}
