import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bhcqd45q',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-11-13',
});

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bhcqd45q',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
});

// typed helper for building image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
