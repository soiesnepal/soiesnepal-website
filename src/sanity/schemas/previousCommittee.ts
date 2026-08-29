import { defineType, defineField } from "sanity";

export const previousCommittee = defineType({
  name: "previousCommittee",
  title: "Previous Committee",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Committee Title",
      type: "string",
      description: 'Example: "18th Executive Committee"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tenureNumber",
      title: "Tenure Number",
      type: "number",
      description: "Used to match this archive page and associated committee events.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "years",
      title: "Years",
      type: "string",
      description: 'Example: "2023 - 2024"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Term Summary",
      type: "text",
      description: "A short overview of the committee's tenure and major achievements.",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed highlights or achievements for the term.",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          name: "committeeMember",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "linkedin",
              title: "LinkedIn URL",
              type: "url",
            }),
            defineField({
              name: "socials",
              title: "Other Socials / Links",
              type: "string",
              description: "Optional LinkedIn, Facebook, portfolio, or other social link text.",
            }),
            defineField({
              name: "bio",
              title: "Short Bio",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "committeePhotos",
      title: "Committee Photos",
      type: "array",
      of: [
        {
          type: "object",
          name: "committeePhoto",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "years",
    },
  },
});
