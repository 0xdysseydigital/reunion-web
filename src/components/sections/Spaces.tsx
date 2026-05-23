"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const SPACES = [
  { label: "DRINK + FARE", src: "/spaces/drink-fare.png", href: "/menus",                      slug: "drink-fare" },
  { label: "THE LOUNGE",   src: "/spaces/lounge.jpg",     href: "/private-dining#the-lounge",  slug: "the-lounge" },
  { label: "THE DEN",      src: "/spaces/den.png",        href: "/private-dining#the-den",     slug: "the-den" },
  { label: "THE LIBRARY",  src: "/spaces/library.png",    href: "/private-dining#the-library", slug: "the-library" },
  { label: "THE ATRIUM",   src: "/spaces/atrium.png",     href: "/private-dining#the-atrium",  slug: "the-atrium" },
  { label: "THE GARDEN",   src: "/spaces/garden.png",     href: "/private-dining#the-garden",  slug: "the-garden" },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const EXPLORE = "Explore More";

function SlotText({ label, isHovered }: { label: string; isHovered: boolean }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "1.4em" }}
      aria-label={isHovered ? EXPLORE : label}
    >
      {/* Label — exits upward on hover */}
      <div className="absolute inset-0 flex items-center justify-center gap-0" aria-hidden="true">
        {label.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ y: isHovered ? "-120%" : "0%" }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.025 }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* "Explore More" — enters from below on hover */}
      <div className="absolute inset-0 flex items-center justify-center gap-0" aria-hidden="true">
        {EXPLORE.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ y: isHovered ? "0%" : "120%" }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.025 }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function Spaces() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="bg-brand-bg" aria-label="Our spaces">

      {/* Mobile — simple stacked rows */}
      <div className="flex flex-col md:hidden">
        {SPACES.map(({ label, src, href, slug }) => (
          <Link
            key={slug}
            href={href}
            className="relative aspect-[4/3] overflow-hidden block"
          >
            <Image src={src} alt={label} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <span className="font-servus font-normal text-brand-cream text-[1rem] tracking-[0.15em] uppercase">
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop — expand-on-hover */}
      <div className="hidden md:flex md:h-[60vh]">
        {SPACES.map(({ label, src, href, slug }, i) => {
          const isHovered = hoveredSlug === slug;
          const isShrunk = hoveredSlug !== null && !isHovered;
          const flexGrow = isHovered ? 5 : isShrunk ? 0.4 : 1;

          return (
            <div
              key={slug}
              className="aspect-[4/3] md:aspect-auto overflow-hidden"
              style={{
                flexGrow,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                transition: "flex-grow 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <FadeIn direction="none" delay={i * 0.08} className="h-full">
                <Link
                  href={href}
                  className="relative block h-full overflow-hidden cursor-pointer"
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setHoveredSlug(slug); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredSlug(null); }}
                >
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover"
                    style={{
                      transform: isHovered ? "scale(1.07)" : "scale(1)",
                      filter: isHovered ? "brightness(1.2)" : "brightness(1)",
                      transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: isHovered ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.5)",
                      transition: "background-color 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                  {/* Brightness bloom on hover */}
                  <div
                    className="absolute inset-0 bg-white/8"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="w-full text-center font-servus font-normal text-[clamp(14px,2.2vw,22px)] tracking-[0.15em] text-brand-cream uppercase">
                      <SlotText label={label} isHovered={isHovered} />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>
          );
        })}
      </div>

    </section>
  );
}
