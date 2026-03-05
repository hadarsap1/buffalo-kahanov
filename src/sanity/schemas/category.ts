import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "קטגוריה",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם קטגוריה",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "סדר תצוגה",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
