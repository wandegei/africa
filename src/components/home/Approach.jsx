import { APPROACH } from "@/data/site";

export default function Approach() {
  return (
    <section className="bg-white">
      <div className="shell py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
            A clear sequence, from first conversation to ongoing obligations.
          </h2>
        </div>

        <ol className="mt-14 grid gap-px border-t border-forest/15 bg-forest/10 md:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((item) => (
            <li key={item.step} className="relative bg-white pt-8 md:px-6 lg:px-7">
              <span
                className="absolute -top-px left-0 h-px w-12 bg-copper"
                aria-hidden="true"
              />
              <span className="font-display text-[13px] tracking-[0.18em] text-copper">
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-[21px] leading-snug tracking-[-0.01em] text-forest">
                {item.title}
              </h3>
              <p className="mt-3 pb-8 text-[14.5px] leading-[1.75] text-ink/65">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}