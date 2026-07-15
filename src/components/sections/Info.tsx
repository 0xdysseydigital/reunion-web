import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export default function Info() {
  return (
    <section
      className="bg-brand-bg flex flex-col md:flex-row"
      aria-labelledby="info-heading"
    >
      {/* Left — interior photo */}
      <FadeIn
        direction="left"
        className="w-full md:w-[40%] min-h-[400px] md:min-h-[600px] flex-shrink-0 relative overflow-hidden"
      >
        <Image
          src="/images/info-interior.png"
          alt="Reunion interior"
          fill
          className="object-cover"
        />
      </FadeIn>

      {/* Right — content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-20 md:py-24">
        <FadeIn delay={0.1}>
          <h2
            id="info-heading"
            className="font-servus font-light text-[clamp(1.5rem,4.5vw,2.5rem)] leading-[1.3] text-brand-cream mb-8"
          >
            Location &amp; Hours
          </h2>

          <p className="font-literata text-[18px] text-brand-cream/85 mb-8">
            1201 W Chocolate Ave, Hummelstown, PA 17036
          </p>

          <div className="space-y-3 mb-8">
            <HoursRow day="Monday – Thursday" hours="Lunch 11:30 AM – 3 PM  |  Dinner 5 PM – 11 PM" />
            <HoursRow day="Friday" hours="Lunch 11:30 AM – 3 PM  |  Dinner 5 PM – 12 AM" />
            <HoursRow day="Saturday" hours="Brunch 9 AM – 3 PM  |  Dinner 5 PM – 12 AM" />
            <HoursRow day="Sunday" hours="Brunch 9 AM – 3 PM" />
          </div>

          <p className="font-literata text-[15px] italic text-brand-cream/55 mb-10">
            Our Evening Fare Kitchen Menu is available during the final two hours of
            dinner service each night.
          </p>

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <Button href="/reservations">Book a Reservation</Button>
            <Button
              href="https://maps.google.com/?q=1201+W+Chocolate+Ave+Hummelstown+PA+17036"
              external
            >
              Get Directions
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HoursRow({ day, hours }: { day: string; hours: string }) {
  return (
    <div>
      <span className="font-literata text-[15px] font-bold text-brand-cream">{day}: </span>
      <span className="font-literata text-[15px] text-brand-cream/70">{hours}</span>
    </div>
  );
}
