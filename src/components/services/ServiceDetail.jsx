import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import ServiceGlyph from "@/components/site/ServiceGlyph";

export default function ServiceDetail({ service }) {
  return (
    <section
      id={service.id}
      className="scroll-mt-28 border-t border-forest/10 bg-white py-16 lg:py-20"
    >
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center border border-forest/15 text-copper">
              <ServiceGlyph icon={service.icon} className="h-5 w-5" />
            </span>
            <span className="font-display text-[13px] tracking-[0.2em] text-forest/35">
              {service.number}
            </span>
          </div>
          <h2 className="mt-6 font-display text-[27px] leading-[1.15] tracking-[-0.02em] text-forest sm:text-[33px]">
            {service.title}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.8] text-ink/70">{service.intro}</p>

          <div className="mt-7 border-l-2 border-copper/60 bg-sand/40 p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-forest/60">
              Client benefit
            </p>
            <p className="mt-2 text-[14px] leading-[1.75] text-ink/75">{service.benefit}</p>
          </div>

          <Link
            to="/contact"
            className="group mt-7 inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper"
          >
            Discuss this service
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/45">
            Areas of support
          </h3>
          <ul className="mt-5 divide-y divide-forest/10 border-y border-forest/10">
            {service.areas.map((area) => (
              <li key={area} className="flex items-center gap-3.5 py-4">
                <Check className="h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                <span className="text-[15px] text-ink/80">{area}</span>
              </li>
            ))}
          </ul>

          {service.disclosure && (
            <div className="mt-6 border border-forest/15 bg-cream p-5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-copper">
                Regulatory disclosure
              </p>
              <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink/65">
                {service.disclosure}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}