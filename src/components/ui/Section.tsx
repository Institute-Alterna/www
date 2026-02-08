import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "grey";
  className?: string;
  fullWidth?: boolean;
  id?: string;
}

const variantStyles = {
  light: "bg-white text-black",
  dark: "bg-black text-white",
  grey: "bg-grey-100 text-black",
};

export default function Section({
  children,
  variant = "light",
  className,
  fullWidth = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20",
        variantStyles[variant],
        className
      )}
    >
      {fullWidth ? children : <Container>{children}</Container>}
    </section>
  );
}
