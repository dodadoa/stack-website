import type { Locale } from "../i18n";
import { en } from "./en";

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
    programs: readonly {
      slug: string;
      code: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      intro: string;
      films: readonly {
        slug: string;
        title: string;
        meta: string;
        artists: string;
        description: string;
        image?: string;
        images?: readonly string[];
        artistSlug?: string;
        note?: string;
      }[];
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
      participants: readonly { slug: string; name: string; bio: string }[];
      note: string;
    }[];
  };
  artists: {
    title: string;
    intro: string;
    groups: readonly {
      label: string;
      slugs: readonly string[];
    }[];
    people: readonly {
      slug: string;
      name: string;
      image?: string;
      bio?: readonly string[];
    }[];
  };
  schedule: {
    title: string;
    intro: string;
    days: readonly {
      day: string;
      date: string;
      events: readonly { time: string; label: string; kind?: "exhibition" | "programme" }[];
    }[];
  };
};

export function getDictionary(_locale: Locale): Dictionary {
  return en;
}