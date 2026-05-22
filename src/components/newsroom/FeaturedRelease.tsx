import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import type { PressReleaseCard } from "@/lib/types";
import { urlForImage } from "@/sanity/image";
import { formatReleaseDate } from "@/lib/utils";

interface FeaturedReleaseProps {
  release: PressReleaseCard;
}

export default function FeaturedRelease({ release }: FeaturedReleaseProps) {
  const imageUrl = urlForImage(release.heroImage)
    ?.width(1400)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <Link
      href={`/newsroom/${release.slug}`}
      className="group grid gap-8 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 lg:grid-cols-5 lg:gap-12"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-grey-100 lg:col-span-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={release.heroImage.alt ?? release.headline}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-center lg:col-span-2">
        <div className="flex items-center gap-3">
          <Badge variant="accent">{release.eyebrow}</Badge>
          <span className="text-grey-300" aria-hidden="true">
            ·
          </span>
          <time
            dateTime={release.publishedAt}
            className="font-body text-xs uppercase tracking-widest text-grey-500"
          >
            {formatReleaseDate(release.publishedAt)}
          </time>
        </div>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight text-black transition-colors group-hover:text-accent md:text-4xl">
          {release.headline}
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-grey-600 md:text-lg">
          {release.deck}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-accent">
          Read the release
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
