"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/Button";

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

      <div className="absolute inset-0 bg-black/50" />

      {/* Logo — floats between nav and hero text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 3.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: "calc(18% - 25px)" }}
      >
        <Image
          src="/logo.png"
          alt="Reunion"
          width={40}
          height={40}
          className="w-[40px] h-auto"
          priority
        />
      </motion.div>

      {/* Text + buttons — anchored at 33% */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 text-center flex flex-col items-center" style={{ top: "calc(33% - 25px)" }}>
        <AnimatedWord
          text="Reunion"
          baseDelay={3.7}
          className="font-servus font-light text-brand-cream/80 text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-wide uppercase"
        />

        <AnimatedWord
          text="Cocktails + Kitchen"
          baseDelay={4.05}
          className="font-platypi text-brand-cream/60 text-[clamp(0.75rem,1.6vw,1.1rem)] leading-[0.9] tracking-[0.3em] uppercase mt-3.5"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 mt-16"
        >
          <Button href="/reservations">Reservations</Button>
          <Button href="/menus">View Menus</Button>
        </motion.div>
      </div>
    </section>
  );
}
