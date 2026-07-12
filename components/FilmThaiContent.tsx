import { ArtistCredits } from "@/components/ArtistCredits";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type Film = Dictionary["screening"]["programs"][number]["films"][number];

type FilmThaiContentProps = {
  film: Film;
  locale: Locale;
};

export function FilmThaiContent({ film, locale }: FilmThaiContentProps) {
  const paragraphs = film.descriptionTh
    ? Array.isArray(film.descriptionTh)
      ? film.descriptionTh
      : [film.descriptionTh]
    : [];

  if (!paragraphs.length && !film.metaTh && !film.artistsTh && !film.noteTh) {
    return null;
  }

  return (
    <div className="detail-text-width mt-12 border-t border-pntrsw-deep/20 pt-10">
      {film.metaTh ? (
        <p className="type-subheadline thai-text meta-line text-pntrsw-body/70">{film.metaTh}</p>
      ) : null}

      {film.artistsTh ? (
        <ArtistCredits
          artists={film.artistsTh}
          artistSlug={film.artistSlug}
          locale={locale}
          showTba={false}
          className="type-body thai-text mt-4 text-base text-pntrsw-body/70"
        />
      ) : null}

      {paragraphs.length > 0 ? (
        <div className="type-body thai-text mt-6 space-y-5 text-base leading-[1.75] text-pntrsw-body/90">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {film.noteTh ? (
        <p className="type-subheadline thai-text mt-6 text-xs leading-relaxed text-pntrsw-body/55">
          {film.noteTh}
        </p>
      ) : null}
    </div>
  );
}
