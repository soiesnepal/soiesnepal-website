"use client";

import NoticePopup from "./NoticePopup";

interface NoticePopupWrapperProps {
  notice: {
    _id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    pdf?: string;
    category?: string;
  } | null;
}

export default function NoticePopupWrapper({ notice }: NoticePopupWrapperProps) {
  return <NoticePopup notice={notice} />;
}
