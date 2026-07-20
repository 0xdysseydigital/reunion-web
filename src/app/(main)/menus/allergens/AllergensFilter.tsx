"use client";

import { useState, useMemo } from "react";
import { ALLERGENS, MENU_LABELS, substitutionNote } from "@/types/menu";
import type { MenuItem, Allergen } from "@/types/menu";

export default function AllergensFilter({ items }: { items: MenuItem[] }) {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState<Allergen[]>([]);

  const toggleShow = (tag: Allergen) => {
    setShow((prev) =>
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
      // Selecting a tag shows dishes that contain it, so the substitution is visible.
      const matchesShow =
        show.length === 0 ||
        show.some((tag) => (item.allergens ?? []).some((entry) => entry.allergen === tag));
      return matchesSearch && matchesShow;
    });
  }, [items, query, show]);

  const sections = useMemo(
    () => Array.from(new Map(filtered.map((i) => [i.section, true])).keys()),
    [filtered]
  );

  const filterCount = show.length + (query.trim() ? 1 : 0);

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
            Show dishes with
          </p>
          <div className="flex flex-wrap gap-2">
            {ALLERGENS.map((tag) => {
              const on = show.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleShow(tag)}
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

      {/* Results — table per section */}
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
              onClick={() => { setShow([]); setQuery(""); }}
              className="mt-8 font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/40 hover:text-brand-cream transition-colors duration-200 border-b border-brand-cream/20 pb-0.5"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col gap-14">
            {sections.map((section) => (
              <div key={section}>
                <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 border-b border-brand-cream/20 pb-3 mb-2">
                  {section}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-brand-cream/20">
                        <th className="text-left font-platypi font-normal text-[10px] tracking-[0.15em] uppercase text-brand-cream/40 py-3 pr-4">
                          Dish
                        </th>
                        <th className="text-left font-platypi font-normal text-[10px] tracking-[0.15em] uppercase text-brand-cream/40 py-3 pr-4">
                          Allergens &amp; Substitutions
                        </th>
                        <th className="text-right font-platypi font-normal text-[10px] tracking-[0.15em] uppercase text-brand-cream/40 py-3">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered
                        .filter((item) => item.section === section)
                        .map((item) => (
                          <tr key={item.slug} className="border-b border-brand-cream/10 align-top">
                            <td className="py-4 pr-6 max-w-xs">
                              <h3 className="font-servus font-normal text-[18px] leading-tight text-brand-cream">
                                {item.name}
                              </h3>
                              {item.menu_type.length > 0 && (
                                <p className="font-platypi text-[9px] tracking-[0.2em] uppercase text-brand-cream/35 mt-1">
                                  {item.menu_type.map((t) => MENU_LABELS[t]).join(" + ")}
                                </p>
                              )}
                              {item.description && (
                                <p className="font-literata text-[13px] text-brand-cream/55 leading-relaxed mt-2">
                                  {item.description}
                                </p>
                              )}
                            </td>
                            <td className="py-4 pr-4">
                              <ul className="flex flex-col gap-1.5">
                                {item.allergens.map((entry, i) => {
                                  const note = substitutionNote(entry);
                                  const highlighted = show.includes(entry.allergen);
                                  return (
                                    <li
                                      key={`${entry.allergen}-${i}`}
                                      className={`font-literata text-[13px] ${
                                        highlighted ? "text-brand-cream" : "text-brand-cream/70"
                                      }`}
                                    >
                                      <span
                                        className={`uppercase tracking-[0.05em] text-[11px] font-platypi mr-2 ${
                                          highlighted ? "text-brand-cream" : "text-brand-cream/90"
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
                            </td>
                            <td className="py-4 text-right font-platypi text-[13px] text-brand-cream/55 whitespace-nowrap">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
