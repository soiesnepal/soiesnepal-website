import { defineType, defineField } from "sanity";

export const interns = defineType({
  name: "interns",
  title: "Interns",
  type: "document",
  description: "Interns list for a committee or batch.",
  fields: [
    defineField({
      name: "batchTitle",
      title: "Batch/Committee Title (e.g. 18th Executive Committee)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "interns",
      title: "Intern Profiles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "batch",
              title: "Batch",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "message",
              title: "Message",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "internsList",
      title: "Interns Names (legacy)",
      type: "text",
      description: "Paste intern names here separated by newlines. Use the Intern Profiles field instead when possible.",
    }),
  ],
  preview: {
    select: { title: "batchTitle" },
    prepare({ title }) {
      return { title: `Interns - ${title}` };
    },
  },
});
