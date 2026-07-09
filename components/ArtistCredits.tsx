import { hasArtistDetail, parseArtistCreditSegments, resolveArtistSlugFromCredit } from "@/lib/artists";
import { localePath, type Locale } from "@/lib/i18n";
import Link from "next/link";
import type { ReactNode } from "react";

type ArtistCreditsProps = {
  artists: string;
  artistsTh?: string;
  locale: Locale;
  artistSlug?: string;
  className?: string;
  thClassName?: string;
  showTba?: boolean;
};

const tbaClassName = "type-subheadline text-pntrsw-body/60";

function renderResolvedCredit(
  displayText: string,
  resolveFrom: string,
  locale: Locale,
  artistSlug?: string,
  showTba = true,
): ReactNode {
  const segments = parseArtistCreditSegments(locale, resolveFrom, artistSlug);

  if (segments.length === 1 && segments[0]?.slug) {
    const { slug, hasDetail } = segments[0];

    if (hasDetail) {
      return (
        <Link
          href={localePath(locale, `artists/${slug}`)}
          className="relative z-20 pointer-events-auto transition-opacity hover:opacity-70"
        >
          {displayText}
        </Link>
      );
    }

    return (
      <span className="pointer-events-none">
        {displayText}
        {showTba ? <span className={tbaClassName}> (TBA)</span> : null}
      </span>
    );
  }

  const slug = artistSlug ?? resolveArtistSlugFromCredit(locale, resolveFrom);

  if (slug && hasArtistDetail(locale, slug)) {
    return (
      <Link
        href={localePath(locale, `artists/${slug}`)}
        className="relative z-20 pointer-events-auto transition-opacity hover:opacity-70"
      >
        {displayText}
      </Link>
    );
  }

  if (slug) {
    return (
      <span className="pointer-events-none">
        {displayText}
        {showTba ? <span className={tbaClassName}> (TBA)</span> : null}
      </span>
    );
  }

  return <span className="pointer-events-none">{displayText}</span>;
}

function renderCreditLine(
  artists: string,
  locale: Locale,
  artistSlug?: string,
  showTba = true,
): ReactNode {
  const segments = parseArtistCreditSegments(locale, artists, artistSlug);

  return segments.map((segment, index) => {
    if (segment.slug && segment.hasDetail) {
      return (
        <Link
          key={`${segment.slug}-${index}`}
          href={localePath(locale, `artists/${segment.slug}`)}
          className="relative z-20 pointer-events-auto transition-opacity hover:opacity-70"
        >
          {segment.text}
        </Link>
      );
    }

    if (segment.slug) {
      return (
        <span key={`${segment.slug}-${index}`} className="pointer-events-none">
          {segment.text}
          {showTba ? <span className={tbaClassName}> (TBA)</span> : null}
        </span>
      );
    }

    return (
      <span key={index} className="pointer-events-none">
        {segment.text}
      </span>
    );
  });
}

export function ArtistCredits({
  artists,
  artistsTh,
  locale,
  artistSlug,
  className = "",
  thClassName = "mt-1",
  showTba = true,
}: ArtistCreditsProps) {
  if (!artistsTh) {
    return (
      <p className={`pointer-events-none relative z-10 ${className}`.trim()}>
        {renderCreditLine(artists, locale, artistSlug, showTba)}
      </p>
    );
  }

  return (
    <div className={`pointer-events-none relative z-10 ${className}`.trim()}>
      <p>{renderCreditLine(artists, locale, artistSlug, showTba)}</p>
      <p className={thClassName}>
        {renderResolvedCredit(artistsTh, artists, locale, artistSlug, showTba)}
      </p>
    </div>
  );
}
