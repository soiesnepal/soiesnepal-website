// Shared constant arrays used across sections

export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  children?: Array<{ text?: string }>;
};

export interface Notice {
  _id: string;
  title: string;
  description?: PortableTextBlock[];
  category?: string;
  imageUrl?: string;
  pdf?: string;
}

