"use client";

import { useEffect, useState } from "react";

const GLITCH = "░▒▓#@$%&*!?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

function scramble(text: string, progress: number): string {
  const locked = Math.floor(progress * text.length);

  return text
    .split("")
    .map((char, index) => {
      if (index < locked) return char;
      if (char === " ") return " ";
      return GLITCH[Math.floor(Math.random() * GLITCH.length)];
    })
    .join("");
}

type PatchTextProps = {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  scrambleOnly?: boolean;
};

export function PatchText({
  text,
  duration = 400,
  delay = 0,
  className = "",
  scrambleOnly = false,
}: PatchTextProps) {
  const [output, setOutput] = useState(() =>
    scrambleOnly ? scramble(text, 0) : text,
  );
  const [visible, setVisible] = useState(!scrambleOnly);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setOutput(text);
      setVisible(true);
      return;
    }

    if (!scrambleOnly) {
      setVisible(false);
      const showTimer = window.setTimeout(() => setVisible(true), delay);
      return () => window.clearTimeout(showTimer);
    }

    const start = performance.now() + delay;
    let raf = 0;

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - start) / duration, 1);
      setOutput(scramble(text, progress));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, delay, scrambleOnly]);

  if (!scrambleOnly && !visible) {
    return null;
  }

  return (
    <span className={className} aria-label={text}>
      {scrambleOnly ? output : text}
    </span>
  );
}
