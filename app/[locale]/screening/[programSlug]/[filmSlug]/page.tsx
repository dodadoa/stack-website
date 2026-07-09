import { PageShell } from "@/components/PageShell";
import { ArtistCredits } from "@/components/ArtistCredits";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { getAllScreeningFilmParams, getScreeningFilm, getScreeningProgram } from "@/lib/screening";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; programSlug: string; filmSlug: string }>;
};

export async function generateStaticParams() {
  return getAllScreeningFilmParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, programSlug, filmSlug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const film = getScreeningFilm(localeParam, programSlug, filmSlug);

  if (!film) {
    return {};
  }

  const description = film.description.slice(0, 160);
  const segment = `screening/${programSlug}/${filmSlug}`;
  const ogImage = film.image ?? film.images?.[0];

  return {
    title: film.title,
    description,
    alternates: buildAlternates(localeParam, segment),
    openGraph: { title: film.title, description, images: ogImage ? [ogImage] : undefined },
    twitter: { title: film.title, description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function ScreeningFilmPage({ params }: PageProps) {
  const { locale: localeParam, programSlug, filmSlug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const film = getScreeningFilm(locale, programSlug, filmSlug);
  const program = getScreeningProgram(locale, programSlug);

  if (!film || !program) {
    notFound();
  }

  const { screening } = getDictionary(locale);
  const gallery = film.images ?? (film.image ? [film.image] : []);
  const heroImage = gallery[0];
  const extraImages = gallery.slice(1);

  return (
    <article>
      <PageShell full>
        <Link
          href={localePath(locale, "screening")}
          className="type-subheadline label-caps mb-10 inline-block text-pntrsw-body/60 transition-opacity hover:opacity-70"
        >
          ← {screening.title}
        </Link>

        {heroImage ? (
          <div className="relative mb-10 aspect-[16/10] w-full max-w-4xl overflow-hidden bg-pntrsw-black/5">
            <Image
              src={heroImage}
              alt={film.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        ) : null}

        <header className="detail-text-width mb-10 border-b border-pntrsw-deep/20 pb-10">
          <p className="type-subheadline label-caps text-pntrsw-body/60">{program.code}</p>
          <h1 className="type-headline mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[0.88] text-pntrsw-body">
            {film.title}
          </h1>
          <p className="type-subheadline meta-line mt-4 text-pntrsw-body/70">{film.meta}</p>
          <ArtistCredits
            artists={film.artists}
            artistSlug={film.artistSlug}
            locale={locale}
            showTba={false}
            className="type-body mt-4 text-base text-pntrsw-body/70"
          />
          <p className="type-body type-body-plain mt-3 text-sm text-pntrsw-body/55">
            {program.title} · {program.date}
          </p>
        </header>

        <div className="type-body detail-text-width space-y-5 text-base leading-[1.7] text-pntrsw-body/90">
          <p>{film.description}</p>
          {film.note ? (
            <p className="type-subheadline text-xs leading-relaxed text-pntrsw-body/55">
              {film.note}
            </p>
          ) : null}
        </div>

        {extraImages.length > 0 ? (
          <div className="mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {extraImages.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden bg-pntrsw-black/5"
              >
                <Image
                  src={src}
                  alt={film.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 448px"
                />
              </div>
            ))}
          </div>
        ) : null}
      </PageShell>
    </article>
  );
}
