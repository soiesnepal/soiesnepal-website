import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bhcqd45q";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

if (!token) {
  console.error("Missing Sanity token. Set SANITY_API_TOKEN or NEXT_PUBLIC_SANITY_API_TOKEN before running this script.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-11-13",
  useCdn: false,
});

const committees = [
  {
    _id: "previousCommittee-18",
    _type: "previousCommittee",
    title: "18th Executive Committee",
    tenureNumber: 18,
    years: "2023 - 2024",
    description:
      "The 18th executive committee led a strong year of leadership development, student engagement, and institutional collaboration across SOIES Nepal.",
    highlights: [
      { _type: "block", children: [{ _type: "span", text: "Organized networking and technical events for industrial engineering students." }] },
      { _type: "block", children: [{ _type: "span", text: "Built stronger member engagement and institutional outreach programs." }] },
    ],
    teamMembers: [],
    committeePhotos: [],
  },
  {
    _id: "previousCommittee-19",
    _type: "previousCommittee",
    title: "19th Executive Committee",
    tenureNumber: 19,
    years: "2024 - 2025",
    description:
      "The 19th tenure expanded SOIES Nepal's event calendar with a wider focus on professional exposure, competitions, and student-led initiatives.",
    highlights: [
      { _type: "block", children: [{ _type: "span", text: "Expanded collaboration with industry partners and student communities." }] },
      { _type: "block", children: [{ _type: "span", text: "Strengthened the committee's digital presence and event storytelling." }] },
    ],
    teamMembers: [],
    committeePhotos: [],
  },
  {
    _id: "previousCommittee-20",
    _type: "previousCommittee",
    title: "20th Executive Committee",
    tenureNumber: 20,
    years: "2025 - 2026",
    description:
      "The 20th executive term continues the legacy of innovation, community building, and practical learning for industrial engineering students.",
    highlights: [
      { _type: "block", children: [{ _type: "span", text: "Focused on research-driven activities and leadership development." }] },
      { _type: "block", children: [{ _type: "span", text: "Driven a stronger student-centered event culture and public engagement." }] },
    ],
    teamMembers: [],
    committeePhotos: [],
  },
];

const events = [
  {
    _id: "event-18-general-assembly",
    _type: "event",
    title: "18th General Assembly",
    status: "completed",
    category: "general",
    description: "A major assembly highlighting the 18th committee's progress and member goals.",
    eventDate: "2024-03-15",
    tenureNumber: 18,
  },
  {
    _id: "event-19-workshop",
    _type: "event",
    title: "19th Leadership Workshop",
    status: "completed",
    category: "workshop",
    description: "A leadership and planning workshop conducted for the 19th committee team.",
    eventDate: "2025-01-20",
    tenureNumber: 19,
  },
  {
    _id: "event-20-fellowship",
    _type: "event",
    title: "20th Fellowship Drive",
    status: "upcoming",
    category: "general",
    description: "A community engagement event supporting the 20th committee's vision and outreach goals.",
    eventDate: "2026-02-12",
    tenureNumber: 20,
  },
];

async function main() {
  for (const committee of committees) {
    await client.createOrReplace(committee);
    console.log(`Saved committee: ${committee.title}`);
  }

  for (const event of events) {
    await client.createOrReplace(event);
    console.log(`Saved event: ${event.title}`);
  }

  console.log("Previous committee seed data has been created successfully.");
}

main().catch((error) => {
  console.error("Failed to seed previous committee data:", error);
  process.exit(1);
});
