import type { Dictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { getScheduleEventHref } from "@/lib/schedule";
import Link from "next/link";

type ScheduleDay = Dictionary["schedule"]["days"][number];
type ScheduleEvent = ScheduleDay["events"][number];

type ScheduleDayCardProps = {
  day: ScheduleDay;
  locale: Locale;
};

const linkClassName = "transition-opacity hover:opacity-70";

function isExhibition(event: ScheduleEvent) {
  return event.kind === "exhibition" || event.label === "Exhibition";
}

function ScheduleEventLabel({ event, locale }: { event: ScheduleEvent; locale: Locale }) {
  if (!event.link) {
    return <>{event.label}</>;
  }

  return (
    <Link href={getScheduleEventHref(locale, event.link)} className={linkClassName}>
      {event.label}
    </Link>
  );
}

export function ScheduleDayCard({ day, locale }: ScheduleDayCardProps) {
  const exhibitionEvents = day.events.filter(isExhibition);
  const programmeEvents = day.events.filter((event) => !isExhibition(event));

  return (
    <section className="schedule-card text-pntrsw-body">
      <header className="mb-10">
        <h2 className="type-headline type-headline-highlight text-[clamp(2rem,5vw,3.25rem)] leading-[0.88]">
          {day.day}
        </h2>
        <p className="type-subheadline mt-3">{day.date}</p>
      </header>

      <div className="space-y-8">
        {exhibitionEvents.length > 0 ? (
          <div>
            <p className="type-subheadline label-caps mb-3 text-pntrsw-body/55">Exhibition</p>
            <div className="space-y-3">
              {exhibitionEvents.map((event) => {
                const content = (
                  <>
                    <span className="type-headline text-base leading-snug sm:text-lg">
                      <ScheduleEventLabel event={event} locale={locale} />
                    </span>
                    <span className="type-subheadline meta-line shrink-0 text-pntrsw-body/70">
                      {event.time}
                    </span>
                  </>
                );

                if (!event.link) {
                  return (
                    <div
                      key={`${day.day}-${event.time}-exhibition`}
                      className="schedule-exhibition-track"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    key={`${day.day}-${event.time}-exhibition`}
                    href={getScheduleEventHref(locale, event.link)}
                    className={`schedule-exhibition-track ${linkClassName}`}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {programmeEvents.length > 0 ? (
          <div>
            <p className="type-subheadline label-caps mb-5 text-pntrsw-body/55">Programme</p>
            <ul className="space-y-6">
              {programmeEvents.map((event) => (
                <li key={`${day.day}-${event.time}-${event.label}`}>
                  <p className="type-body type-body-plain text-[1.05rem] leading-snug">
                    <span className="type-subheadline schedule-time">{event.time}</span>
                    <ScheduleEventLabel event={event} locale={locale} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
