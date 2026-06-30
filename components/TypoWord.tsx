"use client";

import { useEffect, useState } from "react";

type TypoWordProps = {
  wrong: string;
  correct: string;
  delay?: number;
};

export function TypoWord({ wrong, correct, delay = 800 }: TypoWordProps) {
  const [state, setState] = useState<"wrong" | "fixing" | "fixed">("wrong");
  const [display, setDisplay] = useState(wrong);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setState("fixed");
      setDisplay(correct);
      return;
    }

    const fixTimer = window.setTimeout(() => {
      setState("fixing");

      const steps = 10;
      const stepDuration = 72;

      for (let i = 0; i <= steps; i++) {
        window.setTimeout(() => {
          if (i < steps) {
            const mixed = correct
              .split("")
              .map((ch, idx) => {
                const progress = i / steps;
                if (idx < Math.floor(progress * correct.length)) return ch;
                if (ch === " ") return " ";
                return wrong[idx] ?? ch;
              })
              .join("");
            setDisplay(mixed);
          } else {
            setDisplay(correct);
            setState("fixed");
          }
        }, i * stepDuration);
      }
    }, delay);

    return () => window.clearTimeout(fixTimer);
  }, [wrong, correct, delay]);

  return (
    <span
      className={`inline transition-all duration-500 ease-out ${
        state === "wrong"
          ? "bg-pntrsw-lime/20 text-pntrsw-navy/70 underline decoration-pntrsw-lime/50 decoration-dotted decoration-[1px] underline-offset-[3px]"
          : state === "fixing"
            ? "bg-pntrsw-lime/10 text-pntrsw-navy/80"
            : ""
      }`}
      aria-label={correct}
    >
      {display}
    </span>
  );
}
