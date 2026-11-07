import { MARKETS } from "@/data/site";

const PHASES = [
  {
    phase: "Phase 01",
    label: "Assessment",
    body: "Building a structured understanding of establishment and compliance requirements in each target market.",
  },
  {
    phase: "Phase 02",
    label: "Professional network",
    body: "Identifying appropriately qualified local professionals for the input each market requires.",
  },
  {
    phase: "Phase 03",
    label: "Client engagement",
    body: "Coordinating mandates for clients with active requirements in an assessed market.",
  },
];

export default function CoverageComposition() {
  return (
    <section className="bg-white">
      <div className="shell py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[36px]">
              Organised by region, assessed market by market.
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-[1.8] text-ink/70">
              African markets differ materially in their establishment requirements, regulatory
              environments and professional landscape. Our regional structure reflects that: each
              market is assessed on its own terms rather than treated as a variation of another.
            </p>

            <div className="mt-9 space-y-5">
              {PHASES.map((item) => (
                <div key={item.phase} className="flex gap-5 border-t border-forest/12 pt-4">
                  <span className="w-20 shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-copper">
                    {item.phase}
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] text-forest">{item.label}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.7] text-ink/60">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative border border-forest/12 bg-cream p-7 lg:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(23,63,53,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,63,53,0.08) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="relative space-y-10">
              {MARKETS.map((group, groupIndex) => (
                <div key={group.region}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[11px] tracking-[0.2em] text-copper">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-forest/60">
                      {group.region}
                    </h3>
                    <span className="h-px flex-1 bg-forest/15" aria-hidden="true" />
                  </div>
                  <ul className="mt-4 space-y-2">
                    {group.countries.map((country) => (
                      <li
                        key={country.name}
                        className="flex items-baseline justify-between gap-4 border-b border-forest/10 pb-2"
                      >
                        <span className="font-display text-[19px] text-forest">{country.name}</span>
                        <span className="text-[10.5px] uppercase tracking-[0.12em] text-ink/40">
                          {country.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}