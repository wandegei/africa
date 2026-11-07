import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function Wordmark({ tone = "dark", className, asLink = true }) {
  const isDark = tone === "light";
  const content = (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid h-10 w-10 place-items-center border font-display text-[15px] leading-none tracking-tight transition-colors",
          isDark
            ? "border-white/30 text-white group-hover:border-copper"
            : "border-forest/25 text-forest group-hover:border-copper group-hover:text-copper",
        )}
        aria-hidden="true"
      >
        AC
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[19px] tracking-[-0.01em]",
            isDark ? "text-white" : "text-forest",
          )}
        >
          Africa Compliance
        </span>
        <span
          className={cn(
            "mt-1.5 text-[9px] uppercase tracking-[0.24em]",
            isDark ? "text-white/55" : "text-ink/50",
          )}
        >
          Market Entry &amp; Compliance
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="Africa Compliance — home">
      {content}
    </Link>
  );
}