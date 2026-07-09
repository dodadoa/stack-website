import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
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

  return (
    <article>
      <PageShell full>
        <PatchPageHeader
          title={installation.title}
          label="Artists"
          statusNote={dict.status.updatesInProgress}
        />

        <ul className="space-y-4">
          {installation.artists.map((artist) => (
            <li key={artist.name}>
              <p className="type-headline text-xl leading-snug text-pntrsw-body sm:text-2xl">
                {artist.name}{" "}
                <span className="type-subheadline text-base text-pntrsw-body/60">(TBA)</span>
              </p>
            </li>
          ))}
        </ul>

        {publishedWorks.length > 0 ? (
          <section className="mt-14 border-t border-pntrsw-deep/20 pt-10">
            <h2 className="type-subheadline label-caps mb-8 text-pntrsw-body/60">Works</h2>
            <ul>
              {publishedWorks.map((work) => (
                <li key={work.slug} className="list-row py-8 first:pt-0">
                  <Link
                    href={localePath(locale, `installation/${work.slug}`)}
                    className="group block transition-opacity hover:opacity-70"
                  >
                    <h3 className="type-headline text-xl leading-snug text-pntrsw-body">
                      {work.title}
                      {work.year ? ` (${work.year})` : ""}
                    </h3>
                    <p className="type-body type-body-plain mt-2 text-sm text-pntrsw-body">
                      {work.artists}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </PageShell>
    </article>
  );
}
