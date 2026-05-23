import FadeIn from "@/components/FadeIn";

export default function CC() {
  return (
    <section className="bg-brand-bg py-24 md:py-24 px-6 md:px-10" aria-labelledby="cc-heading">
      <div className="max-w-[720px] mx-auto text-center">
        <FadeIn>
          <h2
            id="cc-heading"
            className="font-literata text-[clamp(1.5rem,4.5vw,2.5rem)] font-normal leading-[1.3] text-brand-cream mb-10"
          >
            Crafted to Connect
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="font-literata text-[15px] leading-[1.7] text-brand-cream/85 mb-6">
            At Reunion, we believe great hospitality lives at the intersection of
            craft, cuisine, and connection. The cocktail is the centerpiece—
            thoughtfully composed, balanced, and intentional—designed to live
            alongside shareable dishes that invite conversation and discovery.
          </p>

          <p className="font-literata text-[15px] leading-[1.7] text-brand-cream/85">
            A moody yet inviting warmth, layered with intentional lighting, creates a
            sense of renewal—mirroring the transformation of the space and the energy
            of Hershey&apos;s west end growth. Whether you&apos;re joining us for drinks
            at the bar or settling in for a full dining experience, Reunion offers a
            setting where conversation lingers and the night unfolds naturally.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-2">
            <span className="font-literata text-[16px] text-brand-cream/75 tracking-normal">
              Explore Our Spaces
            </span>
            <span className="text-brand-cream/75 text-[18px]" aria-hidden="true">
              ↓
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
