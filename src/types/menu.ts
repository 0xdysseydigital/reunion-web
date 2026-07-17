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
  substitutable?: "Yes" | "No" | "Unclear";
  substituteSuggestion?: string;
};

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
