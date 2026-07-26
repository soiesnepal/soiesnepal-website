"use client";

import NoticePopup from "./NoticePopup";
import type { Notice } from "@/constants";

interface NoticePopupWrapperProps {
  notice: Notice | null;
}

export default function NoticePopupWrapper({ notice }: NoticePopupWrapperProps) {
  return <NoticePopup notice={notice} />;
}
