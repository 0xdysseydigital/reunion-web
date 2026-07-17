import { defineType, defineField } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Images",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Homepage — Hero" },
    { name: "info", title: "Homepage — Location & Hours" },
    { name: "spaces", title: "Spaces (shared by Homepage + Private Dining)" },
    { name: "menusHub", title: "Menus Hub" },
  ],
  fields: [
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Background",
      options: { hotspot: true },
      fieldset: "hero",
    }),
    defineField({
      name: "infoInteriorImage",
      type: "image",
      title: "Interior Photo",
      options: { hotspot: true },
      fieldset: "info",
    }),
    defineField({
      name: "spaceDrinkFareImage",
      type: "image",
      title: "Drink + Fare",
      options: { hotspot: true },
      fieldset: "spaces",
    }),
    defineField({
      name: "spaceLoungeImage",
      type: "image",
      title: "The Lounge",
      options: { hotspot: true },
      fieldset: "spaces",
    }),
    defineField({
      name: "spaceDenImage",
      type: "image",
      title: "The Den",
      options: { hotspot: true },
      fieldset: "spaces",
    }),
    defineField({
      name: "spaceLibraryImage",
      type: "image",
      title: "The Library",
      options: { hotspot: true },
      fieldset: "spaces",
    }),
    defineField({
      name: "spaceAtriumImage",
      type: "image",
      title: "The Atrium",
      options: { hotspot: true },
      fieldset: "spaces",
    }),
    defineField({
      name: "spaceGardenImage",
      type: "image",
      title: "The Garden",
      options: { hotspot: true },
      fieldset: "spaces",
    }),
    defineField({
      name: "menuHeroBrunchImage",
      type: "image",
      title: "Brunch",
      options: { hotspot: true },
      fieldset: "menusHub",
    }),
    defineField({
      name: "menuHeroLunchImage",
      type: "image",
      title: "Lunch",
      options: { hotspot: true },
      fieldset: "menusHub",
    }),
    defineField({
      name: "menuHeroDinnerImage",
      type: "image",
      title: "Dinner",
      options: { hotspot: true },
      fieldset: "menusHub",
    }),
    defineField({
      name: "menuHeroBarImage",
      type: "image",
      title: "Bar",
      options: { hotspot: true },
      fieldset: "menusHub",
    }),
    defineField({
      name: "vibesGallery",
      type: "array",
      title: "Vibes Gallery",
      description: "Photos shown in the masonry gallery on the Vibes page. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Images" };
    },
  },
});
