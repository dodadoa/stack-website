import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SchedulePage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = getDictionary(localeParam);
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
            <section key={day.day} className="schedule-card text-pntrsw-body">
              <header className="mb-10">
                <h2 className="type-headline type-headline-highlight text-[clamp(2rem,5vw,3.25rem)] leading-[0.88]">
                  {day.day}
                </h2>
                <p className="type-subheadline mt-3">{day.date}</p>
              </header>

              <ul className="space-y-6">
                {day.events.map((event) => (
                  <li key={`${day.day}-${event.time}-${event.label}`}>
                    <p className="type-body type-body-plain text-[1.05rem] leading-snug">
                      <span className="type-subheadline schedule-time">{event.time}</span>
                      {event.label}
                    </p>
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
