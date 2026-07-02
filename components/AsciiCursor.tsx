"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_CHARS = ["+", "x", "#", "@", "%", "~", "░", "▒", "▓", "_"];
const SWAP_MS = 5000;

export function AsciiCursor() {
  const [char, setChar] = useState(CURSOR_CHARS[0]);
  const glyphRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reduced || coarsePointer) {
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
  }, []);

  return (
    <span ref={glyphRef} className="ascii-cursor" aria-hidden>
      {char}
    </span>
  );
}
