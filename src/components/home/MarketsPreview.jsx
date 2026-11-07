import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MARKETS } from "@/data/site";

export default function MarketsPreview() {
  return (
    <section className="bg-sand/60">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
              A structured, phased focus across the continent.
            </h2>
            <p className="mt-5 max-w-sm text-[15.5px] leading-[1.8] text-ink/70">
              We are assessing markets and building professional relationships progressively.
              The countries below represent target markets under assessment or planned, rather
              than confirmed operational coverage.
            </p>
            <Link
              to="/markets"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper"
            >
              Explore our markets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-8">
            {MARKETS.map((group) => (
              <div key={group.region} className="border-t border-forest/15 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[20px] text-forest">{group.region}</h3>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink/40">
                    {group.countries.length} market{group.countries.length > 1 ? "s" : ""}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.countries.map((country) => (
                    <li
                      key={country.name}
                      className="border border-forest/15 bg-white/70 px-3.5 py-2 text-[13px] text-forest/85"
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}