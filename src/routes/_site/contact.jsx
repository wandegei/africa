import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/contact/EnquiryForm";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact Africa Compliance | Business Entry Enquiries" },
      {
        name: "description",
        content:
          "Contact Africa Compliance about market entry, business establishment or regulatory compliance in African markets. Email hi@africomp.org, call or WhatsApp +256 704 345 771.",
      },
      {
        name: "keywords",
        content:
          "contact Africa Compliance, business entry Africa enquiry, market entry consultation Africa",
      },
      { property: "og:title", content: "Contact Africa Compliance" },
      {
        property: "og:description",
        content:
          "Tell us about your business plans and market-entry requirements.",
      },
    ],
  }),
  component: ContactPage,
});

const DIRECT = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "Preferred for detailed enquiries",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
    note: "Weekdays, East Africa Time",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us directly",
    href: CONTACT.whatsapp,
    note: "Opens WhatsApp",
    external: true,
  },
];

function ContactPage() {
  return (
    <>
      <PageHero
        title="Tell Us About Your Business Plans."
        intro="Share the market you are considering and the nature of your plans. We will respond with a considered view of what the process involves and how it can be coordinated."
      />

      <section className="bg-white">
        <div className="shell grid gap-14 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24">
          <div>
            <h2 className="font-display text-[27px] leading-[1.15] text-forest sm:text-[32px]">
              Africa Compliance
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
              Market-entry and compliance coordination for international businesses across African
              markets.
            </p>

            <ul className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
              {DIRECT.map(({ icon: Icon, label, value, href, note, external }) => (
                <li key={label} className="py-5">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center border border-forest/15 text-copper transition-colors group-hover:border-copper">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
                        {label}
                      </span>
                      <span className="mt-1 block text-[15.5px] text-forest transition-colors group-hover:text-copper">
                        {value}
                      </span>
                      <span className="mt-0.5 block text-[11.5px] text-ink/40">{note}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 text-[13px] leading-relaxed text-ink/55">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
              <p>
                Correspondence address: Kampala, Uganda. Enquiries are received by email,
                telephone and WhatsApp, and meetings can be arranged by appointment.
              </p>
            </div>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-forest px-6 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat with us on WhatsApp
            </a>
          </div>

          <div className="border border-forest/12 bg-cream p-6 sm:p-9">
            <h2 className="font-display text-[24px] leading-snug text-forest">
              A briefing, not a contact box.
            </h2>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">
              The more context you provide, the more useful our first response will be.
            </p>

            <div className="mt-7">
              <EnquiryForm />
            </div>

            <p className="mt-8 border-t border-forest/12 pt-5 text-[11.5px] leading-relaxed text-ink/45">
              Submitting an enquiry does not create a client relationship and does not constitute
              formal legal, tax or other professional advice. Africa Compliance is not a law firm;
              where regulated professional services are required, they may be coordinated through
              appropriately qualified and authorised local professionals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}