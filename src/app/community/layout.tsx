import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Engineering Community",
  description:
    "Join the SOIES Nepal community to connect with industrial engineering students, share resources, and collaborate in Nepal.",
  alternates: {
    canonical: "/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
