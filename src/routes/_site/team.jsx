import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import TeamProfile from "@/components/team/TeamProfile";
import CtaBand from "@/components/site/CtaBand";
import { TEAM } from "@/data/team";

export const Route = createFileRoute("/_site/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Africa Compliance" },
      {
        name: "description",
        content:
          "The partners of Africa Compliance, led by Mr. Wodenga Cyrus Woboya, Advocate of the High Court of Uganda, and how client mandates are staffed.",
      },
      {
        name: "keywords",
        content:
          "Africa Compliance team, market entry advisers Uganda, compliance coordination partners",
      },
      { property: "og:title", content: "Our Team | Africa Compliance" },
      {
        property: "og:description",
        content:
          "The partners of Africa Compliance and how client mandates are staffed across African markets.",
      },
    ],
  }),
  component: TeamPage,
});

const STAFFING = [
  {
    title: "A named lead",
    body: "Every mandate has a named partner responsible for it, so it is always clear who is accountable for each step.",
  },
  {
    title: "One point of coordination",
    body: "Documentation, filings and local professional input are coordinated through the same team for the whole engagement.",
  },
  {
    title: "Specialist input where required",
    body: "Where regulated legal or tax advice is needed, it is obtained from appropriately qualified and authorised professionals engaged directly by the client.",
  },
];

function TeamPage() {
  return (
    <>
      <PageHero
        title="The people accountable for your mandate."
        intro="Africa Compliance is led by Mr. Wodenga Cyrus Woboya, Advocate of the High Court of Uganda, together with the partners below. Mandates are handled by a named lead from the first conversation through to post-establishment compliance."
      />

      <section className="bg-white">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <TeamProfile key={member.name} member={member} />
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-[12.5px] leading-relaxed text-ink/45">
            Africa Compliance is not a law firm and does not provide regulated legal, tax or other
            reserved professional services. Where such services are required, they may be
            coordinated through appropriately qualified and authorised local professionals engaged
            directly by the client.
          </p>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-sand/60">
        <div className="shell py-16 lg:py-20">
          <h2 className="max-w-2xl font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-forest sm:text-[34px]">
            How engagements are staffed.
          </h2>

          <div className="mt-10 grid gap-px border border-forest/12 bg-forest/10 md:grid-cols-3">
            {STAFFING.map((item) => (
              <div key={item.title} className="bg-white p-6 lg:p-7">
                <h3 className="font-display text-[19px] leading-snug text-forest">{item.title}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.75] text-ink/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Speak with the team directly."
        body="Share your objectives and target market, and a named lead will respond with a considered view of what your plans involve."
      />
    </>
  );
}