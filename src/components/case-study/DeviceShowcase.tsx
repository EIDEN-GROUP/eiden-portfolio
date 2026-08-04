import { motion, useInView } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useProjectTheme } from "@/components/case-study/projectThemeContext";

/** Logical viewport each shell emulates before being scaled down to fit. */
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

/**
 * Scales a fixed logical viewport into whatever width the shell actually gets,
 * so the embedded site renders at its real breakpoint instead of being squashed.
 */
function useScaleToFit(logicalWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      if (width > 0) setScale(width / logicalWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [logicalWidth]);

  return { ref, scale };
}

function LiveFrame({
  src,
  title,
  poster,
  viewport,
  active,
}: {
  src: string;
  title: string;
  poster: string;
  viewport: { width: number; height: number };
  active: boolean;
}) {
  const { ref, scale } = useScaleToFit(viewport.width);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      style={{ aspectRatio: `${viewport.width} / ${viewport.height}` }}
    >
      <img
        src={poster}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {active ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin allow-popups"
          referrerPolicy="no-referrer"
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{
            width: viewport.width,
            height: viewport.height,
            transform: `scale(${scale})`,
          }}
        />
      ) : null}
    </div>
  );
}

function DesktopShell({ children, url }: { children: React.ReactNode; url: string }) {
  const theme = useProjectTheme();
  const host = new URL(url).host;

  return (
    <div
      className="overflow-hidden rounded-lg border shadow-2xl"
      style={{
        borderColor: theme.colors.border,
        background: theme.colors.surface,
        boxShadow: `0 40px 90px -40px rgba(0,0,0,0.65)`,
      }}
    >
      <div
        className="flex items-center gap-3 border-b px-3 py-2.5 sm:px-4"
        style={{ borderColor: theme.colors.border, background: theme.colors.surfaceAlt }}
      >
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div
          className="min-w-0 flex-1 truncate rounded px-3 py-1 text-center font-label text-[10px] tracking-[0.14em]"
          style={{
            background: `color-mix(in srgb, ${theme.colors.background} 60%, transparent)`,
            color: theme.colors.textMuted,
          }}
        >
          {host}
        </div>
        <span className="w-[52px] shrink-0" aria-hidden />
      </div>
      {children}
    </div>
  );
}

function MobileShell({ children }: { children: React.ReactNode }) {
  const theme = useProjectTheme();

  return (
    <div
      className="overflow-hidden rounded-[2.25rem] border-[6px] p-0 shadow-2xl"
      style={{
        borderColor: theme.colors.surfaceAlt,
        background: theme.colors.surfaceAlt,
        boxShadow: `0 40px 90px -40px rgba(0,0,0,0.7)`,
      }}
    >
      <div className="relative overflow-hidden rounded-[1.85rem]">
        <span
          className="absolute left-1/2 top-0 z-10 h-[18px] w-[92px] -translate-x-1/2 rounded-b-[10px]"
          style={{ background: theme.colors.surfaceAlt }}
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}

export function DeviceShowcase({
  liveUrl,
  title,
  shots,
  responsive,
}: {
  liveUrl: string;
  title: string;
  shots: { desktop: string; mobile: string };
  responsive: readonly string[];
}) {
  const theme = useProjectTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "160px" });
  const [live, setLive] = useState(false);

  // Only mount the embeds once the section is actually reachable, then keep them.
  useEffect(() => {
    if (inView) setLive(true);
  }, [inView]);

  const ease = theme.motion.ease;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t"
      style={{
        borderColor: theme.colors.border,
        background: theme.colors.canvas,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradients.section }}
      />

      <div className="relative mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-16 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: theme.motion.revealDuration, ease }}
          className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              className="mb-3 font-label text-[9px] uppercase tracking-[0.5em]"
              style={{ color: theme.colors.accent }}
            >
              Live build
            </p>
            <h2
              className="font-display font-bold leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)", color: theme.colors.text }}
            >
              Desktop & mobile
            </h2>
            <p
              className="mt-3 max-w-xl font-editorial text-sm leading-relaxed sm:text-base"
              style={{ color: theme.colors.textMuted }}
            >
              Both frames below are the real deployed site, running live. Scroll inside them.
            </p>
          </div>

          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 self-start border px-5 py-3 font-label text-[10px] uppercase tracking-[0.32em] transition-colors sm:self-auto"
            style={{
              borderColor: theme.colors.accent,
              color: theme.colors.accent,
              borderRadius: theme.ui.cardRadius,
            }}
          >
            Open live site
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: theme.motion.revealDuration, ease }}
          >
            <div
              className="mb-3 flex items-center gap-2 font-label text-[9px] uppercase tracking-[0.4em]"
              style={{ color: theme.colors.textMuted }}
            >
              <Monitor className="h-3.5 w-3.5" strokeWidth={1.5} />
              Desktop · 1440
            </div>
            <DesktopShell url={liveUrl}>
              <LiveFrame
                src={liveUrl}
                title={`${title}   desktop`}
                poster={shots.desktop}
                viewport={DESKTOP_VIEWPORT}
                active={live}
              />
            </DesktopShell>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: theme.motion.revealDuration, delay: 0.12, ease }}
            className="mx-auto w-full max-w-[17rem]"
          >
            <div
              className="mb-3 flex items-center gap-2 font-label text-[9px] uppercase tracking-[0.4em]"
              style={{ color: theme.colors.textMuted }}
            >
              <Smartphone className="h-3.5 w-3.5" strokeWidth={1.5} />
              Mobile · 390
            </div>
            <MobileShell>
              <LiveFrame
                src={liveUrl}
                title={`${title}   mobile`}
                poster={shots.mobile}
                viewport={MOBILE_VIEWPORT}
                active={live}
              />
            </MobileShell>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: theme.motion.revealDuration, ease }}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border sm:mt-16 sm:grid-cols-3"
          style={{ borderColor: theme.colors.border, background: theme.colors.border }}
        >
          {responsive.map((line, i) => (
            <li key={line} className="p-6 sm:p-7" style={{ background: theme.colors.canvas }}>
              <span
                className="mb-3 block font-label text-[9px] uppercase tracking-[0.42em]"
                style={{ color: theme.colors.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {line}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
