import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-base leading-relaxed text-grey-600">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl font-semibold">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 font-body text-base leading-relaxed text-grey-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 font-body text-base leading-relaxed text-grey-600">
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
  },
};

interface PortableTextProps {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
}

export default function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
