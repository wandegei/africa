import { VALUES } from "@/data/site";

export default function ValuesGrid() {
  return (
    <section className="bg-white">
      <div className="shell py-20 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
            The standards we intend to be measured against.
          </h2>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <div key={value.title} className="border-t border-forest/15 pt-5">
              <span className="font-display text-[12px] tracking-[0.18em] text-copper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[20px] leading-snug text-forest">
                {value.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.75] text-ink/65">{value.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}