import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { previousCommitteeByTenureQuery, eventsByTenureQuery } from "@/lib/queries";
import { PreviousCommitteeDetail } from "@/components/PreviousCommitteeDetail";
import { mockPreviousCommittees, mockCommitteeEvents } from "@/lib/mockPreviousCommittees";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ tenureNumber: string }> }): Promise<Metadata> {
  const { tenureNumber } = await params;
  const committee = await client.fetch(previousCommitteeByTenureQuery(tenureNumber)).catch(() =>
    mockPreviousCommittees.find((item) => item.tenureNumber === Number(tenureNumber)) || null
  );

  if (!committee) {
    return {
      title: "Committee Archive | SOIES Nepal",
    };
  }

  return {
    title: `${committee.title} | SOIES Nepal`,
    description: committee.description || `Explore the ${committee.years} committee archive of SOIES Nepal.`,
  };
}

export default async function PreviousCommitteeDetailPage({
  params,
}: {
  params: Promise<{ tenureNumber: string }>;
}) {
  const { tenureNumber } = await params;
  const committee = await client.fetch(previousCommitteeByTenureQuery(tenureNumber)).catch(() =>
    mockPreviousCommittees.find((item) => item.tenureNumber === Number(tenureNumber)) || null
  );

  if (!committee) {
    notFound();
  }

  const events = await client.fetch(eventsByTenureQuery(tenureNumber)).catch(() => mockCommitteeEvents[Number(tenureNumber)] || []);

  return <PreviousCommitteeDetail committee={committee} events={events} />;
}
