import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined;
  external?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] transition-all duration-150",
  secondary:
    "border border-accent text-accent hover:bg-accent hover:text-white active:scale-[0.98] transition-all duration-150",
  ghost:
    "text-current hover:text-accent transition-colors duration-150",
};

const sizeStyles = {
  default: "px-5 py-2.5 text-sm font-medium",
  lg: "px-7 py-3 text-base font-medium",
};

function ExternalIcon() {
  return (
    <svg
      className="ml-1.5 h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M17 7H7M17 7V17"
      />
    </svg>
  );
}

const buttonBaseKeys = new Set([
  "variant",
  "size",
  "children",
  "className",
  "href",
  "external",
]);

function getButtonProps(
  props: ButtonAsButton
): React.ButtonHTMLAttributes<HTMLButtonElement> {
  const result: Record<string, unknown> = {};
  for (const key in props) {
    if (!buttonBaseKeys.has(key)) {
      result[key] = (props as unknown as Record<string, unknown>)[key];
    }
  }
  return result;
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "default",
    children,
    className,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-body",
    variantStyles[variant],
    variant !== "ghost" && sizeStyles[size],
    className
  );

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
        >
          {children}
          <ExternalIcon />
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...getButtonProps(props)}>
      {children}
    </button>
  );
}
