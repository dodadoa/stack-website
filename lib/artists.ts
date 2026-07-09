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

export function hasArtistDetail(locale: Locale, slug: string): boolean {
  const artist = getArtist(locale, slug);

  if (!artist) {
    return false;
  }

  return Boolean(artist.bio?.length || artist.image);
}

function getArtistPrimaryName(name: string): string {
  return name.split(" / ")[0]?.split(" (")[0]?.trim() ?? name.trim();
}

export function getArtistName(locale: Locale, slug: string): string {
  return getArtist(locale, slug)?.name ?? slug;
}

function findPeopleByCredit(locale: Locale, credit: string) {
  const primary = getArtistPrimaryName(credit);

  return getDictionary(locale).artists.people.filter((person) => {
    const base = getArtistPrimaryName(person.name);

    return person.name === credit.trim() || base === primary || person.name.startsWith(primary);
  });
}

function pickArtistSlug(locale: Locale, matches: ArtistPerson[]): string | undefined {
  if (matches.length === 0) {
    return undefined;
  }

  const withDetail = matches.find((person) => hasArtistDetail(locale, person.slug));

  return withDetail?.slug ?? matches[0]?.slug;
}

export function resolveArtistSlugFromCredit(locale: Locale, credit: string): string | undefined {
  return pickArtistSlug(locale, findPeopleByCredit(locale, credit));
}

function isExactArtistCredit(locale: Locale, credit: string, slug: string): boolean {
  const person = getDictionary(locale).artists.people.find((entry) => entry.slug === slug);

  if (!person) {
    return false;
  }

  const trimmed = credit.trim();

  if (person.creditAs === trimmed || person.name === trimmed) {
    return true;
  }

  if (/\band\b/i.test(trimmed)) {
    return false;
  }

  const personBase = getArtistPrimaryName(person.name);
  const creditBase = getArtistPrimaryName(trimmed);

  return personBase === creditBase || personBase === trimmed;
}

export type ArtistCreditSegment = {
  text: string;
  slug?: string;
  hasDetail?: boolean;
};

export function parseArtistCreditSegments(
  locale: Locale,
  artists: string,
  explicitSlug?: string,
): ArtistCreditSegment[] {
  if (explicitSlug && getArtist(locale, explicitSlug)) {
    return [
      {
        text: artists,
        slug: explicitSlug,
        hasDetail: hasArtistDetail(locale, explicitSlug),
      },
    ];
  }

  const resolvedSlug = resolveArtistSlugFromCredit(locale, artists);
  if (resolvedSlug && isExactArtistCredit(locale, artists, resolvedSlug)) {
    return [
      {
        text: artists,
        slug: resolvedSlug,
        hasDetail: hasArtistDetail(locale, resolvedSlug),
      },
    ];
  }

  type Match = { start: number; end: number; slug: string; text: string };
  const matches: Match[] = [];

  const needleMap = new Map<string, { slug: string; name: string }>();

  for (const person of getDictionary(locale).artists.people) {
    const base = getArtistPrimaryName(person.name);
    const needles =
      base === person.name
        ? person.creditAs
          ? [person.creditAs, person.name]
          : [person.name]
        : person.creditAs
          ? [person.creditAs, person.name, base]
          : [person.name, base];

    for (const name of [...new Set(needles)]) {
      const existing = needleMap.get(name);

      if (
        !existing ||
        (hasArtistDetail(locale, person.slug) && !hasArtistDetail(locale, existing.slug))
      ) {
        needleMap.set(name, { slug: person.slug, name });
      }
    }
  }

  for (const { slug, name } of needleMap.values()) {
    let from = 0;

    while (from < artists.length) {
      const index = artists.indexOf(name, from);
      if (index === -1) {
        break;
      }

      matches.push({ start: index, end: index + name.length, slug, text: name });
      from = index + name.length;
    }
  }

  if (matches.length === 0) {
    return [{ text: artists }];
  }

  matches.sort(
    (a, b) => a.start - b.start || b.text.length - a.text.length || a.end - b.end,
  );

  const filtered: Match[] = [];
  let cursor = -1;

  for (const match of matches) {
    if (match.start >= cursor) {
      filtered.push(match);
      cursor = match.end;
    }
  }

  const segments: ArtistCreditSegment[] = [];
  let position = 0;

  for (const match of filtered) {
    if (match.start > position) {
      segments.push({ text: artists.slice(position, match.start) });
    }

    segments.push({
      text: match.text,
      slug: match.slug,
      hasDetail: hasArtistDetail(locale, match.slug),
    });
    position = match.end;
  }

  if (position < artists.length) {
    segments.push({ text: artists.slice(position) });
  }

  return segments.length > 0 ? segments : [{ text: artists }];
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
