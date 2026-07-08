import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { getAllTalkParams, getTalk } from "@/lib/talks";
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

  return {
    title: talk.title,
    description: talk.description.slice(0, 160),
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
      <PageShell>
        <Link
          href={localePath(locale, "talks")}
          className="type-subheadline label-caps mb-10 inline-block text-pntrsw-body/60 transition-opacity hover:opacity-70"
        >
          ← {talks.title}
        </Link>

        <header className="mb-10 max-w-3xl border-b border-pntrsw-deep/20 pb-10">
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

        <div className="type-body prose max-w-3xl text-base leading-[1.65] text-pntrsw-body/85">
          <p>{talk.description}</p>
        </div>

        <section className="mt-12 max-w-3xl border-t border-pntrsw-deep/20 pt-10">
          <h2 className="type-subheadline label-caps mb-6 text-pntrsw-body/70">
            {talk.participantsLabel}
          </h2>
          <ul className="space-y-6">
            {talk.participants.map((participant) => (
              <li key={participant.name}>
                <p className="type-headline text-lg text-pntrsw-body">{participant.name}</p>
                <p className="type-body mt-2 text-sm leading-relaxed text-pntrsw-body/75">
                  {participant.bio}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="type-body mt-10 max-w-3xl text-sm leading-relaxed text-pntrsw-body/60">
          {talk.note}
        </p>
      </PageShell>
    </article>
  );
}
