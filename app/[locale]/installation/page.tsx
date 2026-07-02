import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function InstallationPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const { installation } = dict;
  const visibleWorks = installation.works.filter((work) => work.slug === "hello-world-home");

  return (
    <article>
      <PageShell full>
        <PatchPageHeader
          title={installation.title}
          label="Works"
          statusNote={dict.status.updatesInProgress}
        />

        <ul>
          {visibleWorks.map((work) => (
            <li key={work.slug} className="list-row py-8 first:pt-0">
              <Link
                href={localePath(locale, `installation/${work.slug}`)}
                className="group block transition-opacity hover:opacity-70"
              >
                <h2 className="type-headline text-xl leading-snug text-pntrsw-body">
                  {work.title}
                  {work.year ? ` (${work.year})` : ""}
                </h2>
                <p className="type-body type-body-plain mt-2 text-sm text-pntrsw-body/70">
                  {work.artists}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </PageShell>
    </article>
  );
}
