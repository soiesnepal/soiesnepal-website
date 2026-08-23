import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { alumniBatchQuery } from "@/lib/queries";
import AlumniClient from "./AlumniClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Industrial Engineering Alumni in Nepal",
  description:
    "Discover alumni of SOIES Nepal and their professional journeys in industrial engineering and related fields.",
  alternates: {
    canonical: "/alumni",
  },
};

const defaultAlumni = [
  { _id: "1", name: "Abiral Raj Baniya Chhetri", currentPosition: "Revenue Management Officer, Yeti Airlines", Batch: 2062 },
  { _id: "2", name: "Agni Kumar Maleku", currentPosition: "N/A", Batch: 2062 },
  { _id: "3", name: "Anil Kandel", currentPosition: "Currently in Australia", Batch: 2062 },
  { _id: "4", name: "Anisha Shakya", currentPosition: "Currently in USA", Batch: 2062 },
  { _id: "5", name: "Ankit Shrestha", currentPosition: "Lecturer", Batch: 2062 },
  { _id: "6", name: "Ashok Acharya", currentPosition: "Currently in Australia", Batch: 2062 },
  { _id: "7", name: "Basanta Babu Surraf", currentPosition: "N/A", Batch: 2062 },
  { _id: "8", name: "Bishnu Prasad Bhattarai", currentPosition: "N/A", Batch: 2062 },
];

async function getAlumni() {
  try {
    const batches = await client.fetch(alumniBatchQuery);

    const batchAlumni = (batches || []).flatMap(
      (batch: { _id: string; batchYear: number; namesList?: string }) => {
        if (!batch.namesList) return [];
        // Split names by commas or newlines, remove empty/whitespace
        const names = batch.namesList.split(/[\n,]+/).map(n => n.trim()).filter(n => n.length > 0);
        
        return names.map((name, i) => ({
          _id: `${batch._id}-${i}`,
          name: name,
          currentPosition: "",
          description: "",
          Batch: batch.batchYear,
          photoUrl: "",
        }));
      }
    );

    return batchAlumni.length ? batchAlumni : defaultAlumni;
  } catch {
    return defaultAlumni;
  }
}

export default async function AlumniPage() {
  const alumni = await getAlumni();
  return <AlumniClient alumni={alumni} />;
}
