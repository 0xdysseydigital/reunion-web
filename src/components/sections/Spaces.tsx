"use client";

import { useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const SPACES = [
  { label: "DRINK + FARE", src: "/spaces/drink-fare.png", slug: "drink-fare" },
  { label: "THE LOUNGE",   src: "/spaces/lounge.jpg",     slug: "the-lounge" },
  { label: "THE DEN",      src: "/spaces/den.png",        slug: "the-den" },
  { label: "THE LIBRARY",  src: "/spaces/library.png",    slug: "the-library" },
  { label: "THE ATRIUM",   src: "/spaces/atrium.png",     slug: "the-atrium" },
  { label: "THE GARDEN",   src: "/spaces/garden.png",     slug: "the-garden" },
];

export default function Spaces() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="bg-brand-bg" aria-label="Our spaces">

      {/* Mobile — simple stacked rows */}
      <div className="flex flex-col md:hidden">
        {SPACES.map(({ label, src, slug }) => (
          <div
            key={slug}
            className="relative aspect-[4/3] overflow-hidden block"
          >
            <Image src={src} alt={label} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <span className="font-servus font-normal text-brand-cream text-[1rem] tracking-[0.15em] uppercase">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — expand-on-hover */}
      <div className="hidden md:flex md:h-[60vh]">
        {SPACES.map(({ label, src, slug }, i) => {
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
                <div
                  className="relative block h-full overflow-hidden"
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setHoveredSlug(slug); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredSlug(null); }}
                >
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover"
                    style={{
                      filter: isHovered ? "brightness(1.2)" : "brightness(1)",
                      transition: "filter 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
                      {label}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          );
        })}
      </div>

    </section>
  );
}
