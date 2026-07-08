import { PatchText } from "./PatchText";

type PatchedHeroTitleProps = {
  subtitle: string;
};

export function PatchedHeroTitle({ subtitle }: PatchedHeroTitleProps) {
  return (
    <div className="space-y-6 text-center">
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
