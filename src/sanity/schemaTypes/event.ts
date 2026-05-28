import { defineType, defineField } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Event Name" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
    }),
    defineField({
      name: "date",
      type: "datetime",
      title: "Date & Start Time",
      options: { dateFormat: "MMMM D, YYYY", timeFormat: "h:mm A" },
    }),
    defineField({
      name: "endTime",
      type: "datetime",
      title: "End Time (optional)",
      options: { dateFormat: "MMMM D, YYYY", timeFormat: "h:mm A" },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 4,
    }),
    defineField({
      name: "eventType",
      type: "string",
      title: "Event Type (optional)",
      description: 'e.g. Live Music, Chef\'s Tasting, Trivia Night',
    }),
  ],
  orderings: [
    {
      title: "Date (soonest first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
