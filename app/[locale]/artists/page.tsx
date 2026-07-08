import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ArtistsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = getDictionary(localeParam);
  const { artists } = dict;

  return (
    <article>
      <PageShell full>
        <PatchPageHeader
          title={artists.title}
          intro={artists.intro}
          label="Participants"
          statusNote={dict.status.updatesInProgress}
        />

        <div className="space-y-14">
          {artists.groups.map((group) => (
            <section key={group.label}>
              <h2 className="type-subheadline mb-6 inline-block rounded-full bg-pntrsw-white px-4 py-1.5 text-sm text-pntrsw-body">
                {group.label}
              </h2>
              <ul className="grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {group.names.map((name) => (
                  <li
                    key={name}
                    className="type-body type-body-plain bg-pntrsw-stone px-4 py-4 text-[0.875rem] leading-snug text-pntrsw-body transition-colors hover:bg-pntrsw-lime"
                  >
                    {name}
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
