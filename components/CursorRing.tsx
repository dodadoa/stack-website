"use client";

import { useEffect, useRef, useState } from "react";

function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    setEnabled(!reduced && !coarse && !noHover);
  }, []);

  return enabled;
}

export function CursorRing() {
  const enabled = useCustomCursorEnabled();
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const ring = ringRef.current;
    if (!ring) {
      return;
    }

    const move = (event: MouseEvent) => {
      ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      setActive(true);
    };

    const hide = () => setActive(false);
    const show = () => setActive(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={ringRef}
      className={`cursor-ring ${active ? "cursor-ring-visible" : ""}`}
      aria-hidden
    />
  );
}
