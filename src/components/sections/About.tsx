import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function About() {
  return (
    <section
      className="relative bg-brand-bg px-6 md:pl-[75px] md:pr-10 py-24 md:py-40 overflow-hidden"
      aria-label="About Reunion"
    >
      {/* Logo watermark — right side */}
      <div
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[55vw] max-w-[680px] pointer-events-none select-none opacity-[0.02]"
        aria-hidden="true"
      >
        <Image src="/logo.png" alt="" width={680} height={680} className="w-full h-auto" />
      </div>

      <div className="relative z-10 max-w-[600px]">
        <FadeIn>
          <h1 className="font-servus font-light text-[clamp(2.5rem,8vw,4rem)] leading-[1.1] tracking-[-0.5px] text-brand-cream uppercase">
            REUNION
          </h1>
          <p className="font-servus font-light text-[clamp(0.85rem,2vw,1.1rem)] leading-[1.4] text-brand-cream mt-[5px] mb-10">
            cocktails + provisions
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h2 className="font-literata text-[16px] font-normal text-brand-cream mb-5 leading-[1.5]">
            Social Dining Experience &amp; Craft Cocktails in Hershey, Pennsylvania
          </h2>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="font-literata text-[16px] leading-[1.6] text-brand-cream/70 max-w-[480px]">
            Reunion Cocktails &amp; Provisions is a social dining experience in Hershey
            centered around inspired dishes, handcrafted cocktails, and a space
            designed for connection. Warm, modern, and intentionally composed,
            Reunion brings together inspired gastropub fare, curated cocktails, and
            an atmosphere that evolves throughout the evening.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
