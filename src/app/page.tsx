// ...existing code...
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import EventsSection from "@/components/sections/EventsSection";
import TeamsClient from "@/app/teams/TeamsClient";
import NoticePopupWrapper from "@/components/NoticePopupWrapper";
import { client } from "@/lib/sanity";
import { eventsQuery, latestNoticeQuery, teamQuery } from "@/lib/queries";

// Consider triggering on-demand revalidation via Sanity webhooks
// for truly immediate updates (e.g. urgent notice). Otherwise 60s is fine.
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

async function getData() {
  try {
    // fetch ALL events for the homepage
    const [events, latestNotice, team] = await Promise.all([
      client.fetch(eventsQuery).catch(() => []),
      client.fetch(latestNoticeQuery).catch(() => null),
      client.fetch(teamQuery).catch(() => defaultTeam),
    ]);
    return { events, latestNotice, team: team?.length ? team : defaultTeam };
  } catch {
    return { events: [], latestNotice: null, team: defaultTeam };
  }
}

export default async function Home() {
  const { events, latestNotice, team } = await getData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowWeWorkSection />
      <EventsSection events={events} />
      <TeamsClient team={team} />
      <NoticePopupWrapper notice={latestNotice} />
    </>
  );
}
