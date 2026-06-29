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
                    <h2 className="font-sporting text-3xl font-bold uppercase leading-[0.85] tracking-[-0.035em] text-pntrsw-navy md:text-4xl">
                      {work.title}
                      {"year" in work && work.year ? ` (${work.year})` : ""}
                    </h2>
                    <p className="mt-3 text-sm text-pntrsw-olive">{work.artists}</p>
                    {"medium" in work && work.medium ? (
                      <p className="label-caps mt-4 text-pntrsw-moss">{work.medium}</p>
                    ) : null}
                  </header>

                  <div className="prose max-w-3xl text-base leading-[1.65] text-pntrsw-navy/85">
                    <p>{work.description}</p>
                  </div>

                  {"bio" in work && work.bio ? (
                    <div className="mt-12 max-w-3xl border-t-2 border-pntrsw-lime pt-10">
                      <h3 className="label-caps mb-5 text-pntrsw-royal">
                        {work.bio.title}
                      </h3>
                      <div className="space-y-4 text-sm leading-relaxed text-pntrsw-olive">
                        <p>{work.bio.text}</p>
                        <p>{work.bio.text2}</p>
                        <p className="text-pntrsw-moss">{work.bio.links}</p>
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
              className={`border-t-2 border-pntrsw-lime ${index % 2 === 0 ? "" : "gradient-soft"}`}
            >
              <header className="mb-2">
                <h2 className="font-sporting text-xl font-bold uppercase tracking-[-0.025em] text-pntrsw-navy">
                  {work.title}
                  {"year" in work && work.year ? ` (${work.year})` : ""}
                </h2>
                <p className="mt-2 text-sm text-pntrsw-olive">{work.artists}</p>
              </header>
            </PageShell>
          );
        })}
      </div>
    </article>
  );
}
