import { PatchPageHeader } from "@/components/PatchPageHeader";
import { PageShell } from "@/components/PageShell";
import { GradientField } from "@/components/GradientField";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function InstallationPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = getDictionary(localeParam);
  const { installation } = dict;

  return (
    <article>
      <PageShell className="pb-8 md:pb-8">
        <PatchPageHeader title={installation.title} label="Works" />
      </PageShell>

      <div>
        {installation.works.map((work, index) => {
          const isFeatured = "description" in work && work.description;

          if (isFeatured) {
            return (
              <GradientField key={work.title} variant="soft" className="px-6 py-14 md:py-20">
                <PageShell className="py-0 md:py-0">
                  <header className="mb-8 max-w-3xl">
                    <h2 className="type-headline text-3xl leading-[0.85] text-pntrsw-body md:text-4xl">
                      {work.title}
                      {"year" in work && work.year ? ` (${work.year})` : ""}
                    </h2>
                    <p className="type-body mt-3 text-sm text-pntrsw-body/70">{work.artists}</p>
                    {"medium" in work && work.medium ? (
                      <p className="type-subheadline label-caps mt-4 text-pntrsw-body/60">{work.medium}</p>
                    ) : null}
                  </header>

                  <div className="type-body prose max-w-3xl text-base leading-[1.65] text-pntrsw-body/85">
                    <p>{work.description}</p>
                  </div>

                  {"bio" in work && work.bio ? (
                    <div className="mt-12 max-w-3xl border-t border-pntrsw-deep/20 pt-10">
                      <h3 className="type-subheadline label-caps mb-5 text-pntrsw-body/70">
                        {work.bio.title}
                      </h3>
                      <div className="space-y-4 text-sm leading-relaxed text-pntrsw-body/80">
                        <p>{work.bio.text}</p>
                        <p>{work.bio.text2}</p>
                        <p className="text-pntrsw-body/60">{work.bio.links}</p>
                      </div>
                    </div>
                  ) : null}
                </PageShell>
              </GradientField>
            );
          }

          return (
            <PageShell
              key={work.title}
              className={`border-t border-pntrsw-deep/20 ${index % 2 === 0 ? "" : "bg-pntrsw-white/50"}`}
            >
              <header className="mb-2">
                <h2 className="type-headline text-xl text-pntrsw-body">
                  {work.title}
                  {"year" in work && work.year ? ` (${work.year})` : ""}
                </h2>
                <p className="type-body mt-2 text-sm text-pntrsw-body/70">{work.artists}</p>
              </header>
            </PageShell>
          );
        })}
      </div>
    </article>
  );
}
