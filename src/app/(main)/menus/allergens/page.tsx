import FadeIn from "@/components/FadeIn";
import AllergensFilter from "./AllergensFilter";
import { client } from "@/sanity/lib/client";
import type { MenuItem } from "@/types/menu";

const ALL_ITEMS_QUERY = `*[_type == "menuItem"] | order(section->orderRank asc, orderRank asc) {
  _id,
  "slug": coalesce(slug.current, _id),
  name,
  description,
  price,
  image,
  menu_type,
  "section": section->title,
  "allergens": coalesce(allergens, []),
  "dietary": coalesce(dietary, [])
}`;

export const metadata = {
  title: "Allergen Guide — Reunion Cocktails + Provisions",
};

export default async function AllergensPage() {
  const sanityItems: MenuItem[] = (await client.fetch(
    ALL_ITEMS_QUERY,
    {},
    { next: { revalidate: 30 } }
  )) ?? [];

  const items = sanityItems;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-brand-cream/10 px-6 md:px-10 py-12 md:py-16 flex flex-col items-center text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
            Dietary
          </p>
          <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
            Allergen Guide
          </h1>
          <p className="font-literata text-brand-cream/50 text-[18px] mt-5 max-w-sm leading-relaxed text-center mx-auto">
            Select your dietary requirements below. We&apos;ll show every dish that meets all of them.
          </p>
        </FadeIn>
      </div>

      <AllergensFilter items={items} />
    </div>
  );
}
