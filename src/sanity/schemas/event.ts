import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "General", value: "general" },
          { title: "Competition", value: "competition" },
          { title: "Seminar", value: "seminar" },
          { title: "Industrial Visit", value: "industrial-visit" },
          { title: "Conference", value: "conference" },
          { title: "Social", value: "social" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "date",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "cta",
      title: "Call to Action URL",
      type: "url",
    }),
    // Competition-specific
    defineField({
      name: "winnerName",
      title: "Winner Name",
      type: "string",
      description: "Only for Competition events",
      hidden: ({ parent }) => parent?.category !== "competition",
    }),
    // Workshop-specific
    defineField({
      name: "tutorName",
      title: "Tutor / Instructor Name",
      type: "string",
      description: "Only for Workshop events",
      hidden: ({ parent }) => parent?.category !== "workshop",
    }),
  ],
});
