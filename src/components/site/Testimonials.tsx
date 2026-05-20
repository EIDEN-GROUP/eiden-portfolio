import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";
import { eidenTestimonials } from "@/data/testimonials";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "@/components/site/ThreeDScrollTrigger";

const ease = [0.22, 1, 0.36, 1] as const;

function MarqueeTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative mx-3 inline-flex w-[min(88vw,420px)] shrink-0 flex-col whitespace-normal border border-white/[0.08] bg-white/[0.02] px-7 py-9 sm:mx-4 sm:px-8 sm:py-10">
      <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold/45 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <p className="font-mono mb-5 text-[10px] tracking-[0.22em] text-white/26">{testimonial.id}</p>

      <blockquote
        className="font-editorial m-0 flex-1 text-pretty italic leading-[1.58] text-white/[0.88]"
        style={{ fontSize: "clamp(0.98rem, 1.4vw, 1.2rem)" }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="my-7 h-px bg-white/[0.08]" />

      <div className="font-label flex flex-col gap-1.5">
        <p className="m-0 text-[11px] uppercase tracking-[0.32em] text-white/52">
          {testimonial.author}
        </p>
        <p className="font-mono m-0 text-[9px] tracking-[0.24em] text-white/28">
          {testimonial.location}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const rowEven = eidenTestimonials.filter((_, i) => i % 2 === 0);
  const rowOdd = eidenTestimonials.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="testimonials"
      aria-label="Client voices"
      style={{ background: "oklch(0.07 0.012 165)" }}
    >
      <div className="border-b border-white/[0.07] px-[max(1rem,env(safe-area-inset-left))] pb-14 pt-20 pr-[max(1rem,env(safe-area-inset-right))] sm:px-10 sm:pb-16 sm:pt-24 lg:px-16 lg:pb-20 lg:pt-28 xl:px-20">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/28">[ VOICES ]</span>
          <span className="h-px w-10 bg-white/[0.1]" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/20">
            {String(eidenTestimonials.length).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          className="font-display font-bold leading-[1.04] tracking-[-0.035em] text-white"
          style={{ fontSize: "clamp(2.4rem, 6vw, 6rem)" }}
        >
          What clients <span className="font-editorial font-normal italic text-gold/70">say.</span>
        </motion.h2>
      </div>

      <ThreeDScrollTriggerContainer className="border-b border-white/[0.07] py-12 sm:py-16 lg:py-20">
        <ThreeDScrollTriggerRow direction={1} baseVelocity={6} className="mb-8 sm:mb-10">
          {rowEven.map((t) => (
            <MarqueeTestimonialCard key={t.id} testimonial={t} />
          ))}
        </ThreeDScrollTriggerRow>
        <ThreeDScrollTriggerRow direction={-1} baseVelocity={6}>
          {rowOdd.map((t) => (
            <MarqueeTestimonialCard key={t.id} testimonial={t} />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </section>
  );
}
