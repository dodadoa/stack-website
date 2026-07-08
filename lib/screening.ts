import type { Locale } from "./i18n";
import { locales } from "./i18n";
import { getDictionary } from "./dictionaries";

export type ScreeningProgram = ReturnType<
  typeof getDictionary
>["screening"]["programs"][number];

export type ScreeningFilm = ScreeningProgram["films"][number] & {
  programSlug: string;
  programTitle: string;
};

export function getScreeningProgram(
  locale: Locale,
  slug: string,
): ScreeningProgram | undefined {
  return getDictionary(locale).screening.programs.find((program) => program.slug === slug);
}

export function getScreeningFilm(
  locale: Locale,
  programSlug: string,
  filmSlug: string,
): ScreeningFilm | undefined {
  const program = getScreeningProgram(locale, programSlug);
  const film = program?.films.find((entry) => entry.slug === filmSlug);
  if (!program || !film) return undefined;
  return { ...film, programSlug: program.slug, programTitle: program.title };
}

export function getAllScreeningFilmParams() {
  return locales.flatMap((locale) =>
    getDictionary(locale).screening.programs.flatMap((program) =>
      program.films.map((film) => ({
        locale,
        programSlug: program.slug,
        filmSlug: film.slug,
      })),
    ),
  );
}
