import { defineType, defineField } from "sanity";

export const menuItemType = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
    }),
    defineField({
      name: "price",
      type: "string",
      title: "Price",
      description: 'e.g. $18 or $13 / $48',
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
    }),
    defineField({
      name: "menu_type",
      type: "string",
      title: "Menu Type",
      options: {
        list: [
          { title: "Brunch", value: "brunch" },
          { title: "Lunch", value: "lunch" },
          { title: "Dinner", value: "dinner" },
          { title: "Bar", value: "bar" },
        ],
      },
    }),
    defineField({
      name: "section",
      type: "string",
      title: "Section",
      description: "e.g. Starters, Mains, Craft Cocktails",
    }),
    defineField({
      name: "allergens",
      type: "array",
      title: "Allergens / Dietary",
      of: [{ type: "string" }],
      options: {
        list: [
          "Nuts",
          "Dairy",
          "Gluten",
          "Shellfish",
          "Soy",
          "Vegan",
          "Vegetarian",
        ],
      },
    }),
  ],
  orderings: [
    {
      title: "Section",
      name: "sectionAsc",
      by: [{ field: "section", direction: "asc" }],
    },
  ],
});
