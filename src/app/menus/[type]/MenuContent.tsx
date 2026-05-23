"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuItemCard from "@/components/MenuItemCard";
import type { MenuItem } from "@/types/menu";

export default function MenuContent({
  items,
  sections,
}: {
  items: MenuItem[];
  sections: string[];
}) {
  const [activeSection, setActiveSection] = useState(sections[0] ?? "");

  const visibleItems = useMemo(
    () => items.filter((i) => i.section === activeSection),
    [items, activeSection]
  );

  return (
    <div className="flex flex-col flex-1">
      {/* Sticky section tabs */}
      <div className="sticky top-28 z-40 bg-brand-bg border-b border-brand-cream/10">
        <div
          className="flex overflow-x-auto px-6 md:px-10"
          style={{ scrollbarWidth: "none" }}
        >
          {sections.map((section) => {
            const active = section === activeSection;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-shrink-0 py-4 px-4 font-platypi text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 border-b-2 ${
                  active
                    ? "text-brand-cream border-brand-cream"
                    : "text-brand-cream/40 border-transparent hover:text-brand-cream/70"
                }`}
              >
                {section}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items grid */}
      <div className="px-6 md:px-10 py-10 md:py-14 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {visibleItems.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                  duration: 0.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: Math.min(i * 0.07, 0.35),
                }}
              >
                <MenuItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
