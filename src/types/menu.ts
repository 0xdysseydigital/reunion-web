export type Allergen =
  | "Nuts"
  | "Dairy"
  | "Gluten"
  | "Shellfish"
  | "Soy"
  | "Vegan"
  | "Vegetarian";

export type MenuType = "brunch" | "lunch" | "dinner" | "bar";

export type MenuItem = {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image: string;
  menu_type: MenuType;
  section: string;
  allergens: Allergen[];
};

export const MENU_LABELS: Record<MenuType, string> = {
  brunch: "Brunch",
  lunch: "Lunch",
  dinner: "Dinner",
  bar: "Bar",
};

export const ALLERGENS: Allergen[] = [
  "Nuts",
  "Dairy",
  "Gluten",
  "Shellfish",
  "Soy",
  "Vegan",
  "Vegetarian",
];
