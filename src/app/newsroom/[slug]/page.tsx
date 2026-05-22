import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllPressReleaseSlugs,
  getPressReleaseBySlug,
} from "@/sanity/client";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import PressReleaseBody from "@/components/newsroom/PressReleaseBody";
import PressReleaseCard from "@/components/newsroom/PressReleaseCard";
import { urlForImage, imageDimensions } from "@/sanity/image";
import { formatReleaseDate } from "@/lib/utils";

export const revalidate = 3600;
export const dynamicParams = true; // serve releases published after the last build instead of 404ing

interface PressReleasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPressReleaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PressReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) return { title: "Press Release Not Found" };

  const title = release.seo?.metaTitle ?? release.headline;
  const description = release.seo?.metaDescription ?? release.deck;
  const ogUrl = urlForImage(release.seo?.ogImage ?? release.heroImage)
    ?.width(1200)
    .height(630)
    .fit("crop")
    .auto("format")
    .url();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: release.publishedAt,
      ...(ogUrl
        ? { images: [{ url: ogUrl, width: 1200, height: 630 }] }
        : {}),
    },
  };
}

export default async function PressReleasePage({
  params,
}: PressReleasePageProps) {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) notFound();

  const hero = release.heroImage;
  const heroDims = imageDimensions(hero.asset?._ref);
  const heroUrl = urlForImage(hero)?.width(1600).auto("format").url();
  const ogImageUrl = urlForImage(release.seo?.ogImage ?? hero)
    ?.width(1200)
    .height(630)
    .fit("crop")
    .url();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.headline,
    description: release.deck,
    datePublished: release.publishedAt,
    ...(release.author
      ? { author: { "@type": "Organization", name: release.author } }
      : {}),
    ...(ogImageUrl ? { image: [ogImageUrl] } : {}),
    publisher: { "@type": "Organization", name: "Institute Alterna" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-black pt-32 pb-10 text-white md:pt-40 md:pb-14">
        <Container>
          <Link
            href="/newsroom"
            className="mb-8 flex w-fit items-center gap-1.5 font-body text-sm font-medium text-grey-400 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All news
          </Link>
          <div className="mx-auto max-w-3xl">
            <Badge variant="accent">{release.eyebrow}</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {release.headline}
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-grey-400 md:text-xl">
              {release.deck}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-grey-500">
              <span className="uppercase tracking-widest">
                {release.location}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={release.publishedAt}>
                {formatReleaseDate(release.publishedAt)}
              </time>
              {release.author && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{release.author}</span>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Hero image */}
      {heroUrl && (
        <div className="bg-black pb-14 md:pb-20">
          <Container>
            <figure className="mx-auto max-w-4xl">
              <Image
                src={heroUrl}
                alt={hero.alt ?? release.headline}
                width={heroDims.width}
                height={heroDims.height}
                sizes="(max-width: 896px) 100vw, 896px"
                priority
                className="h-auto w-full rounded-xl"
              />
              {(hero.caption || hero.credit) && (
                <figcaption className="mt-3 font-body text-sm text-grey-500">
                  {hero.caption}
                  {hero.credit && (
                    <span className="text-grey-600">
                      {hero.caption ? " · " : ""}
                      {hero.credit}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          </Container>
        </div>
      )}

      {/* Body */}
      <Section>
        <article className="mx-auto max-w-3xl">
          <PressReleaseBody value={release.body} />

          {release.boilerplate.length > 0 && (
            <div className="mt-16 border-t border-grey-200 pt-10">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-grey-500">
                About Institute Alterna
              </h2>
              <PressReleaseBody
                value={release.boilerplate}
                tone="muted"
                className="mt-4"
              />
            </div>
          )}

          {release.mediaContacts.length > 0 && (
            <div className="mt-12 border-t border-grey-200 pt-10">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-grey-500">
                Media contacts
              </h2>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2">
                {release.mediaContacts.map((contact) => (
                  <li key={contact.email}>
                    <p className="font-heading text-base font-semibold text-black">
                      {contact.name}
                    </p>
                    {contact.title && (
                      <p className="font-body text-sm text-grey-600">
                        {contact.title}
                      </p>
                    )}
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 inline-block font-body text-sm font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent-hover"
                    >
                      {contact.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Section>

      {/* Related releases */}
      {release.relatedReleases && release.relatedReleases.length > 0 && (
        <Section variant="grey">
          <div className="flex items-center gap-4">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-grey-500">
              Related releases
            </h2>
            <div className="h-px flex-1 bg-grey-200" />
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {release.relatedReleases.map((related) => (
              <PressReleaseCard key={related._id} release={related} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
