import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { APPROACH_NOTE, VALUES } from "@/data/site";

export default function WhyUs() {
  return (
    <section className="bg-forest text-white">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]">
              A coordinated partner, not another adviser in a long list.
            </h2>
            <p className="mt-6 max-w-sm text-[15.5px] leading-[1.8] text-white/60">
              Entering a new market usually means working with several parties. Our role is to
              bring structure to that process and keep you informed at each stage.
            </p>

            <div className="mt-9 border border-white/15 bg-white/5 p-6">
              <p className="text-[12px] uppercase tracking-[0.18em] text-copper">Important</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{APPROACH_NOTE}</p>
            </div>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-copper"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <div key={value.title} className="bg-forest p-7 lg:p-8">
                <span className="font-display text-[12px] tracking-[0.16em] text-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[19px] leading-snug text-white">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.7] text-white/55">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}