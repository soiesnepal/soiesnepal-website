import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { galleryQuery } from "@/lib/queries";
import GalleryClient from "./GalleryClient";

export const revalidate = 60; // ISR revalidation 

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments and event photos from SOIES Nepal activities and industrial engineering events.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function GalleryPage() {
  const images = await client.fetch(galleryQuery);
  return <GalleryClient images={images} />;
}
