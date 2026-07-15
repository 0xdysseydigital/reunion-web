"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { RESERVATIONS_URL } from "@/lib/constants";

function AnimatedWord({ text, className, baseDelay }: { text: string; className: string; baseDelay: number }) {
  return (
    <p className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: baseDelay + i * 0.048,
            duration: 0.55,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </p>
  );
}

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/35" />

      {/* Text + buttons — anchored at 33%. Delays are timed to the LoadingScreen exit (~1.9s) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 text-center flex flex-col items-center" style={{ top: "calc(33% - 53px)" }}>
        <AnimatedWord
          text="Reunion"
          baseDelay={1.68}
          className="font-servus font-light text-brand-cream/80 text-[clamp(2rem,9vw,9rem)] leading-[0.9] tracking-wide uppercase whitespace-nowrap"
        />

        <AnimatedWord
          text="cocktails + provisions"
          baseDelay={1.84}
          className="font-platypi text-brand-cream/60 text-[clamp(0.75rem,1.6vw,1.1rem)] leading-[0.9] tracking-[0.3em] mt-3.5"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 mt-16"
        >
          <Button href={RESERVATIONS_URL} external>Reservations</Button>
          <Button href="/menus">View Menus</Button>
        </motion.div>
      </div>
    </section>
  );
}
