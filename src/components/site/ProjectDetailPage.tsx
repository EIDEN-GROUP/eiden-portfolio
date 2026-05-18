import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Footer } from "@/components/site/Footer";
import { ProjectCaseStudyBody } from "@/components/site/ProjectCaseStudyBody";
import type { Project } from "@/data/projects";
import { projectPath, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import "swiper/css";

const ease = [0.22, 1, 0.36, 1] as const;

function NextProjectCard({ q, className }: { q: Project; className?: string }) {
  return (
    <Link to={`/projects/${q.slug}`} className={cn( "group relative block aspect-[4/5] max-h-[min(78vh,52rem)] min-h-[19rem] w-full overflow-hidden sm:min-h-[22rem] md:aspect-[3/4]", className, )} >
      <img src={q.cover} alt={q.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display font-bold leading-none tracking-[-0.06em] text-white/[0.04]"style={{ fontSize: "clamp(6rem, 16vw, 14rem)" }} aria-hidden >
        {q.index} 
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 px-5 pb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-7 sm:pb-10">
        <div className="min-w-0 flex-1">
          <p className="mb-2 font-label text-[9px] uppercase tracking-[0.46em] text-teal-light/75">
            {q.index} · {q.category}
          </p>
          <h3 className="font-display font-bold leading-[1.02] tracking-[-0.04em] text-white transition-colors group-hover:text-gold/90" style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.25rem)" }} >
            {q.title}
          </h3>
          <p className="mt-2 max-w-md font-editorial text-sm italic leading-relaxed text-white/45 sm:text-base">
            {q.tagline}
          </p>
        </div>
        <div className="flex shrink-0 sm:items-end sm:justify-end">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-gold group-hover:bg-gold sm:h-12 sm:w-12">
            <ArrowUpRight className="h-4 w-4 text-white transition-colors group-hover:text-forest-deep sm:h-5 sm:w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function projectDetailHead(p: Project | undefined) {
  if (!p) return { meta: [{ title: "Project   EIDEN Group" }] };
  return {
    meta: [
      { title: `${p.title}   EIDEN Group` },
      { name: "description", content: p.summary },
      { property: "og:title", content: `${p.title}   EIDEN Group` },
      { property: "og:description", content: p.summary },
      { property: "og:image", content: p.detailHero },
    ],
  };
}

export function ProjectRouteNotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center" style={{ background: "oklch(0.07 0.012 165)" }} >
      <div>
        <div className="mb-4 font-display text-6xl text-gold">404</div>
        <p className="mb-6 font-editorial italic text-white/50">This project does not exist.</p>
        <Link to="/" className="font-label text-[11px] uppercase tracking-[0.3em] text-gold hover:underline" >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}

export function ProjectDetailPage({ project: p }: { project: Project }) {
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const len = projects.length;
  const nextProjects = [projects[(idx + 1) % len]!, projects[(idx + 2) % len]!] as const;

  const deliverablesLine = p.services.join(" · ");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <main className="min-w-0 overflow-x-clip" style={{ background: "oklch(0.07 0.012 165)", color: "white" }}>
      <section ref={heroRef} className="relative min-h-[100svh] w-full overflow-hidden supports-[height:100dvh]:min-h-[100dvh]">
        <motion.img
          src={p.detailHero}
          alt={p.title}
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ y: heroY }}
          transition={{ duration: 1.6, ease }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <span className="pointer-events-none absolute right-0 top-1/2 max-sm:-right-4 max-sm:top-[58%] -translate-y-1/2 select-none font-display font-bold leading-none tracking-[-0.06em] text-white/[0.04]" style={{ fontSize: "clamp(6rem, 22vw, 28rem)" }} aria-hidden>
          {p.index}
        </span>

        <div className="absolute left-[max(1rem,env(safe-area-inset-left))] right-[max(1rem,env(safe-area-inset-right))] top-[calc(4.5rem+env(safe-area-inset-top))] flex items-center justify-between sm:left-12 sm:right-12 sm:top-[calc(6rem+env(safe-area-inset-top))]">
          <Link to="/" className="flex items-center gap-2 font-label text-[9px] uppercase tracking-[0.48em] text-white/40 transition-colors hover:text-white">
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
            Portfolio
          </Link>
          <span className="font-label text-[9px] uppercase tracking-[0.38em] text-white/25">
            {p.year}
          </span>
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-x-0 bottom-0 px-[max(1rem,env(safe-area-inset-left))] pb-[max(3rem,env(safe-area-inset-bottom))] pt-6 sm:px-12 sm:pb-16 sm:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-4 font-label text-[9px] uppercase tracking-[0.5em] text-teal-light/80"
          >
            {p.index} · {p.category}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.12 },
              },
            }}
            className="font-display font-bold leading-[1.03] tracking-[-0.04em] text-white max-sm:break-words sm:leading-[1.01]"
            style={{ fontSize: "clamp(1.85rem, min(5.5vw, 8vh), 5rem)" }}
          >
            {p.title.split(/(\s+)/).map((part, i) =>
              /\s+/.test(part) ? (
                <span key={`sp-${i}`}>{part}</span>
              ) : (
                <motion.span
                  key={`${part}-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
                  }}
                  className="inline-block"
                >
                  {part}
                </motion.span>
              ),
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }} className="mt-4 max-w-2xl font-editorial text-base leading-relaxed text-white/55 sm:mt-5 sm:text-lg md:text-xl">
            {p.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52, ease }}
            className="mt-3 max-w-full font-label text-[9px] uppercase tracking-[0.36em] text-white/35 sm:mt-4 sm:text-[10px] sm:tracking-[0.42em] md:text-[11px]"
          >
            {deliverablesLine}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] hidden sm:block md:bottom-10 md:right-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ opacity: heroOpacity }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-px bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0" />
            <p className="font-label text-[7px] uppercase tracking-[0.54em] text-white/20">
              Scroll
            </p>
          </div>
        </motion.div>
      </section>

      <ProjectCaseStudyBody project={p} />

      <section
        className="border-t border-white/[0.06]"
        style={{ background: "oklch(0.07 0.012 165)" }}
      >
        <div className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-12 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 sm:py-20">
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-label text-[8px] uppercase tracking-[0.52em] text-white/20">
              Next projects
            </p>
            <Link
              to="/"
              className="self-start font-label text-[8px] uppercase tracking-[0.44em] text-white/20 transition-colors hover:text-gold sm:self-auto"
            >
              All projects →
            </Link>
          </div>

          <div className="md:hidden">
            <Swiper
              slidesPerView={1.12}
              spaceBetween={20}
              centeredSlides
              speed={650}
              resistanceRatio={0.75}
              touchAngle={35}
              threshold={6}
              followFinger
              className="w-full"
            >
              {nextProjects.map((q) => (
                <SwiperSlide key={q.slug} className="!h-auto py-0.5">
                  <NextProjectCard q={q} className="mx-auto max-w-[min(22rem,calc(100vw-2.5rem))]" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden grid-cols-1 gap-6 sm:gap-8 md:grid md:grid-cols-2 md:gap-10 lg:gap-12">
            {nextProjects.map((q) => (
              <NextProjectCard key={q.slug} q={q} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
