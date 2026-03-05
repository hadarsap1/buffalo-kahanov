import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "מוצר",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם מוצר",
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
      name: "description",
      title: "תיאור",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "קטגוריה",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "מחיר (₪)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "salePrice",
      title: "מחיר מבצע (₪)",
      type: "number",
      description: "השאר ריק אם אין מבצע",
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: "weightUnit",
      title: "יחידת משקל",
      type: "string",
      options: {
        list: [
          { title: 'ק"ג', value: "kg" },
          { title: "יחידה", value: "unit" },
        ],
        layout: "radio",
      },
      initialValue: "kg",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "במלאי",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "מוצר מומלץ",
      type: "boolean",
      initialValue: false,
      description: "הצג בעמוד הבית",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
      media: "image",
      price: "price",
      inStock: "inStock",
    },
    prepare({ title, subtitle, media, price, inStock }) {
      return {
        title: `${title}${inStock === false ? " ❌" : ""}`,
        subtitle: `${subtitle || ""} — ₪${price || ""}`,
        media,
      };
    },
  },
});
