import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { RESERVATIONS_URL, PHONE, PHONE_URL } from "@/lib/constants";

const EMAIL = "manager@reunioncocktailsprovisions.com";
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

      {/* Details — presented like a menu list */}
      <div className="flex-1 flex flex-col items-center px-6 py-16 md:py-24">
        <div className="max-w-xl w-full">
          <FadeIn direction="none">
            <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 border-b border-brand-cream/20 pb-3">
              Details
            </p>
          </FadeIn>

          <div>
            <ContactRow delay={0.05} label="Address" value={ADDRESS} href={MAPS_URL} external />
            <ContactRow delay={0.1} label="Phone" value={PHONE} href={PHONE_URL} />
            <ContactRow delay={0.15} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <ContactRow delay={0.2} label="Instagram" value="@reunioncocktailsprovisions" href={INSTAGRAM_URL} external />
            <ContactRow delay={0.25} label="Facebook" value="Reunion Cocktails + Provisions" href={FACEBOOK_URL} external />
          </div>

          <FadeIn direction="none" delay={0.3}>
            <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 border-b border-brand-cream/20 pb-3 mt-12">
              Hours
            </p>
          </FadeIn>

          <div>
            <HoursRow delay={0.3} day="Monday – Thursday" hours="Lunch 11:30 AM – 3 PM  |  Dinner 5 PM – 11 PM" />
            <HoursRow delay={0.32} day="Friday" hours="Lunch 11:30 AM – 3 PM  |  Dinner 5 PM – 12 AM" />
            <HoursRow delay={0.34} day="Saturday" hours="Brunch 9 AM – 3 PM  |  Dinner 5 PM – 12 AM" />
            <HoursRow delay={0.36} day="Sunday" hours="Brunch 9 AM – 3 PM" />
          </div>
        </div>

        <FadeIn direction="none" delay={0.4}>
          <div className="mt-16">
            <Button href={RESERVATIONS_URL} external>Book a Reservation</Button>
          </div>
        </FadeIn>
      </div>

    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  external = false,
  delay = 0,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  delay?: number;
}) {
  return (
    <FadeIn direction="none" delay={delay}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-baseline justify-between gap-6 py-5 border-b border-brand-cream/10 group"
      >
        <span className="font-platypi text-[11px] tracking-[0.25em] uppercase text-brand-cream/40 flex-shrink-0">
          {label}
        </span>
        <span className="font-servus font-light text-[20px] text-brand-cream text-right break-words min-w-0 group-hover:text-brand-cream/60 transition-colors duration-200">
          {value}
        </span>
      </a>
    </FadeIn>
  );
}

function HoursRow({ day, hours, delay = 0 }: { day: string; hours: string; delay?: number }) {
  return (
    <FadeIn direction="none" delay={delay}>
      <div className="flex items-baseline justify-between gap-6 py-4 border-b border-brand-cream/10">
        <span className="font-servus font-light text-[18px] text-brand-cream flex-shrink-0">
          {day}
        </span>
        <span className="font-literata text-[15px] text-brand-cream/60 text-right">
          {hours}
        </span>
      </div>
    </FadeIn>
  );
}
