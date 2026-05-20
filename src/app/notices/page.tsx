import { client } from "@/lib/sanity";
import { noticesQuery } from "@/lib/queries";
import NoticesClient from "./NoticesClient";

export const revalidate = 60;

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
