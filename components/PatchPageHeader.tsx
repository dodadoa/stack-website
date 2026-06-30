"use client";

import { AsciiPatchStrip, PatchSectionLabel } from "./AsciiPatch";
import { PatchText } from "./PatchText";

type PatchPageHeaderProps = {
  title: string;
  intro?: string;
  label?: string;
};

export function PatchPageHeader({ title, intro, label }: PatchPageHeaderProps) {
  return (
    <header className="mb-14 border-b-2 border-pntrsw-lime pb-10">
      <AsciiPatchStrip className="mb-5 max-w-lg" />

      {label ? <PatchSectionLabel label={label} index={1} /> : null}

      <h1 className="font-sporting mt-4 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.035em] text-pntrsw-navy">
        <PatchText text={title} delay={220} duration={600} scrambleOnly />
      </h1>

      {intro ? (
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-[1.55] text-pntrsw-olive">
          <span className="font-ascii mr-2 text-xs text-pntrsw-blue/70">{`//`}</span>
          <PatchText text={intro} delay={570} duration={520} scrambleOnly />
        </p>
      ) : null}
    </header>
  );
}
