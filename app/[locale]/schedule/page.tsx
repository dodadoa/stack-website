import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { ScheduleDayCard } from "@/components/ScheduleDayCard";
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

  const { schedule } = getDictionary(localeParam);

  return {
    title: schedule.title,
    description: schedule.intro,
    alternates: buildAlternates(localeParam, "schedule"),
    openGraph: { title: schedule.title, description: schedule.intro },
    twitter: { title: schedule.title, description: schedule.intro },
  };
}

export default async function SchedulePage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const { schedule } = dict;

  return (
    <article>
      <PageShell>
        <PatchPageHeader
          title={schedule.title}
          intro={schedule.intro}
          label="Timetable"
        />

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {schedule.days.map((day) => (
            <ScheduleDayCard key={day.day} day={day} locale={locale} />
          ))}
        </div>
      </PageShell>
    </article>
  );
}
