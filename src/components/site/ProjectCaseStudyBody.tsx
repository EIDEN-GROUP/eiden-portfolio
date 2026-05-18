import type {
  CaseStudyExpertiseItem,
  CaseStudyGalleryFace,
  CaseStudyReview,
  CaseStudyStat,
} from "@/data/projectCaseStudy";
import { ProjectServicesShowcase } from "@/components/case-study/ProjectServicesShowcase";
import { CaseStudyScrollGallery } from "@/components/site/CaseStudyScrollGallery";
import { resolveCaseStudy } from "@/data/projectCaseStudy";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Camera, Globe, Music, Users } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CANVAS = "#0a0a0a";

/** Client-only viewport query for scroll/carousel layouts (SSR-safe default false). */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

function useCountUp(target: number, active: boolean, durationMs = 2200) {
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

function BandHeader({
  left,
  center,
  right,
  centerWide,
}: {
  left: string;
  center: string;
  right: string;
  /** Longer manifesto-style center copy: wider measure + relaxed leading. */
  centerWide?: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-6 border-b border-white/[0.15] px-[max(1rem,env(safe-area-inset-left))] py-7 sm:flex-row sm:items-end sm:gap-0 sm:px-8 sm:py-8">
      <p className="flex-1 font-display text-xs font-normal leading-[150%] tracking-[-0.03em] text-white/[0.7]">
        {left}
      </p>
      <p
        className={cn(
          "mx-auto text-center font-display font-normal tracking-[-0.03em] text-white/[0.78]",
          centerWide
            ? "max-w-[min(100%,40rem)] text-pretty text-[15px] leading-[1.45] sm:max-w-[min(100%,44rem)] sm:text-[17px] sm:leading-[1.5]"
            : "max-w-[min(100%,26rem)] text-xl leading-none tracking-[-0.05em] text-white/[0.7] sm:text-2xl",
        )}
      >
        {center}
      </p>
      <p className="flex-1 text-left font-display text-xs font-normal leading-[150%] tracking-[-0.03em] text-white/[0.7] sm:text-right">
        {right}
      </p>
    </div>
  );
}

function CapabilityCard({
  item,
  index,
  className,
}: {
  item: CaseStudyExpertiseItem;
  index: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between border border-white/[0.12] bg-white/[0.03] p-5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75)] sm:p-8",
        className,
      )}
    >
      <span className="font-mono text-[10px] font-medium tabular-nums tracking-[0.24em] text-white/35">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-display text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-auto font-editorial text-sm italic leading-relaxed text-white/45 sm:text-[15px]">
        {item.blurb}
      </p>
    </article>
  );
}

