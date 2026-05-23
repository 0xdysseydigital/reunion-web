"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const FAST_OUT = [0.55, 0, 1, 1] as const;

function SlotRow({
  text,
  isHovered,
  direction,
  delay = 0,
  stagger = 0,
  spanClass = "",
  wrapperClass = "",
  spanStyle,
}: {
  text: string;
  isHovered: boolean;
  direction: "exit" | "enter";
  delay?: number;
  stagger?: number;
  spanClass?: string;
  wrapperClass?: string;
  spanStyle?: React.CSSProperties;
}) {
  return (
    <div className={`overflow-hidden flex ${wrapperClass}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{
            y: isHovered
              ? direction === "exit" ? "-115%" : "0%"
              : direction === "exit" ? "0%"  : "115%",
          }}
          transition={{
            duration: direction === "exit"
              ? (isHovered ? 0.26 : 0.32)
              : (isHovered ? 0.38 : 0.22),
            ease: isHovered
              ? (direction === "exit" ? FAST_OUT : EASE)
              : (direction === "exit" ? EASE   : FAST_OUT),
            delay: isHovered ? delay + i * stagger : 0,
          }}
          className={spanClass}
          style={{ display: "inline-block", whiteSpace: "pre", ...spanStyle }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

type Props = {
  type: string;
  label: string;
  tagline: string;
  image: string;
};

export default function MenuHubCard({ type, label, tagline, image }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
  };

  return (
    <Link
      href={`/menus/${type}`}
      className="relative flex h-[45vh] min-h-[280px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isHovered ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.50)",
          transition: "background-color 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* EXIT layer — normal state */}
      <div className="absolute bottom-0 left-0 p-8 md:p-10 flex flex-col gap-1">
        <SlotRow
          text={tagline}
          isHovered={isHovered}
          direction="exit"
          delay={0.07}
          spanClass="font-platypi text-[10px] tracking-[0.25em] uppercase text-brand-cream/45"
        />
        <SlotRow
          text={label.toUpperCase()}
          isHovered={isHovered}
          direction="exit"
          delay={0}
          stagger={0.028}
          spanClass="font-servus font-light leading-none uppercase text-brand-cream/90"
          spanStyle={titleStyle}
        />
      </div>

      {/* ENTER layer — hover state */}
      <div className="absolute bottom-0 left-0 p-8 md:p-10 flex flex-col gap-1">
        <SlotRow
          text={`${label.toUpperCase()} MENU`}
          isHovered={isHovered}
          direction="enter"
          delay={0.1}
          stagger={0.022}
          spanClass="font-platypi text-[10px] tracking-[0.25em] uppercase text-brand-cream/65"
        />
        <div className="overflow-hidden mt-2">
          <motion.div
            initial={false}
            animate={{ y: isHovered ? "0%" : "115%" }}
            transition={{
              duration: isHovered ? 0.38 : 0.22,
              ease: isHovered ? EASE : FAST_OUT,
              delay: isHovered ? 0.32 : 0,
            }}
          >
            <svg
              viewBox="0 0 68 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand-cream"
              style={{ width: "clamp(48px, 7vw, 68px)", height: "auto" }}
            >
              <line x1="0" y1="7" x2="56" y2="7" stroke="currentColor" strokeWidth="0.75" />
              <path d="M51 1.5 L63 7 L51 12.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
