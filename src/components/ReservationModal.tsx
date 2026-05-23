"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReservation } from "@/context/ReservationContext";

export default function ReservationModal() {
  const { isOpen, closeModal } = useReservation();
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  // Inject on first open so widget initialises in a visible, sized container
  useEffect(() => {
    if (!isOpen || injected.current || !containerRef.current) return;
    injected.current = true;

    const wrapper = document.createElement("div");
    wrapper.style.width = "1000px";
    wrapper.style.display = "inline-block";

    const script = document.createElement("script");
    script.id = "dine_script_tag_booker";
    script.src =
      "https://www.tbdine.com/inject/booker?format=1row&name=reunion-cocktails-provisions&idApp=68801&force=true&language=en-us";
    script.type = "text/javascript";

    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[148] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          />
        )}
      </AnimatePresence>

      {/* Card — always in DOM so widget stays alive */}
      <div
        className={`fixed inset-0 z-[149] flex items-center justify-center pointer-events-none`}
        aria-hidden={!isOpen}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <motion.div
          className="relative bg-brand-bg border border-brand-cream/20 w-[480px] flex flex-col pointer-events-auto overflow-hidden"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-brand-cream/10">
            <span className="font-servus font-light text-[11px] tracking-[0.3em] uppercase text-brand-cream/50">
              Make a Reservation
            </span>
            <button
              onClick={closeModal}
              aria-label="Close"
              className="font-servus text-[13px] tracking-[0.1em] text-brand-cream/40 hover:text-brand-cream transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          {/* Widget */}
          <div ref={containerRef} className="px-8 py-8 w-full" />
        </motion.div>
      </div>
    </>
  );
}
