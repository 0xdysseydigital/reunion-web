"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useAnimate } from "framer-motion";

const NAV_LINKS = [
  { label: "RESERVATIONS", href: "/reservations" },
  { label: "MENUS", href: "/menus" },
  { label: "VIBES", href: "/vibes" },
  { label: "PRIVATE DINING", href: "/private-dining" },
  { label: "EVENTS", href: "/events" },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const DURATION = 0.5;
const HOME_LABEL = "HOME";

function LogoLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      aria-label="Reunion home"
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: 44, height: 44 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo — slides out upward on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ y: isHovered ? -52 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 1, 1] }}
      >
        <Image src="/logo.png" alt="" width={44} height={44} />
      </motion.div>

      {/* "HOME" — slots in from below on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        {HOME_LABEL.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 52 }}
            animate={{ y: isHovered ? 0 : 52 }}
            transition={{
              duration: isHovered ? 0.38 : 0.22,
              ease: isHovered ? [0.34, 1.5, 0.64, 1] : [0.4, 0, 1, 1],
              delay: isHovered ? i * 0.045 : 0,
            }}
            className="font-servus font-normal text-brand-cream"
            style={{ fontSize: "11px", letterSpacing: "0.1em", display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </Link>
  );
}

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  const [scope, animate] = useAnimate();

  const handleEnter = () => {
    if (scope.current) scope.current.style.transformOrigin = "left";
    animate(scope.current, { scaleX: 1 }, { duration: DURATION, ease: EASE });
  };

  const handleLeave = async () => {
    if (scope.current) scope.current.style.transformOrigin = "right";
    await animate(scope.current, { scaleX: 0 }, { duration: DURATION, ease: EASE });
    if (scope.current) scope.current.style.transformOrigin = "left";
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative font-servus text-[21px] font-normal tracking-[0.06em] transition-colors duration-200 ${
        active ? "text-brand-cream/35" : "text-brand-cream/80 hover:text-brand-cream"
      }`}
    >
      {label}
      <span
        ref={scope}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-cream origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 h-28 bg-brand-bg flex items-center justify-between px-10"
      aria-label="Main navigation"
    >
      <LogoLink />

      <ul className="hidden md:flex items-center gap-12 list-none m-0 p-0">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <NavLink label={label} href={href} active={pathname === href} />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 flex-shrink-0">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-cream/40 text-brand-cream/75 hover:text-brand-cream hover:border-brand-cream transition-colors duration-200"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-cream/40 text-brand-cream/75 hover:text-brand-cream hover:border-brand-cream transition-colors duration-200"
        >
          <FacebookIcon />
        </a>
      </div>
    </nav>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
