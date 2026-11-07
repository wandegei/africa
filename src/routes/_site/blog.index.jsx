import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import ArticleCard from "@/components/insights/ArticleCard";
import CtaBand from "@/components/site/CtaBand";
import { INSIGHTS } from "@/data/insights";

export const Route = createFileRoute("/_site/blog/")({
  head: () => ({
    meta: [
      {
        title: "Blog | Market Entry and Compliance in African Markets",
      },
      {
        name: "description",
        content:
          "Perspective on entering and operating in African markets: establishment considerations, market entry planning and managing regulatory compliance across jurisdictions.",
      },
      {
        name: "keywords",
        content:
          "Africa compliance blog, business expansion Africa, regulatory compliance foreign investors, establishing a business in Africa",
      },
      { property: "og:title", content: "Blog | Africa Compliance" },
      {
        property: "og:description",
        content:
          "Perspective on market entry, business establishment and compliance across African markets.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <PageHero
        title="Perspective for businesses considering African markets."
        intro="Practical notes on entering, establishing and operating in African markets — written for the decisions international businesses actually have to make, with sources and verification dates recorded."
      />

      <section className="bg-white">
        <div className="shell py-16 lg:py-20">
          <div className="mb-10 border-l-2 border-copper/60 pl-5">
            <p className="text-[13.5px] leading-relaxed text-ink/60">
              Each article carries a last-verified date and states the basis on which it was
              written. Country-specific requirements are confirmed with qualified local counsel
              before they are relied on in an engagement.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {INSIGHTS.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ask us about your specific market and plans."
        body="Published notes cannot replace a considered view of your own structure, activity and target market."
      />
    </>
  );
}