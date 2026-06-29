"use client";

import { PatchText } from "./PatchText";

type AsciiPatchStripProps = {
  className?: string;
};

export function AsciiPatchStrip({ className = "" }: AsciiPatchStripProps) {
  return (
    <div
      className={`font-ascii overflow-x-auto whitespace-pre text-[0.6rem] leading-[1.4] text-pntrsw-navy/30 ${className}`}
      aria-hidden
    >
      {`<<<<<<< HEAD
======= WORLD v1.0 (settled)
>>>>>>> refuse/patch-notes
[████████████████░░░░░░░░] 67%`}
    </div>
  );
}

type PatchSectionLabelProps = {
  label: string;
  index?: number;
};

export function PatchSectionLabel({ label, index = 0 }: PatchSectionLabelProps) {
  return (
    <p className="label-caps text-pntrsw-moss">
      <span className="font-ascii mr-2 text-pntrsw-blue/60">{`@@ ${index}`}</span>
      <PatchText text={label} delay={index * 120} duration={280} scrambleOnly />
    </p>
  );
}
