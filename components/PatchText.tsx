"use client";

import { getPageRevealed, onPageReveal } from "@/lib/pageReveal";
import { useEffect, useMemo, useState } from "react";

const GLITCH = "░▒▓#@$%&*!?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

function buildGlitchMask(text: string): string[] {
  return text.split("").map((char, index) => {
    if (char === " ") return " ";
    return GLITCH[(index * 13 + char.charCodeAt(0)) % GLITCH.length]!;
  });
}

function scramble(text: string, progress: number, mask: string[]): string {
  const locked = Math.floor(progress * text.length);

  return text
    .split("")
    .map((char, index) => {
      if (index < locked) return char;
      return mask[index] ?? char;
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
  duration = 450,
  delay = 0,
  className = "",
  scrambleOnly = false,
}: PatchTextProps) {
  const glitchMask = useMemo(() => buildGlitchMask(text), [text]);
  const [output, setOutput] = useState(() =>
    scrambleOnly ? scramble(text, 0, glitchMask) : text,
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

    let cancelled = false;
    let raf = 0;

    const run = () => {
      if (cancelled) return;

      const start = performance.now() + delay;

      const tick = (now: number) => {
        if (cancelled) return;

        if (now < start) {
          raf = requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min((now - start) / duration, 1);
        setOutput(scramble(text, progress, glitchMask));

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setOutput(text);
        }
      };

      raf = requestAnimationFrame(tick);
    };

    if (!getPageRevealed()) {
      const unsubscribe = onPageReveal(() => {
        if (!cancelled) run();
      });

      return () => {
        cancelled = true;
        unsubscribe();
        cancelAnimationFrame(raf);
      };
    }

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [text, duration, delay, scrambleOnly, glitchMask]);

  if (!scrambleOnly && !visible) {
    return (
      <span className={className} aria-hidden>
        {text}
      </span>
    );
  }

  return (
    <span className={className} aria-label={text}>
      {scrambleOnly ? output : text}
    </span>
  );
}
