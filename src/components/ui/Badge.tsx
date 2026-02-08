import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-widest font-body",
        variant === "accent" ? "text-accent" : "text-grey-500",
        className
      )}
    >
      {children}
    </span>
  );
}
