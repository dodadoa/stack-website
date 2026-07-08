import { CursorHint } from "@/components/CursorHint";
import { localePath, type Locale } from "@/lib/i18n";
import type { ScreeningProgram } from "@/lib/screening";
import Link from "next/link";

type ScreeningProgramListProps = {
  programs: readonly ScreeningProgram[];
  locale: Locale;
};

export function ScreeningProgramList({ programs, locale }: ScreeningProgramListProps) {
  return (
    <div className="divide-y divide-pntrsw-deep/15">
      {programs.map((program) => (
        <details key={program.slug} className="group py-8 first:pt-0">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <CursorHint hintClosed="Click to expand" hintOpen="Click to collapse">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="type-subheadline label-caps text-pntrsw-body/60">{program.code}</p>
                  <h2 className="type-headline mt-2 text-xl leading-snug text-pntrsw-body">
                    {program.title}
                  </h2>
                  <p className="type-subheadline meta-line mt-3 text-pntrsw-body/70">
                    {program.date} · {program.time}
                  </p>
                  <p className="type-body type-body-plain mt-1 text-sm text-pntrsw-body/60">
                    {program.venue}
                  </p>
                </div>
                <span
                  className="type-subheadline mt-1 shrink-0 text-pntrsw-body/50 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </div>
            </CursorHint>
          </summary>

          <div className="mt-8 pl-0">
            <p className="type-body mb-8 max-w-3xl text-base leading-[1.7] text-pntrsw-body/85">
              {program.intro}
            </p>
            <ul className="space-y-0">
              {program.films.map((film) => (
                <li
                  key={film.slug}
                  className="list-row border-t border-pntrsw-deep/10 first:border-t-0"
                >
                  <Link
                    href={localePath(locale, `screening/${program.slug}/${film.slug}`)}
                    className="group flex flex-col gap-2 px-4 py-5 transition-colors hover:bg-pntrsw-lime sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-5"
                  >
                    <h3 className="type-headline min-w-0 text-base leading-snug text-pntrsw-body sm:flex-1 sm:text-lg">
                      {film.title}
                    </h3>
                    <div className="type-body shrink-0 self-end text-right sm:self-auto">
                      <p className="type-body-plain text-sm text-pntrsw-body/70">{film.artists}</p>
                      <p className="type-subheadline meta-line mt-2 text-xs text-pntrsw-body/60">
                        {film.meta}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
