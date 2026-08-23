import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import StudyTrackerClient from "./StudyTrackerClient";

export const metadata: Metadata = {
  title: "Study Tracker",
  description:
    "Use the SOIES Nepal study tracker to plan and monitor your industrial engineering study goals.",
  alternates: {
    canonical: "/study-tracker",
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function StudyTrackerPage() {
  return (
    <div className={spaceGrotesk.variable}>
      <StudyTrackerClient />
    </div>
  );
}
