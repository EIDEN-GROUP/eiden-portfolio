import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DeviceShowcase } from "@/components/case-study/DeviceShowcase";
import { useProjectTheme } from "@/components/case-study/projectThemeContext";
import type { Project } from "@/data/projects";
import type { WebDesignProject } from "@/data/webDesignProjects";

function useReveal() {
  const theme = useProjectTheme();
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: theme.motion.revealDuration, ease: theme.motion.ease },
  };
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const theme = useProjectTheme();
  return (
    <div className="mb-8 sm:mb-12">
      <p
        className="mb-3 font-label text-[9px] uppercase tracking-[0.5em]"
        style={{ color: theme.colors.accent }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display font-bold leading-[1.05] tracking-[-0.03em]"
        style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)", color: theme.colors.text }}
      >
        {title}
      </h2>
    </div>
  );
}

function IntentSection({ p, web }: { p: Project; web: WebDesignProject }) {
  const theme = useProjectTheme();
  const reveal = useReveal();

  return (
    <section className="relative overflow-hidden" style={{ background: theme.colors.background }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradients.page }}
      />
      <div className="relative mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-16 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <motion.div {...reveal}>
            <SectionHeading eyebrow="The intent" title={web.designNotes} />
            <div className="space-y-5">
              {web.intent.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="max-w-2xl font-body text-base leading-relaxed sm:text-lg"
                  style={{ color: theme.colors.textMuted }}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.dl
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="grid grid-cols-2 gap-px self-start overflow-hidden border lg:grid-cols-1"
            style={{ borderColor: theme.colors.border, background: theme.colors.border }}
          >
            {[
              ["Client", p.title],
              ["Year", p.year],
              ["Discipline", p.category],
              ["Stack", web.stack.join(" · ")],
            ].map(([label, value]) => (
              <div key={label} className="p-5 sm:p-6" style={{ background: theme.colors.surface }}>
                <dt
                  className="mb-2 font-label text-[9px] uppercase tracking-[0.42em]"
                  style={{ color: theme.colors.accent }}
                >
                  {label}
                </dt>
                <dd
                  className="font-body text-sm leading-relaxed"
                  style={{ color: theme.colors.text }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

function DesignSystemSection({ web }: { web: WebDesignProject }) {
  const theme = useProjectTheme();
  const reveal = useReveal();

  return (
    <section
      className="relative overflow-hidden border-t"
      style={{ borderColor: theme.colors.border, background: theme.colors.background }}
    >
      <div className="relative mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-16 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 sm:py-24">
        <motion.div {...reveal}>
          <SectionHeading eyebrow="Design system" title="Palette & type" />
        </motion.div>

        <motion.ul
          {...reveal}
          className="mb-14 grid grid-cols-2 gap-4 sm:gap-5"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(min(9rem, 100%), 1fr))`,
          }}
        >
          {web.palette.map((swatch) => (
            <li key={swatch.name}>
              <div
                className="mb-3 aspect-[4/3] w-full border"
                style={{
                  background: swatch.value,
                  borderColor: theme.colors.border,
                  borderRadius: theme.ui.cardRadius,
                }}
              />
              <p
                className="font-label text-[10px] uppercase tracking-[0.24em]"
                style={{ color: theme.colors.text }}
              >
                {swatch.name}
              </p>
              <p
                className="mt-1 font-body text-[11px] tabular-nums"
                style={{ color: theme.colors.textMuted }}
              >
                {swatch.value}
              </p>
              <p className="mt-0.5 font-body text-[11px]" style={{ color: theme.colors.textMuted }}>
                {swatch.role}
              </p>
            </li>
          ))}
        </motion.ul>

        <motion.ul
          {...reveal}
          // Column count matches the specimens so no empty cell exposes the gap colour.
          className="grid grid-cols-1 gap-px overflow-hidden border md:[grid-template-columns:repeat(var(--specimens),minmax(0,1fr))]"
          style={
            {
              borderColor: theme.colors.border,
              background: theme.colors.border,
              "--specimens": web.type.length,
            } as React.CSSProperties
          }
        >
          {web.type.map((spec) => (
            <li
              key={spec.role}
              className="flex flex-col gap-4 p-6 sm:p-8"
              style={{ background: theme.colors.surface }}
            >
              <span
                className="font-label text-[9px] uppercase tracking-[0.42em]"
                style={{ color: theme.colors.accent }}
              >
                {spec.role}
              </span>
              <span
                className="block leading-none"
                style={{
                  fontFamily: spec.stack,
                  fontWeight: spec.weight,
                  fontSize: "clamp(2.5rem, 7vw, 4rem)",
                  color: theme.colors.text,
                }}
                aria-hidden
              >
                Aa
              </span>
              <span
                className="font-display text-lg font-semibold tracking-[-0.01em]"
                style={{ color: theme.colors.text }}
              >
                {spec.family}
              </span>
              <span
                className="font-body text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {spec.note}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function MotionSection({ web }: { web: WebDesignProject }) {
  const theme = useProjectTheme();
  const reveal = useReveal();

  return (
    <section
      className="relative overflow-hidden border-t"
      style={{ borderColor: theme.colors.border, background: theme.colors.canvas }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradients.stats }}
      />
      <div className="relative mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-16 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 sm:py-24">
        <motion.div {...reveal}>
          <SectionHeading eyebrow="Motion" title="How it moves" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <motion.ol {...reveal} className="space-y-8">
            {web.motion.map((note, i) => (
              <li key={note.title} className="flex gap-5">
                <span
                  className="shrink-0 font-display text-2xl font-bold leading-none tabular-nums opacity-40"
                  style={{ color: theme.colors.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="mb-2 font-display text-lg font-semibold tracking-[-0.01em]"
                    style={{ color: theme.colors.text }}
                  >
                    {note.title}
                  </h3>
                  <p
                    className="max-w-md font-body text-sm leading-relaxed"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {note.detail}
                  </p>
                </div>
              </li>
            ))}
          </motion.ol>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="self-start"
          >
            <p
              className="mb-5 font-label text-[9px] uppercase tracking-[0.5em]"
              style={{ color: theme.colors.accent }}
            >
              Page architecture
            </p>
            <ol
              className="overflow-hidden border"
              style={{ borderColor: theme.colors.border, borderRadius: theme.ui.cardRadius }}
            >
              {web.architecture.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-4 border-b px-5 py-4 last:border-b-0 sm:px-6"
                  style={{
                    borderColor: theme.colors.border,
                    background: i % 2 === 0 ? theme.colors.surface : "transparent",
                  }}
                >
                  <span
                    className="shrink-0 font-label text-[9px] uppercase tracking-[0.32em] tabular-nums"
                    style={{ color: theme.colors.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-body text-sm leading-relaxed"
                    style={{ color: theme.colors.text }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LiveSiteCta({ p, web }: { p: Project; web: WebDesignProject }) {
  const theme = useProjectTheme();
  const reveal = useReveal();

  return (
    <section
      className="relative overflow-hidden border-t"
      style={{ borderColor: theme.colors.border, background: theme.colors.background }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradients.hero }}
      />
      <motion.div
        {...reveal}
        className="relative mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] py-16 pr-[max(1rem,env(safe-area-inset-right))] text-center sm:px-12 sm:py-24"
      >
        <p
          className="mb-4 font-label text-[9px] uppercase tracking-[0.5em]"
          style={{ color: theme.colors.accent }}
        >
          Shipped
        </p>
        <h2
          className="mx-auto max-w-3xl font-display font-bold leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)", color: theme.colors.text }}
        >
          {p.tagline}
        </h2>
        <a
          href={web.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-3 border px-7 py-4 font-label text-[10px] uppercase tracking-[0.34em] transition-opacity hover:opacity-80"
          style={{
            borderColor: theme.colors.accent,
            color: theme.colors.background,
            background: theme.colors.accent,
            borderRadius: theme.ui.cardRadius,
          }}
        >
          Visit {p.title}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </a>
      </motion.div>
    </section>
  );
}

export function WebDesignCaseStudyBody({
  project: p,
  web,
}: {
  project: Project;
  web: WebDesignProject;
}) {
  return (
    <>
      <IntentSection p={p} web={web} />
      <DeviceShowcase
        liveUrl={web.liveUrl}
        title={p.title}
        shots={web.shots}
        responsive={web.responsive}
      />
      <DesignSystemSection web={web} />
      <MotionSection web={web} />
      <LiveSiteCta p={p} web={web} />
    </>
  );
}
