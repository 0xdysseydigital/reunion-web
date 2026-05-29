import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

const SPACES = [
  {
    id: "the-library",
    label: "The Library",
    src: "/spaces/library.png",
    cta: true,
    eyebrow: "Private Space",
    description:
      "Warm shelves, quiet corners, and a sophistication that invites lingering. The Library is a private sanctuary for those who appreciate atmosphere as much as cuisine — perfect for intimate gatherings of discerning guests.",
  },
  {
    id: "the-atrium",
    label: "The Atrium",
    src: "/spaces/atrium.png",
    cta: true,
    eyebrow: "Private Space",
    description:
      "Light pours in from every angle in this airy, open-plan space. The Atrium accommodates larger events with elegance — wedding receptions, milestone celebrations, and corporate dinners that deserve a grander stage.",
  },
  {
    id: "the-lounge",
    label: "The Lounge",
    src: "/spaces/lounge.jpg",
    cta: false,
    eyebrow: "Space",
    description:
      "Low light, deep seating, and a soundtrack that sets the tone. The Lounge is where deals get made and birthdays get remembered. Intimate enough for a private party, refined enough for any occasion.",
  },
  {
    id: "the-den",
    label: "The Den",
    src: "/spaces/den.png",
    cta: false,
    eyebrow: "Space",
    description:
      "Tucked away and entirely yours. The Den offers a cozy enclosed setting ideal for smaller groups who want the full Reunion experience without distraction — think private tastings, rehearsal dinners, or executive lunches.",
  },
  {
    id: "the-garden",
    label: "The Garden",
    src: "/spaces/garden.png",
    cta: false,
    eyebrow: "Space",
    description:
      "Alfresco dining at its finest. The Garden brings the outside in — seasonal, lush, and unlike anywhere else in Hummelstown. An ideal backdrop for warm-weather events, cocktail receptions, and anything that calls for fresh air.",
  },
];

const EMAIL = "manager@reunioncocktailsprovisions.com";

export const metadata = {
  title: "Reunion's Spaces — Reunion Cocktails + Provisions",
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
            Reunion's Spaces
          </h1>
        </FadeIn>
        <FadeIn direction="none" delay={0.2}>
          <p className="font-literata text-brand-cream/50 text-[18px] mt-6 max-w-lg leading-relaxed">
            Five distinct spaces. Each one designed for a different kind of evening.
            Reach out and we'll make it happen.
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
              <p className={`font-literata text-[18px] text-brand-cream/70 leading-relaxed max-w-md ${space.cta ? "mb-10" : ""}`}>
                {space.description}
              </p>
              {space.cta && (
                <div>
                  <Button href={mailto} external>Contact</Button>
                </div>
              )}
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
