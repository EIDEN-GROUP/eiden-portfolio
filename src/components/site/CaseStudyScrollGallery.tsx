import type { CaseStudyResultTile } from "@/data/projectCaseStudy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useMemo, useRef } from "react";
import "./CaseStudyScrollGallery.css";

function splitTilesIntoColumns(
  tiles: CaseStudyResultTile[],
): [CaseStudyResultTile[], CaseStudyResultTile[], CaseStudyResultTile[]] {
  const c1: CaseStudyResultTile[] = [];
  const c2: CaseStudyResultTile[] = [];
  const c3: CaseStudyResultTile[] = [];
  for (let i = 0; i < tiles.length; i++) {
    const t = tiles[i]!;
    if (i % 3 === 0) c1.push(t);
    else if (i % 3 === 1) c2.push(t);
    else c3.push(t);
  }
  const pad = tiles[0];
  if (pad) {
    if (!c1.length) c1.push(pad);
    if (!c2.length) c2.push(pad);
    if (!c3.length) c3.push(pad);
  }
  return [c1, c2, c3];
}

function ScrollColumn({ tiles, name }: { tiles: CaseStudyResultTile[]; name: string }) {
  const loop = useMemo(() => [...tiles, ...tiles], [tiles]);
  return (
    <div className="cs-scroll-col">
      {loop.map((t, idx) => (
        <div key={`${name}-${idx}-${t.src}`} className="cs-scroll-image-wrapper">
          <img
            src={t.src}
            alt={t.alt}
            className="cs-scroll-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

export function CaseStudyScrollGallery({ tiles }: { tiles: CaseStudyResultTile[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [col1, col2, col3] = useMemo(() => splitTilesIntoColumns(tiles), [tiles]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    if (!container || !gallery || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const cols = gsap.utils.toArray<HTMLElement>(".cs-scroll-col", gallery);
    if (!cols.length) return () => {};

    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const isMobile = () => mobileQuery.matches;

    const additionalY = { val: 0 };
    let additionalYAnim: gsap.core.Tween | null = null;
    const colProgress = [0, 0, 0];

    const updateOffset = (_time: number, deltaTime: number) => {
      const dtSec = deltaTime / 1000;

      cols.forEach((col, i) => {
        const columnHeight = col.clientHeight || 1000;
        const halfHeight = columnHeight / 2;
        const speedDenom = isMobile() ? 36 : 20;
        const speedPerSec = halfHeight / speedDenom;
        const direction = i % 2 !== 0 ? 1 : -1;
        colProgress[i] += direction * speedPerSec * dtSec - direction * additionalY.val;

        const wrappedY =
          direction === 1
            ? gsap.utils.wrap(0, halfHeight, colProgress[i])
            : gsap.utils.wrap(-halfHeight, 0, colProgress[i]);

        const items = Array.from(col.children) as HTMLElement[];
        items.forEach((item) => {
          gsap.set(item, { y: wrappedY });
        });
      });
    };

    gsap.ticker.add(updateOffset);

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const m = isMobile();
        const posDiv = m ? 6200 : 2000;
        const negDiv = m ? 9000 : 3000;
        const settleDur = m ? 1.45 : 1.1;
        if (velocity > 0) {
          additionalYAnim?.kill();
          additionalY.val = -velocity / posDiv;
          additionalYAnim = gsap.to(additionalY, {
            val: 0,
            duration: settleDur,
            ease: "power2.out",
          });
        }
        if (velocity < 0) {
          additionalYAnim?.kill();
          additionalY.val = -velocity / negDiv;
          additionalYAnim = gsap.to(additionalY, {
            val: 0,
            duration: settleDur,
            ease: "power2.out",
          });
        }
      },
    });

    ScrollTrigger.refresh();

    const onMq = () => {
      ScrollTrigger.refresh();
    };
    mobileQuery.addEventListener("change", onMq);

    return () => {
      mobileQuery.removeEventListener("change", onMq);
      gsap.ticker.remove(updateOffset);
      st.kill();
      additionalYAnim?.kill();
    };
  }, [tiles]);

  return (
    <div ref={containerRef} className="cs-scroll-gallery-container">
      <div className="cs-scroll-gallery-sticky">
        <p className="cs-scroll-gallery-title">Scroll gallery</p>
        <div ref={galleryRef} className="cs-scroll-gallery">
          <ScrollColumn tiles={col1} name="a" />
          <ScrollColumn tiles={col2} name="b" />
          <ScrollColumn tiles={col3} name="c" />
        </div>
      </div>
    </div>
  );
}
