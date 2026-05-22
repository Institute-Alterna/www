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
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps | "href"> {
  href?: undefined;
  external?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  fullReload?: boolean;
  showExternalIcon?: boolean;
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

function getButtonClasses({
  variant = "primary",
  size = "default",
  className,
}: Pick<ButtonBaseProps, "variant" | "size" | "className">) {
  return cn(
    "inline-flex items-center justify-center rounded-lg font-body",
    variantStyles[variant],
    variant !== "ghost" && sizeStyles[size],
    className
  );
}

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

export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      external,
      fullReload,
      showExternalIcon = true,
      children,
      onClick,
      variant,
      size,
      className,
    } = props;
    const classes = getButtonClasses({ variant, size, className });

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
          {showExternalIcon ? <ExternalIcon /> : null}
        </a>
      );
    }
    if (fullReload) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant, size, children, className, ...buttonProps } = props;
  const classes = getButtonClasses({ variant, size, className });

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
