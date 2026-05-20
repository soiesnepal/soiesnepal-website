import { client } from "@/lib/sanity";
import { journalQuery } from "@/lib/queries";
import JournalClient from "./JournalClient";

export const revalidate = 60;

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
