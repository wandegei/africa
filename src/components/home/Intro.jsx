import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export default function Intro() {
  return (
    <section className="bg-white">
      <div className="shell grid gap-12 py-20 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-28">
        <div>
          <h2 className="max-w-md font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[40px]">
            Making Business in Africa Simpler.
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-[17px] leading-[1.8] text-ink/80">
            Entering and operating in African markets can involve complex regulatory
            environments, different establishment requirements in each jurisdiction, and multiple
            professional stakeholders to coordinate.
          </p>
          <p className="text-[16px] leading-[1.8] text-ink/65">
            Africa Compliance aims to simplify that process. We help clients understand what their
            plans require, structure the steps involved, and coordinate the right support — so
            decisions are made with clarity rather than guesswork.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 border-b border-copper/40 pb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:border-copper hover:text-copper"
          >
            About Africa Compliance
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}