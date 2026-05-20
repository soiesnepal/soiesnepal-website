"use client";
import { useRef, useState } from "react";

export default function PullToRefresh() {
  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Only enable on touch devices
  if (typeof window !== "undefined" && !('ontouchstart' in window)) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current !== null) {
      const dist = e.touches[0].clientY - startY.current;
      if (dist > 0 && dist < 120) setPull(dist);
    }
  };

  const handleTouchEnd = () => {
    if (pull > 80) {
      setRefreshing(true);
      window.location.reload();
    }
    setPull(0);
    startY.current = null;
  };

  return (
    <div
      style={{
        height: pull,
        transition: refreshing ? "height 0.2s" : "height 0.1s",
        background: "#fbbf24",
        color: "#fff",
        display: pull > 0 || refreshing ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: 16,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {refreshing ? "Refreshing..." : pull > 80 ? "Release to refresh" : "Pull to refresh"}
    </div>
  );
}
