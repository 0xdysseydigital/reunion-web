import { client } from "@/sanity/lib/client";
import { menuItems as staticItems } from "@/data/menu";
import type { MenuItem, MenuType } from "@/types/menu";

export const MENU_TYPE_QUERY = `
  *[_type == "menuItem" && menu_type == $type] | order(section asc, name asc) {
    _id,
    "slug": slug.current,
    name,
    description,
    price,
    image,
    section,
    allergens
  }
`;

export const ALL_ITEMS_QUERY = `
  *[_type == "menuItem"] | order(menu_type asc, section asc, name asc) {
    _id,
    "slug": slug.current,
    name,
    description,
    price,
    image,
    menu_type,
    section,
    allergens
  }
`;

export async function getMenuItems(type: MenuType): Promise<MenuItem[]> {
  try {
    const items = await client.fetch<MenuItem[]>(MENU_TYPE_QUERY, { type });
    if (!items?.length) return staticItems.filter((i) => i.menu_type === type);
    return items.map((item) => ({ ...item, menu_type: type }));
  } catch {
    return staticItems.filter((i) => i.menu_type === type);
  }
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const items = await client.fetch<MenuItem[]>(ALL_ITEMS_QUERY);
    if (!items?.length) return staticItems;
    return items;
  } catch {
    return staticItems;
  }
}
