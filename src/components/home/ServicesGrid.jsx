import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import ServiceGlyph from "@/components/site/ServiceGlyph";
import { SERVICES } from "@/data/site";

export default function ServicesGrid() {
  return (
    <section className="border-y border-forest/10 bg-cream">
      <div className="shell py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
              Four areas of support, coordinated around your plans.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper"
          >
            All services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-px border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-sand/60 lg:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center border border-forest/15 text-forest transition-colors duration-300 group-hover:border-copper group-hover:text-copper">
                  <ServiceGlyph icon={service.icon} />
                </span>
                <span className="font-display text-[13px] tracking-[0.1em] text-forest/30">
                  {service.number}
                </span>
              </div>
              <h3 className="mt-8 font-display text-[21px] leading-snug tracking-[-0.01em] text-forest">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-ink/65">
                {service.short}
              </p>
              <Link
                to="/services"
                hash={service.id}
                className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors group-hover:text-copper"
              >
                Learn more
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}