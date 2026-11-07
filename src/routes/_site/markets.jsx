import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import CoverageComposition from "@/components/markets/CoverageComposition";
import CtaBand from "@/components/site/CtaBand";
import { MARKETS, CONTACT } from "@/data/site";

export const Route = createFileRoute("/_site/markets")({
  head: () => ({
    meta: [
      { title: "Markets | East, West and Southern Africa Coverage | Africa Compliance" },
      {
        name: "description",
        content:
          "Africa Compliance focuses on East Africa (Uganda, Kenya, Tanzania, Rwanda), West Africa (Ghana, Nigeria) and Southern Africa (South Africa) — markets under assessment as part of a phased approach.",
      },
      {
        name: "keywords",
        content:
          "doing business in Uganda, Kenya business establishment, Tanzania market entry, Rwanda company registration, Ghana Nigeria South Africa business compliance",
      },
      { property: "og:title", content: "Markets | Africa Compliance" },
      {
        property: "og:description",
        content:
          "A structured, phased approach to market coverage across East, West and Southern Africa.",
      },
    ],
  }),
  component: MarketsPage,
});

function MarketsPage() {
  return (
    <>
      <PageHero
        title="A phased focus across African markets."
        intro="The countries below represent target markets under assessment or planned. Apart from the Uganda office shown below, they do not constitute confirmed operational coverage, offices, licences or staff presence."
      />

      <CoverageComposition />

      <section className="border-y border-forest/10 bg-sand/60">
        <div className="shell grid gap-10 py-16 lg:grid-cols-3 lg:gap-12 lg:py-20">
          {MARKETS.map((group) => (
            <div key={group.region}>
              <h2 className="font-display text-[24px] text-forest">{group.region}</h2>
              <div className="mt-2 h-px w-12 bg-copper" aria-hidden="true" />
              <ul className="mt-6 space-y-4">
                {group.countries.map((country) => (
                  <li key={country.name} className="border-b border-forest/10 pb-4">
                    <p className="font-display text-[18px] text-forest">{country.name}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-ink/45">
                      {country.note}
                    </p>
                    {country.office && (
                      <div className="mt-4 border-l-2 border-copper/50 pl-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper">
                          Office
                        </p>
                        <address className="mt-2 not-italic text-[13.5px] leading-[1.7] text-ink/70">
                          {country.office.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                        <div className="mt-3 space-y-1.5 text-[13.5px]">
                          <a
                            href={CONTACT.phoneHref}
                            className="block text-forest transition-colors hover:text-copper"
                          >
                            {CONTACT.phoneDisplay}
                          </a>
                          <a
                            href={`mailto:${CONTACT.email}`}
                            className="block text-forest transition-colors hover:text-copper"
                          >
                            {CONTACT.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-10 border border-forest/12 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div>
              <h2 className="max-w-xl font-display text-[25px] leading-[1.2] text-forest sm:text-[30px]">
                Tell us where you are considering and we will confirm what we can assess.
              </h2>
              <p className="mt-4 max-w-xl text-[14.5px] leading-[1.75] text-ink/65">
                Coverage is developed in response to client requirements. If your plans involve a
                market outside the regions shown, an enquiry is the quickest way to establish
                whether support can be coordinated.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=Market%20enquiry`}
                className="inline-flex items-center justify-center gap-2 bg-forest px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper"
              >
                Email an enquiry
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-forest/20 px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:border-copper hover:text-copper"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-[12.5px] leading-relaxed text-ink/45">
            Coverage note: Africa Compliance maintains the Uganda office shown above. It does not
            claim employees, licences, regulatory approvals or active service delivery in any other
            market listed on this page. Where local professional input is required, it is coordinated through appropriately
            qualified and authorised professionals engaged directly by the client.
          </p>
        </div>
      </section>

      <CtaBand
        title="Enquire about your target country."
        body="Share the market you are considering and the nature of your plans, and we will respond with what can be assessed and coordinated."
      />
    </>
  );
}