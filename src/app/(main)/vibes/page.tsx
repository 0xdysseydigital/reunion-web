import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { RESERVATIONS_URL } from "@/lib/constants";
import { getSiteSettings, resolveImage } from "@/lib/siteSettings";

const STATIC_GALLERY = [
  { src: "/images/info-interior.png", w: 805, h: 1432, alt: "Reunion dining room interior" },
  { src: "/spaces/lounge.jpg", w: 1536, h: 1024, alt: "The Lounge seating area" },
  { src: "/images/bar-hero.jpg", w: 1500, h: 1500, alt: "Bar cocktail service" },
  { src: "/spaces/garden.png", w: 1536, h: 1024, alt: "The Garden outdoor space" },
  { src: "/images/brunch-hero.jpg", w: 1200, h: 1500, alt: "Brunch table spread" },
  { src: "/spaces/den.png", w: 1536, h: 1024, alt: "The Den seating nook" },
  { src: "/images/dinner-hero.jpg", w: 1500, h: 1500, alt: "Dinner service" },
  { src: "/spaces/atrium.png", w: 1536, h: 1024, alt: "The Atrium private dining space" },
  { src: "/spaces/drink-fare.png", w: 1536, h: 1024, alt: "Cocktail and small plate pairing" },
  { src: "/images/lunch-hero.jpg", w: 1500, h: 1500, alt: "Lunch service" },
  { src: "/spaces/library.png", w: 1536, h: 1024, alt: "The Library private dining space" },
];

export const metadata = {
  title: "Vibes — Reunion Cocktails + Provisions",
};

export default async function VibesPage() {
  const settings = await getSiteSettings();
  const gallery =
    settings?.vibesGallery && settings.vibesGallery.length > 0
      ? settings.vibesGallery.map((item, i) => ({
          src: resolveImage(item.image, 900) ?? "",
          w: item.width ?? 1200,
          h: item.height ?? 900,
          alt: item.alt || `Reunion gallery photo ${i + 1}`,
        }))
      : STATIC_GALLERY;

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
            Vibes
          </h1>
        </FadeIn>
        <FadeIn direction="none" delay={0.2}>
          <p className="font-literata text-brand-cream/70 text-[16px] mt-8 max-w-3xl leading-relaxed">
            Reunion Cocktails &amp; Provisions is a social dining experience in Hershey
            centered around inspired dishes, handcrafted cocktails, and a space designed
            for connection. Warm, modern, and intentionally composed, Reunion brings
            together seasonal plates, curated cocktails, and an atmosphere that evolves
            throughout the evening. Whether you&apos;re joining us for drinks at the bar
            or settling in for a full dining experience, the invitingly moody warmth and
            layers of intentional lighting encourage conversation to linger and moments
            to be shared.
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.3}>
          <p className="font-literata text-brand-cream/45 text-[16px] mt-4 max-w-3xl leading-relaxed">
            Below, we welcome you to explore the inspiration behind Reunion and the
            details that helped shape the space.
          </p>
        </FadeIn>
      </div>

      {/* Gallery — masonry grid */}
      <div className="columns-2 md:columns-3 gap-4 md:gap-6 px-6 md:px-10 py-14 md:py-20">
        {gallery.map(({ src, w, h, alt }, i) => (
          <FadeIn
            key={src}
            direction="none"
            delay={Math.min(i * 0.05, 0.4)}
            className="mb-4 md:mb-6 break-inside-avoid"
          >
            <div className="relative overflow-hidden group">
              <Image
                src={src}
                alt={alt}
                width={w}
                height={h}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </FadeIn>
        ))}
      </div>

      {/* CTA */}
      <div className="border-t border-brand-cream/10 px-6 py-16 md:py-20 flex flex-col items-center gap-4 text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/35">
            1201 W Chocolate Ave, Hummelstown, PA 17036
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.1}>
          <Button href={RESERVATIONS_URL} external>Reserve a Table</Button>
        </FadeIn>
      </div>

    </div>
  );
}
