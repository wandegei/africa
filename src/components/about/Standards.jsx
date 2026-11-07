import { ShieldCheck, Scale, UserCheck, Lock, Coins, FileCheck2 } from "lucide-react";

const STANDARDS = [
  {
    icon: Scale,
    title: "Reserved work stays with authorised professionals",
    body: "Legal opinions, drafting, representation, tax advice, audit and statutory accounting are provided by practitioners registered for that work in the relevant jurisdiction, engaged by you directly. We coordinate the sequence and the documentation around it.",
  },
  {
    icon: UserCheck,
    title: "Client due diligence before any instruction",
    body: "We establish identity, corporate structure, ultimate beneficial ownership and the purpose of the engagement, and we screen for sanctions and political exposure before substantive work begins.",
  },
  {
    icon: ShieldCheck,
    title: "Zero tolerance on bribery",
    body: "No facilitation payments, no informal payments, no inducements to influence an official decision. Government fees are paid through official channels and supported by receipts.",
  },
  {
    icon: Lock,
    title: "Confidentiality and data protection",
    body: "Access is limited to those working on your matter, identity and financial documents move under encryption, and cross-border transfers follow the conditions required in each jurisdiction.",
  },
  {
    icon: FileCheck2,
    title: "Conflicts disclosed, not managed silently",
    body: "We keep a conflicts register and disclose relevant relationships with professional partners. Referral arrangements affecting a recommendation are stated openly.",
  },
  {
    icon: Coins,
    title: "Client funds are not held",
    body: "We do not hold client money. Government and professional partner fees are paid by you directly wherever the process allows it.",
  },
];

export default function Standards() {
  return (
    <section className="border-t border-forest/10 bg-white">
      <div className="shell py-20 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
            Governance built before the first client, not after.
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.8] text-ink/65">
            Coordination across several jurisdictions concentrates risk: in what is said, in who is
            authorised to say it, in the money that moves, and in the information that travels
            between parties. These are the controls we work to.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-forest/12 bg-forest/12 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white p-6 lg:p-7">
              <span className="grid h-10 w-10 place-items-center border border-forest/15 text-copper">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-[18px] leading-snug text-forest">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.75] text-ink/65">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[12.5px] leading-relaxed text-ink/45">
          Our written policies cover anti-money laundering and client due diligence, anti-bribery
          and corruption, sanctions screening, data protection and information security, conflicts
          of interest, client confidentiality, complaints handling, partner due diligence,
          engagement terms and records retention. Policy documents are available to clients on
          request during onboarding.
        </p>
      </div>
    </section>
  );
}