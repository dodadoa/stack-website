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

        <div className="grid gap-10 md:grid-cols-2">
          {schedule.days.map((day) => (
            <section
              key={day.day}
              className="border-2 border-pntrsw-lime bg-white p-6 md:p-8"
            >
              <header className="mb-8 border-b border-pntrsw-lime/50 pb-6">
                <h2 className="font-sporting text-2xl font-bold uppercase leading-[0.88] tracking-[-0.03em] text-pntrsw-navy md:text-3xl">
                  {day.day}
                </h2>
                <p className="meta-line mt-3 text-pntrsw-moss">{day.date}</p>
              </header>

              <ul className="space-y-7">
                {day.events.map((event) => (
                  <li
                    key={`${day.day}-${event.time}-${event.label}`}
                    className="grid gap-1.5"
                  >
                    <p className="meta-line text-pntrsw-royal">{event.time}</p>
                    <p className="text-sm leading-snug text-pntrsw-navy">
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
