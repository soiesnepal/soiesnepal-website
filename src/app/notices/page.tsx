import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { noticesQuery } from "@/lib/queries";
import NoticesClient from "./NoticesClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notices",
  description:
    "Read official notices, updates, and announcements from SOIES Nepal.",
  alternates: {
    canonical: "/notices",
  },
};

async function getNotices() {
  try {
    const data = await client.fetch(noticesQuery);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export default async function NoticesPage() {
  const notices = await getNotices();
  return <NoticesClient notices={notices} />;
}
