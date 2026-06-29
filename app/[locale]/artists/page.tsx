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
      <PageShell>
        <PatchPageHeader title={artists.title} intro={artists.intro} label="Participants" />

        <div className="space-y-14">
          {artists.groups.map((group) => (
            <section key={group.label}>
              <h2 className="label-caps mb-6 text-pntrsw-moss">{group.label}</h2>
              <ul className="grid gap-px bg-pntrsw-lime sm:grid-cols-2 lg:grid-cols-3">
                {group.names.map((name) => (
                  <li
                    key={name}
                    className="bg-white px-4 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.02em] leading-snug text-pntrsw-navy transition-colors hover:bg-pntrsw-lime/15"
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
