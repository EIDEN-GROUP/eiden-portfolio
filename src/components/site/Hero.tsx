import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import GridMotion from "../GridMotion";
import { projects } from "@/data/projects";

const covers = projects.map((p) => p.cover);
const gridItems: string[] = Array.from({ length: 28 }, (_, i) => covers[i % covers.length]);

const ease = [0.22, 1, 0.36, 1] as const;
const SCROLL_SEGMENT = [0.08, 0.55] as const;

type LayoutMeasure = {
  stickyW: number;
  stickyH: number;
  targetTop: number;
  targetLeft: number;
  targetW: number;
  targetH: number;
};

/* ── Reduced-motion / mobile fallback ───────────────────────── */
function StaticHero() {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col bg-forest-deep">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <GridMotion items={gridItems} gradientColor="oklch(0.09 0.014 165)" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-24 text-center sm:px-10 sm:pt-28 md:px-16">
        <h1
          className="font-hero font-medium uppercase leading-[1.02] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
        >
          A firm built on a category
          <br />
          <span className="font-hero font-light normal-case italic text-white/80">
            that didn&rsquo;t exist yet.
          </span>
        </h1>
        <br />
        <p className="mb-5 font-label text-[10px] font-medium uppercase tracking-[0.25em] text-gold/80 sm:text-[16px]">
          Business Architecture · MENA
        </p>
        <a
          href="#projects"
          className="mt-8 inline-flex items-center gap-2 font-label text-[14px] uppercase tracking-[0.3em] text-white/60 font-bold transition-colors hover:text-white sm:mt-10"
        >
          See our work <span className="text-white/60">→</span>
        </a>
      </div>
    </div>
  );
}

