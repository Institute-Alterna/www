import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const styles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
  h2: "text-3xl md:text-4xl font-semibold tracking-tight leading-snug",
  h3: "text-xl md:text-2xl font-semibold leading-snug",
  h4: "text-lg md:text-xl font-semibold leading-snug",
};

export default function Heading({
  level = "h2",
  children,
  className,
  id,
}: HeadingProps) {
  const Tag = level;
  return (
    <Tag id={id} className={cn("font-heading", styles[level], className)}>
      {children}
    </Tag>
  );
}
