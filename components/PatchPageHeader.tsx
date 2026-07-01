"use client";

import { AsciiPatchStrip, PatchSectionLabel } from "./AsciiPatch";
import { PatchText } from "./PatchText";

type PatchPageHeaderProps = {
  title: string;
  intro?: string;
  label?: string;
  titleClassName?: string;
};

export function PatchPageHeader({
  title,
  intro,
  label,
  titleClassName = "text-pntrsw-body",
}: PatchPageHeaderProps) {
  return (
    <header className="mb-14 border-b border-pntrsw-deep/20 pb-10">
      <AsciiPatchStrip className="mb-5 max-w-lg" />

      {label ? <PatchSectionLabel label={label} index={1} /> : null}

      <h1
        className={`type-headline mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] ${titleClassName}`}
      >
        <PatchText text={title} delay={220} duration={600} scrambleOnly />
      </h1>

      {intro ? (
        <p className="type-body mt-6 max-w-2xl text-base leading-[1.6] text-pntrsw-body/85">
          <PatchText text={intro} delay={570} duration={520} scrambleOnly />
        </p>
      ) : null}
    </header>
  );
}
