import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock, SanityImage } from "@/lib/types";
import { urlForImage, imageDimensions } from "@/sanity/image";
import { cn } from "@/lib/utils";

interface LinkMark {
  linkType?: "external" | "internal";
  href?: string;
  openInNewTab?: boolean;
  internalRef?: { _type?: string; slug?: string };
}

interface PullQuoteValue {
  quote?: string;
  attribution?: string;
}

interface DividerValue {
  style?: "line" | "space" | "asterism";
}

function Figure({ value }: { value: SanityImage }) {
  const ref = value.asset?._ref;
  const builder = ref ? urlForImage(value) : null;
  if (!builder) return null;

  const { width, height } = imageDimensions(ref);

  return (
    <figure className="my-10">
      <Image
        src={builder.width(1600).auto("format").url()}
        alt={value.alt ?? ""}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full rounded-lg"
      />
      {(value.caption || value.credit) && (
        <figcaption className="mt-3 font-body text-sm text-grey-500">
          {value.caption}
          {value.credit && (
            <span className="text-grey-400">
              {value.caption ? " · " : ""}
              {value.credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function buildComponents(tone: "default" | "muted"): PortableTextComponents {
  const proseText =
    tone === "muted"
      ? "font-body text-sm leading-relaxed text-grey-500"
      : "font-body text-lg leading-relaxed text-grey-700";

  return {
    block: {
      normal: ({ children }) => <p className={proseText}>{children}</p>,
      h2: ({ children }) => (
        <h2 className="pt-4 font-heading text-2xl font-semibold tracking-tight text-black md:text-3xl">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="pt-2 font-heading text-xl font-semibold tracking-tight text-black">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-grey-300 pl-6 font-body text-lg italic leading-relaxed text-grey-600">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={cn("list-disc space-y-2 pl-6", proseText)}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={cn("list-decimal space-y-2 pl-6", proseText)}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-black">{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => {
        const mark = (value ?? {}) as LinkMark;
        const className =
          "font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent-hover";

        if (mark.linkType === "internal" && mark.internalRef) {
          const { _type, slug } = mark.internalRef;
          const href =
            _type === "pressRelease" && slug ? `/newsroom/${slug}` : "#";
          return (
            <Link href={href} className={className}>
              {children}
            </Link>
          );
        }

        return (
          <a
            href={mark.href ?? "#"}
            className={className}
            {...(mark.openInNewTab
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      inlineImage: ({ value }) => <Figure value={value as SanityImage} />,
      pullQuote: ({ value }) => {
        const quote = value as PullQuoteValue;
        if (!quote.quote) return null;
        return (
          <figure className="my-12 border-l-2 border-accent pl-6">
            <blockquote className="font-heading text-2xl font-medium leading-snug tracking-tight text-black md:text-3xl">
              {quote.quote}
            </blockquote>
            {quote.attribution && (
              <figcaption className="mt-4 font-body text-sm text-grey-500">
                — {quote.attribution}
              </figcaption>
            )}
          </figure>
        );
      },
      divider: ({ value }) => {
        const style = (value as DividerValue).style ?? "line";
        if (style === "space") {
          return <div className="h-10" aria-hidden="true" />;
        }
        if (style === "asterism") {
          return (
            <div
              className="my-10 text-center text-2xl tracking-widest text-grey-400"
              aria-hidden="true"
            >
              ⁂
            </div>
          );
        }
        return <hr className="my-10 border-grey-200" />;
      },
    },
  };
}

const defaultComponents = buildComponents("default");
const mutedComponents = buildComponents("muted");

interface PressReleaseBodyProps {
  value: PortableTextBlock[] | null | undefined;
  tone?: "default" | "muted";
  className?: string;
}

export default function PressReleaseBody({
  value,
  tone = "default",
  className,
}: PressReleaseBodyProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <PortableTextReact
        value={value}
        components={tone === "muted" ? mutedComponents : defaultComponents}
      />
    </div>
  );
}
