import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
  className?: string;
}

const variantStyles = {
  default: "bg-white",
  outlined: "border border-grey-200 bg-white",
  elevated: "bg-white shadow-sm",
};

export default function Card({
  children,
  variant = "default",
  className,
}: CardProps) {
  return (
    <div className={cn("rounded-lg p-6", variantStyles[variant], className)}>
      {children}
    </div>
  );
}
