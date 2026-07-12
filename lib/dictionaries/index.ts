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
      description?: string;
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

export function getDictionary(_locale: Locale): Dictionary {
  return en;
}