function CapabilitiesSwiperMobile({ items }: { items: CaseStudyExpertiseItem[] }) {
  return (
    <div className="relative border-t border-white/[0.1] bg-[#060606] py-8">
      <Swiper
        slidesPerView={1.34}
        spaceBetween={8}
        centeredSlides
        centeredSlidesBounds
        className="w-full px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]"
      >
        {items.map((item, i) => (
          <SwiperSlide key={`${item.title}-${i}`} className="!h-auto py-1">
            <CapabilityCard
              item={item}
              index={i}
              className="mx-auto min-h-[min(48vh,20rem)] w-full max-w-[min(19.5rem,calc(100vw-4.25rem))]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="pointer-events-none mt-2 text-center font-label text-[8px] uppercase tracking-[0.42em] text-white/22">
        Swipe · capabilities
      </p>
    </div>
  );
}

function CapabilitiesScrollDesktop({ items }: { items: CaseStudyExpertiseItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 64,
    damping: 28,
    mass: 0.42,
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const tw = track.scrollWidth;
      const vw = viewport.clientWidth;
      setMaxShift(Math.max(0, tw - vw));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, [items.length]);

  const scrollVh = Math.max(Math.round(items.length * 72 + 160), 240);

  return (
    <div ref={sectionRef} className="relative bg-[#060606]" style={{ height: `${scrollVh}vh` }}>
      <div
        ref={viewportRef}
        className="sticky top-16 z-0 flex h-[min(68vh,34rem)] flex-col justify-center overflow-hidden border-t border-white/[0.1] py-6 sm:top-20 sm:h-[min(78vh,40rem)] sm:py-8 md:h-[min(82vh,44rem)] md:py-12"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-8">
          <div className="h-px w-44 max-w-[36vw] overflow-hidden rounded-full bg-white/[0.08] sm:w-56">
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-teal-light/50 via-white/60 to-gold/45"
              style={{ scaleX: smoothProgress }}
            />
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <motion.div
            ref={trackRef}
            className={cn(
              "flex h-full w-max items-stretch gap-4 px-[max(1rem,env(safe-area-inset-left))] sm:gap-7 sm:px-10",
              maxShift === 0 && "mx-auto",
            )}
            style={{ x }}
          >
            {items.map((item, i) => (
              <CapabilityCard
                key={`${item.title}-${i}`}
                item={item}
                index={i}
                className="h-[min(52vh,22rem)] w-[min(88vw,22rem)] shrink-0 sm:h-[min(58vh,28rem)] sm:w-[min(42vw,24rem)]"
              />
            ))}
          </motion.div>
        </div>

        <p className="pointer-events-none absolute bottom-12 left-1/2 z-10 -translate-x-1/2 font-label text-[8px] uppercase tracking-[0.42em] text-white/22 sm:bottom-14">
          Scroll · capabilities
        </p>
      </div>
    </div>
  );
}

function CapabilitiesCentered({ items }: { items: CaseStudyExpertiseItem[] }) {
  return (
    <div className="relative border-t border-white/[0.1] bg-[#060606] py-10 sm:py-14">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex flex-wrap items-stretch justify-center gap-4 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:gap-7 sm:px-10"
      >
        {items.map((item, i) => (
          <CapabilityCard
            key={`${item.title}-${i}`}
            item={item}
            index={i}
            className="h-[min(52vh,22rem)] w-full max-w-[min(88vw,22rem)] shrink-0 sm:h-[min(58vh,28rem)] sm:w-[min(42vw,24rem)]"
          />
        ))}
      </motion.div>
    </div>
  );
}

function CapabilitiesScrollFlex({ items }: { items: CaseStudyExpertiseItem[] }) {
  const isCompact = useMediaQuery("(max-width: 639px)");
  if (!items.length) return null;
  if (items.length < 4) return <CapabilitiesCentered items={items} />;
  if (isCompact) return <CapabilitiesSwiperMobile items={items} />;
  return <CapabilitiesScrollDesktop items={items} />;
}

function cylinderRadiusPx(n: number): number {
  if (n <= 1) return 420;
  if (n === 2) return 340;
  if (n === 3) return 400;
  if (n === 4) return 360;
  return 320;
}

const SOCIAL_FALLBACK_URL: Record<"instagram" | "facebook" | "tiktok", string> = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
};

function SocialFollowFace({ face }: { face: Extract<CaseStudyGalleryFace, { kind: "social" }> }) {
  const row: Array<{
    key: string;
    label: string;
    href: string;
    Icon: typeof Camera;
  }> = [
    {
      key: "instagram",
      label: "Instagram",
      href: face.instagram?.trim() || SOCIAL_FALLBACK_URL.instagram,
      Icon: Camera,
    },
    {
      key: "facebook",
      label: "Facebook",
      href: face.facebook?.trim() || SOCIAL_FALLBACK_URL.facebook,
      Icon: Users,
    },
    {
      key: "tiktok",
      label: "TikTok",
      href: face.tiktok?.trim() || SOCIAL_FALLBACK_URL.tiktok,
      Icon: Music,
    },
  ];

  const site = face.website?.trim();
  if (site) {
    row.push({
      key: "website",
      label: "Website",
      href: site,
      Icon: Globe,
    });
  }

  const linkCls =
    "group relative z-10 inline-flex min-h-[40px] cursor-pointer items-center justify-center gap-1.5 rounded-sm px-1.5 py-0.5 font-label uppercase text-white/85 transition-colors hover:text-gold active:text-gold/90 sm:min-h-0 sm:gap-1.5 sm:px-0 sm:py-0";

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      {face.backgroundSrc ? (
        <img
          src={face.backgroundSrc}
          alt={face.backgroundAlt ?? ""}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#080808] to-black" />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/82 to-black/45"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.08),transparent_55%)]" />

      <div className="pointer-events-auto relative z-10 flex w-full max-w-full flex-col items-center justify-center px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8">
        <p className="max-w-[min(100%,18rem)] font-label text-[clamp(8px,min(2.5vw,2.8vh),10px)] uppercase leading-none tracking-[0.28em] text-teal-light/80 sm:tracking-[0.42em]">
          Follow
        </p>
        <h3
          className="mt-1 w-full max-w-full px-0.5 text-balance break-words font-display font-semibold leading-[1.06] tracking-[-0.035em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] sm:mt-1.5 sm:max-w-[min(100%,34ch)] sm:leading-[1.05] sm:tracking-[-0.04em]"
          style={{
            fontSize: "clamp(1rem, min(4.2vw, 5.5vh), 2.35rem)",
          }}
        >
          {face.projectTitle}
        </h3>
        <ul className="mt-3 flex w-full max-w-[min(100%,22rem)] flex-col items-stretch gap-0.5 sm:mt-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3 sm:gap-y-1 md:gap-x-5 md:gap-y-1.5 lg:gap-x-8">
          {row.map(({ key, label, href, Icon }) => (
            <li key={key} className="flex justify-center sm:flex-none">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  linkCls,
                  "w-full max-w-[16rem] text-[clamp(9px,min(2.7vw,2.8vh),10px)] tracking-[0.14em] sm:w-auto sm:max-w-none sm:tracking-[0.22em]",
                )}
                aria-label={`${label}   ${face.projectTitle}`}
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 opacity-75 transition-opacity group-hover:opacity-100 sm:h-4 sm:w-4"
                  strokeWidth={1.35}
                />
                <span className="whitespace-nowrap">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GalleryScrollCarousel({ faces }: { faces: CaseStudyGalleryFace[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = faces.length;
  const angleStep = n > 0 ? 360 / n : 0;
  const isCompact = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const tz = useMemo(() => {
    const base = cylinderRadiusPx(Math.max(n, 2));
    const scale = isCompact ? 0.5 : isTablet ? 0.78 : 1;
    return Math.max(120, Math.round(base * scale));
  }, [n, isCompact, isTablet]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /** Orbit reaches the last face before the section ends; remaining scroll holds it, then unpins. */
  const ORBIT_END = 0.66;
  const orbitDriver = useTransform(scrollYProgress, [0, ORBIT_END, 1], [0, 1, 1]);

  const smoothProgress = useSpring(orbitDriver, {
    stiffness: 72,
    damping: 28,
    mass: 0.45,
  });

  /** Positive sweep + mirrored face angles: scroll down reads as cards moving up through the frame. */
  const rotateX = useTransform(smoothProgress, [0, 1], n <= 1 ? [0, 0] : [0, (n - 1) * angleStep]);

  const activeFaceIndex = useTransform(smoothProgress, (p) => {
    const pc = Math.min(1, Math.max(0, p));
    return n <= 1 ? 0 : Math.min(n - 1, Math.max(0, Math.round(pc * (n - 1))));
  });

  const [activeFace, setActiveFace] = useState(0);
  useMotionValueEvent(activeFaceIndex, "change", (latest) => {
    setActiveFace(Math.round(latest));
  });
  useLayoutEffect(() => {
    setActiveFace(Math.round(activeFaceIndex.get()));
  }, [activeFaceIndex, n]);

  if (n === 0) return null;

  if (n === 1) {
    const f = faces[0]!;
    if (f.kind === "social") {
      return (
        <div className="border-t border-white/[0.12] bg-[#0a0a0a]">
          <div className="pointer-events-auto mx-auto aspect-[4/5] max-h-[min(72svh,26rem)] w-full max-w-[min(17.5rem,82vw)] border border-white/[0.12] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] sm:max-h-[min(88vh,36rem)] sm:max-w-lg sm:aspect-[4/3]">
            <SocialFollowFace face={f} />
          </div>
        </div>
      );
    }
    return (
      <div className="border-t border-white/[0.12] bg-[#0a0a0a]">
        <img
          src={f.src}
          alt={f.alt}
          className="mx-auto h-auto max-h-[min(78svh,42rem)] w-full max-w-[min(18rem,85vw)] object-cover object-center sm:max-h-[min(88vh,56rem)] sm:max-w-6xl"
          loading="lazy"
        />
      </div>
    );
  }

  const scrollVh = Math.max(n + 3, 5) * 100;

  return (
    <div ref={ref} className="relative bg-[#070707]" style={{ height: `${scrollVh}vh` }}>
      <div className="sticky top-0 z-0 flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#070707] py-6 supports-[height:100dvh]:h-[100dvh] sm:py-10">
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center sm:bottom-10">
          <div className="h-px w-48 max-w-[40vw] overflow-hidden rounded-full bg-white/[0.08] sm:w-64">
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-teal-light/60 via-white/70 to-gold/50"
              style={{ scaleX: smoothProgress }}
            />
          </div>
        </div>

        <div
          className="relative mx-auto flex aspect-[3/5] w-full max-w-[min(17rem,78vw)] items-center justify-center sm:aspect-[4/5] sm:max-w-[min(42rem,100%)] md:aspect-[16/10] md:max-w-[min(52rem,100%)]"
          style={{
            perspective: isCompact ? "min(520px, 92vw)" : "min(1400px, 120vw)",
            perspectiveOrigin: "50% 45%",
          }}
        >
          <motion.div
            className="relative h-[min(74%,58svh)] w-[90%] [transform-style:preserve-3d] sm:h-[min(82%,76svh)] sm:w-[94%] md:h-[88%] md:w-[92%]"
            style={{
              rotateX,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50%",
            }}
          >
            {faces.map((face, i) => (
              <div
                key={face.kind === "image" ? `${face.src}-${i}` : `social-${i}`}
                className={cn(
                  "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/[0.12] bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] [backface-visibility:hidden] [transform-style:preserve-3d]",
                  activeFace === i ? "pointer-events-auto" : "pointer-events-none",
                )}
                style={{
                  transform: `rotateX(${-i * angleStep}deg) translateZ(${tz}px)`,
                  transformOrigin: "50% 50%",
                }}
              >
                {face.kind === "image" ? (
                  <>
                    <img
                      src={face.src}
                      alt={face.alt}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                  </>
                ) : (
                  <SocialFollowFace face={face} />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <p className="pointer-events-none absolute bottom-[max(3.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 font-label text-[9px] uppercase tracking-[0.42em] text-white/25 sm:bottom-16">
          Scroll · orbit
        </p>
      </div>
    </div>
  );
}

function ClientReviewSpotlight({
  review,
  className,
  preserveQuoteLineBreaks,
}: {
  review: CaseStudyReview;
  className?: string;
  /** When the quote contains intentional newlines (e.g. stacked brief paragraphs). */
  preserveQuoteLineBreaks?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -5, ry: px * 6 });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const shadow3d = [
    "0 0.02em 0 rgba(255,255,255,0.45)",
    "0 0.045em 0 rgba(200,200,200,0.12)",
    "0 0.08em 0 rgba(0,0,0,0.35)",
    "0 0.14em 0 rgba(0,0,0,0.28)",
    "0 0.22em 0.06em rgba(0,0,0,0.42)",
    "0 0.45em 0.5em rgba(0,0,0,0.55)",
    "0 0 80px rgba(0,0,0,0.35)",
  ].join(", ");

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("px-[max(1rem,env(safe-area-inset-left))] py-16 sm:px-8 sm:py-28", className)}
    >
      <div className="mx-auto max-w-[min(100%,72rem)]">
        <p className="text-center font-label text-[9px] uppercase tracking-[0.48em] text-teal-light/72 sm:text-left">
          {review.eyebrow}
        </p>

        <blockquote className="mt-6 border-none p-0 sm:mt-8">
          <div className="mx-auto [perspective:1400px]" style={{ transformStyle: "preserve-3d" }}>
            <p
              className={cn(
                "text-pretty text-left font-display font-semibold leading-[1.14] tracking-[-0.055em] text-white before:mr-[0.08em] before:inline-block before:font-serif before:text-white/35 before:content-['\\201C'] [transform-style:preserve-3d] will-change-transform after:ml-[0.06em] after:inline-block after:font-serif after:text-white/35 after:content-['\\201D'] sm:text-justify",
                preserveQuoteLineBreaks && "whitespace-pre-line",
              )}
              style={{
                fontSize: "clamp(1.25rem, 4.16vw, 3.5rem)",
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0.035em)`,
                textShadow: shadow3d,
              }}
            >
              {review.quote}
            </p>
          </div>

          <footer className="mt-10 border-t border-white/[0.1] pt-8 text-center sm:mt-12 sm:text-left">
            <cite className="block font-display text-lg font-medium not-italic tracking-[-0.03em] text-white/92">
              {review.author}
            </cite>
            <p className="mt-1.5 font-label text-[10px] uppercase tracking-[0.28em] text-white/42">
              {review.role}
            </p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

function StatRow({ stat, active }: { stat: CaseStudyStat; active: boolean }) {
  const n = useCountUp(stat.value, active);
  return (
    <div className="flex min-h-[10rem] flex-col justify-center border-t border-white/[0.15] px-[max(1rem,env(safe-area-inset-left))] py-10 text-center sm:min-h-[12rem] sm:px-8">
      <p
        className="font-display font-light tracking-[-0.07em] text-white"
        style={{ fontSize: "clamp(2.75rem, 12vw, 8rem)" }}
      >
        <span className="text-white/90">{stat.prefix}</span>
        {n}
        <span className="text-white/90">{stat.suffix}</span>
      </p>
      <p className="mt-3 font-display text-xs uppercase tracking-[0.28em] text-white/40">
        {stat.label}
      </p>
    </div>
  );
}

export function ProjectCaseStudyBody({ project }: { project: Project }) {
  const c = useMemo(() => resolveCaseStudy(project), [project]);
  const clientProblemReview = useMemo<CaseStudyReview>(
    () => ({
      eyebrow: "Before delivery",
      quote: c.challenge,
      author: c.client,
      role: c.location,
    }),
    [c.challenge, c.client, c.location],
  );
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-15%" });

  return (
    <>
      <div
        className="relative border-t border-white/[0.08] text-white antialiased"
        style={{ backgroundColor: CANVAS, color: "#fff" }}
      >
        <BandHeader left="Industry" center={project.summary} right="Timeline" />
        <BandHeader left={c.industry} center={project.tagline} right={c.timeline} />

        <section aria-label="Client problem" className="border-t border-white/[0.08] bg-[#080808]">
          <ClientReviewSpotlight review={clientProblemReview} className="pb-6 sm:pb-10" />
        </section>

        <div className="border-t border-white/[0.08] bg-[#060606]">
          <BandHeader
            left="Services"
            center="Capabilities deployed on this program."
            right="EIDEN"
            centerWide
          />
          <CapabilitiesScrollFlex items={c.expertise} />
        </div>

        <ProjectServicesShowcase project={project} />

        <section ref={statsRef} aria-label="Outcomes" className="border-t border-white/[0.08]">
          <BandHeader left="Outcomes" center="Momentum, measured." right="Impact" />
          <div className="grid grid-cols-1 divide-white/[0.12] sm:grid-cols-3 sm:divide-x">
            {c.stats.map((s: CaseStudyStat) => (
              <StatRow key={s.label} stat={s} active={statsInView} />
            ))}
          </div>
        </section>

        <section
          aria-label="Deliverables scroll gallery"
          className="relative border-t border-white/[0.08] bg-[#050505] [background-image:radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(45,212,191,0.06),transparent_55%)]"
        >
          <BandHeader
            left="Results"
            center="Shipped touchpoints across web, dashboards, CRM, and mobile."
            right="Artifacts"
            centerWide
          />
          <CaseStudyScrollGallery tiles={c.resultTiles} />
        </section>

        <section aria-label="Client review   closing" className="border-t border-white/[0.08]">
          <ClientReviewSpotlight review={c.closingReview} className="pb-28 sm:pb-36" />
        </section>

        <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </>
  );
}
