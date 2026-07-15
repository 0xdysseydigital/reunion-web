import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

const SPACES = [
  {
    id: "the-library",
    label: "The Library",
    src: "/spaces/library.png",
    eyebrow: "Private Space",
    description:
      "Seats up to 14 guests in warmth and quiet sophistication. The Library may be reserved on its own or combined with The Atrium for larger gatherings — an intimate setting where atmosphere and detail are part of the experience.",
  },
  {
    id: "the-atrium",
    label: "The Atrium",
    src: "/spaces/atrium.png",
    eyebrow: "Private Space",
    description:
      "Accommodates up to 32 guests with flexible seating arrangements, making it ideal for receptions, milestone celebrations, and corporate dinners. A 65-inch display is available for presentations or personalized touches. Reserve separately or alongside The Library.",
  },
];

const EMAIL = "manager@reunioncocktailsprovisions.com";
const PHONE = "(717) 918-0018";
const PHONE_URL = "tel:+17179180018";

export const metadata = {
  title: "Private Dining — Reunion Cocktails + Provisions",
};

export default function PrivateDiningPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="border-b border-brand-cream/10 px-6 md:px-10 py-14 md:py-20 flex flex-col items-center text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
            Hummelstown, PA
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.1}>
          <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
            Private Dining
          </h1>
        </FadeIn>
        <FadeIn direction="none" delay={0.2}>
          <p className="font-literata text-brand-cream/70 text-[16px] mt-8 max-w-4xl leading-relaxed">
            Some moments are meant to be set apart. Reunion's private dining experiences are designed to help you connect, bringing your group together in a space where ambiance, conversation, and detail come together seamlessly.
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.3}>
          <p className="font-literata text-brand-cream/45 text-[16px] mt-4 max-w-4xl leading-relaxed">
            The Library and the Atrium offer two distinct private dining settings that may be reserved separately or combined for larger gatherings. The Library seats up to 14 guests, while the Atrium accommodates up to 32, with flexible seating arrangements available. A 65‑inch television is available for seamless presentations or personalized touches.
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.4}>
          <p className="font-literata text-brand-cream/45 text-[16px] mt-4 max-w-4xl leading-relaxed">
            To begin planning your private dining experience, we invite you to connect with our team at {PHONE} for personalized assistance.
          </p>
        </FadeIn>
      </div>

      {/* Spaces */}
      {SPACES.map((space, i) => {
        const imageLeft = i % 2 === 0;
        const mailto = `mailto:${EMAIL}?subject=Private Dining Inquiry – ${space.label}`;

        const photo = (
          <FadeIn
            direction={imageLeft ? "left" : "right"}
            amount={0.15}
            className="w-full md:w-[45%] min-h-[300px] md:min-h-[500px] flex-shrink-0 relative overflow-hidden"
          >
            <Image src={space.src} alt={space.label} fill className="object-cover" />
          </FadeIn>
        );

        const content = (
          <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-10 md:py-24">
            <FadeIn delay={0.1}>
              <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/35 mb-4">
                {space.eyebrow}
              </p>
              <h2 className="font-servus font-light text-[clamp(1.8rem,4vw,3rem)] leading-none tracking-wide uppercase text-brand-cream mb-6">
                {space.label}
              </h2>
              <p className="font-literata text-[18px] text-brand-cream/70 leading-relaxed max-w-md mb-10">
                {space.description}
              </p>
              <div className="flex flex-col gap-4">
                <Button href={PHONE_URL} external>{PHONE}</Button>
                <a
                  href={mailto}
                  className="font-platypi text-[10px] tracking-[0.25em] uppercase text-brand-cream/35 hover:text-brand-cream/60 transition-colors duration-200"
                >
                  {EMAIL}
                </a>
              </div>
            </FadeIn>
          </div>
        );

        return (
          <section
            key={space.id}
            id={space.id}
            className={`flex flex-col border-b border-brand-cream/10 scroll-mt-28 ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
            aria-label={space.label}
          >
            {photo}
            {content}
          </section>
        );
      })}

    </div>
  );
}
