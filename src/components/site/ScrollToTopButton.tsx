import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 480;

export function ScrollToTopButton() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > SHOW_AFTER_PX));

  function goTop() {
    if (lenis) lenis.scrollTo(0, { duration: 0.85 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Scroll to top"
          onClick={goTop}
          className={cn(
            "fixed z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/55 bg-forest-deep/92 text-gold shadow-[0_12px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-md transition-colors hover:border-gold hover:bg-gold/12 hover:text-white",
            "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]",
          )}
        >
          <ChevronUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
