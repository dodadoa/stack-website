import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getArtistName } from "@/lib/artists";
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

  const { artists } = getDictionary(localeParam);

  return {
    title: artists.title,
    description: artists.intro,
    alternates: buildAlternates(localeParam, "artists"),
    openGraph: { title: artists.title, description: artists.intro },
    twitter: { title: artists.title, description: artists.intro },
  };
}

export default async function ArtistsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const { artists } = dict;

  return (
    <article>
      <PageShell full>
        <PatchPageHeader
          title={artists.title}
          intro={artists.intro}
          label="Participants"
          statusNote={dict.status.updatesInProgress}
        />

        <div className="space-y-14">
          {artists.groups.map((group) => (
            <section key={group.label}>
              <h2 className="type-subheadline mb-6 inline-block rounded-full bg-pntrsw-white px-4 py-1.5 text-sm text-pntrsw-body">
                {group.label}
              </h2>
              <ul className="grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={localePath(locale, `artists/${slug}`)}
                      className="type-body type-body-plain block bg-pntrsw-stone px-4 py-4 text-[0.875rem] leading-snug text-pntrsw-body transition-colors hover:bg-pntrsw-lime"
                    >
                      {getArtistName(locale, slug)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageShell>
    </article>
  );
}
