import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import type { PressReleaseCard as PressReleaseCardData } from "@/lib/types";
import { urlForImage } from "@/sanity/image";
import { formatReleaseDate } from "@/lib/utils";

interface PressReleaseCardProps {
  release: PressReleaseCardData;
}

export default function PressReleaseCard({ release }: PressReleaseCardProps) {
  const imageUrl = urlForImage(release.heroImage)
    ?.width(800)
    .height(500)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <Link
      href={`/newsroom/${release.slug}`}
      className="group flex flex-col rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-grey-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={release.heroImage.alt ?? release.headline}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-5 flex flex-1 flex-col">
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
        <h3 className="mt-3 font-heading text-xl font-semibold leading-snug tracking-tight text-black transition-colors group-hover:text-accent">
          {release.headline}
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-grey-600">
          {release.deck}
        </p>
      </div>
    </Link>
  );
}
