import { motion } from "framer-motion";
import { ContactForm } from "@/components/site/contact-form";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
};

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-b border-white/8 bg-black py-20 antialiased sm:py-28"
    >
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-5xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-white sm:px-8 lg:px-10">
        {/* Mono label strip */}
        <motion.div
          className="mb-10 flex items-center gap-4 sm:mb-12"
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/35">[ CONTACT ]</span>
          <motion.span
            className="h-px w-10 shrink-0 origin-left bg-gradient-to-r from-amber-600/80 to-amber-600/30"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          />
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/25">01</span>
        </motion.div>

        <div className="mb-16 text-center lg:mb-20 lg:text-left">
          <motion.p
            className="font-label text-[9px] uppercase tracking-[0.52em] text-amber-600/70"
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.02 }}
          >
            Get in touch
          </motion.p>
          <motion.h2
            id="contact-heading"
            className="mt-4 font-hero font-bold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            {...fadeUp}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
          >
            Let&apos;s architect your{" "}
            <span className="font-editorial font-normal italic text-amber-600/80">future.</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-2xl font-editorial text-sm italic leading-relaxed text-white/50 lg:mx-0"
            {...fadeUp}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            A two-hour Hydra Analysis™ session. Structural insights. A blueprint that your
            organization can build on.
          </motion.p>
        </div>

        {/* Dark card container */}
        <motion.div
          className="relative overflow-hidden border border-white/8 bg-gradient-to-br from-stone-900/60 via-stone-950/80 to-black/90 backdrop-blur-sm shadow-[0_28px_90px_-28px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out hover:border-white/12 hover:shadow-[0_36px_100px_-24px_rgba(212,175,55,0.08)]"
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
        >
          {/* Top accent line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent transition-opacity duration-700"
            aria-hidden
          />

          {/* Corner accent */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-0 h-px w-32 bg-gradient-to-r from-transparent to-amber-600/20 blur-sm"
            aria-hidden
          />

          <div className="grid lg:grid-cols-[minmax(0,35%)_1fr]">
            {/* Info sidebar */}
            <motion.div
              className="hidden flex-col justify-between border-b border-white/8 bg-gradient-to-br from-stone-900/40 to-stone-950/60 px-10 py-12 lg:flex lg:border-b-0 lg:border-r"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease, delay: 0.28 }}
            >
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-6 bg-gradient-to-r from-amber-600/80 to-amber-600/40" />
                  <p className="font-label text-[10px] uppercase tracking-[0.52em] text-white/40">
                    EIDEN Group
                  </p>
                </div>
                <div className="border-l-2 border-amber-600/30 pl-6">
                  <p className="font-editorial text-sm italic leading-relaxed text-white/45">
                    Map the fracture network, build the system, measure the outcome.
                  </p>
                </div>
              </div>
              <div className="space-y-6 border-t border-white/8 pt-8">
                <div>
                  <p className="mb-2 font-label text-[9px] uppercase tracking-[0.44em] text-white/35">
                    Email
                  </p>
                  <a
                    href="mailto:contact@eiden-group.com"
                    className="font-body text-sm text-white/70 transition-colors duration-300 ease-out hover:text-amber-600/90"
                  >
                    contact@eiden-group.com
                  </a>
                </div>
                <div>
                  <p className="mb-2 font-label text-[9px] uppercase tracking-[0.44em] text-white/35">
                    Location
                  </p>
                  <p className="font-body text-sm text-white/60">
                    Agadir Bay, Morocco · Operating globally
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-label text-[9px] uppercase tracking-[0.44em] text-white/35">
                    Response time
                  </p>
                  <p className="font-body text-sm text-white/60">Within one business day</p>
                </div>
              </div>
            </motion.div>

            {/* Form section */}
            <div className="min-h-0 bg-black/20 backdrop-blur-xs">
              <div className="border-b border-white/8 px-5 pb-2 pt-8 sm:px-9 sm:pt-10 lg:hidden">
                <p className="mb-1 font-label text-[9px] uppercase tracking-[0.5em] text-amber-600/70">
                  Request a session
                </p>
                <p className="font-editorial text-sm italic text-white/50">
                  Fill out the form below. We'll be in touch within one business day.
                </p>
              </div>
              <div className="hidden lg:block border-b border-white/8 px-10 py-10">
                <p className="mb-1 font-label text-[9px] uppercase tracking-[0.5em] text-amber-600/70">
                  Request a session
                </p>
                <p className="font-editorial text-sm italic text-white/50">
                  Fill out the form below. We'll be in touch within one business day.
                </p>
              </div>
              <motion.div
                id="contact-form"
                className="scroll-mt-[calc(5rem+env(safe-area-inset-top))]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, ease, delay: 0.42 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
