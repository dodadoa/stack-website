import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ScreeningPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = getDictionary(localeParam);
  const { screening } = dict;

  return (
    <article>
      <PageShell>
        <PatchPageHeader
          title={screening.title}
          intro={screening.intro}
          label="Program"
        />

        <ul>
          {screening.films.map((film) => (
            <li key={film.title} className="list-row py-8 first:pt-0">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
                <div>
                  <h2 className="font-sporting text-xl font-bold uppercase leading-snug tracking-[-0.025em] text-pntrsw-navy">
                    {film.title}
                  </h2>
                  <p className="mt-2 text-sm text-pntrsw-olive">{film.artists}</p>
                </div>
                <p className="meta-line text-pntrsw-moss md:pt-1 md:text-right">
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
