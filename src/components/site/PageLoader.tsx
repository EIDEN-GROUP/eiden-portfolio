import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DURATION_MS = 2000;
const ease = [0.22, 1, 0.36, 1] as const;

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / DURATION_MS, 1);
      // ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
      setProgress(eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const count = Math.round(progress * 100);
  // fill goes bottom-to-top: inset(top right bottom left)
  // at progress=0 → fully clipped (inset top=100%), at progress=1 → fully revealed (inset top=0%)
  const fillClip = `inset(${(1 - progress) * 100}% 0% 0% 0%)`;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.09 0.014 165)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="relative shrink-0"
          >
            {/* Ghost layer   dim unfilled */}
            <img
              src="/favicon.ico"
              alt=""
              aria-hidden
              className="h-40 w-40 object-contain sm:h-52 sm:w-52"
              style={{ opacity: 0.12 }}
            />
            {/* Filled layer   revealed bottom-to-top */}
            <img
              src="/favicon.ico"
              alt="EIDEN"
              className="absolute inset-0 h-40 w-40 object-contain sm:h-52 sm:w-52"
              style={{
                clipPath: fillClip,
                filter: "brightness(0) invert(1)",
              }}
            />
          </motion.div>

          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="absolute bottom-10 right-10 font-label text-[11px] tabular-nums tracking-[0.28em] text-white/30 sm:bottom-12 sm:right-14"
          >
            {String(count).padStart(2, "0")}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
