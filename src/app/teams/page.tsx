import { client } from "@/lib/sanity";
import { teamQuery, internsQuery } from "@/lib/queries";
import TeamsClient from "./TeamsClient";

export const revalidate = 60;

const defaultTeam = [
  { _id: "1", name: "Anish Panthi", position: "President", rank: 1, committee: "18th Executive Committee", photoUrl: null },
  { _id: "2", name: "Shilpa Thapa Magar", position: "Vice President", rank: 2, committee: "18th Executive Committee", photoUrl: null },
  { _id: "3", name: "Sambhav Pandit", position: "Secretary", rank: 3, committee: "18th Executive Committee", photoUrl: null },
  { _id: "4", name: "Subrat Lamichhane", position: "Treasurer", rank: 4, committee: "18th Executive Committee", photoUrl: null },
  { _id: "5", name: "Birat Tiwari", position: "Joint Secretary", rank: 5, committee: "18th Executive Committee", photoUrl: null },
  { _id: "6", name: "Suprava Pyakurel", position: "Event Coordinator", rank: 6, committee: "18th Executive Committee", photoUrl: null },
  { _id: "7", name: "Roshan Bhatta", position: "PR Head", rank: 7, committee: "18th Executive Committee", photoUrl: null },
  { _id: "8", name: "Lakshya Mishra", position: "Graphic Designer", rank: 8, committee: "18th Executive Committee", photoUrl: null },
  { _id: "9", name: "Simran Rana", position: "Social Media Handler", rank: 9, committee: "18th Executive Committee", photoUrl: null },
  { _id: "10", name: "Bhumi Kumari Kurmi", position: "Creative Head", rank: 10, committee: "18th Executive Committee", photoUrl: null },
];

async function getTeamsData() {
  try {
    const [teamData, internsData] = await Promise.all([
      client.fetch(teamQuery),
      client.fetch(internsQuery),
    ]);

    const parsedInterns = (internsData || []).map((group: any) => {
      const structured = (group.interns || []).map((intern: any) => ({
        _id: `${group._id}-${intern.name}`,
        name: intern.name,
        batch: intern.batch || "",
        photoUrl: intern.photoUrl || "",
        message: intern.message || "",
      }));

      if (structured.length > 0) {
        return {
          _id: group._id,
          batchTitle: group.batchTitle,
          interns: structured,
        };
      }

      const names = group.internsList
        ? group.internsList.split(/[\n,]+/).map((n: string) => n.trim()).filter((n: string) => n.length > 0)
        : [];

      return {
        _id: group._id,
        batchTitle: group.batchTitle,
        interns: names.map((name: string, i: number) => ({
          _id: `${group._id}-${i}`,
          name,
          batch: "",
          photoUrl: "",
          message: "",
        })),
      };
    });

    return {
      team: teamData?.length ? teamData : defaultTeam,
      interns: parsedInterns,
    };
  } catch {
    return { team: defaultTeam, interns: [] };
  }
}

export default async function TeamsPage() {
  const { team, interns } = await getTeamsData();
  return <TeamsClient team={team} interns={interns} />;
}
