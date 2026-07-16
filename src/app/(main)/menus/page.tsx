import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import MenuHubCard from "@/components/MenuHubCard";

export const metadata = {
  title: "Menus — Reunion Cocktails + Provisions",
};

const MENU_CARDS = [
  {
    type: "brunch",
    label: "Brunch",
    tagline: "Weekends, done right.",
    image: "/images/brunch-hero.jpg",
  },
  {
    type: "lunch",
    label: "Lunch",
    tagline: "Midday, elevated.",
    image: "/images/lunch-hero.jpg",
  },
  {
    type: "dinner",
    label: "Dinner",
    tagline: "The main event.",
    image: "/images/dinner-hero.jpg",
  },
  {
    type: "bar",
    label: "Bar",
    tagline: "Craft cocktails + provisions.",
    image: "/images/bar-hero.jpg",
  },
];

export default function MenusPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="border-b border-brand-cream/10 px-6 md:px-10 py-14 md:py-20 flex flex-col items-center text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
            Hummelstown, PA
          </p>
          <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
            Menus
          </h1>
        </FadeIn>
      </div>

      {/* Menu type grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {MENU_CARDS.map(({ type, label, tagline, image }, i) => (
          <FadeIn key={type} direction="none" delay={i * 0.06}>
            <MenuHubCard type={type} label={label} tagline={tagline} image={image} />
          </FadeIn>
        ))}
      </div>

      {/* Allergens card */}
      <FadeIn direction="none" delay={0.25}>
        <div className="flex flex-col items-center justify-center text-center px-6 md:px-10 py-14 md:py-16 border-t border-brand-cream/10">
          <p className="font-platypi text-[10px] tracking-[0.3em] uppercase text-brand-cream/35 mb-3">
            Dietary
          </p>
          <h2 className="font-servus font-light text-[clamp(1.5rem,3vw,2.2rem)] leading-none uppercase text-brand-cream/80 mb-3">
            Allergen Guide
          </h2>
          <p className="font-literata text-[16px] text-brand-cream/40 mt-1 mb-8 max-w-xs leading-relaxed">
            Filter every dish by dietary need across all menus.
          </p>
          <Button href="/menus/allergens">View Allergen Guide</Button>
        </div>
      </FadeIn>

    </div>
  );
}