/* ── Scroll-sequence hero ───────────────────────────────────── */
function HeroScrollSequence() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [layout, setLayout] = useState<LayoutMeasure>({
    stickyW: 1200,
    stickyH: 800,
    targetTop: 420,
    targetLeft: 32,
    targetW: 280,
    targetH: 186,
  });

  useLayoutEffect(() => {
    function measure() {
      const s = stickyRef.current;
      const t = targetRef.current;
      if (!s) return;

      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      if (mobile) {
        // On mobile: no shrink-to-corner animation   image stays full screen
        setLayout({
          stickyW: s.clientWidth,
          stickyH: s.clientHeight,
          targetTop: 0,
          targetLeft: 0,
          targetW: s.clientWidth,
          targetH: s.clientHeight,
        });
        return;
      }

      if (!t) return;
      const sRect = s.getBoundingClientRect();
      const tRect = t.getBoundingClientRect();
      setLayout({
        stickyW: s.clientWidth,
        stickyH: s.clientHeight,
        targetTop: tRect.top - sRect.top,
        targetLeft: tRect.left - sRect.left,
        targetW: tRect.width,
        targetH: tRect.height,
      });
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (stickyRef.current) ro.observe(stickyRef.current);
    if (targetRef.current) ro.observe(targetRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const [s0, s1] = SCROLL_SEGMENT;
  const p = scrollYProgress;

  const imgTop = useTransform(p, [0, s0, s1, 1], [0, 0, layout.targetTop, layout.targetTop]);
  const imgLeft = useTransform(p, [0, s0, s1, 1], [0, 0, layout.targetLeft, layout.targetLeft]);
  const imgW = useTransform(
    p,
    [0, s0, s1, 1],
    [layout.stickyW, layout.stickyW, layout.targetW, layout.targetW],
  );
  const imgH = useTransform(
    p,
    [0, s0, s1, 1],
    [layout.stickyH, layout.stickyH, layout.targetH, layout.targetH],
  );
  const imgRadius = useTransform(p, [0, s0, s1, 1], [0, 0, 16, 16]);
  const imgScale = useTransform(p, [0, s0], [1.03, 1]);
  const dimOpacity = useTransform(p, [0, 0.28, s1, 1], [1, 1, 0.1, 0.1]);
  const headlineOpacity = useTransform(p, [0, 0.24, 1], [1, 0, 0]);
  const subtitleOpacity = useTransform(p, [0, 0.2, 1], [1, 0, 0]);
  const introOpacity = useTransform(p, [0.32, 0.6, 1], [0, 1, 1]);
  const scrollCueOpacity = useTransform(p, [0, 0.12, 1], [1, 0, 0]);

  return (
    <section
      ref={wrapperRef}
      id="home"
      className="relative min-h-[200vh] sm:min-h-[250vh] lg:min-h-[270vh]"
      aria-label="EIDEN Group"
    >
      <div ref={stickyRef} className="sticky top-0 isolate min-h-[100svh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest-deep" aria-hidden />

        {/* Scroll-driven image frame */}
        <motion.div
          className="absolute z-[1] overflow-hidden will-change-[top,left,width,height] shadow-[0_32px_100px_-24px_rgba(0,0,0,0.9)]"
          style={{
            top: imgTop,
            left: imgLeft,
            width: imgW,
            height: imgH,
            borderRadius: imgRadius,
          }}
        >
          <motion.span
            className="absolute inset-0 block overflow-hidden"
            style={{ scale: imgScale }}
            aria-hidden
          >
            <GridMotion items={gridItems} gradientColor="oklch(0.09 0.014 165)" />
            <div className="pointer-events-none absolute inset-0 bg-black/55" />
          </motion.span>
        </motion.div>

        {/* Gradient overlays */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] bg-black/60"
          style={{ opacity: dimOpacity }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_60%_40%,transparent_30%,rgba(0,0,0,0.55)_100%)]"
          style={{ opacity: dimOpacity }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-t from-forest-deep to-transparent"
          aria-hidden
        />

        {/* Hero headline */}
        <motion.div
          style={{ opacity: headlineOpacity }}
          className="relative z-[12] flex h-full min-h-[100svh] flex-col px-4 pt-[calc(4.5rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(5rem+env(safe-area-inset-top))] md:px-12 lg:px-16 xl:px-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="mt-auto max-w-4xl pb-12 sm:pb-16 md:pb-20"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="mb-4 flex items-center gap-3 font-label text-[14px] uppercase tracking-[0.42em] text-gold/80 sm:mb-5 sm:text-[11px]"
            >
              <span className="inline-block bg-gold/60 sm:w-8" />
              MENA's first Business Architecture firm
            </motion.p>

            {/* H1 */}
            <h1
              className="font-hero font-bold leading-[1.02] tracking-[-0.03em] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)", textTransform: "uppercase" }}
            >
              A firm built on a category
              <br />
              <span className="font-hero font-normal normal-case italic text-white/92">
                that didn&rsquo;t exist yet.
              </span>
            </h1>

            <motion.p
              style={{ opacity: subtitleOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="font-mono mt-5 max-w-xs text-[0.72rem] leading-relaxed tracking-tight text-white/50 sm:mt-7 sm:max-w-md sm:text-[0.8rem] md:max-w-lg md:text-[0.85rem]"
            >
              Architecture before advice. Map the fracture network, build the system, measure the
              outcome.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="mt-7 sm:mt-9"
            >
              <a
                href="#works"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.38em] text-white/45 transition-colors hover:text-white"
              >
                See our work
                <span className="text-white/30">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.p
            style={{ opacity: scrollCueOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-label text-[10px] uppercase tracking-[0.5em] text-white/36 sm:bottom-10"
          >
            Scroll to explore
          </motion.p>
        </motion.div>

        {/* Intro panel   tablet & desktop */}
        {!isMobile && (
          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[max(8%,calc(4rem+env(safe-area-inset-bottom)))] z-[18] px-5 sm:px-8 md:px-12 lg:px-16"
          >
            <div className="mx-auto flex max-w-[72rem] flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-10 lg:gap-16">
              {/* Invisible anchor   target for image animation */}
              <div
                ref={targetRef}
                className="aspect-[16/11] w-full max-w-[14rem] shrink-0 opacity-0 sm:max-w-[18rem]"
                aria-hidden
              />
              <div className="min-w-0 max-w-xl space-y-3 sm:space-y-4">
                <p className="font-label text-[10px] uppercase tracking-[0.42em] text-gold/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] sm:text-[11px]">
                  Why EIDEN exists
                </p>
                <p className="font-editorial text-base italic leading-snug tracking-tight text-white/92 drop-shadow-[0_2px_28px_rgba(0,0,0,0.6)] sm:text-lg md:text-xl">
                  We found the same fracture pattern in every organization we worked with decisions
                  slow, priorities multiply, clarity disappears. EIDEN was built to map and
                  architect around this pattern.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile intro text   simple fade */}
        {isMobile && (
          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[max(10%,calc(5rem+env(safe-area-inset-bottom)))] z-[18] px-5"
          >
            <div className="max-w-[min(100%,22rem)] space-y-3">
              <p className="font-label text-[10px] uppercase tracking-[0.42em] text-gold/80">
                Why EIDEN exists
              </p>
              <p className="font-editorial text-[0.95rem] italic leading-snug text-white/88">
                We found the same fracture pattern in every organisation decisions slow, clarity
                disappears. EIDEN was built to architect around it.
              </p>
            </div>
          </motion.div>
        )}

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: p }}
          className="absolute left-0 right-0 top-0 z-40 h-0.5 origin-left bg-gold/60"
        />
      </div>
    </section>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? <StaticHero /> : <HeroScrollSequence />;
}
