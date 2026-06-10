import { defineField, defineType } from 'sanity';

export const industrialVisit = defineType({
  name: 'industrialVisit',
  title: 'Industrial Visits',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Visit Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      description: 'e.g., Spring 2026, 2024-2028',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
      description: 'Upload photos from the industrial visit',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'batch',
      media: 'images.0',
    },
  },
});
