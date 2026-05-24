import { Space_Grotesk } from "next/font/google";
import StudyTrackerClient from "./StudyTrackerClient";

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
