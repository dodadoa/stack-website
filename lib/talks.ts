import type { Locale } from "./i18n";
import { locales } from "./i18n";
import { getDictionary } from "./dictionaries";

export type Talk = ReturnType<typeof getDictionary>["talks"]["items"][number];

export function getTalk(locale: Locale, slug: string): Talk | undefined {
  return getDictionary(locale).talks.items.find((item) => item.slug === slug);
}

export function getTalkSlugs(locale: Locale): string[] {
  return getDictionary(locale).talks.items.map((item) => item.slug);
}

export function getAllTalkParams() {
  return locales.flatMap((locale) =>
    getTalkSlugs(locale).map((slug) => ({ locale, slug })),
  );
}
