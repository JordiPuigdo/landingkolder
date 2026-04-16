import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "eco" | "certified" | "default" | "ice";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  eco: "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30",
  certified: "bg-[#1E6FB0]/10 text-[#1E6FB0] border border-[#1E6FB0]/30",
  ice: "bg-[#00C2D4]/10 text-[#00C2D4] border border-[#00C2D4]/30",
  default: "bg-[#E8F4FD] text-[#1B3A5C] border border-[#1B3A5C]/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
