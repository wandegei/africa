import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function PageHero({ title, intro, meta, className }) {
  return (
    <section className={cn("relative overflow-hidden bg-forest text-white", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />
      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <h1 className="max-w-3xl font-display text-[34px] leading-[1.08] tracking-[-0.025em] sm:text-[46px] lg:text-[54px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.8] text-white/65">{intro}</p>
        )}
        {meta && <div className="mt-8">{meta}</div>}
      </div>
      <div className="h-px w-full bg-copper/40" />
    </section>
  );
}

export function HeroAction({ to, children, variant = "solid" }) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-colors",
        variant === "solid"
          ? "bg-copper text-white hover:bg-white hover:text-forest"
          : "border border-white/25 text-white/85 hover:border-copper hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}