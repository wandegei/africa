import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import MissionVision from "@/components/about/MissionVision";
import ValuesGrid from "@/components/about/ValuesGrid";
import Standards from "@/components/about/Standards";
import Commitment from "@/components/about/Commitment";
import CtaBand from "@/components/site/CtaBand";
import Approach from "@/components/home/Approach";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Africa Compliance | Market Entry & Compliance Coordination" },
      {
        name: "description",
        content:
          "Africa Compliance supports foreign companies, investors and international businesses establishing and operating across African markets. Learn about our purpose, mission, values and coordination approach.",
      },
      {
        name: "keywords",
        content:
          "Africa Compliance, business establishment Africa, compliance coordination Africa, market entry advisory",
      },
      { property: "og:title", content: "About Africa Compliance" },
      {
        property: "og:description",
        content:
          "Our purpose, mission and approach to business establishment and compliance coordination across African markets.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        title="A considered approach to entering and operating in African markets."
        intro="Africa Compliance is a business-entry and compliance coordination practice working with international businesses, investors and entrepreneurs across African markets."
      />
      <WhoWeAre />
      <MissionVision />
      <ValuesGrid />
      <Approach />
      <Standards />
      <Commitment />
      <CtaBand
        title="Have a market or structure in mind?"
        body="Tell us about your plans and we will outline how the process can be coordinated."
      />
    </>
  );
}