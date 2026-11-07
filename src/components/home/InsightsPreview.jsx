import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { INSIGHTS } from "@/data/insights";

export default function InsightsPreview() {
  const featured = INSIGHTS.slice(0, 3);

  return (
    <section className="border-t border-forest/10 bg-cream">
      <div className="shell py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
              Perspective on entering and operating in African markets.
            </h2>
            <p className="mt-4 text-[14px] text-ink/50">
              Written for the decisions international businesses actually face when establishing
              and operating in a new market.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper"
          >
            View all posts
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((article) => (
            <article key={article.slug} className="group">
              <Link to="/blog/$slug" params={{ slug: article.slug }} className="block">
                <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fittingType="fill"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-copper">
                  {article.category}
                </p>
                <h3 className="mt-2.5 font-display text-[20px] leading-snug text-forest transition-colors group-hover:text-copper">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.7] text-ink/60">{article.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}