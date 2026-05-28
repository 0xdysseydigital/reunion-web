import { notFound } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import MenuContent from "./MenuContent";
import { MENU_LABELS } from "@/types/menu";
import type { MenuType, MenuItem } from "@/types/menu";
import { client } from "@/sanity/lib/client";

const VALID_TYPES: MenuType[] = ["brunch", "lunch", "dinner", "bar"];

const MENU_DESCRIPTIONS: Record<MenuType, string> = {
  brunch: "Weekend mornings the way they should be — unhurried, indulgent, and well-poured.",
  lunch: "Midday done right. Fresh, seasonal, and worth sitting down for.",
  dinner: "The full Reunion experience. Settle in.",
  bar: "Handcrafted from the first pour. Every glass, intentional.",
};

const ITEMS_QUERY = `*[_type == "menuItem" && menu_type == $type] | order(section asc, name asc) {
  _id,
  "slug": coalesce(slug.current, _id),
  name,
  description,
  price,
  "image": image.asset->url,
  menu_type,
  section,
  "allergens": coalesce(allergens, [])
}`;

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const label = MENU_LABELS[type as MenuType] ?? type;
  return { title: `${label} Menu — Reunion Cocktails + Provisions` };
}

export default async function MenuTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: rawType } = await params;
  const type = rawType as MenuType;

  if (!VALID_TYPES.includes(type)) notFound();

  const items: MenuItem[] = (await client.fetch(
    ITEMS_QUERY,
    { type },
    { next: { revalidate: 60 } }
  )) ?? [];

  const sections = Array.from(
    new Map(items.map((i) => [i.section, true])).keys()
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back nav */}
      <div className="px-8 md:px-10 pt-8">
        <Link
          href="/menus"
          className="inline-flex items-center gap-2 font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/40 hover:text-brand-cream/80 transition-colors duration-200"
        >
          <span>←</span>
          <span>All Menus</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-brand-cream/10 px-6 md:px-10 py-10 md:py-12 flex flex-col items-center text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
            {MENU_LABELS[type]}
          </p>
          <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
            {MENU_LABELS[type]}
          </h1>
          <p className="font-literata text-brand-cream/50 text-[15px] mt-5 max-w-sm leading-relaxed">
            {MENU_DESCRIPTIONS[type]}
          </p>
        </FadeIn>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-28 px-6">
          <FadeIn direction="none">
            <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/30 text-center">
              Menu coming soon
            </p>
            <p className="font-literata text-brand-cream/40 text-[15px] mt-4 text-center max-w-xs leading-relaxed">
              Check back soon or ask your server for today's selections.
            </p>
          </FadeIn>
        </div>
      ) : (
        <MenuContent items={items} sections={sections} />
      )}
    </div>
  );
}
