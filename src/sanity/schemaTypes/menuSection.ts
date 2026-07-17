import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const menuSectionType = defineType({
  name: "menuSection",
  title: "Menu Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "e.g. Small Plates, Toast, Cocktails",
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "menuSection" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title" },
  },
});
