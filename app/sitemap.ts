import type { MetadataRoute } from "next";
import { locales, localePath, type Locale } from "@/lib/i18n";
import { getAllArtistParams } from "@/lib/artists";
import { getAllInstallationParams } from "@/lib/installation";
import { getAllScreeningFilmParams } from "@/lib/screening";
import { getAllTalkParams } from "@/lib/talks";
import { SITE_URL } from "@/lib/seo";

const sectionSegments = ["", "screening", "installation", "talks", "artists", "schedule"];

function absoluteUrl(locale: Locale, segment: string): string {
  return `${SITE_URL}${localePath(locale, segment)}`;
}

function languageAlternates(segment: string) {
  return Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(locale, segment)]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const segment of sectionSegments) {
      entries.push({
        url: absoluteUrl(locale, segment),
        lastModified,
        changeFrequency: segment === "" ? "weekly" : "monthly",
        priority: segment === "" ? 1 : 0.7,
        alternates: { languages: languageAlternates(segment) },
      });
    }
  }

  for (const { locale, slug } of getAllInstallationParams()) {
    entries.push({
      url: absoluteUrl(locale, `installation/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: languageAlternates(`installation/${slug}`) },
    });
  }

  for (const { locale, slug } of getAllTalkParams()) {
    entries.push({
      url: absoluteUrl(locale, `talks/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: languageAlternates(`talks/${slug}`) },
    });
  }

  for (const { locale, programSlug, filmSlug } of getAllScreeningFilmParams()) {
    entries.push({
      url: absoluteUrl(locale, `screening/${programSlug}/${filmSlug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: languageAlternates(`screening/${programSlug}/${filmSlug}`),
      },
    });
  }

  for (const { locale, slug } of getAllArtistParams()) {
    entries.push({
      url: absoluteUrl(locale, `artists/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: languageAlternates(`artists/${slug}`) },
    });
  }

  return entries;
}
