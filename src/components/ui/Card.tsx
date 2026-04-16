import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

export function Card({ children, className, hover = false, dark = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8 border transition-all duration-300",
        dark
          ? "bg-[#1B3A5C] border-white/10 text-white"
          : "bg-white border-[#E8F4FD] text-[#0D1B2A]",
        hover && "hover:shadow-[0_8px_40px_0_rgba(13,27,42,0.18)] hover:-translate-y-1 cursor-pointer",
        !hover && "shadow-[0_4px_24px_0_rgba(13,27,42,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
