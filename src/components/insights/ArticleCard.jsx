import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";

export default function ArticleCard({ article }) {
  return (
    <article className="group">
      <Link to="/blog/$slug" params={{ slug: article.slug }} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-sand">
          <Image
            src={article.image}
            alt={article.alt}
            fittingType="fill"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-copper">
            {article.category}
          </span>
          <span className="h-px flex-1 bg-forest/12" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.12em] text-ink/40">
            {article.readTime}
          </span>
        </div>
        <h3 className="mt-2.5 font-display text-[21px] leading-snug text-forest transition-colors group-hover:text-copper">
          {article.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-[1.75] text-ink/60">{article.excerpt}</p>
      </Link>
    </article>
  );
}