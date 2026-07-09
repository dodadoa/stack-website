import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { ArtistCredits } from "@/components/ArtistCredits";
import { getDictionary } from "@/lib/dictionaries";
import { artistHasPublishedWork } from "@/lib/installation";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const { installation } = getDictionary(localeParam);
  const description = `Installation works showing as part of ${installation.title.toLowerCase() === "installation" ? "the exhibition" : installation.title}, featuring ${installation.works.map((work) => work.artists).join(", ")}.`;

  return {
    title: installation.title,
    description,
    alternates: buildAlternates(localeParam, "installation"),
    openGraph: { title: installation.title, description },
    twitter: { title: installation.title, description },
  };
}

export default async function InstallationPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const { installation } = dict;
  const publishedWorks = installation.works.filter((work) => work.description);
  const tbaArtists = installation.artists.filter(
    (artist) => !artistHasPublishedWork(artist.name, installation.works),
  );

  return (
    <article>
      <PageShell full>
        <PatchPageHeader
          title={installation.title}
          statusNote={tbaArtists.length > 0 ? dict.status.updatesInProgress : undefined}
        />

        {publishedWorks.length > 0 ? (
          <section>
            <h2 className="type-subheadline label-caps mb-8 text-pntrsw-body/60">Works</h2>
            <ul className="-mx-4 sm:-mx-6 lg:-mx-8">
              {publishedWorks.map((work) => (
                <li key={work.slug} className="list-row border-t border-pntrsw-deep/10 first:border-t-0">
                  <div className="group relative flex w-full flex-col gap-2 px-4 py-5 transition-colors hover:bg-pntrsw-lime sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
                    <Link
                      href={localePath(locale, `installation/${work.slug}`)}
                      className="absolute inset-0 z-0"
                      aria-label={`${work.title} — ${work.artists}`}
                    />
                    <h3 className="type-headline pointer-events-none relative z-10 text-xl leading-snug text-pntrsw-body sm:flex-1">
                      {work.title}
                      {work.year ? ` (${work.year})` : ""}
                    </h3>
                    <ArtistCredits
                      artists={work.artists}
                      artistSlug={work.artistSlug}
                      locale={locale}
                      showTba={false}
                      className="type-body type-body-plain w-full text-sm text-pntrsw-body sm:w-auto sm:shrink-0 sm:text-right"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tbaArtists.length > 0 ? (
          <section className="mt-14 border-t border-pntrsw-deep/20 pt-10">
            <h2 className="type-subheadline label-caps mb-8 text-pntrsw-body/60">Artists</h2>
            <ul className="space-y-4">
              {tbaArtists.map((artist) => (
                <li key={artist.name}>
                  <p className="type-headline text-xl leading-snug text-pntrsw-body sm:text-2xl">
                    {artist.name}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </PageShell>
    </article>
  );
}
