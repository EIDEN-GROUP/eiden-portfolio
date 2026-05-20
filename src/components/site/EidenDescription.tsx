import { motion } from "framer-motion";
import ScrollReveal from "@/components/site/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
};

export function EidenDescription() {
  return (
    <section
      id="about"
      aria-label="Who we are"
      className="border-b border-white/[0.06] py-24 sm:py-36"
      style={{ background: "oklch(0.07 0.012 165)" }}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {/* Eyebrow label */}
        <motion.div
          className="mb-12 flex items-center gap-4"
          {...fadeUp}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease, delay: 0.05 }}
        >
          <motion.span
            className="h-px w-8 shrink-0 bg-gold/40 origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease, delay: 0.12 }}
          />
          <p className="font-label text-[11px] uppercase tracking-[0.52em] text-gold/60">
            Who we are
          </p>
        </motion.div>

        {/* ScrollReveal description */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease, delay: 0.18 }}
        >
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="max-w-5xl"
            textClassName="font-editorial italic leading-[1.45] text-white/90"
          >
            {
              "EIDEN Group is MENA's first Business Architecture firm. We don't give advice we build systems. We map every fracture in your organisation and architect the operating models that let ambition scale."
            }
          </ScrollReveal>
        </motion.div>

        {/* Footnote stats row */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.06] pt-10 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0 sm:divide-x sm:divide-white/[0.06]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.35 },
            },
          }}
        >
          {[
            { value: "10+", label: "Mandates delivered" },
            { value: "MENA", label: "Region of operation" },
            { value: "3", label: "Proprietary methodologies" },
            { value: "100%", label: "Architecture-first" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="px-0 sm:border-l sm:border-white/[0.06] sm:px-6 first:sm:border-l-0"
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease },
                },
              }}
            >
              <p className="font-display text-xl font-bold leading-none tracking-[-0.04em] text-gold sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-2 font-label text-[10px] uppercase tracking-[0.4em] text-white/30">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
