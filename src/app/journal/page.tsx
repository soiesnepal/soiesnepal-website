import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { journalQuery } from "@/lib/queries";
import JournalClient from "./JournalClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Industrial Engineering Journals",
  description:
    "Read academic journals and student publications from SOIES Nepal focused on industrial engineering.",
  alternates: {
    canonical: "/journal",
  },
};

async function getJournals() {
  try {
    return await client.fetch(journalQuery);
  } catch {
    return [];
  }
}

export default async function JournalPage() {
  const journals = await getJournals();
  return <JournalClient journals={journals} />;
}
