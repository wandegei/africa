import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { MARKETS } from "@/data/site";

const HERO_IMAGE =
  "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/c237c821f_generated_8ec55bb6.png";

export default function Hero() {
  return (
    <section className="relative bg-forest text-white">
      <div className="grid lg:min-h-[calc(100svh-116px)] lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]">
        <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-14 lg:py-24 xl:pl-20">
          <div className="reveal">
            <h1 className="max-w-xl font-display text-[36px] leading-[1.06] tracking-[-0.03em] sm:text-[46px] lg:text-[50px] xl:text-[56px]">
              One accountable partner for entering and staying compliant in African markets.
            </h1>
            <p className="mt-7 max-w-md text-[15.5px] leading-[1.75] text-white/70">
              Africa Compliance coordinates business establishment, connects international
              businesses with qualified local professionals, and keeps ongoing compliance
              obligations organised and on track.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2.5 bg-copper px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-forest"
              >
                Discuss Your Business Plans
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/90 transition-colors hover:border-copper hover:text-white"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="mt-14 border-t border-white/15 pt-6">
            <p className="text-[12.5px] text-white/40">Markets under assessment or planned</p>
            <p className="mt-3 font-display text-[15px] leading-relaxed text-white/75">
              {MARKETS.flatMap((group) => group.countries.map((c) => c.name)).join(" · ")}
            </p>
          </div>
        </div>

        <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full">
          <Image
            src={HERO_IMAGE}
            alt="Modern glass office towers in an African business district at golden hour"
            fittingType="fill"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/25 to-transparent lg:from-forest/55 lg:via-forest/10" />
          <div className="absolute inset-y-0 left-0 hidden w-px bg-copper/40 lg:block" />
        </div>
      </div>
    </section>
  );
}