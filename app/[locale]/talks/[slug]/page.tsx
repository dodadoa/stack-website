import { PageShell } from "@/components/PageShell";
import { ArtistName } from "@/components/ArtistName";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { getArtist } from "@/lib/artists";
import { getAllTalkParams, getTalk } from "@/lib/talks";
import { buildAlternates } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllTalkParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const talk = getTalk(localeParam, slug);

  if (!talk) {
    return {};
  }

  const description = talk.description.slice(0, 160);

  return {
    title: talk.title,
    description,
    alternates: buildAlternates(localeParam, `talks/${slug}`),
    openGraph: { title: talk.title, description },
    twitter: { title: talk.title, description },
  };
}

export default async function TalkPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const talk = getTalk(locale, slug);

  if (!talk) {
    notFound();
  }

  const { talks } = getDictionary(locale);

  return (
    <article>
      <PageShell full>
        <Link
          href={localePath(locale, "talks")}
          className="type-subheadline label-caps mb-10 inline-block text-pntrsw-body/60 transition-opacity hover:opacity-70"
        >
          ← {talks.title}
        </Link>

        <header className="detail-text-width mb-10 border-b border-pntrsw-deep/20 pb-10">
          <p className="type-subheadline label-caps mb-4 text-pntrsw-body/60">{talk.kind}</p>
          <h1 className="type-headline text-[clamp(2rem,5vw,3.5rem)] leading-[0.88] text-pntrsw-body">
            {talk.title}
          </h1>
          <dl className="type-subheadline mt-6 space-y-2 text-sm">
            <div>
              <dt className="label-caps text-pntrsw-body/50">{talks.meta.date}</dt>
              <dd className="meta-line text-pntrsw-body">{talk.date}</dd>
            </div>
            <div>
              <dt className="label-caps text-pntrsw-body/50">{talks.meta.time}</dt>
              <dd className="meta-line text-pntrsw-body">{talk.time}</dd>
            </div>
            <div>
              <dt className="label-caps text-pntrsw-body/50">{talks.meta.venue}</dt>
              <dd className="type-body type-body-plain text-pntrsw-body/80">{talk.venue}</dd>
            </div>
          </dl>
        </header>

        <div className="type-body prose detail-text-width text-base leading-[1.65] text-pntrsw-body/85">
          <p>{talk.description}</p>
        </div>

        <section className="detail-text-width mt-12 border-t border-pntrsw-deep/20 pt-10">
          <h2 className="type-subheadline label-caps mb-6 text-pntrsw-body/70">
            {talk.participantsLabel}
          </h2>
          <ul className="space-y-6">
            {talk.participants.map((participant) => {
              const artist = getArtist(locale, participant.slug);

              return (
                <li key={participant.slug}>
                  {artist ? (
                    <Link
                      href={localePath(locale, `artists/${participant.slug}`)}
                      className="type-headline text-lg text-pntrsw-body transition-opacity hover:opacity-70"
                    >
                      <ArtistName name={participant.name} />
                    </Link>
                  ) : (
                    <p className="type-headline text-lg text-pntrsw-body">
                      <ArtistName name={participant.name} />
                    </p>
                  )}
                  <p className="type-body mt-2 text-sm leading-relaxed text-pntrsw-body/75">
                    {participant.bio}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <p className="type-body detail-text-width mt-10 text-sm leading-relaxed text-pntrsw-body/60">
          {talk.note}
        </p>
      </PageShell>
    </article>
  );
}
