"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Wraps the app in a Lenis smooth-scroll instance.
 *
 * IMPORTANT: All Lenis setup happens inside useEffect, which only
 * runs in the browser AFTER the initial render/hydration is complete.
 * This means the server-rendered HTML and the first client render
 * are identical — Lenis never touches anything during render itself,
 * so it cannot cause a hydration mismatch.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // No conditional/browser-only markup here — children render
  // identically on server and client. Lenis only affects scroll
  // *behavior*, not DOM structure.
  return <>{children}</>;
}
