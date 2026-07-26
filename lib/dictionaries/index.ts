import type { Locale } from "../i18n";
import { en } from "./en";

/**
 * Thai content lives in the source dictionary as `*Th` siblings of each base
 * field (e.g. `description` / `descriptionTh`). To serve a single language per
 * locale we fold those siblings into the base fields: for `th` we promote the
 * Thai value onto the base and drop the `*Th` key; for `en` we simply drop the
 * `*Th` keys. Where no Thai sibling exists, the English base is kept as the
 * fallback (we never invent translations).
 *
 * `home.locationsTh` is shaped differently from `home.locations` (a combined
 * dates/venues block vs. a per-venue list), so it is kept verbatim and the home
 * page chooses which to render per locale.
 */
const KEEP_TH = new Set(["locationsTh"]);

function clone<T>(value: T): T {
  return structuredClone(value);
}

function localizeValue(value: unknown, locale: Locale): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, locale));
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(obj)) {
      if (key.endsWith("Th")) {
        if (KEEP_TH.has(key)) {
          out[key] = clone(val);
        }
        // Otherwise drop — it is consumed via its base field below.
        continue;
      }

      const thKey = `${key}Th`;
      const hasThai =
        Object.prototype.hasOwnProperty.call(obj, thKey) && obj[thKey] !== undefined;

      if (locale === "th" && hasThai && !KEEP_TH.has(thKey)) {
        out[key] = clone(obj[thKey]);
      } else {
        out[key] = localizeValue(val, locale);
      }
    }

    return out;
  }

  return value;
}

const dictionaries: Record<Locale, Dictionary> = {
  en: localizeValue(en, "en") as unknown as Dictionary,
  th: localizeValue(en, "th") as unknown as Dictionary,
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    exhibition: string;
    screening: string;
    installation: string;
    talks: string;
    artists: string;
    schedule: string;
  };
  footer: { org: string; support: string; sponsors: string; top: string };
  status: { updatesInProgress: string };
  home: {
    subtitle: string;
    locations: readonly { date: string; venue: string }[];
    locationsTh?: {
      dates: string;
      venues: string;
    };
    curatorial: readonly string[];
    curatorialTh?: readonly string[];
  };
  screening: {
    title: string;
    intro: string;
    metaTh?: { date: string; time: string; venue: string };
    programs: readonly {
      slug: string;
      code: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      intro: string;
      dateTh?: string;
      timeTh?: string;
      venueTh?: string;
      introTh?: string;
      films: readonly {
        slug: string;
        title: string;
        meta: string;
        artists: string;
        description: string | readonly string[];
        image?: string;
        images?: readonly string[];
        artistSlug?: string;
        note?: string;
        metaTh?: string;
        artistsTh?: string;
        descriptionTh?: string | readonly string[];
        noteTh?: string;
      }[];
    }[];
  };
  installation: {
    title: string;
    artists: readonly { name: string }[];
    works: readonly {
      slug: string;
      title: string;
      year?: string;
      artists: string;
      artistsTh?: string;
      medium?: string;
      description?: string | readonly string[];
      descriptionTh?: readonly string[];
      note?: string;
      noteTh?: string;
      artistSlug?: string;
      bio?: {
        title: string;
        text: string;
        text2: string;
        links: string;
      };
    }[];
  };
  talks: {
    title: string;
    intro: string;
    meta: { date: string; time: string; venue: string };
    items: readonly {
      slug: string;
      kind: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      description: string;
      participantsLabel: string;
      participants: readonly {
        slug: string;
        name: string;
        bio: string;
        nameTh?: string;
        bioTh?: string;
      }[];
      note: string;
      kindTh?: string;
      dateTh?: string;
      timeTh?: string;
      venueTh?: string;
      descriptionTh?: string;
      participantsLabelTh?: string;
      noteTh?: string;
    }[];
    metaTh?: { date: string; time: string; venue: string };
  };
  artists: {
    title: string;
    intro: string;
    detailComingSoon: string;
    groups: readonly {
      label: string;
      slugs: readonly string[];
    }[];
    people: readonly {
      slug: string;
      name: string;
      creditAs?: string;
      image?: string;
      imageCredit?: {
        prefix: string;
        photographer: string;
        photographerUrl?: string;
      };
      bio?: readonly string[];
    }[];
  };
  schedule: {
    title: string;
    intro: string;
    days: readonly {
      day: string;
      date: string;
      events: readonly {
        time: string;
        label: string;
        kind?: "exhibition" | "programme";
        link?: {
          type: "installation" | "screening" | "talks";
          slug?: string;
        };
      }[];
    }[];
  };
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}