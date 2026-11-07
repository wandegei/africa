import { ShieldCheck, FileCheck2, MessagesSquare } from "lucide-react";

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "Professionalism",
    body: "A disciplined process: clear scope, documented steps and appropriately qualified input where an item requires regulated advice.",
  },
  {
    icon: FileCheck2,
    title: "Transparency",
    body: "An explicit distinction between what we coordinate directly and what is delivered by local professionals engaged by you.",
  },
  {
    icon: MessagesSquare,
    title: "Reliability",
    body: "Consistent communication on progress, requirements and outstanding items, so nothing depends on memory or assumption.",
  },
];

export default function Commitment() {
  return (
    <section className="bg-forest text-white">
      <div className="shell py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] sm:text-[38px]">
              Clear about what we do — and what we do not.
            </h2>
            <div className="mt-7 border border-white/15 bg-white/5 p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-copper">
                What this page does not state
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                This page does not publish team biographies, years of experience, client names,
                offices, licences, accreditations or partnerships. Those details will be added
                only once confirmed and verifiable.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {COMMITMENTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-5 border-b border-white/12 pb-8 last:border-0">
                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center border border-white/20 text-copper">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-[19px] text-white">{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.75] text-white/60">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}