import { PageShell } from "@/components/PageShell";
import { ArtistCredits } from "@/components/ArtistCredits";
import { getDictionary } from "@/lib/dictionaries";
import { getAllInstallationParams, getInstallationWork } from "@/lib/installation";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllInstallationParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const work = getInstallationWork(localeParam, slug);

  if (!work) {
    return {};
  }

  const description = work.description?.slice(0, 160) ?? `${work.title} by ${work.artists}.`;

  return {
    title: work.title,
    description,
    alternates: buildAlternates(localeParam, `installation/${slug}`),
    openGraph: { title: work.title, description },
    twitter: { title: work.title, description },
  };
}

export default async function InstallationWorkPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const work = getInstallationWork(locale, slug);

  if (!work || !work.description) {
    notFound();
  }

  const { installation } = getDictionary(locale);

  return (
    <article>
      <PageShell full>
        <Link
          href={localePath(locale, "installation")}
          className="type-subheadline label-caps mb-10 inline-block text-pntrsw-body/60 transition-opacity hover:opacity-70"
        >
          ← {installation.title}
        </Link>

        <header className="detail-text-width mb-10 border-b border-pntrsw-deep/20 pb-10">
          <h1 className="type-headline text-[clamp(2rem,5vw,3.5rem)] leading-[0.88] text-pntrsw-body">
            {work.title}
            {work.year ? ` (${work.year})` : ""}
          </h1>
          <ArtistCredits
            artists={work.artists}
            artistSlug={work.artistSlug}
            locale={locale}
            showTba={false}
            className="type-body mt-4 text-base text-pntrsw-body/70"
          />
          {work.medium ? (
            <p className="type-subheadline label-caps mt-5 text-pntrsw-body/60">{work.medium}</p>
          ) : null}
        </header>

        {work.description ? (
          <div className="type-body prose detail-text-width space-y-4 text-base leading-[1.65] text-pntrsw-body/85">
            <p>{work.description}</p>
            {work.note ? <p className="text-pntrsw-body/70">{work.note}</p> : null}
          </div>
        ) : null}

        {work.bio ? (
          <div className="detail-text-width mt-12 border-t border-pntrsw-deep/20 pt-10">
            <h2 className="type-subheadline label-caps mb-5 text-pntrsw-body/70">
              {work.bio.title}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-pntrsw-body/80">
              <p>{work.bio.text}</p>
              <p>{work.bio.text2}</p>
              <p className="text-pntrsw-body/60">{work.bio.links}</p>
            </div>
          </div>
        ) : null}
      </PageShell>
    </article>
  );
}
