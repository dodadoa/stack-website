import type { Locale } from "./i18n";
import { locales } from "./i18n";
import { getDictionary } from "./dictionaries";

export type Artist = ReturnType<typeof getDictionary>["artists"]["people"][number];

export function getArtist(locale: Locale, slug: string): Artist | undefined {
  return getDictionary(locale).artists.people.find((person) => person.slug === slug);
}

export function getArtistName(locale: Locale, slug: string): string {
  return getArtist(locale, slug)?.name ?? slug;
}

export function getArtistSlugs(locale: Locale): string[] {
  return getDictionary(locale).artists.people.map((person) => person.slug);
}

export function getArtistGroups(locale: Locale, slug: string): string[] {
  return getDictionary(locale).artists.groups
    .filter((group) => group.slugs.includes(slug))
    .map((group) => group.label);
}

export function getAllArtistParams() {
  return locales.flatMap((locale) =>
    getArtistSlugs(locale).map((slug) => ({ locale, slug })),
  );
}
