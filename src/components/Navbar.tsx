"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useAnimate, AnimatePresence } from "framer-motion";

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
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ y: isHovered ? -52 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 1, 1] }}
      >
        <Image src="/logo.png" alt="" width={44} height={44} />
      </motion.div>

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

function HamburgerIcon() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true">
      <line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-28 bg-brand-bg flex items-center justify-between px-8 md:px-10"
        aria-label="Main navigation"
      >
        <LogoLink />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-12 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <NavLink label={label} href={href} active={pathname === href} />
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Social icons — desktop only */}
          <div className="hidden md:flex items-center gap-3">
            <SocialLink href="https://instagram.com" label="Instagram"><InstagramIcon /></SocialLink>
            <SocialLink href="https://facebook.com" label="Facebook"><FacebookIcon /></SocialLink>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-brand-cream/80 hover:text-brand-cream transition-colors duration-200"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[340px] z-50 bg-brand-bg border-l border-brand-cream/10 flex flex-col md:hidden"
            >
              {/* Drawer header — matches navbar height */}
              <div className="h-28 flex items-center justify-end px-8">
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center text-brand-cream/50 hover:text-brand-cream transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col flex-1 px-10 pt-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.07,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={href}
                      className={`block py-5 font-servus font-light text-[1.75rem] leading-none tracking-wide uppercase border-b border-brand-cream/10 transition-colors duration-200 ${
                        pathname === href
                          ? "text-brand-cream/30"
                          : "text-brand-cream/75 hover:text-brand-cream"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="flex items-center gap-5 px-10 pb-12"
              >
                <SocialLink href="https://instagram.com" label="Instagram"><InstagramIcon /></SocialLink>
                <SocialLink href="https://facebook.com" label="Facebook"><FacebookIcon /></SocialLink>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-cream/40 text-brand-cream/75 hover:text-brand-cream hover:border-brand-cream transition-colors duration-200"
    >
      {children}
    </a>
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
