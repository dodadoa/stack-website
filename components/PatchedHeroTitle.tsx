"use client";

import { useEffect, useState } from "react";
import { PatchText } from "./PatchText";

const TOTAL_MS = 2000;

const asciiFrame = [
  "╔══════════════════════════════════════════╗",
  "║  PATCH NOTES :: REFUSE A SETTLED WORLD   ║",
  "╚══════════════════════════════════════════╝",
];

const patchLog = [
  { at: 0, prefix: " ", text: "*** applying PNTRSW-2026.patch ***", kind: "meta" as const },
  { at: 200, prefix: "-", text: "A Settled World", kind: "remove" as const },
  { at: 550, prefix: "+", text: "Refuse", kind: "add" as const },
  { at: 900, prefix: " ", text: "patching title strings...", kind: "meta" as const },
  { at: 1200, prefix: "+", text: "begins elsewhere", kind: "add" as const },
  { at: 1700, prefix: " ", text: "done. world unsettled.", kind: "done" as const },
];

type PatchedHeroTitleProps = {
  subtitle: string;
};

export function PatchedHeroTitle({ subtitle }: PatchedHeroTitleProps) {
  const [logLines, setLogLines] = useState<number>(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLogLines(patchLog.length);
      setCursorOn(false);
      return;
    }

    const timers = patchLog.map((line, index) =>
      window.setTimeout(() => setLogLines(index + 1), line.at),
    );

    const cursorTimer = window.setTimeout(() => setCursorOn(false), TOTAL_MS);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(cursorTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      <pre
        className="font-ascii hidden text-[0.55rem] leading-[1.35] text-pntrsw-royal/70 sm:block md:text-[0.625rem]"
        aria-hidden
      >
        {asciiFrame.join("\n")}
      </pre>

      <div className="font-ascii text-[0.625rem] leading-[1.5] text-pntrsw-olive sm:text-xs">
        {patchLog.slice(0, logLines).map((line) => (
          <div
            key={`${line.at}-${line.text}`}
            className={
              line.kind === "remove"
                ? "patch-line-removed text-pntrsw-moss"
                : line.kind === "add"
                  ? "text-pntrsw-forest"
                  : line.kind === "done"
                    ? "text-pntrsw-royal"
                    : "text-pntrsw-olive/80"
            }
          >
            <span className="select-none text-pntrsw-blue">{line.prefix} </span>
            {line.text}
          </div>
        ))}
        {cursorOn ? (
          <span className="patch-cursor text-pntrsw-lime" aria-hidden>
            {" "}
          </span>
        ) : null}
      </div>

      <div className="uppercase">
        <p className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-pntrsw-navy">
          <PatchText text="Patch Notes" delay={300} duration={450} scrambleOnly />
        </p>

        <p className="mt-1 text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-pntrsw-navy">
          <span className="text-[clamp(0.65rem,1.4vw,0.85rem)] font-medium tracking-[0.28em] text-pntrsw-olive/80">
            That{" "}
          </span>
          <PatchText text="Refuse" delay={750} duration={350} scrambleOnly />
        </p>

        <p className="mt-0.5 text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-pntrsw-navy">
          <span className="text-[clamp(0.65rem,1.4vw,0.85rem)] font-medium tracking-[0.28em] text-pntrsw-olive/80">
            A{" "}
          </span>
          <PatchText text="Settled World" delay={1100} duration={500} scrambleOnly />
        </p>
      </div>

      <p className="label-caps text-pntrsw-moss">
        <PatchText text={subtitle} delay={1500} duration={350} scrambleOnly />
      </p>

      <pre
        className="font-ascii text-[0.55rem] leading-none text-pntrsw-navy/25 sm:text-[0.6rem]"
        aria-hidden
      >
        {`┌───┬───┬───┬───┬───┬───┬───┬───┐
│ ░ │ ▓ │ █ │ + │ - │ ~ │ / │ \\\\ │
└───┴───┴───┴───┴───┴───┴───┴───┘`}
      </pre>
    </div>
  );
}
