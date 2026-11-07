import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import CtaBand from "@/components/site/CtaBand";
import { INSIGHTS, getInsight } from "@/data/insights";

export const Route = createFileRoute("/_site/blog/$slug")({
  head: ({ params }) => {
    const article = getInsight(params.slug);
    return {
      meta: [
        { title: article ? `${article.title} | Africa Compliance` : "Blog | Africa Compliance" },
        {
          name: "description",
          content:
            article?.excerpt ??
            "Perspective on market entry, business establishment and regulatory compliance across African markets.",
        },
        { property: "og:title", content: article?.title ?? "Blog | Africa Compliance" },
        { property: "og:description", content: article?.excerpt ?? "" },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const article = getInsight(slug);

  if (!article) {
    return (
      <section className="bg-white">
        <div className="shell py-24">
          <h1 className="font-display text-[32px] text-forest sm:text-[40px]">
            This post is not available.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/65">
            The post you are looking for may have been moved. The blog lists everything currently
            published.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 bg-forest px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper"
          >
            View all posts
          </Link>
        </div>
      </section>
    );
  }

  const related = INSIGHTS.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="bg-forest text-white">
          <div className="shell py-14 lg:py-20">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-copper"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All posts
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-copper">
                {article.category}
              </span>
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                {article.date} · {article.readTime}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-[30px] leading-[1.12] tracking-[-0.025em] sm:text-[42px]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/65 sm:text-[15.5px]">
              {article.excerpt}
            </p>
          </div>
        </header>

        <div className="bg-white">
          <div className="shell py-12 lg:py-16">
            <div className="relative aspect-[16/9] overflow-hidden bg-sand sm:aspect-[16/8]">
              <Image
                src={article.image}
                alt={article.alt}
                fittingType="fill"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mx-auto mt-10 max-w-2xl sm:mt-12">
              {article.sections.map((section, index) => (
                <section key={section.heading} className={index === 0 ? "" : "mt-10"}>
                  <h2 className="font-display text-[22px] leading-snug text-forest sm:text-[24px]">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-4 text-[16px] leading-[1.85] text-ink/80 sm:text-[16.5px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 border-l border-forest/15 pl-5">
                      {section.bullets.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="text-[15px] leading-[1.7] text-ink/75"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className="mt-12 border border-forest/12 bg-cream p-5 sm:p-6">
                <div className="flex items-center gap-2.5 text-copper">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em]">
                    Last verified {article.lastVerified}
                  </p>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.75] text-ink/65">
                  {article.sourcesNote}
                </p>
              </div>

              <div className="mt-8 border-l-2 border-forest/20 pl-5">
                <p className="text-[13px] leading-relaxed text-ink/50">
                  Nothing in this article constitutes legal, tax or other regulated professional
                  advice, and it should not be relied upon as such. Requirements differ by
                  jurisdiction, business activity and ownership structure, and change over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-forest/10 bg-cream">
          <div className="shell py-14">
            <h2 className="font-display text-[24px] text-forest">Further reading</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="group border-t border-forest/15 pt-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-copper">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-[20px] leading-snug text-forest transition-colors group-hover:text-copper">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CtaBand
        title="Discuss your market-entry requirements."
        body="A conversation about your specific plans will always be more useful than a general article."
      />
    </>
  );
}