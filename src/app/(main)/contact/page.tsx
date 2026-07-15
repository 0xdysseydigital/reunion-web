import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { RESERVATIONS_URL } from "@/lib/constants";

const EMAIL = "manager@reunioncocktailsprovisions.com";
const PHONE = "(717) 918-0018";
const PHONE_URL = "tel:+17179180018";
const ADDRESS = "1201 W Chocolate Ave, Hummelstown, PA 17036";
const MAPS_URL = "https://maps.google.com/?q=1201+W+Chocolate+Ave+Hummelstown+PA+17036";
const INSTAGRAM_URL = "https://www.instagram.com/reunioncocktailsprovisions/";
const FACEBOOK_URL = "https://www.facebook.com/reunioncocktailsandprovisions";

export const metadata = {
  title: "Contact — Reunion Cocktails + Provisions",
};

export default function ContactPage() {
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
            Contact
          </h1>
        </FadeIn>
        <FadeIn direction="none" delay={0.2}>
          <p className="font-literata text-brand-cream/70 text-[16px] mt-8 max-w-xl leading-relaxed">
            Questions, private events, or anything else — we&apos;d love to hear from you.
          </p>
        </FadeIn>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col items-center gap-16 px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 max-w-2xl w-full text-center sm:text-left">
          <FadeIn direction="none">
            <ContactBlock label="Address">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-literata text-[18px] text-brand-cream/85 hover:text-brand-cream transition-colors duration-200"
              >
                {ADDRESS}
              </a>
            </ContactBlock>
          </FadeIn>

          <FadeIn direction="none" delay={0.05}>
            <ContactBlock label="Phone">
              <a
                href={PHONE_URL}
                className="font-literata text-[18px] text-brand-cream/85 hover:text-brand-cream transition-colors duration-200"
              >
                {PHONE}
              </a>
            </ContactBlock>
          </FadeIn>

          <FadeIn direction="none" delay={0.1}>
            <ContactBlock label="Email">
              <a
                href={`mailto:${EMAIL}`}
                className="font-literata text-[18px] text-brand-cream/85 hover:text-brand-cream transition-colors duration-200 break-words"
              >
                {EMAIL}
              </a>
            </ContactBlock>
          </FadeIn>

          <FadeIn direction="none" delay={0.15}>
            <ContactBlock label="Follow">
              <div className="flex flex-col gap-1 items-center sm:items-start">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-literata text-[18px] text-brand-cream/85 hover:text-brand-cream transition-colors duration-200"
                >
                  Instagram
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-literata text-[18px] text-brand-cream/85 hover:text-brand-cream transition-colors duration-200"
                >
                  Facebook
                </a>
              </div>
            </ContactBlock>
          </FadeIn>
        </div>

        <FadeIn direction="none" delay={0.2}>
          <div className="text-center">
            <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-3">
              Hours
            </p>
            <div className="space-y-1.5">
              <HoursRow day="Monday – Thursday" hours="Lunch 11:30 AM – 3 PM  |  Dinner 5 PM – 11 PM" />
              <HoursRow day="Friday" hours="Lunch 11:30 AM – 3 PM  |  Dinner 5 PM – 12 AM" />
              <HoursRow day="Saturday" hours="Brunch 9 AM – 3 PM  |  Dinner 5 PM – 12 AM" />
              <HoursRow day="Sunday" hours="Brunch 9 AM – 3 PM" />
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="none" delay={0.25}>
          <Button href={RESERVATIONS_URL} external>Book a Reservation</Button>
        </FadeIn>
      </div>

    </div>
  );
}

function ContactBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

function HoursRow({ day, hours }: { day: string; hours: string }) {
  return (
    <p className="font-literata text-[15px]">
      <span className="font-bold text-brand-cream">{day}: </span>
      <span className="text-brand-cream/70">{hours}</span>
    </p>
  );
}
