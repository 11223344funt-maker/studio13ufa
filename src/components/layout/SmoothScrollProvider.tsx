"use client";

import { useEffect, useRef } from "react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
    } | null = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        let animFrameId: number;

        function raf(time: number) {
          lenis!.raf(time);
          animFrameId = requestAnimationFrame(raf);
        }

        animFrameId = requestAnimationFrame(raf);

        return () => {
          cancelAnimationFrame(animFrameId);
          lenis!.destroy();
        };
      } catch (e) {
        console.warn("Lenis not available:", e);
        return () => {};
      }
    };

    const cleanup = initLenis();
    return () => {
      cleanup.then((fn) => fn && fn());
    };
  }, []);

  return <>{children}</>;
}

