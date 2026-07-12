import type { Dictionary } from "@/lib/dictionaries";
import { ArtistName } from "@/components/ArtistName";
import { getArtist } from "@/lib/artists";
import { localePath, type Locale } from "@/lib/i18n";
import Link from "next/link";

type Talk = Dictionary["talks"]["items"][number];

type TalkThaiContentProps = {
  talk: Talk;
  meta: NonNullable<Dictionary["talks"]["metaTh"]>;
  locale: Locale;
};

export function TalkThaiContent({ talk, meta, locale }: TalkThaiContentProps) {
  if (!talk.descriptionTh) {
    return null;
  }

  return (
    <div className="detail-text-width mt-12 border-t border-pntrsw-deep/20 pt-10">
      <dl className="type-subheadline thai-text mb-8 space-y-2 text-sm">
        {talk.dateTh ? (
          <div>
            <dt className="text-pntrsw-body/50">{meta.date}</dt>
            <dd className="meta-line text-pntrsw-body">{talk.dateTh}</dd>
          </div>
        ) : null}
        {talk.timeTh ? (
          <div>
            <dt className="text-pntrsw-body/50">{meta.time}</dt>
            <dd className="meta-line text-pntrsw-body">{talk.timeTh}</dd>
          </div>
        ) : null}
        {talk.venueTh ? (
          <div>
            <dt className="text-pntrsw-body/50">{meta.venue}</dt>
            <dd className="type-body type-body-plain text-pntrsw-body/80">{talk.venueTh}</dd>
          </div>
        ) : null}
      </dl>

      <div className="type-body thai-text text-base leading-[1.75] text-pntrsw-body/85">
        <p>{talk.descriptionTh}</p>
      </div>

      {talk.participantsLabelTh ? (
        <section className="mt-10">
          <h2 className="type-subheadline thai-text mb-6 text-pntrsw-body/70">
            {talk.participantsLabelTh}
          </h2>
          <ul className="space-y-6">
            {talk.participants.map((participant) => {
              const artist = getArtist(locale, participant.slug);
              const name = participant.nameTh ?? participant.name;
              const bio = participant.bioTh ?? participant.bio;

              return (
                <li key={participant.slug}>
                  {artist ? (
                    <Link
                      href={localePath(locale, `artists/${participant.slug}`)}
                      className="type-headline thai-text text-lg text-pntrsw-body transition-opacity hover:opacity-70"
                    >
                      <ArtistName name={name} />
                    </Link>
                  ) : (
                    <p className="type-headline thai-text text-lg text-pntrsw-body">
                      <ArtistName name={name} />
                    </p>
                  )}
                  <p className="type-body thai-text mt-2 text-sm leading-relaxed text-pntrsw-body/75">
                    {bio}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {talk.noteTh ? (
        <p className="type-body thai-text mt-10 text-sm leading-relaxed text-pntrsw-body/60">
          {talk.noteTh}
        </p>
      ) : null}
    </div>
  );
}
