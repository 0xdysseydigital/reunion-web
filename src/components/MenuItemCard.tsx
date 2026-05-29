import Image from "next/image";
import type { MenuItem, MenuType, MENU_LABELS } from "@/types/menu";
import { MENU_LABELS as LABELS } from "@/types/menu";

export default function MenuItemCard({
  item,
  showMenuType = false,
}: {
  item: MenuItem;
  showMenuType?: boolean;
}) {
  return (
    <article className="flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0 bg-brand-cream/5">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="pt-4 flex flex-col gap-2">
        {showMenuType && (
          <p className="font-platypi text-[9px] tracking-[0.2em] uppercase text-brand-cream/35">
            {LABELS[item.menu_type as keyof typeof LABELS]}
          </p>
        )}

        {/* Name + Price row */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-servus font-normal text-[18px] leading-tight text-brand-cream">
            {item.name}
          </h3>
          <span className="font-platypi text-[13px] text-brand-cream/55 flex-shrink-0">
            {item.price}
          </span>
        </div>

        {/* Description */}
        <p className="font-literata text-[16px] text-brand-cream/55 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Allergen badges */}
        {(item.allergens ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(item.allergens ?? []).map((tag) => (
              <span
                key={tag}
                className="font-platypi text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 border border-brand-cream/20 text-brand-cream/45"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
