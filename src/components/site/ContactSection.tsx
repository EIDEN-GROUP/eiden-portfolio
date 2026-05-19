import { motion } from "framer-motion";
import contactBackdrop from "@/assets/contact-section-bg.png";
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
      className="relative overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-b border-white/10 py-20 antialiased sm:py-28"
    >
      {/* Background: silk fabric art + dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={contactBackdrop}
          alt=""
          className="absolute inset-0 h-full min-h-full w-full object-cover opacity-45"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-white sm:px-8 lg:px-10">
        {/* Mono strip   same rhythm as Testimonials / Signals */}
        <motion.div
          className="mb-10 flex items-center gap-4 sm:mb-12"
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/40">[ CONTACT ]</span>
          <motion.span
            className="h-px w-10 shrink-0 origin-left bg-white/25"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          />
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/30">01</span>
        </motion.div>

        <div className="mb-12 text-center lg:mb-16 lg:text-left">
          <motion.p
            className="font-label text-[9px] uppercase tracking-[0.52em] text-gold/65"
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.02 }}
          >
            Get in touch
          </motion.p>
          <motion.h2
            id="contact-heading"
            className="mt-3 font-hero font-bold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)" }}
            {...fadeUp}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
          >
            Let&apos;s start a{" "}
            <span className="font-editorial font-normal italic text-gold/75">conversation.</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl font-editorial text-sm italic leading-relaxed text-white/55 lg:mx-0"
            {...fadeUp}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            Two hours. One Hydra Analysis™. A blueprint that changes how your leadership sees the
            business.
          </motion.p>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-sm border border-white/12 bg-white text-stone-900 shadow-[0_28px_90px_-28px_rgba(0,0,0,0.45)] transition-shadow duration-500 ease-out hover:shadow-[0_36px_100px_-24px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-opacity duration-700"
            aria-hidden
          />
          <div className="grid lg:grid-cols-[minmax(0,38%)_1fr]">
            <motion.div
              className="hidden flex-col justify-between border-b border-stone-200/80 bg-stone-50/90 px-10 py-12 lg:flex lg:border-b-0 lg:border-r lg:border-stone-200/80"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease, delay: 0.28 }}
            >
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-6 bg-gold/60" />
                  <p className="font-label text-[10px] uppercase tracking-[0.52em] text-stone-500">
                    EIDEN Group
                  </p>
                </div>
                <div className="border-l-2 border-gold/40 pl-6">
                  <p className="font-editorial text-sm italic leading-relaxed text-stone-600">
                    Map the fracture network, build the system, measure the outcome.
                  </p>
                </div>
              </div>
              <div className="space-y-5 border-t border-stone-200/90 pt-8">
                <div>
                  <p className="mb-1.5 font-label text-[9px] uppercase tracking-[0.44em] text-stone-500">
                    Email
                  </p>
                  <a
                    href="mailto:contact@eiden-group.com"
                    className="font-body text-sm text-stone-700 transition-colors duration-300 ease-out hover:text-gold-dark"
                  >
                    contact@eiden-group.com
                  </a>
                </div>
                <div>
                  <p className="mb-1.5 font-label text-[9px] uppercase tracking-[0.44em] text-stone-500">
                    Location
                  </p>
                  <p className="font-body text-sm text-stone-600">
                    Agadir Bay, Morocco · Operating globally
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="min-h-0 bg-white">
              <div className="border-b border-stone-200/80 px-7 pb-2 pt-10 lg:hidden sm:px-9">
                <p className="mb-1 font-label text-[9px] uppercase tracking-[0.5em] text-gold-dark/90">
                  Request a session
                </p>
                <p className="font-editorial text-sm italic text-stone-600">
                  Use the form we reply within one business day.
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
