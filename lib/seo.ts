import { defaultLocale, locales, localePath, type Locale } from "./i18n";

const FALLBACK_SITE_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return FALLBACK_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Stack";
export const EVENT_TITLE = "Patch Notes That Refuse a Settled World";
export const EVENT_START_DATE = "2026-07-04";
export const EVENT_END_DATE = "2026-07-12";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  th: "th_TH",
};

export function ogLocale(locale: Locale): string {
  return OG_LOCALE[locale];
}

export function buildAlternates(locale: Locale, segment = "") {
  return {
    canonical: localePath(locale, segment),
    languages: Object.fromEntries([
      ...locales.map((entry) => [entry, localePath(entry, segment)] as const),
      ["x-default", localePath(defaultLocale, segment)] as const,
    ]),
  };
}
