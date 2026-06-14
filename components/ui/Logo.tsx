import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 shadow-glow">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 2.5 4 7v10l8 4.5 8-4.5V7l-8-4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="opacity-40"
          />
          <path
            d="M12 7.5 8 9.75v4.5L12 16.5l4-2.25v-4.5L12 7.5Z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute inset-0 animate-pulse-ring rounded-xl bg-white/20" />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
