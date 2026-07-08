import type { Dictionary } from "@/lib/dictionaries";

type ScheduleDay = Dictionary["schedule"]["days"][number];
type ScheduleEvent = ScheduleDay["events"][number];

type ScheduleDayCardProps = {
  day: ScheduleDay;
};

function isExhibition(event: ScheduleEvent) {
  return event.kind === "exhibition" || event.label === "Exhibition";
}

export function ScheduleDayCard({ day }: ScheduleDayCardProps) {
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
              {exhibitionEvents.map((event) => (
                <div
                  key={`${day.day}-${event.time}-exhibition`}
                  className="schedule-exhibition-track"
                >
                  <span className="type-headline text-base leading-snug sm:text-lg">{event.label}</span>
                  <span className="type-subheadline meta-line shrink-0 text-pntrsw-body/70">
                    {event.time}
                  </span>
                </div>
              ))}
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
                    {event.label}
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
