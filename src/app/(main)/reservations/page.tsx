import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

// ← Swap this URL when the booking link is confirmed
const BOOKING_URL = "#";

export const metadata = {
  title: "Reservations — Reunion Cocktails + Provisions",
};

export default function ReservationsPage() {
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
            Reservations
          </h1>
        </FadeIn>
        <FadeIn direction="none" delay={0.2}>
          <p className="font-literata text-brand-cream/50 text-[18px] mt-6 max-w-md leading-relaxed">
            Reserve your table online. For parties of 8 or more, please contact us directly.
          </p>
        </FadeIn>
      </div>

      {/* CTA */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6 py-24">
        <FadeIn direction="none">
          <Button href={BOOKING_URL} external>
            Book a Table
          </Button>
        </FadeIn>

        <FadeIn direction="none" delay={0.1}>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-platypi text-[10px] tracking-[0.25em] uppercase text-brand-cream/30">
              Large parties &amp; private events
            </p>
            <a
              href="mailto:manager@reunioncocktailsprovisions.com"
              className="font-literata text-[18px] text-brand-cream/50 hover:text-brand-cream transition-colors duration-200"
            >
              manager@reunioncocktailsprovisions.com
            </a>
          </div>
        </FadeIn>
      </div>

    </div>
  );
}
