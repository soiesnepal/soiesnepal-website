import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { generalMembersQuery } from "@/lib/queries";
import MembersClient from "./MembersClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "General Members",
  description:
    "Browse SOIES Nepal general members across batches of industrial engineering students.",
  alternates: {
    canonical: "/members",
  },
};

async function getMembers() {
  try {
    // Fetch data fresh, ignoring cache
    const data = await client.fetch(generalMembersQuery);
    
    if (!data?.length) return [];

    const parsedBatches = data.map((b: any) => {
      const membersListStr = b.membersList || "";
      const lines = membersListStr.split(/[\n,]+/).map((l: string) => l.trim()).filter((l: string) => l.length > 0);
      
      const parsedMembers = lines.map((line: string) => {
        // Try to extract roll number at the end, typically formatted right after a dash/space
        const match = line.match(/(.*?)(?:[-:\s]+(\d+))?$/);
        const namePart = match && match[1] ? match[1].trim() : line;
        
        // Remove leading/trailing symbols from name if they got caught
        const cleanName = namePart.replace(/^[-,\s]+|[-,\s]+$/g, '');
        
        return {
          name: cleanName,
          rollNumber: match && match[2] ? parseInt(match[2], 10) : 0,
        };
      });

      return {
        _id: b._id,
        batch: b.batch,
        members: parsedMembers
      };
    });

    return parsedBatches;
  } catch {
    return [];
  }
}

export default async function MembersPage() {
  const batches = await getMembers();
  
  

  // sort by batch string descending (e.g. 082, 081, 080)
  batches.sort((a: any, b: any) => b.batch.localeCompare(a.batch));

  return <MembersClient batches={batches} />;
}
