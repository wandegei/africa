import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import ServiceDetail from "@/components/services/ServiceDetail";
import CtaBand from "@/components/site/CtaBand";
import { SERVICES } from "@/data/site";

export const Route = createFileRoute("/_site/services")({
  head: () => ({
    meta: [
      {
        title: "Services | Market Entry, Business Establishment & Compliance in Africa",
      },
      {
        name: "description",
        content:
          "Market entry advisory, business establishment coordination, legal and regulatory compliance coordination, and ongoing compliance support for international businesses entering African markets.",
      },
      {
        name: "keywords",
        content:
          "market entry Africa, company registration coordination Africa, business establishment Africa, regulatory compliance Africa, ongoing compliance support",
      },
      { property: "og:title", content: "Services | Africa Compliance" },
      {
        property: "og:description",
        content:
          "Four coordinated areas of support for businesses entering and operating across African markets.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Coordinated support across the full establishment lifecycle."
        intro="Four areas of work, designed to be used together or individually — from the first assessment of a market to the ongoing obligations that follow establishment."
      />

      <div className="border-b border-forest/10 bg-white">
        <div className="shell flex gap-6 overflow-x-auto py-4">
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="whitespace-nowrap text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink/55 transition-colors hover:text-copper"
            >
              {service.number} · {service.title}
            </a>
          ))}
        </div>
      </div>

      <div>
        {SERVICES.map((service) => (
          <ServiceDetail key={service.id} service={service} />
        ))}
      </div>

      <section className="border-t border-forest/10 bg-cream">
        <div className="shell py-12">
          <p className="max-w-3xl text-[13px] leading-relaxed text-ink/55">
            Service descriptions on this page set out how Africa Compliance intends to support
            clients. Availability, scope and pricing are confirmed on a case-by-case basis. Where a
            matter requires regulated legal, tax or other reserved professional advice, that advice
            is provided by appropriately qualified and authorised local professionals engaged
            directly by the client.
          </p>
        </div>
      </section>

      <CtaBand title="Not sure which service applies to your plans?" />
    </>
  );
}