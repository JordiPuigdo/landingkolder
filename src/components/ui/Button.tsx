import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ice";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | AnchorProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1E6FB0] text-white hover:bg-[#1B3A5C] active:scale-[0.98] shadow-md hover:shadow-lg",
  secondary:
    "bg-transparent text-[#1E6FB0] border-2 border-[#1E6FB0] hover:bg-[#E8F4FD] active:scale-[0.98]",
  ghost:
    "bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10 active:scale-[0.98]",
  ice: "bg-[#00C2D4] text-[#0D1B2A] hover:bg-[#00A8B8] active:scale-[0.98] shadow-md hover:shadow-lg font-semibold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C2D4] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

export function Button(props: Props) {
  const { variant = "primary", size = "md", children, className, ...rest } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
