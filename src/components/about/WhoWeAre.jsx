import { Image } from "@/components/ui/image";

const ABOUT_IMAGE =
  "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/8ff216e6f_generated_ac1d3e2a.png";

export default function WhoWeAre() {
  return (
    <section className="bg-white">
      <div className="shell grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
        <div>
          <h2 className="font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]">
            A coordination partner for businesses entering African markets.
          </h2>
          <div className="mt-7 space-y-5 text-[16px] leading-[1.8] text-ink/75">
            <p>
              Africa Compliance supports foreign companies, investors, entrepreneurs and
              international businesses seeking to establish, expand or operate across African
              markets. Our work sits at the point where commercial ambition meets administrative
              reality.
            </p>
            <p>
              That means helping clients understand what their plans require in a given market,
              setting out the steps involved, and coordinating the professional input and
              documentation those steps depend on — with a clear view of who is responsible for
              each part.
            </p>
            <p>
              We are not a law firm. We do not present ourselves as providing regulated legal,
              tax or other reserved professional services. Where those services are required, they
              may be coordinated through appropriately qualified and authorised local
              professionals.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand">
            <Image
              src={ABOUT_IMAGE}
              alt="A modern, minimalist boardroom with glass partitions and natural daylight"
              fittingType="fill"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-start gap-3 border-l border-copper/50 pl-4">
            <p className="text-[12.5px] leading-relaxed text-ink/50">
              Illustrative imagery. Offices and professional registrations are published only once
              confirmed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}