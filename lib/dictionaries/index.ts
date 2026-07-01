import type { Locale } from "../i18n";
import { en } from "./en";
import { th } from "./th";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    exhibition: string;
    screening: string;
    installation: string;
    artists: string;
    schedule: string;
  };
  footer: { org: string; support: string; sponsors: string; top: string };
  home: {
    subtitle: string;
    dates: string;
    venue: string;
    curatorial: readonly string[];
  };
  screening: {
    title: string;
    intro: string;
    films: readonly {
      title: string;
      meta: string;
      artists: string;
    }[];
  };
  installation: {
    title: string;
    works: readonly {
      title: string;
      year?: string;
      artists: string;
      medium?: string;
      description?: string;
      bio?: {
        title: string;
        text: string;
        text2: string;
        links: string;
      };
    }[];
  };
  artists: {
    title: string;
    intro: string;
    groups: readonly {
      label: string;
      names: readonly string[];
    }[];
  };
  schedule: {
    title: string;
    intro: string;
    days: readonly {
      day: string;
      date: string;
      events: readonly { time: string; label: string }[];
    }[];
  };
};

const dictionaries: Record<Locale, Dictionary> = { en, th };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
