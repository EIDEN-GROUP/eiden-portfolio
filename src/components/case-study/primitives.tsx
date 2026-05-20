import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
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

export type MediaItem = { src: string; alt: string; caption?: string; tall?: boolean };

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

export function HorizontalMediaStrip({ items }: { items: MediaItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"]);

  return (
    <motion.div ref={ref} className="overflow-hidden py-4 sm:py-8">
      <motion.div
        style={{ x }}
        className="flex w-max gap-4 px-[max(1rem,env(safe-area-inset-left))] sm:gap-6 sm:px-8"
      >
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
            />
            {item.caption ? (
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-5 font-label text-[9px] uppercase tracking-[0.38em] text-white/75">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </motion.div>
    </motion.div>
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

export function DeviceMockupPair({
  desktopSrc,
  mobileSrc,
  alt,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}) {
  return (
    <Reveal className="relative mx-auto max-w-5xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease }}
        className="relative aspect-[16/10] overflow-hidden border border-white/12 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <img src={desktopSrc} alt={`${alt} desktop`} className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 24, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, delay: 0.2, ease }}
        className="absolute -bottom-6 right-[max(1.5rem,env(safe-area-inset-right))] w-[28%] max-w-[11rem] overflow-hidden border border-white/15 shadow-2xl sm:-bottom-10 sm:right-12 sm:max-w-[13rem]"
      >
        <img src={mobileSrc} alt={`${alt} mobile`} className="aspect-[9/19] w-full object-cover" />
      </motion.div>
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
