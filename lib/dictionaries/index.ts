import type { Locale } from "../i18n";
import { en } from "./en";
import { th } from "./th";

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
      slug: string;
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
      participants: readonly { name: string; bio: string }[];
      note: string;
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
