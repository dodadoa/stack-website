"use client";

import { useEffect, useState } from "react";
import { PatchText } from "./PatchText";

const TOTAL_MS = 2400;

const patchLog = [
  { at: 0, prefix: " ", text: "*** applying PNTRSW-2026.patch ***", kind: "meta" as const },
  { at: 210, prefix: "-", text: "A Settled World", kind: "remove" as const },
  { at: 585, prefix: "+", text: "Refuse", kind: "add" as const },
  { at: 1065, prefix: " ", text: "patching title strings...", kind: "meta" as const },
  { at: 1440, prefix: "+", text: "begins elsewhere", kind: "add" as const },
  { at: 2025, prefix: " ", text: "done. world unsettled.", kind: "done" as const },
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
      <div className="font-general type-body text-xs leading-relaxed text-pntrsw-body/70 sm:text-sm">
        {patchLog.slice(0, logLines).map((line) => (
          <div
            key={`${line.at}-${line.text}`}
            className={
              line.kind === "remove"
                ? "patch-line-removed text-pntrsw-body/45"
                : line.kind === "add"
                  ? "text-pntrsw-body"
                  : line.kind === "done"
                    ? "text-pntrsw-body/80"
                    : "text-pntrsw-body/60"
            }
          >
            <span className="select-none text-pntrsw-royal">{line.prefix} </span>
            {line.text}
          </div>
        ))}
        {cursorOn ? (
          <span className="patch-cursor text-pntrsw-body" aria-hidden>
            {" "}
          </span>
        ) : null}
      </div>

      <div>
        <p className="type-headline text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] text-pntrsw-body">
          <PatchText text="Patch Notes" delay={330} duration={540} scrambleOnly />
        </p>

        <p className="type-headline mt-1 text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.95] text-pntrsw-body">
          <span className="type-subheadline align-super text-[clamp(0.65rem,1.4vw,0.85rem)] text-pntrsw-body/60">
            That{" "}
          </span>
          <PatchText text="Refuse" delay={870} duration={450} scrambleOnly />
        </p>

        <p className="type-headline mt-0.5 text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.95] text-pntrsw-body">
          <span className="type-subheadline align-super text-[clamp(0.65rem,1.4vw,0.85rem)] text-pntrsw-body/60">
            A{" "}
          </span>
          <PatchText text="Settled World" delay={1290} duration={570} scrambleOnly />
        </p>
      </div>

      <p className="type-subheadline label-caps text-pntrsw-body/60">
        <PatchText text={subtitle} delay={1800} duration={450} scrambleOnly />
      </p>
    </div>
  );
}
