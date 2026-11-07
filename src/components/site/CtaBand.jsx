import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export default function CtaBand({
  title = "Planning to enter or expand in Africa?",
  body = "Share your objectives and target markets, and we will respond with a considered view of what your plans involve.",
}) {
  return (
    <section className="border-t border-forest/10 bg-sand/70">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-forest sm:text-[34px]">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-ink/70">{body}</p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 bg-forest px-7 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper"
          >
            Contact Africa Compliance
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}