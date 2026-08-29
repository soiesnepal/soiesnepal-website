import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { previousCommitteesQuery } from "@/lib/queries";
import { PreviousCommitteesClient } from "@/components/PreviousCommitteesClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Previous Committees | SOIES Nepal",
  description: "Browse past executive committee archives, leadership teams, and term-specific gallery highlights.",
  alternates: {
    canonical: "/previous-committees",
  },
};

export default async function PreviousCommitteesPage() {
  const committees = await client.fetch(previousCommitteesQuery).catch(() => []);

  return <PreviousCommitteesClient committees={committees} />;
}
