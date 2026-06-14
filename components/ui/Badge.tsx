import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export function Badge({ children, className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-brand-50/70 px-3.5 py-1.5 text-xs font-medium tracking-tight text-brand-700 backdrop-blur dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
