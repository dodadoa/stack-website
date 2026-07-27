"use client";

import { useEffect, useRef } from "react";

/* Stack landing cursor: black dot with a radiant bloom.
   Renders nothing on touch / reduced-motion devices. */
export function LandingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("stk-cursor-active");

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursor.style.opacity = "1";
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("stk-cursor-active");
    };
  }, []);

  return <div ref={cursorRef} className="stk-cursor" aria-hidden />;
}
