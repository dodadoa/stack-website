import type { Locale } from "./i18n";
import { locales } from "./i18n";
import { getDictionary } from "./dictionaries";

const TALKS_GROUP_LABEL = "Talks";

type ArtistPerson = ReturnType<typeof getDictionary>["artists"]["people"][number];

export type Artist = ArtistPerson & {
  bio?: readonly string[];
};

function getTalkParticipantsBySlug(locale: Locale) {
  const map = new Map<string, { name: string; bio: string }>();

  for (const talk of getDictionary(locale).talks.items) {
    for (const participant of talk.participants) {
      if (!map.has(participant.slug)) {
        map.set(participant.slug, {
          name: participant.name,
          bio: participant.bio,
        });
      }
    }
  }

  return map;
}

export function getTalkParticipantSlugs(locale: Locale): string[] {
  return [...getTalkParticipantsBySlug(locale).keys()];
}

function enrichArtistFromTalks(
  locale: Locale,
  person: ArtistPerson | undefined,
  slug: string,
): Artist | undefined {
  const talkData = getTalkParticipantsBySlug(locale).get(slug);

  if (!person && !talkData) {
    return undefined;
  }

  const base = person ?? { slug, name: talkData!.name };

  return {
    ...base,
    bio: base.bio ?? (talkData ? [talkData.bio] : undefined),
  };
}

export function getArtist(locale: Locale, slug: string): Artist | undefined {
  const person = getDictionary(locale).artists.people.find((entry) => entry.slug === slug);

  return enrichArtistFromTalks(locale, person, slug);
}

export function getArtistName(locale: Locale, slug: string): string {
  return getArtist(locale, slug)?.name ?? slug;
}

export function getArtistSlugs(locale: Locale): string[] {
  const slugs = new Set(getDictionary(locale).artists.people.map((person) => person.slug));

  for (const slug of getTalkParticipantSlugs(locale)) {
    slugs.add(slug);
  }

  return [...slugs];
}

export function getArtistGroups(locale: Locale, slug: string): string[] {
  const talkSlugs = getTalkParticipantSlugs(locale);

  return getDictionary(locale).artists.groups
    .filter((group) => {
      if (group.label === TALKS_GROUP_LABEL) {
        return talkSlugs.includes(slug);
      }

      return group.slugs.includes(slug);
    })
    .map((group) => group.label);
}

export function getArtistGroupsForPage(locale: Locale) {
  const talkSlugs = getTalkParticipantSlugs(locale);

  return getDictionary(locale).artists.groups.map((group) =>
    group.label === TALKS_GROUP_LABEL ? { ...group, slugs: talkSlugs } : group,
  );
}

export function getAllArtistParams() {
  return locales.flatMap((locale) =>
    getArtistSlugs(locale).map((slug) => ({ locale, slug })),
  );
}
