import { cn } from "@/lib/utils";

export default function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "font-display text-[30px] leading-[1.12] tracking-[-0.02em] sm:text-[38px] lg:text-[42px]",
          light ? "text-white" : "text-forest",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-[16px] leading-[1.75]",
            light ? "text-white/65" : "text-ink/70",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}