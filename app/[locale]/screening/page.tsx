import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const { screening } = getDictionary(localeParam);

  return {
    title: screening.title,
    description: screening.intro,
    alternates: buildAlternates(localeParam, "screening"),
    openGraph: { title: screening.title, description: screening.intro },
    twitter: { title: screening.title, description: screening.intro },
  };
}

export default async function ScreeningPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = getDictionary(localeParam);
  const { screening } = dict;

  return (
    <article>
      <PageShell full>
        <PatchPageHeader
          title={screening.title}
          intro={screening.intro}
          label="Program"
          statusNote={dict.status.updatesInProgress}
        />

        <ul>
          {screening.films.map((film) => (
            <li key={film.title} className="list-row py-8 first:pt-0">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
                <div>
                  <h2 className="type-headline text-xl leading-snug text-pntrsw-body">
                    {film.title}
                  </h2>
                  <p className="type-body type-body-plain mt-2 text-sm text-pntrsw-body/70">
                    {film.artists}
                  </p>
                </div>
                <p className="type-subheadline meta-line text-pntrsw-body/60 md:pt-1 md:text-right">
                  {film.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </PageShell>
    </article>
  );
}
