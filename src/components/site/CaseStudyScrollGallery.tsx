import type { CaseStudyResultTile } from "@/data/projectCaseStudy";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./CaseStudyScrollGallery.css";

function useCompactGallery() {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    onChange();
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return compact;
}

function splitTilesIntoColumns(
  tiles: CaseStudyResultTile[],
  columnCount: number,
): CaseStudyResultTile[][] {
  const cols = Array.from({ length: columnCount }, () => [] as CaseStudyResultTile[]);
  for (let i = 0; i < tiles.length; i++) {
    cols[i % columnCount]!.push(tiles[i]!);
  }
  const pad = tiles[0];
  if (pad) {
    for (const col of cols) {
      if (!col.length) col.push(pad);
    }
  }
  return cols;
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
  const compact = useCompactGallery();
  const columnCount = compact ? 2 : 3;
  const columns = useMemo(() => splitTilesIntoColumns(tiles, columnCount), [tiles, columnCount]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    if (!container || !gallery || typeof window === "undefined") return;

    const cols = gsap.utils.toArray<HTMLElement>(".cs-scroll-col", gallery);
    if (!cols.length) return () => {};

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const isMobile = () => mobileQuery.matches;

    const colProgress = [0, 0, 0];

    const updateOffset = (_time: number, deltaTime: number) => {
      const dtSec = deltaTime / 1000;

      cols.forEach((col, i) => {
        const columnHeight = col.clientHeight || 1000;
        const halfHeight = columnHeight / 2;
        const speedDenom = isMobile() ? 36 : 20;
        const speedPerSec = halfHeight / speedDenom;
        const direction = i % 2 !== 0 ? 1 : -1;
        colProgress[i] += direction * speedPerSec * dtSec;

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

    return () => {
      gsap.ticker.remove(updateOffset);
    };
  }, [tiles, columnCount]);

  return (
    <div
      ref={containerRef}
      className={cn("cs-scroll-gallery-container", compact && "cs-scroll-gallery-container--compact")}
    >
      <div className="cs-scroll-gallery-sticky">
        <p className="cs-scroll-gallery-title">Scroll gallery</p>
        <div
          ref={galleryRef}
          className={cn("cs-scroll-gallery", compact && "cs-scroll-gallery--compact")}
        >
          {columns.map((colTiles, i) => (
            <ScrollColumn key={i} tiles={colTiles} name={String.fromCharCode(97 + i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
