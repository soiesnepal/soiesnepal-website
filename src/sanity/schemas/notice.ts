import { defineType, defineField } from "sanity";

export const notice = defineType({
  name: "notice",
  title: "Notice",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Academic", value: "academic" },
          { title: "Administrative", value: "administrative" },
          { title: "Event", value: "event" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showAsPopup",
      title: "Show as Popup on Homepage",
      type: "boolean",
      description: "If checked, this notice will appear as a popup when visitors open the site.",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
    }),
  ],
});
