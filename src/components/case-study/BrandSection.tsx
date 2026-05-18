import type { ServiceSection } from "@/data/projectServiceSections";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, stagger } from "./motion";
import { Reveal, type MediaItem } from "./primitives";

const ease = [0.22, 1, 0.36, 1] as const;

function BrandPaletteGrid({
  colors,
  labels,
  accentClass,
}: {
  colors: string[];
  labels?: string[];
  accentClass?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className="grid grid-cols-2 gap-px bg-white/[0.1] sm:grid-cols-4"
    >
      {colors.map((hex, i) => (
        <motion.div key={`${hex}-${i}`} variants={fadeUp} className="group flex flex-col bg-[#0a0a0a]">
          <motion.div
            className="relative aspect-[5/4] w-full overflow-hidden border-b border-white/[0.06] sm:aspect-[4/5]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: hex, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-5 sm:py-5">
            <span
              className={cn(
                "font-label text-[9px] uppercase tracking-[0.38em]",
                accentClass ?? "text-white/50",
              )}
            >
              {labels?.[i] ?? `Swatch ${i + 1}`}
            </span>
            <span className="font-mono text-[11px] tracking-[0.12em] text-white/40">{hex.toUpperCase()}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function BrandTypographyGrid({
  items,
  accentClass,
}: {
  items: NonNullable<ServiceSection["typography"]>;
  accentClass?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className="grid grid-cols-1 gap-px bg-white/[0.1] lg:grid-cols-2"
    >
      {items.map((t, i) => (
        <motion.article
          key={t.label}
          variants={fadeUp}
          className="flex min-h-[12rem] flex-col justify-between bg-[#0a0a0a] p-6 sm:min-h-[14rem] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-[10px] font-medium tabular-nums tracking-[0.24em] text-white/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("font-label text-[9px] uppercase tracking-[0.4em]", accentClass ?? "text-gold/75")}>
              {t.label}
            </span>
          </div>
          <p
            className={cn("mt-6 text-white/90", t.sampleClass)}
            style={{ fontSize: t.size ?? "clamp(1.5rem, 3.5vw, 2.25rem)" }}
          >
            {t.sample}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}

function BrandBookBand({ href, accentClass }: { href: string; accentClass?: string }) {
  return (
    <Reveal>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[1fr_auto] items-center gap-6 border border-white/[0.12] bg-white/[0.03] px-6 py-5 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.05] sm:grid-cols-[auto_1fr_auto] sm:px-8 sm:py-6"
      >
        <span className="hidden font-mono text-[10px] tabular-nums tracking-[0.24em] text-white/30 sm:block">
          00
        </span>
        <div className="min-w-0">
          <p className={cn("font-label text-[9px] uppercase tracking-[0.42em]", accentClass ?? "text-teal-light/80")}>
            Brand guidelines
          </p>
          <p className="mt-1 font-display text-lg font-semibold tracking-[-0.04em] text-white transition-colors group-hover:text-gold/90 sm:text-xl">
            View the full brand book
          </p>
          <p className="mt-1 font-editorial text-sm italic text-white/40">
            Complete identity system on eiden-group.com
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-gold group-hover:bg-gold sm:h-12 sm:w-12">
          <ArrowUpRight className="h-4 w-4 text-white transition-colors group-hover:text-forest-deep sm:h-5 sm:w-5" />
        </span>
      </a>
    </Reveal>
  );
}

function BrandMediaGrid({ items }: { items: MediaItem[] }) {
  if (!items.length) return null;

  const [hero, ...rest] = items;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className="grid grid-cols-1 gap-px bg-white/[0.1] sm:grid-cols-12"
    >
      <motion.figure
        variants={fadeUp}
        className="group relative overflow-hidden bg-[#0a0a0a] sm:col-span-7 sm:row-span-2"
      >
        <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[min(52vh,28rem)]">
          <img
            src={hero.src}
            alt={hero.alt}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        {hero.caption ? (
          <figcaption className="absolute bottom-0 left-0 right-0 border-t border-white/[0.08] bg-black/40 px-5 py-4 font-label text-[9px] uppercase tracking-[0.38em] text-white/75 backdrop-blur-sm">
            {hero.caption}
          </figcaption>
        ) : null}
      </motion.figure>

      {rest.map((item, i) => (
        <motion.figure
          key={`${item.src}-${i}`}
          variants={fadeUp}
          className={cn(
            "group relative overflow-hidden bg-[#0a0a0a] sm:col-span-5",
            i === 0 && rest.length === 1 && "sm:row-span-2",
          )}
        >
          <motion.div
            className={cn(
              "aspect-[4/3]",
              i === 0 && rest.length === 1 && "sm:aspect-auto sm:h-full sm:min-h-[min(52vh,28rem)]",
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
              loading="lazy"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
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

function PanelHeader({ label, title, accentClass }: { label: string; title: string; accentClass: string }) {
  return (
    <div className="border-b border-white/[0.08] px-6 py-5 sm:px-8 sm:py-6">
      <p className={cn("font-label text-[9px] uppercase tracking-[0.42em]", accentClass)}>{label}</p>
      <p className="mt-1 font-display text-sm font-medium tracking-[-0.03em] text-white/70">{title}</p>
    </div>
  );
}

export function BrandIdentityShowcase({
  section,
  themeAccent,
}: {
  section: ServiceSection;
  themeAccent: string;
}) {
  const media: MediaItem[] = (section.media ?? []).map((m) => ({
    src: m.src,
    alt: m.alt,
    caption: m.caption,
    tall: m.tall,
  }));

  const hasPalette = (section.brandColors?.length ?? 0) > 0;
  const hasType = (section.typography?.length ?? 0) > 0;

  return (
    <div className="mx-[max(1rem,env(safe-area-inset-left))] mr-[max(1rem,env(safe-area-inset-right))] space-y-px bg-white/[0.08] sm:mx-8 sm:mr-8">
      {(hasPalette || hasType) && (
        <div className="grid grid-cols-1 gap-px bg-white/[0.08] lg:grid-cols-12">
          {hasPalette ? (
            <Reveal className="bg-[#060606] lg:col-span-5">
              <PanelHeader label="Palette" title="Chromatic system" accentClass={themeAccent} />
              <BrandPaletteGrid
                colors={section.brandColors!}
                labels={section.colorLabels}
                accentClass={themeAccent}
              />
            </Reveal>
          ) : null}

          {hasType ? (
            <Reveal className={cn("bg-[#060606]", hasPalette ? "lg:col-span-7" : "lg:col-span-12")}>
              <PanelHeader label="Typography" title="Type hierarchy" accentClass={themeAccent} />
              <BrandTypographyGrid items={section.typography!} accentClass={themeAccent} />
            </Reveal>
          ) : null}
        </div>
      )}

      {section.brandBookUrl ? (
        <div className="bg-[#060606] px-6 py-6 sm:px-8 sm:py-8">
          <BrandBookBand href={section.brandBookUrl} accentClass={themeAccent} />
        </div>
      ) : null}

      {media.length > 0 ? (
        <Reveal className="bg-[#060606]">
          <PanelHeader label="Applications" title="Identity in context" accentClass={themeAccent} />
          <BrandMediaGrid items={media} />
        </Reveal>
      ) : null}
    </div>
  );
}

export function BrandBoardShowcase({
  section,
  themeAccent,
}: {
  section: ServiceSection;
  themeAccent: string;
}) {
  const media: MediaItem[] = (section.media ?? []).map((m) => ({
    src: m.src,
    alt: m.alt,
    caption: m.caption,
    tall: m.tall,
  }));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={stagger}
      className="mx-[max(1rem,env(safe-area-inset-left))] mr-[max(1rem,env(safe-area-inset-right))] space-y-px bg-white/[0.08] sm:mx-8 sm:mr-8"
    >
      {section.brandBookUrl ? (
        <div className="bg-[#060606] px-6 py-6 sm:px-8 sm:py-8">
          <BrandBookBand href={section.brandBookUrl} accentClass={themeAccent} />
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-px bg-white/[0.1] sm:grid-cols-12">
        {media.map((item, i) => (
          <motion.figure
            key={`${item.src}-${i}`}
            variants={fadeUp}
            className={cn(
              "group relative overflow-hidden bg-[#0a0a0a]",
              i === 0 && "col-span-2 row-span-2 sm:col-span-7 sm:row-span-2",
              i > 0 && "sm:col-span-5",
            )}
          >
            <div
              className={cn(
                "aspect-square w-full sm:aspect-auto",
                i === 0 ? "sm:min-h-[min(56vh,32rem)]" : "sm:min-h-[min(26vh,14rem)]",
                item.tall && i > 0 && "sm:min-h-[min(40vh,22rem)]",
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 border-t border-white/[0.08] bg-black/35 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
              <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-label text-[9px] uppercase tracking-[0.36em] text-white/75">
                {item.caption ?? item.alt}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}
