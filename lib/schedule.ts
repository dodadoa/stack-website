import type { Dictionary } from "./dictionaries";
import { localePath, type Locale } from "./i18n";

export type ScheduleEvent = Dictionary["schedule"]["days"][number]["events"][number];
export type ScheduleEventLink = NonNullable<ScheduleEvent["link"]>;

export function getScheduleEventHref(locale: Locale, link: ScheduleEventLink): string {
  switch (link.type) {
    case "installation":
      return localePath(locale, "installation");
    case "screening":
      return link.slug
        ? `${localePath(locale, "screening")}#${link.slug}`
        : localePath(locale, "screening");
    case "talks":
      return link.slug ? localePath(locale, `talks/${link.slug}`) : localePath(locale, "talks");
  }
}
