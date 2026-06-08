import { defineType, defineField } from "sanity";

export const journal = defineType({
  name: "journal",
  title: "Academic Papers",
  type: "document",
  description: "Academic papers submitted by students across courses and batches.",
  fields: [
    defineField({
      name: "category",
      title: "Section",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "OJT Papers", value: "ojt" },
          { title: "Seminar Papers", value: "seminar" },
          { title: "Final Year Project Papers", value: "fyp" },
          { title: "Minor Projects", value: "minor" },
          { title: "Major Projects", value: "major" },
          { title: "Entrepreneurship", value: "entrepreneurship" },
          { title: "Group Work and Presentation", value: "groupwork" },
          { title: "Industrial Estate Research Program", value: "industrial" },
          { title: "Others", value: "others" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Paper Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "batch",
      title: "Batch",
      type: "string",
      description: "Example: 2079",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "semester",
      title: "Semester",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Semester 1", value: "1" },
          { title: "Semester 2", value: "2" },
          { title: "Semester 3", value: "3" },
          { title: "Semester 4", value: "4" },
          { title: "Semester 5", value: "5" },
          { title: "Semester 6", value: "6" },
          { title: "Semester 7", value: "7" },
          { title: "Semester 8", value: "8" },
        ],
      },
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "supervisor",
      title: "Supervisor / Mentor",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description / Abstract",
      type: "text",
    }),
    defineField({
      name: "issueNumber",
      title: "Group Number / Section (Optional)",
      type: "string",
    }),
    defineField({
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resources",
      title: "PDF File",
      type: "file",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
