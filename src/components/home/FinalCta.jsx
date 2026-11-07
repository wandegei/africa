import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/site";

export default function FinalCta() {
  return (
    <section className="bg-forest text-white">
      <div className="shell py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <h2 className="max-w-2xl font-display text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[42px]">
              Planning to Enter or Expand in Africa?
            </h2>
            <p className="mt-5 max-w-xl text-[15.5px] leading-[1.8] text-white/60">
              Start a conversation with Africa Compliance about your business objectives and
              market-entry requirements.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2.5 bg-copper px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-forest"
            >
              Contact Africa Compliance
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 transition-colors hover:border-copper hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}