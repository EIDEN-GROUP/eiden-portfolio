import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        duration: 1,
        smoothWheel: true,
        wheelMultiplier: 1.12,
        touchMultiplier: 1.85,
        syncTouch: true,
        syncTouchLerp: 0.12,
        overscroll: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
