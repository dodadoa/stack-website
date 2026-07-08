import type { Locale } from "./i18n";
import { locales } from "./i18n";
import { getDictionary } from "./dictionaries";

export type InstallationWork = ReturnType<
  typeof getDictionary
>["installation"]["works"][number];

export function getInstallationWork(
  locale: Locale,
  slug: string,
): InstallationWork | undefined {
  return getDictionary(locale).installation.works.find((work) => work.slug === slug);
}

export function getInstallationSlugs(locale: Locale): string[] {
  return getDictionary(locale).installation.works.map((work) => work.slug);
}

export function getAllInstallationParams() {
  return locales.flatMap((locale) =>
    getInstallationSlugs(locale).map((slug) => ({ locale, slug })),
  );
}
