import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./GridMotion.css";

/** CDN / absolute, Vite-built `/assets/…`, public files, or data URLs   not plain labels like "Item 1". */
function isImageSrc(src: string): boolean {
  const s = src.trim();
  if (!s) return false;
  if (s.startsWith("https://") || s.startsWith("http://")) return true;
  if (s.startsWith("//")) return true;
  if (s.startsWith("/")) return true;
  if (s.startsWith("data:image")) return true;
  return false;
}

const GridMotion = ({
  items,
  gradientColor = "black",
  autoplay = true,
  sharp = false,
}: {
  items?: string[];
  gradientColor?: string;
  autoplay?: boolean;
  /** When true, disables the soft blur filter for crisp preview grids */
  sharp?: boolean;
}) => {
  items = items ?? [];
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Safe initialisation   window may not exist during SSR
  const mouseXRef = useRef(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const lastInteractionRef = useRef(0);
  const autoplayTimeRef = useRef(0);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    /* ── pointer / touch tracking ── */
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      lastInteractionRef.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseXRef.current = e.touches[0].clientX;
        lastInteractionRef.current = Date.now();
      }
    };

    /* ── animation tick ── */
    const updateMotion = () => {
      const winW = window.innerWidth;
      let maxMove = 300;
      let baseDuration = 0.85;
      if (winW < 480) {
        maxMove = 110;
        baseDuration = 1.65;
      } else if (winW < 640) {
        maxMove = 155;
        baseDuration = 1.35;
      } else if (winW < 768) {
        maxMove = 200;
        baseDuration = 1.05;
      } else if (winW < 1024) {
        maxMove = 260;
        baseDuration = 0.92;
      }
      const inertia = [0.6, 0.4, 0.3, 0.2];

      // Switch to auto-oscillation after 1.5 s of no interaction (or immediately on touch devices)
      const idle = autoplay && Date.now() - lastInteractionRef.current > 1500;

      let effectiveX: number;
      if (idle) {
        autoplayTimeRef.current += 0.008; // speed of oscillation
        // Smooth sine wave across the full viewport width
        effectiveX = (winW / 2) * (1 + 0.9 * Math.sin(autoplayTimeRef.current));
      } else {
        effectiveX = mouseXRef.current;
      }

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const direction = i % 2 === 0 ? 1 : -1;
        const moveAmount = ((effectiveX / winW) * maxMove - maxMove / 2) * direction;

        gsap.to(row, {
          x: moveAmount,
          duration: idle ? baseDuration + 0.6 : baseDuration + inertia[i % inertia.length],
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const removeLoop = gsap.ticker.add(updateMotion);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      removeLoop();
    };
  }, [autoplay]);

  return (
    <div className={sharp ? "noscroll noscroll--sharp" : "noscroll"} ref={gridRef}>
      <section
        className="intro"
        style={{ background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` }}
      >
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="row"
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner" style={{ backgroundColor: "#111" }}>
                      {typeof content === "string" && isImageSrc(content) ? (
                        <div
                          className="row__item-img"
                          style={{ backgroundImage: `url(${JSON.stringify(content)})` }}
                        />
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview" />
      </section>
    </div>
  );
};

export default GridMotion;
