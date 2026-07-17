"use client";

import { useState, useMemo } from "react";
import FadeIn from "@/components/FadeIn";
import MenuItemCard from "@/components/MenuItemCard";
import { ALLERGENS } from "@/types/menu";
import type { MenuItem, Allergen, Dietary } from "@/types/menu";

const DIETARY_OPTIONS: Dietary[] = ["Vegan", "Vegetarian"];

export default function AllergensFilter({ items }: { items: MenuItem[] }) {
  const [query, setQuery] = useState("");
  const [avoid, setAvoid] = useState<Allergen[]>([]);
  const [dietary, setDietary] = useState<Dietary[]>([]);

  const toggleAvoid = (tag: Allergen) => {
    setAvoid((prev) =>
      prev.includes(tag) ? prev.filter((a) => a !== tag) : [...prev, tag]
    );
  };

  const toggleDietary = (tag: Dietary) => {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((a) => a !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q);
      // "Avoid" tags exclude any dish that contains them.
      const matchesAvoid = !avoid.some((tag) =>
        (item.allergens ?? []).some((entry) => entry.allergen === tag)
      );
      // Dietary tags are a positive match — the dish must carry all selected tags.
      const matchesDietary = dietary.every((tag) =>
        (item.dietary ?? []).includes(tag)
      );
      return matchesSearch && matchesAvoid && matchesDietary;
    });
  }, [items, query, avoid, dietary]);

  const filterCount = avoid.length + dietary.length + (query.trim() ? 1 : 0);

  return (
    <>
      {/* Controls */}
      <FadeIn direction="up" delay={0.1} className="px-6 md:px-10 pt-10 pb-6 border-b border-brand-cream/10 flex flex-col gap-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes…"
          className="w-full bg-transparent border-b border-brand-cream/20 pb-2 font-literata text-[15px] text-brand-cream placeholder:text-brand-cream/25 outline-none focus:border-brand-cream/50 transition-colors duration-200"
        />

        <div className="flex flex-col gap-3">
          <p className="font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/35">
            Avoid
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {ALLERGENS.map((tag) => {
              const on = avoid.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleAvoid(tag)}
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
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/35">
            Dietary
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {DIETARY_OPTIONS.map((tag) => {
              const on = dietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
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
        </div>

        {filterCount > 0 && (
          <p className="font-platypi text-[10px] tracking-[0.15em] uppercase text-brand-cream/40">
            {filterCount} filter{filterCount !== 1 ? "s" : ""} active — showing {filtered.length} dish{filtered.length !== 1 ? "es" : ""}
          </p>
        )}

        <p className="font-literata text-[13px] text-brand-cream/35 italic">
          Tap a badge on a dish below for the specific ingredient and whether it can be substituted.
        </p>
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
              onClick={() => { setAvoid([]); setDietary([]); setQuery(""); }}
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
    </>
  );
}
