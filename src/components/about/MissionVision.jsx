const BLOCKS = [
  {
    label: "Our purpose",
    body: "To make entering and operating in African markets more understandable for international businesses — replacing fragmented information with a structured, coordinated process.",
  },
  {
    label: "Our mission",
    body: "To provide practical, well-coordinated support across market entry, business establishment and regulatory compliance, engaging appropriately qualified local professionals where regulated input is required.",
  },
  {
    label: "Our vision",
    body: "To be recognised as a dependable coordination partner for businesses expanding across African markets — known for clarity, discretion and consistency rather than volume.",
  },
];

export default function MissionVision() {
  return (
    <section className="border-y border-forest/10 bg-cream">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-px bg-forest/10 md:grid-cols-3">
          {BLOCKS.map((block, index) => (
            <div key={block.label} className="bg-white p-8 lg:p-10">
              <span className="font-display text-[12px] tracking-[0.18em] text-copper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-[24px] leading-snug text-forest">
                {block.label}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-ink/70">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}