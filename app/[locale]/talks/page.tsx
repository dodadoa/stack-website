import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function TalksPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const { talks } = dict;

  return (
    <article>
      <PageShell full>
        <PatchPageHeader title={talks.title} intro={talks.intro} label="Programme" />

        <ul>
          {talks.items.map((talk) => (
            <li key={talk.slug} className="list-row py-8 first:pt-0">
              <Link
                href={localePath(locale, `talks/${talk.slug}`)}
                className="group block transition-opacity hover:opacity-70"
              >
                <p className="type-subheadline label-caps mb-2 text-pntrsw-body/60">{talk.kind}</p>
                <h2 className="type-headline text-xl leading-snug text-pntrsw-body">{talk.title}</h2>
                <p className="type-subheadline meta-line mt-3 text-pntrsw-body/70">
                  {talk.date} · {talk.time}
                </p>
                <p className="type-body type-body-plain mt-1 text-sm text-pntrsw-body/60">
                  {talk.venue}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </PageShell>
    </article>
  );
}
