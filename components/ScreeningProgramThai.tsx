import type { Dictionary } from "@/lib/dictionaries";
import type { ScreeningProgram } from "@/lib/screening";

type ScreeningProgramThaiProps = {
  program: ScreeningProgram;
  meta: NonNullable<Dictionary["screening"]["metaTh"]>;
};

export function ScreeningProgramThai({ program, meta }: ScreeningProgramThaiProps) {
  if (!program.introTh) {
    return null;
  }

  return (
    <div className="mb-8 max-w-3xl border-t border-pntrsw-deep/15 pt-8">
      <dl className="type-subheadline thai-text mb-6 space-y-2 text-sm">
        {program.dateTh ? (
          <div>
            <dt className="text-pntrsw-body/50">{meta.date}</dt>
            <dd className="meta-line text-pntrsw-body">{program.dateTh}</dd>
          </div>
        ) : null}
        {program.timeTh ? (
          <div>
            <dt className="text-pntrsw-body/50">{meta.time}</dt>
            <dd className="meta-line text-pntrsw-body">{program.timeTh}</dd>
          </div>
        ) : null}
        {program.venueTh ? (
          <div>
            <dt className="text-pntrsw-body/50">{meta.venue}</dt>
            <dd className="type-body type-body-plain text-pntrsw-body/80">{program.venueTh}</dd>
          </div>
        ) : null}
      </dl>

      <p className="type-body thai-text text-base leading-[1.75] text-pntrsw-body/85">
        {program.introTh}
      </p>
    </div>
  );
}
