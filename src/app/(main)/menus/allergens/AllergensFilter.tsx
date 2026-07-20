"use client";

import { useState, useMemo } from "react";
import { ALLERGENS, MENU_LABELS } from "@/types/menu";
import type { MenuItem, Allergen, AllergenEntry } from "@/types/menu";

function substitutionNote(entry: AllergenEntry): string | null {
  if (entry.substitutable === "Yes") {
    return entry.substituteSuggestion
      ? `substitute: ${entry.substituteSuggestion}`
      : "can be substituted";
  }
  if (entry.substitutable === "Unclear") {
    return entry.substituteSuggestion
      ? `${entry.substituteSuggestion} — confirm with your server`
      : "confirm with your server";
  }
  return null;
}

type Tier = "large" | "wide" | "small";

function tierOf(item: MenuItem): Tier {
  const weight =
    item.allergens.length * 2 + Math.ceil((item.description?.length ?? 0) / 40);
  if (weight >= 6) return "large";
  if (weight >= 3) return "wide";
  return "small";
}

const SPAN_CLASSES: Record<Tier, string> = {
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  small: "col-span-1 row-span-1",
};

export default function AllergensFilter({ items }: { items: MenuItem[] }) {
  const [query, setQuery] = useState("");
  const [avoid, setAvoid] = useState<Allergen[]>([]);

  const toggleAvoid = (tag: Allergen) => {
    setAvoid((prev) =>
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
      return matchesSearch && matchesAvoid;
    });
  }, [items, query, avoid]);

  const sections = useMemo(
    () => Array.from(new Map(filtered.map((i) => [i.section, true])).keys()),
    [filtered]
  );

  const filterCount = avoid.length + (query.trim() ? 1 : 0);

  return (
    <>
      {/* Controls */}
      <div className="sticky top-28 z-40 bg-brand-bg px-6 md:px-10 pt-6 pb-5 border-b border-brand-cream/10 flex flex-col gap-5">
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
          <div className="flex flex-wrap gap-2">
            {ALLERGENS.map((tag) => {
              const on = avoid.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleAvoid(tag)}
                  className={`font-platypi text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 transition-colors duration-200 ${
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
      </div>

      {/* Results — bento grid per section */}
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
              onClick={() => { setAvoid([]); setQuery(""); }}
              className="mt-8 font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/40 hover:text-brand-cream transition-colors duration-200 border-b border-brand-cream/20 pb-0.5"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto flex flex-col gap-14">
            {sections.map((section) => (
              <div key={section}>
                <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 border-b border-brand-cream/20 pb-3 mb-4">
                  {section}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[170px] gap-3 md:gap-4">
                  {filtered
                    .filter((item) => item.section === section)
                    .map((item) => {
                      const tier = tierOf(item);
                      const large = tier === "large";
                      return (
                        <div
                          key={item.slug}
                          className={`border border-brand-cream/10 flex flex-col overflow-hidden ${
                            large ? "p-6" : "p-4"
                          } ${SPAN_CLASSES[tier]}`}
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <h3
                              className={`font-servus font-normal leading-tight text-brand-cream ${
                                large ? "text-[24px]" : "text-[18px]"
                              }`}
                            >
                              {item.name}
                            </h3>
                            <span className="font-platypi text-[12px] text-brand-cream/55 flex-shrink-0">
                              {item.price}
                            </span>
                          </div>

                          {item.menu_type.length > 0 && (
                            <p className="font-platypi text-[9px] tracking-[0.2em] uppercase text-brand-cream/35 mt-1">
                              {item.menu_type.map((t) => MENU_LABELS[t]).join(" + ")}
                            </p>
                          )}

                          {tier !== "small" && item.description && (
                            <p
                              className={`font-literata text-brand-cream/55 leading-relaxed mt-2 ${
                                large ? "text-[15px]" : "text-[13px] line-clamp-2"
                              }`}
                            >
                              {item.description}
                            </p>
                          )}

                          {tier === "small" ? (
                            <p className="mt-auto pt-2 font-platypi text-[10px] tracking-[0.1em] uppercase text-brand-cream/60">
                              {item.allergens.map((e) => e.allergen).join(", ")}
                            </p>
                          ) : (
                            <ul className={`flex flex-col ${large ? "mt-4 gap-2.5" : "mt-3 gap-1"}`}>
                              {item.allergens.map((entry, i) => {
                                const note = substitutionNote(entry);
                                return (
                                  <li
                                    key={`${entry.allergen}-${i}`}
                                    className={`font-literata text-brand-cream/70 ${
                                      large ? "text-[14px]" : "text-[13px]"
                                    }`}
                                  >
                                    <span
                                      className={`text-brand-cream/90 uppercase tracking-[0.05em] font-platypi mr-2 ${
                                        large ? "text-[12px]" : "text-[11px]"
                                      }`}
                                    >
                                      {entry.allergen}
                                    </span>
                                    {entry.ingredient && <span>— {entry.ingredient}</span>}
                                    {note && (
                                      <span className="text-brand-cream/40 italic"> ({note})</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
