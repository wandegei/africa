import { Check } from "lucide-react";

export default function TeamProfile({ member }) {
  const initials = member.name
    .replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <article className="flex flex-col border border-forest/12 bg-white">
      <div className="relative grid aspect-[5/4] place-items-center bg-forest">
        <span
          className="font-display text-[42px] tracking-[0.14em] text-copper"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="absolute inset-x-0 bottom-0 h-px bg-copper/40" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h2 className="font-display text-[21px] leading-snug text-forest">{member.name}</h2>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
          {member.role}
        </p>
        {member.credential && (
          <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{member.credential}</p>
        )}

        <p className="mt-4 flex-1 text-[14.5px] leading-[1.75] text-ink/70">{member.focus}</p>

        <ul className="mt-5 space-y-2.5 border-t border-forest/10 pt-5">
          {member.responsibilities.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-ink/65">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-copper" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}