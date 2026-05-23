"use client";

import { useState, useMemo } from "react";
import FadeIn from "@/components/FadeIn";
import MenuItemCard from "@/components/MenuItemCard";
import { menuItems } from "@/data/menu";
import { ALLERGENS } from "@/types/menu";
import type { Allergen } from "@/types/menu";

export default function AllergensPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Allergen[]>([]);

  const toggleAllergen = (tag: Allergen) => {
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((a) => a !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return menuItems.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesAllergens = active.every((tag) =>
        item.allergens.includes(tag)
      );
      return matchesSearch && matchesAllergens;
    });
  }, [query, active]);

  const filterCount = active.length + (query.trim() ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="border-b border-brand-cream/10 px-6 md:px-10 py-12 md:py-16 flex flex-col items-center text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
            Dietary
          </p>
          <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
            Allergen Guide
          </h1>
          <p className="font-literata text-brand-cream/50 text-[15px] mt-5 max-w-sm leading-relaxed text-center mx-auto">
            Select your dietary requirements below. We&apos;ll show every dish that meets all of them.
          </p>
        </FadeIn>
      </div>

      {/* Controls */}
      <FadeIn direction="up" delay={0.1} className="px-6 md:px-10 pt-10 pb-6 border-b border-brand-cream/10 flex flex-col gap-6">
        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes…"
          className="w-full bg-transparent border-b border-brand-cream/20 pb-2 font-literata text-[15px] text-brand-cream placeholder:text-brand-cream/25 outline-none focus:border-brand-cream/50 transition-colors duration-200"
        />

        {/* Allergen toggles */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {ALLERGENS.map((tag) => {
            const on = active.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleAllergen(tag)}
                className={`flex-shrink-0 font-platypi text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 transition-colors duration-200 ${
                  on
                    ? "bg-brand-cream text-brand-bg"
                    : "border border-brand-cream/25 text-brand-cream/50 hover:border-brand-cream/50 hover:text-brand-cream/80"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Filter summary */}
        {filterCount > 0 && (
          <p className="font-platypi text-[10px] tracking-[0.15em] uppercase text-brand-cream/40">
            {filterCount} filter{filterCount !== 1 ? "s" : ""} active — showing {filtered.length} dish{filtered.length !== 1 ? "es" : ""}
          </p>
        )}
      </FadeIn>

      {/* Results */}
      <div className="px-6 md:px-10 py-10 md:py-14 flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-servus font-light text-[clamp(1.5rem,3vw,2.5rem)] text-brand-cream/30 leading-none">
              Nothing matches
            </p>
            <p className="font-servus font-light text-[clamp(1.5rem,3vw,2.5rem)] text-brand-cream/30 leading-none">
              those filters.
            </p>
            <button
              onClick={() => { setActive([]); setQuery(""); }}
              className="mt-8 font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/40 hover:text-brand-cream transition-colors duration-200 border-b border-brand-cream/20 pb-0.5"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((item) => (
              <MenuItemCard key={item.slug} item={item} showMenuType />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
