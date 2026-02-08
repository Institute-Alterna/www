"use client";

interface TallyEmbedProps {
  formId: string;
  title?: string;
  className?: string;
}

export default function TallyEmbed({
  formId,
  title = "Application Form",
  className,
}: TallyEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1`}
        width="100%"
        height="500"
        title={title}
        className="rounded-lg border-0"
        loading="lazy"
      />
    </div>
  );
}
