import type { SanityImageSource } from "@sanity/image-url";

export type Allergen =
  | "Dairy"
  | "Egg"
  | "Fish"
  | "Gluten"
  | "Peanut"
  | "Sesame"
  | "Shellfish"
  | "Soy"
  | "Tree Nut"
  | "Coconut"
  | "Pineapple"
  | "Lavender";

export type Dietary = "Vegan" | "Vegetarian";

export type MenuType = "brunch" | "lunch" | "dinner" | "bar";

export type AllergenEntry = {
  allergen: Allergen;
  ingredient?: string;
  modifiable?: "Yes" | "No" | "Unclear";
  method?: "remove" | "substitute";
  substituteIngredient?: string;
};

/** Human-readable note on whether/how a dish can be modified to avoid this allergen. */
export function substitutionNote(entry: AllergenEntry): string | null {
  const unclear = entry.modifiable === "Unclear";
  if (!unclear && entry.modifiable !== "Yes") return null;

  if (entry.method === "substitute" && entry.substituteIngredient) {
    return unclear
      ? `possible substitute: ${entry.substituteIngredient} — confirm with your server`
      : `substitute: ${entry.substituteIngredient}`;
  }
  if (entry.method === "remove") {
    return unclear ? "may be left off — confirm with your server" : "can be left off";
  }
  return unclear ? "confirm with your server" : null;
}

export type MenuItem = {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image: SanityImageSource | null;
  menu_type: MenuType[];
  section: string;
  allergens: AllergenEntry[];
  dietary: Dietary[];
};

export const MENU_LABELS: Record<MenuType, string> = {
  brunch: "Brunch",
  lunch: "Lunch",
  dinner: "Dinner",
  bar: "Bar",
};

export const ALLERGENS: Allergen[] = [
  "Dairy",
  "Egg",
  "Fish",
  "Gluten",
  "Peanut",
  "Sesame",
  "Shellfish",
  "Soy",
  "Tree Nut",
  "Coconut",
  "Pineapple",
  "Lavender",
];
