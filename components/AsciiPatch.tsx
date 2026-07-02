"use client";

import { PatchText } from "./PatchText";

type PatchSectionLabelProps = {
  label: string;
  index?: number;
};

export function PatchSectionLabel({ label, index = 0 }: PatchSectionLabelProps) {
  return (
    <p className="type-subheadline label-caps text-pntrsw-body/60">
      <PatchText text={label} delay={index * 90} duration={260} scrambleOnly />
    </p>
  );
}
