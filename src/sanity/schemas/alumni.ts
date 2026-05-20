import { defineType, defineField } from "sanity";

export const alumniBatch = defineType({
  name: "alumniBatch",
  title: "Alumni",
  type: "document",
  description: "Bulk import alumni by pasting names.",
  fields: [
    defineField({
      name: "batchYear",
      title: "Batch Year (e.g. 2062)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "namesList",
      title: "Alumni Names List",
      description: "Paste all alumni names here, separated by commas or new lines. Example: Ram Thapa, Shyam Nepal",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "batchYear" },
    prepare({ title }) {
      return { title: `Batch ${title}` };
    },
  },
});
