import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Africa Compliance" },
      {
        name: "description",
        content:
          "Terms governing use of the Africa Compliance website, the basis on which enquiries are received, and the boundaries of our coordination services.",
      },
      { property: "og:title", content: "Terms & Conditions | Africa Compliance" },
      {
        property: "og:description",
        content:
          "The basis on which this website and our coordination services are offered.",
      },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "About these terms",
    body: "These terms govern your use of this website. By using the site or submitting an enquiry you accept them. They do not govern any client engagement: where we act for a client, the terms of the signed engagement letter apply and prevail over anything on this website.",
  },
  {
    title: "Nature of this website",
    body: "This website provides general information about our coordination practice and the markets in which we work. Nothing on it constitutes legal, tax, accounting, immigration or other regulated professional advice, and no client relationship, retainer or duty of care arises from browsing the site, submitting an enquiry or corresponding with us before a written engagement is signed.",
  },
  {
    title: "What we do, and what we do not",
    body: "Africa Compliance coordinates business establishment, compliance and market-entry processes. We are not a law firm, a tax practice, an audit firm or a licensed company-formation agent in any jurisdiction. We do not provide legal opinions, reserved legal drafting, representation, tax advice, audit or statutory accounting services. Those services, where required, are provided by appropriately qualified and authorised professionals engaged directly by the client under a separate agreement.",
  },
  {
    title: "Market coverage",
    body: "Markets shown on this website are markets under assessment, in development or planned. Inclusion does not indicate an office, a licence, employees, a registered presence or confirmed service delivery in that country. Country readiness is confirmed in writing before we accept instructions relating to a market, and we decline work where the required professional support is not in place.",
  },
  {
    title: "Enquiries and engagement",
    body: "We assess enquiries and respond where we believe we can add value, but we are not obliged to accept any instruction. An engagement begins only when both parties have signed a written engagement letter setting out scope, exclusions, responsibilities, fees and payment terms. We do not act on the basis of an unsigned proposal or a verbal instruction.",
  },
  {
    title: "Fees and payments",
    body: "Our coordination fees are quoted separately from government fees and from the fees of professional partners. Government fees are payable through official channels and are supported by receipts; wherever possible the client pays them directly. Professional fees for regulated work are agreed directly between the client and the professional concerned. We disclose any referral arrangement relevant to a recommendation we make.",
  },
  {
    title: "Accuracy, sources and verification dates",
    body: "Regulatory requirements differ by jurisdiction, business activity and ownership structure, and they change. Articles and country information on this website are general in nature, identify their sources where a specific requirement is stated, and carry a last-verified date. They are not a substitute for jurisdiction-specific advice, and you should not rely on them as a statement of the current law in any country.",
  },
  {
    title: "Confidentiality and conflicts",
    body: "We treat information you send us as confidential and expect the same in return. Before accepting an instruction we check for conflicts of interest, including relationships with professional partners. Where a conflict arises, we disclose it and either obtain informed consent or decline the instruction. Information received in one engagement is not used in another.",
  },
  {
    title: "Anti-bribery and integrity",
    body: "We operate a zero-tolerance position on bribery, facilitation payments and informal payments. We do not offer or accept inducements to influence an official decision, and we will not process a payment that cannot be supported by an official receipt. Instructions that require otherwise are declined.",
  },
  {
    title: "Intellectual property",
    body: "The content, design and marks on this website belong to Africa Compliance unless otherwise indicated. You may read, download and print material for your own internal business use; you may not republish it commercially or present it as your own without written permission.",
  },
  {
    title: "Third-party links",
    body: "Where we link to legislation, regulators or other organisations, those sites are outside our control and we are not responsible for their content or availability.",
  },
  {
    title: "Liability",
    body: "The website is provided on an information-only basis. To the extent permitted by applicable law, we exclude liability for loss arising from reliance on general information published here. Nothing in these terms limits liability that cannot lawfully be limited, including for fraud or fraudulent misrepresentation.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of Uganda, and the courts of Uganda have jurisdiction over any dispute concerning them. The governing law of a client engagement is stated in the engagement letter.",
  },
  {
    title: "Changes",
    body: "We may update these terms as our practice develops. The version published on this page, with the last-verified date shown, is the version in force.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        intro="The basis on which this website is provided, how enquiries are handled, and the boundary between coordination and regulated professional work."
      />
      <section className="bg-white">
        <div className="shell max-w-3xl py-16 lg:py-20">
          <div className="flex flex-wrap items-center gap-3 border-b border-forest/12 pb-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper">
              Last verified
            </span>
            <span className="text-[12px] text-ink/55">3 November 2026</span>
          </div>

          <div className="mt-10 space-y-9">
            {SECTIONS.map((section, index) => (
              <div key={section.title}>
                <h2 className="font-display text-[21px] leading-snug text-forest">
                  {String(index + 1).padStart(2, "0")} · {section.title}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.8] text-ink/70">{section.body}</p>
              </div>
            ))}
            <div className="border-t border-forest/12 pt-9">
              <h2 className="font-display text-[21px] text-forest">Questions</h2>
              <p className="mt-3 text-[15px] leading-[1.8] text-ink/70">
                Write to{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-words text-forest underline decoration-copper/50 underline-offset-4 hover:text-copper"
                >
                  {CONTACT.email}
                </a>{" "}
                with any questions about these terms.
              </p>
              <p className="mt-6 text-[12.5px] leading-relaxed text-ink/45">
                These terms are reviewed periodically. Where a signed engagement letter addresses
                the same subject, the engagement letter prevails.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}