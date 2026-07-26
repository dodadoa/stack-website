export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const basePath = "/patch-note";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  if (locale === "th") {
    return `${basePath}/th${normalized}`;
  }
  return `${basePath}${normalized}`;
}

export function stripPublicPath(pathname: string): { locale: Locale; segment: string } {
  if (pathname === basePath || pathname === `${basePath}/`) {
    return { locale: "en", segment: "" };
  }

  if (pathname.startsWith(`${basePath}/th/`)) {
    return { locale: "th", segment: pathname.slice(`${basePath}/th/`.length) };
  }

  if (pathname === `${basePath}/th`) {
    return { locale: "th", segment: "" };
  }

  if (pathname.startsWith(`${basePath}/`)) {
    return { locale: "en", segment: pathname.slice(`${basePath}/`.length) };
  }

  if (pathname === "/en" || pathname === "/en/") {
    return { locale: "en", segment: "" };
  }

  if (pathname.startsWith("/en/")) {
    return { locale: "en", segment: pathname.slice("/en/".length) };
  }

  if (pathname === "/th" || pathname === "/th/") {
    return { locale: "th", segment: "" };
  }

  if (pathname.startsWith("/th/")) {
    return { locale: "th", segment: pathname.slice("/th/".length) };
  }

  return { locale: defaultLocale, segment: "" };
}
