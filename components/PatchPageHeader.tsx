"use client";

import { PatchSectionLabel } from "./AsciiPatch";
import { MoreToCome } from "./MoreToCome";
import { PatchText } from "./PatchText";

type PatchPageHeaderProps = {
  title: string;
  intro?: string;
  label?: string;
  titleClassName?: string;
  statusNote?: string;
};

export function PatchPageHeader({
  title,
  intro,
  label,
  titleClassName = "text-pntrsw-body",
  statusNote,
}: PatchPageHeaderProps) {
  return (
    <header className="mb-14 border-b border-pntrsw-deep/20 pb-10">
      {label ? <PatchSectionLabel label={label} index={1} /> : null}

      <h1
        className={`type-headline mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] ${titleClassName}`}
      >
        <PatchText text={title} delay={220} duration={600} scrambleOnly />
      </h1>

      {statusNote ? (
        <MoreToCome variant="inline" message={statusNote} className="mt-5" />
      ) : null}

      {intro ? (
        <p className="type-body mt-6 max-w-2xl text-base leading-[1.6] text-pntrsw-body/85">
          <PatchText text={intro} delay={570} duration={520} scrambleOnly />
        </p>
      ) : null}
    </header>
  );
}
