import { CursorHint } from "@/components/CursorHint";
import { ArtistCredits } from "@/components/ArtistCredits";
import { ScreeningProgramThai } from "@/components/ScreeningProgramThai";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import type { ScreeningProgram } from "@/lib/screening";
import Link from "next/link";

type ScreeningProgramListProps = {
  programs: readonly ScreeningProgram[];
  locale: Locale;
  metaTh?: Dictionary["screening"]["metaTh"];
};

export function ScreeningProgramList({ programs, locale, metaTh }: ScreeningProgramListProps) {
  return (
    <div className="divide-y divide-pntrsw-deep/15">
      {programs.map((program) => (
        <details
          key={program.slug}
          id={program.slug}
          data-cursor-hint="custom"
          className="group scroll-mt-28 py-8 first:pt-0"
        >
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
            {metaTh ? <ScreeningProgramThai program={program} meta={metaTh} /> : null}
            <ul className="-mx-4 space-y-0 sm:-mx-6 lg:-mx-8">
              {program.films.map((film) => (
                <li
                  key={film.slug}
                  className="list-row border-t border-pntrsw-deep/10 first:border-t-0"
                >
                  <div className="group flex w-full flex-col gap-2 px-4 py-5 transition-colors hover:bg-pntrsw-lime sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
                    <Link
                      href={localePath(locale, `screening/${program.slug}/${film.slug}`)}
                      className="type-headline w-full min-w-0 text-left text-base leading-snug tracking-[-0.03em] text-pntrsw-body transition-opacity hover:opacity-70 sm:flex-1 sm:text-lg"
                    >
                      {film.title}
                    </Link>
                    <div className="type-body w-full text-left sm:w-auto sm:shrink-0 sm:text-right">
                      <ArtistCredits
                        artists={film.artists}
                        artistsTh={film.artistsTh}
                        artistSlug={film.artistSlug}
                        locale={locale}
                        showTba={false}
                        thClassName="type-body thai-text mt-1 text-sm text-pntrsw-body/60"
                        className="type-body-plain text-sm text-pntrsw-body"
                      />
                      <p className="type-subheadline meta-line mt-2 text-xs text-pntrsw-body/70">
                        {film.meta}
                      </p>
                      {film.metaTh ? (
                        <p className="type-subheadline thai-text meta-line mt-1 text-xs text-pntrsw-body/60">
                          {film.metaTh}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
