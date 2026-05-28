"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

// ─── Image Scene ────────────────────────────────────────────────────────────

function ImageScene({ src }: { src: string }) {
  return (
    <section className="h-screen relative overflow-hidden">
      <Image src={src} alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/25" />
    </section>
  );
}

// ─── Scroll Cue ─────────────────────────────────────────────────────────────

function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <motion.div
      style={{ opacity, bottom: "clamp(3rem, 8vh, 5rem)" }}
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="font-platypi text-[10px] tracking-[0.3em] uppercase text-brand-cream/40">
        Scroll
      </span>
      <motion.div
        className="w-[1px] h-10 bg-brand-cream/30 origin-top"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function VibesPage() {
  return (
    <div className="bg-brand-bg">

      {/* 1 — Hero */}
      <section className="h-[100svh] relative overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute left-10 md:left-16 z-10" style={{ bottom: "clamp(8rem, 22vh, 14rem)" }}>
          <FadeIn direction="none" delay={0.2}>
            <p className="font-platypi text-[11px] tracking-[0.35em] uppercase text-brand-cream/40 mb-3">
              Reunion — Hummelstown, PA
            </p>
            <h1
              className="font-servus font-light text-brand-cream/90 leading-none uppercase"
              style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
            >
              Vibes
            </h1>
          </FadeIn>
        </div>

        <ScrollCue />
      </section>

      {/* 2 — Image */}
      <ImageScene src="/images/info-interior.png" />

      {/* 3 — Text: A place to settle in */}
      <section className="min-h-[70vh] bg-brand-bg flex flex-col items-center justify-center px-10 py-24">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.35em] uppercase text-brand-cream/30 text-center mb-6">
            Est. Hummelstown
          </p>
          <p
            className="font-servus font-light text-brand-cream/90 text-center leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            A place to settle in.
          </p>
        </FadeIn>
      </section>

      {/* 4 — Image */}
      <ImageScene src="/spaces/garden.png" />

      {/* 5 — Text: Good drinks / Better company */}
      <section className="min-h-[80vh] bg-brand-bg flex flex-col justify-center px-10 md:px-20 py-24 overflow-hidden">
        <FadeIn direction="up" delay={0}>
          <p
            className="font-servus font-light text-brand-cream/45 leading-none"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
          >
            Good drinks.
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.15}>
          <p
            className="font-servus font-light text-brand-cream/95 leading-none mt-2 md:ml-[8vw]"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            Better company.
          </p>
        </FadeIn>
      </section>

      {/* 6 — Image */}
      <ImageScene src="/spaces/den.png" />

      {/* 7 — Closing: Come as you are */}
      <section className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-10 py-24">
        <FadeIn direction="none" delay={0}>
          <p
            className="font-servus font-light text-brand-cream/35 text-center leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Come
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.1}>
          <p
            className="font-servus font-light text-brand-cream/95 text-center leading-none"
            style={{ fontSize: "clamp(4rem, 11vw, 10rem)" }}
          >
            as you are.
          </p>
        </FadeIn>

        <FadeIn direction="none" delay={0.3} className="w-full max-w-sm mt-20">
          <div className="border-t border-brand-cream/15 pt-10 flex flex-col items-center gap-4 text-center">
            <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/35">
              1201 W Chocolate Ave, Hummelstown, PA 17036
            </p>
            <Button href="/reservations">Reserve a Table</Button>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
