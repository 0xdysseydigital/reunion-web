import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

const ALLERGEN_OPTIONS = [
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

export const menuItemType = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
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
      description: "e.g. $18, $13 / $48, or 8 / 16 / 60",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
    }),
    defineField({
      name: "menu_type",
      type: "array",
      title: "Menu Type(s)",
      description: "Items can appear on more than one menu — e.g. shared appetizers on Brunch, Lunch, and Dinner.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Brunch", value: "brunch" },
          { title: "Lunch", value: "lunch" },
          { title: "Dinner", value: "dinner" },
          { title: "Bar", value: "bar" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "section",
      type: "reference",
      title: "Section",
      to: [{ type: "menuSection" }],
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "menuItem" }),
    defineField({
      name: "allergens",
      type: "array",
      title: "Allergens",
      of: [
        {
          type: "object",
          name: "allergenEntry",
          fields: [
            defineField({
              name: "allergen",
              type: "string",
              title: "Allergen",
              options: { list: ALLERGEN_OPTIONS },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "ingredient",
              type: "string",
              title: "Flagging Ingredient",
              description: "The specific ingredient that causes this allergen, e.g. Pistachio",
            }),
            defineField({
              name: "substitutable",
              type: "string",
              title: "Substitutable?",
              options: { list: ["Yes", "No", "Unclear"] },
            }),
            defineField({
              name: "substituteSuggestion",
              type: "string",
              title: "Substitute Suggestion",
              description: "e.g. \"can be removed\" or \"GF pasta\"",
            }),
          ],
          preview: {
            select: { allergen: "allergen", ingredient: "ingredient" },
            prepare({ allergen, ingredient }) {
              return { title: allergen, subtitle: ingredient };
            },
          },
        },
      ],
    }),
    defineField({
      name: "dietary",
      type: "array",
      title: "Dietary",
      description: "Suitability tags — separate from allergen warnings above.",
      of: [{ type: "string" }],
      options: { list: ["Vegan", "Vegetarian"] },
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
  },
});
