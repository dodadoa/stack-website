import { PageShell } from "@/components/PageShell";
import { ArtistName } from "@/components/ArtistName";
import { getAllArtistParams, getArtist, getArtistGroups } from "@/lib/artists";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllArtistParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const artist = getArtist(localeParam, slug);

  if (!artist) {
    return {};
  }

  const description = artist.bio?.[0]?.slice(0, 160) ?? artist.name;

  return {
    title: artist.name,
    description,
    alternates: buildAlternates(localeParam, `artists/${slug}`),
    openGraph: {
      title: artist.name,
      description,
      images: artist.image ? [artist.image] : undefined,
    },
    twitter: {
      title: artist.name,
      description,
      images: artist.image ? [artist.image] : undefined,
    },
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const artist = getArtist(locale, slug);

  if (!artist) {
    notFound();
  }

  const { artists } = getDictionary(locale);
  const groups = getArtistGroups(locale, slug);

  return (
    <article>
      <PageShell full>
        <Link
          href={localePath(locale, "artists")}
          className="type-subheadline label-caps mb-10 inline-block text-pntrsw-body/60 transition-opacity hover:opacity-70"
        >
          ← {artists.title}
        </Link>

        {artist.image ? (
          <div className="mb-10 w-full max-w-[520px]">
            <Image
              src={artist.image}
              alt={artist.name}
              width={720}
              height={900}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 520px"
              quality={92}
              priority
            />
          </div>
        ) : null}

        <div className="detail-text-width">
          <header className="mb-10 border-b border-pntrsw-deep/20 pb-10">
            <h1 className="type-headline min-w-0 max-w-full text-balance break-words text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] text-pntrsw-body">
              <ArtistName name={artist.name} />
            </h1>
            {groups.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {groups.map((label) => (
                  <span
                    key={label}
                    className="type-subheadline inline-block rounded-full bg-pntrsw-white px-3 py-1 text-xs text-pntrsw-body"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {artist.bio ? (
            <div className="type-body space-y-5 text-base leading-[1.7] text-pntrsw-body/90">
              {artist.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </PageShell>
    </article>
  );
}
