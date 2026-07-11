"use client";

import { useEffect, useState } from "react";

/**
 * Renders a custom cursor that follows the mouse and reacts to
 * hover on interactive elements.
 *
 * HYDRATION SAFETY:
 * - `mounted` starts as false, so on the very first client render
 *   (before hydration finishes) this returns null — identical to
 *   what the server rendered (also null, since we never render
 *   cursor markup on the server).
 * - Only after useEffect flips `mounted` to true (a fully
 *   client-side event, after hydration) does the cursor element
 *   appear. React does not compare this later render against the
 *   server output, so there is no mismatch.
 * - No `window`/`document` access happens during render — only
 *   inside useEffect / event listeners.
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    setMounted(true);

    function handleMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-pointer]'
      );
      setIsPointer(Boolean(interactive));
    }

    function handleMouseLeave() {
      setIsHidden(true);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  // Nothing renders until after mount — server and pre-hydration
  // client output both produce "nothing" here.
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        opacity: isHidden ? 0 : 1,
        transition: "opacity 150ms ease, width 150ms ease, height 150ms ease",
      }}
    >
      <div
        className="rounded-full bg-white"
        style={{
          width: isPointer ? 40 : 12,
          height: isPointer ? 40 : 12,
          transition: "width 150ms ease, height 150ms ease",
        }}
      />
    </div>
  );
}
