import { cn } from "@/lib/utils";

interface RedactedTextProps {
  label: string;
  text: string;
  tone?: "light" | "dark";
  className?: string;
}

export default function RedactedText({
  label,
  text,
  tone = "light",
  className,
}: RedactedTextProps) {
  return (
    <span
      className={cn(
        "inline-block h-[0.85em] select-none align-middle",
        tone === "dark" ? "bg-black" : "bg-white",
        className,
      )}
      style={{ width: `${text.length}ch` }}
      aria-label={label}
    />
  );
}
