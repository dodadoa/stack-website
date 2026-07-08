"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_CHARS = ["+", "x", "#", "@", "%", "~", "░", "▒", "▓", "_"];
const SWAP_MS = 5000;

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

export function AsciiCursor() {
  const enabled = useCustomCursorEnabled();
  const [char, setChar] = useState(CURSOR_CHARS[0]);
  const glyphRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.documentElement.classList.add("ascii-cursor-active");

    const handleMove = (event: MouseEvent) => {
      if (glyphRef.current) {
        glyphRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMove);

    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % CURSOR_CHARS.length;
      setChar(CURSOR_CHARS[index]);
    }, SWAP_MS);

    return () => {
      document.documentElement.classList.remove("ascii-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <span ref={glyphRef} className="ascii-cursor" aria-hidden>
      {char}
    </span>
  );
}
