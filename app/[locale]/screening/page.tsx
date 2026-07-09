import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { ScreeningHashSync } from "@/components/ScreeningHashSync";
import { ScreeningProgramList } from "@/components/ScreeningProgramList";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
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

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const { screening } = dict;

  return (
    <article>
      <PageShell full>
        <ScreeningHashSync />
        <PatchPageHeader title={screening.title} intro={screening.intro} label="Program" />
        <ScreeningProgramList programs={screening.programs} locale={locale} />
      </PageShell>
    </article>
  );
}
