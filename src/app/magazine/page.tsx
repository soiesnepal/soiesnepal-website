import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { magazineQuery } from "@/lib/queries";
import MagazineClient from "./MagazineClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Industrial Vision Magazine",
  description:
    "Explore SOIES Nepal magazine issues and student-written content on industrial engineering in Nepal.",
  alternates: {
    canonical: "/magazine",
  },
};

const defaultMagazines = Array.from({ length: 10 }, (_, i) => ({
  _id: String(10 - i),
  title: `Industrial Vision Vol ${10 - i}`,
  issueNumber: 10 - i,
  description: "",
  cover: null,
  resources: "#",
}));

function extractVolNumber(title: string): number {
  const match = title.match(/(\d+)\s*$/);
  return match ? parseInt(match[1], 10) : 0;
}

async function getMagazines() {
  try {
    const data = await client.fetch(magazineQuery);
    if (!data?.length) return defaultMagazines;
    // Sort numerically descending by volume number in title
    return [...data].sort((a: { title: string }, b: { title: string }) =>
      extractVolNumber(b.title) - extractVolNumber(a.title)
    );
  } catch {
    return defaultMagazines;
  }
}

export default async function MagazinePage() {
  const magazines = await getMagazines();
  return <MagazineClient magazines={magazines} />;
}
