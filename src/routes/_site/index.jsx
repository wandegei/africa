import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyUs from "@/components/home/WhyUs";
import MarketsPreview from "@/components/home/MarketsPreview";
import Approach from "@/components/home/Approach";
import InsightsPreview from "@/components/home/InsightsPreview";
import FinalCta from "@/components/home/FinalCta";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      {
        title:
          "Africa Compliance | Market Entry, Business Establishment & Compliance in Africa",
      },
      {
        name: "description",
        content:
          "Africa Compliance helps international businesses, investors and entrepreneurs enter and operate across African markets — market entry advisory, business establishment coordination and regulatory compliance support.",
      },
      {
        name: "keywords",
        content:
          "doing business in Africa, market entry Africa, business establishment in Africa, business compliance Africa, company registration coordination Africa, expanding into African markets",
      },
      { property: "og:title", content: "Africa Compliance | Your Gateway to Doing Business in Africa" },
      {
        property: "og:description",
        content:
          "Market entry, business establishment and regulatory compliance coordination across African markets.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesGrid />
      <WhyUs />
      <MarketsPreview />
      <Approach />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}