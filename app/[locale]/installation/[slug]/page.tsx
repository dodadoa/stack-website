import { PageShell } from "@/components/PageShell";
import { getDictionary } from "@/lib/dictionaries";
import { getAllInstallationParams, getInstallationWork } from "@/lib/installation";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllInstallationParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const work = getInstallationWork(localeParam, slug);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description: work.description?.slice(0, 160),
  };
}

export default async function InstallationWorkPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const work = getInstallationWork(locale, slug);

  if (!work) {
    notFound();
  }

  const { installation } = getDictionary(locale);

  return (
    <article>
      <PageShell>
        <Link
          href={localePath(locale, "installation")}
          className="type-subheadline label-caps mb-10 inline-block text-pntrsw-body/60 transition-opacity hover:opacity-70"
        >
          ← {installation.title}
        </Link>

        <header className="mb-10 max-w-3xl border-b border-pntrsw-deep/20 pb-10">
          <h1 className="type-headline text-[clamp(2rem,5vw,3.5rem)] leading-[0.88] text-pntrsw-body">
            {work.title}
            {work.year ? ` (${work.year})` : ""}
          </h1>
          <p className="type-body mt-4 text-base text-pntrsw-body/70">{work.artists}</p>
          {work.medium ? (
            <p className="type-subheadline label-caps mt-5 text-pntrsw-body/60">{work.medium}</p>
          ) : null}
        </header>

        {work.description ? (
          <div className="type-body prose max-w-3xl text-base leading-[1.65] text-pntrsw-body/85">
            <p>{work.description}</p>
          </div>
        ) : null}

        {work.bio ? (
          <div className="mt-12 max-w-3xl border-t border-pntrsw-deep/20 pt-10">
            <h2 className="type-subheadline label-caps mb-5 text-pntrsw-body/70">
              {work.bio.title}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-pntrsw-body/80">
              <p>{work.bio.text}</p>
              <p>{work.bio.text2}</p>
              <p className="text-pntrsw-body/60">{work.bio.links}</p>
            </div>
          </div>
        ) : null}
      </PageShell>
    </article>
  );
}
