"use client";

import { PatchText } from "./PatchText";

type AsciiPatchStripProps = {
  className?: string;
};

export function AsciiPatchStrip({ className = "" }: AsciiPatchStripProps) {
  return (
    <div
      className={`font-general type-body whitespace-pre text-xs leading-relaxed text-pntrsw-body/60 sm:text-sm ${className}`}
      aria-hidden
    >
      {`<<<<<<< HEAD
======= WORLD v1.0 (settled)
>>>>>>> refuse/patch-notes`}
    </div>
  );
}

type PatchSectionLabelProps = {
  label: string;
  index?: number;
};

export function PatchSectionLabel({ label, index = 0 }: PatchSectionLabelProps) {
  return (
    <p className="type-subheadline label-caps text-pntrsw-body/60">
      <span className="mr-2 text-pntrsw-royal">{`@@ ${index}`}</span>
      <PatchText text={label} delay={index * 90} duration={260} scrambleOnly />
    </p>
  );
}
