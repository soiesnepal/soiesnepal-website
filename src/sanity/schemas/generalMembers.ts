import { defineType, defineField } from "sanity";

export const generalMembers = defineType({
  name: "generalMembers",
  title: "General Members",
  type: "document",
  description: "Batch-wise list of general members. Bulk import by pasting.",
  fields: [
    defineField({
      name: "batch",
      title: "Batch (e.g. 079)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "membersList",
      title: "Members Names and Roll Numbers",
      type: "text",
      description: "Paste members here separated by newlines. Format: Name - RollNumber (e.g. Aayush Poudel - 6)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "members",
      title: "Member Profiles (optional)",
      type: "array",
      description: "Optional structured list with photos. If provided, these can be used for richer member cards.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "roll",
              title: "Roll Number",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "batch" },
    prepare({ title }) {
      return { title: `Batch ${title}` };
    },
  },
});
