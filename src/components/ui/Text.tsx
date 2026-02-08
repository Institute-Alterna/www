import { cn } from "@/lib/utils";

interface TextProps {
  variant?: "body" | "large" | "small" | "muted";
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}

const variantStyles = {
  body: "text-base leading-relaxed",
  large: "text-lg leading-relaxed",
  small: "text-sm leading-normal",
  muted: "text-base leading-relaxed text-grey-600",
};

export default function Text({
  variant = "body",
  children,
  className,
  as: Tag = "p",
}: TextProps) {
  return (
    <Tag className={cn("font-body", variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
