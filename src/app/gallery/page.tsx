import { client } from "@/lib/sanity";
import { galleryQuery } from "@/lib/queries";
import GalleryClient from "./GalleryClient";

export const revalidate = 60; // ISR revalidation 

export const metadata = {
  title: "Gallery | SOIES Nepal",
  description: "Moments and events captured by SOIES Nepal.",
};

export default async function GalleryPage() {
  const images = await client.fetch(galleryQuery);
  return <GalleryClient images={images} />;
}
