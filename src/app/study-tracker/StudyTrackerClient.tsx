"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const STYLES = `
  .focus-app {
    background-color: #0a0a0a;
    min-height: 100vh;
    font-family: system-ui, -apple-system, sans-serif;
    color: #e0e0e0;
    overflow-x: hidden;
    position: relative;
  }
  .focus-app * {
    box-sizing: border-box;
  }
  .drawer {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .drawer-open {
    transform: translateX(0);
  }
  .drawer-closed {
    transform: translateX(100%);
  }
  .ghost-btn {
    background: transparent;
    border: 1px solid #333;
    color: #ccc;
    font-family: inherit;
    cursor: pointer;
    border-radius: 22px;
    height: 44px;
    padding: 0 24px;
    transition: all 0.2s ease;
    font-size: 14px;
  }
  .ghost-btn:hover {
    border-color: #666;
    color: #fff;
  }
  .solid-btn {
    background: #fff;
    border: none;
    color: #000;
    font-family: inherit;
    cursor: pointer;
    border-radius: 22px;
    height: 44px;
    padding: 0 24px;
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
  }
  .solid-btn:hover {
    background: #e0e0e0;
  }
  .pill-row {
    border: 1px solid transparent;
    transition: border-color 0.2s ease;
  }
  .pill-row:hover {
    border-color: #1e1e1e;
  }
  .icon-btn {
    background: transparent;
    border: none;
    color: #555;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: color 0.1s;
  }
  .icon-btn:hover {
    color: #fff;
  }
  .alert-pill {
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .text-input {
    width: 100%;
    margin-top: 8px;
    background: transparent;
    border: 1px solid #333;
    color: #e0e0e0;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 300;
  }
  .text-input:focus {
    outline: none;
    border-color: #666;
  }
  .focus-app input[type="number"]::-webkit-inner-spin-button,
  .focus-app input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinimizeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 10 14 10 20"></polyline>
    <polyline points="20 10 14 10 14 4"></polyline>
    <line x1="14" y1="10" x2="21" y2="3"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "36px", height: "20px", borderRadius: "10px",
        background: enabled ? "#e0e0e0" : "#222",
        border: "none", cursor: "pointer", position: "relative",
        transition: "background 0.2s ease"
      }}
    >
      <div style={{
        width: "14px", height: "14px", borderRadius: "50%",
        background: enabled ? "#000" : "#888",
        position: "absolute", top: "3px", left: enabled ? "19px" : "3px",
        transition: "left 0.2s ease"
      }} />
    </button>
  );
}

function NumberInput({ value, onChange, min = 0, max = 999, step = 1, width = "40px" }: { value: number; onChange: (val: number) => void; min?: number; max?: number; step?: number; width?: string }) {
  const handleSub = () => onChange(Math.max(min, value - step));
  const handleAdd = () => onChange(Math.min(max, value + step));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "2px", height: "30px" }}>
      <button className="icon-btn" onClick={handleSub} style={{ padding: "0 8px", fontSize: "14px", color: value <= min ? "#333" : "#aaa", pointerEvents: value <= min ? "none" : "auto" }}>−</button>
      <div style={{ fontSize: "14px", color: "#e0e0e0", width: width, textAlign: "center", fontWeight: 300 }}>{value}</div>
      <button className="icon-btn" onClick={handleAdd} style={{ padding: "0 8px", fontSize: "14px", color: value >= max ? "#333" : "#aaa", pointerEvents: value >= max ? "none" : "auto" }}>+</button>
    </div>
  );
}

const DEFAULT_SETTINGS = {
  goalMinutes: 120,
  sessionMinutes: 50,
  weightKg: 70,
  reminders: {
    hydration: true,
    eyeRest: true,
    stretch: false,
    stretchInterval: 60,
  },
  username: "Student",
};

function getYYYYMMDD(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatTimeHHMM(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDateLong(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatClock(totalSec: number) {
  const hours = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (hours > 0) {
    return `${hours}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
      <div style={{ fontSize: "12px", color: "#555" }}>{label}</div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "0.5px", background: "#1a1a1a", margin: "0 0 16px 0" }} />;
}

function ReminderRow({ label, field, settings, updateSetting, showInterval = false }: any) {
  const enabled = settings.reminders[field];
  const interval = settings.reminders[`${field}Interval`];

  const toggle = () => {
    updateSetting("reminders", { ...settings.reminders, [field]: !enabled });
  };
  const changeInterval = (v: any) => {
    updateSetting("reminders", { ...settings.reminders, [`${field}Interval`]: Number(v) });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ fontSize: "13px", color: "#ddd" }}>{label}</div>
        <ToggleSwitch enabled={enabled} onToggle={toggle} />
      </div>
      {(enabled && showInterval) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "4px", paddingLeft: "8px" }}>
          <div style={{ fontSize: "12px", color: "#777" }}>Every</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <NumberInput value={interval || 60} onChange={changeInterval} min={10} max={120} step={10} width="30px" />
            <span style={{ fontSize: "12px", color: "#777" }}>min</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudyTrackerClient() {
  const [isClient, setIsClient] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [studiedSeconds, setStudiedSeconds] = useState(0);
  const [hydrationCount, setHydrationCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState("");
  const [streakIncrementedToday, setStreakIncrementedToday] = useState(false);

  // Focus states: idle | running | paused | eye-rest | hydration-check | break-timer
  const [sessionState, setSessionState] = useState("idle");
  const [sessionRemainingSec, setSessionRemainingSec] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alerts, setAlerts] = useState<{id: string, message: string}[]>([]);
  const [now, setNow] = useState<Date | null>(null);

  const focusTrackerRef = useRef({
    hydrationAcc: 0,
    eyeRestAcc: 0,
    stretchAcc: 0,
  });

  const hydrationGoal = Math.ceil(((settings.weightKg || 70) * 35) / 300);

  // Client init and clock
  useEffect(() => {
    setIsClient(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Load data
  useEffect(() => {
    if (!isClient) return;
    const storedStr = localStorage.getItem("studyTrackerDataV2");
    let st = 0, hc = 0, sc = 0, lad = "", sets = DEFAULT_SETTINGS, sit = false;
    const todayStr = getYYYYMMDD(new Date());

    if (storedStr) {
      try {
        const parsed = JSON.parse(storedStr);
        st = parsed.studiedSeconds || 0;
        hc = parsed.hydrationCount || 0;
        sc = parsed.streakCount || 0;
        lad = parsed.lastActiveDate || "";
        sets = { ...DEFAULT_SETTINGS, ...parsed.settings, reminders: { ...DEFAULT_SETTINGS.reminders, ...parsed.settings?.reminders } };
        sit = parsed.streakIncrementedToday || false;
      } catch (e) {}
    }

    if (lad && lad !== todayStr) {
      const todayDate = new Date(todayStr);
      const ladDate = new Date(lad);
      const diffDays = Math.floor((todayDate.getTime() - ladDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        sc = 0;
      } else if (diffDays === 1) {
        if (!sit) {
          sc = 0; // Broke streak yesterday
        }
      }
      st = 0;
      hc = 0;
      sit = false;
    }

    setStudiedSeconds(st);
    setHydrationCount(hc || 0); // Don't bound max on hydration, keep what was saved
    setStreakCount(sc);
    setLastActiveDate(todayStr);
    setSettings(sets);
    setStreakIncrementedToday(sit);
    setDataLoaded(true);
  }, [isClient]);

  // Handle midnight rollover
  useEffect(() => {
    if (!dataLoaded || !now) return;
    const todayStr = getYYYYMMDD(now);
    if (todayStr !== lastActiveDate) {
      setStreakCount((prevSc) => (streakIncrementedToday ? prevSc : 0));
      setStudiedSeconds(0);
      setHydrationCount(0);
      setStreakIncrementedToday(false);
      setLastActiveDate(todayStr);
      setSessionState("idle");
    }
  }, [now, dataLoaded, lastActiveDate, streakIncrementedToday]);

  // Check streak based on goal logic
  useEffect(() => {
    if (!dataLoaded) return;
    if (studiedSeconds >= 30 * 60 && !streakIncrementedToday) {
      setStreakCount((prev) => prev + 1);
      setStreakIncrementedToday(true);
    }
  }, [studiedSeconds, dataLoaded, streakIncrementedToday]);

  // Save data
  useEffect(() => {
    if (!dataLoaded) return;
    const saveId = setTimeout(() => {
      const payload = {
        studiedSeconds,
        hydrationCount,
        streakCount,
        lastActiveDate,
        settings,
        streakIncrementedToday,
      };
      localStorage.setItem("studyTrackerDataV2", JSON.stringify(payload));
    }, 500);
    return () => clearTimeout(saveId);
  }, [studiedSeconds, hydrationCount, streakCount, lastActiveDate, settings, streakIncrementedToday, dataLoaded]);

  const triggerAlert = useCallback((message: string) => {
    const id = Date.now() + Math.random().toString();
    setAlerts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 10000);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Main Timer loop
  useEffect(() => {
    if (sessionState !== "running" && sessionState !== "eye-rest" && sessionState !== "break-timer") return;

    const t = setInterval(() => {
      setSessionRemainingSec((prev) => {
        if (prev <= 1) return 0; // Handled by 0-check effect securely
        return prev - 1;
      });

      if (sessionState === "running") {
        setStudiedSeconds((prev) => prev + 1);

        const tracker = focusTrackerRef.current;
        if (settings.reminders?.hydration) {
          tracker.hydrationAcc += 1;
          if (tracker.hydrationAcc >= 30 * 60) {
            triggerAlert("Time to drink water 💧");
            tracker.hydrationAcc = 0;
          }
        }
        if (settings.reminders?.eyeRest) {
          tracker.eyeRestAcc += 1;
          if (tracker.eyeRestAcc >= 20 * 60) {
            triggerAlert("Time for an eye rest 👀");
            tracker.eyeRestAcc = 0;
          }
        }
        if (settings.reminders?.stretch) {
          tracker.stretchAcc += 1;
          if (tracker.stretchAcc >= (settings.reminders.stretchInterval || 60) * 60) {
            triggerAlert("Time to stretch 🧘");
            tracker.stretchAcc = 0;
          }
        }
      }
    }, 1000);

    return () => clearInterval(t);
  }, [sessionState, settings.reminders, triggerAlert]);

  // Handle phase changes on reaching 0
  useEffect(() => {
    if (sessionRemainingSec === 0) {
      if (sessionState === "running") {
        setSessionState("eye-rest");
        setSessionRemainingSec(20);
        setIsMinimized(false);
      } else if (sessionState === "eye-rest") {
        setSessionState("hydration-check");
      } else if (sessionState === "break-timer") {
        setSessionState("idle");
        setIsMinimized(false);
      }
    }
  }, [sessionRemainingSec, sessionState]);

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddWater = () => {
    setHydrationCount((prev) => prev + 1);
  };

  const handleHydrationCheckComplete = (drank: boolean) => {
    if (drank) handleAddWater();
    setSessionState("break-timer");
    setSessionRemainingSec(settings.sessionMinutes >= 50 ? 15 * 60 : 5 * 60);
  };

  // Fullscreen UI Control
  const isFocusTakeover = (sessionState === "running" || sessionState === "paused" || sessionState === "eye-rest" || sessionState === "hydration-check") && !isMinimized;

  useEffect(() => {
    if (isFocusTakeover) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFocusTakeover]);

  if (!isClient || !now) {
    return (
      <div className="focus-app" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{STYLES}</style>
      </div>
    );
  }

  const progressPct = Math.min(100, (studiedSeconds / (30 * 60)) * 100);
  const totalBreakSec = settings.sessionMinutes >= 50 ? 15 * 60 : 5 * 60;
  const sessionProgressPct = sessionState === "break-timer"
    ? (sessionRemainingSec > 0 ? 100 - (sessionRemainingSec / totalBreakSec) * 100 : 0)
    : (sessionRemainingSec > 0 ? 100 - (sessionRemainingSec / (settings.sessionMinutes * 60)) * 100 : 0);

  return (
    <div className="focus-app">
      <style>{STYLES}</style>

      {/* FULLSCREEN TAKEOVER VIEW */}
      {isFocusTakeover && (
        <div style={{ position: "fixed", inset: 0, background: "#0a0a0a", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {sessionState === "running" || sessionState === "paused" ? (
            <>
              <div style={{ position: "absolute", top: "24px", right: "24px" }}>
                <button className="icon-btn" onClick={() => setIsMinimized(true)}>
                  <MinimizeIcon />
                </button>
              </div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#444" }}>
                Focus Session
              </div>
              <div style={{ fontSize: "120px", fontWeight: 300, color: "#f0f0f0", letterSpacing: "0.02em" }}>
                {formatClock(sessionRemainingSec)}
              </div>
              
              <div style={{ width: "220px", height: "2px", background: "#1a1a1a", borderRadius: "1px", marginBottom: "40px", overflow: "hidden", marginTop: "16px" }}>
                <div style={{ height: "100%", background: "#555", width: `${Math.max(0, sessionProgressPct)}%`, transition: "width 1s linear" }} />
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <button className="ghost-btn" onClick={() => setSessionState(sessionState === "running" ? "paused" : "running")}>
                  {sessionState === "running" ? "Pause" : "Resume"}
                </button>
                <button className="solid-btn" onClick={() => { setSessionState("idle"); setIsMinimized(false); }}>
                  Done
                </button>
              </div>
            </>
          ) : sessionState === "eye-rest" ? (
            <>
              <div style={{ fontSize: "32px", fontWeight: 300, color: "#f0f0f0", marginBottom: "16px" }}>
                Rest your eyes
              </div>
              <div style={{ fontSize: "16px", color: "#888", marginBottom: "40px", textAlign: "center" }}>
                Look at something 20 feet away<br/>for 20 seconds
              </div>
              <div style={{ fontSize: "72px", fontWeight: 300, color: "#f0f0f0" }}>
                {sessionRemainingSec}
              </div>
            </>
          ) : sessionState === "hydration-check" ? (
             <>
              <div style={{ fontSize: "32px", fontWeight: 300, color: "#f0f0f0", marginBottom: "16px" }}>
                Drink some water
              </div>
              <div style={{ fontSize: "16px", color: "#888", marginBottom: "40px" }}>
                You've logged {hydrationCount} / {hydrationGoal} glasses today
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                 <button className="solid-btn" onClick={() => handleHydrationCheckComplete(true)}>
                     I drank a glass
                 </button>
                 <button className="ghost-btn" onClick={() => handleHydrationCheckComplete(false)}>
                     Skip water
                 </button>
              </div>
             </>
          ) : sessionState === "break-timer" ? (
             <>
              <div style={{ fontSize: "32px", fontWeight: 300, color: "#f0f0f0", marginBottom: "16px" }}>
                Take a break
              </div>
              <div style={{ fontSize: "120px", fontWeight: 300, color: "#f0f0f0", letterSpacing: "0.02em" }}>
                {formatClock(sessionRemainingSec)}
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "40px" }}>
                 <button className="solid-btn" onClick={() => setSessionState("idle")}>
                     End break
                 </button>
              </div>
             </>
          ) : null}
        </div>
      )}

      {/* PICTURE-IN-PICTURE (MINIMIZED) */}
      {isMinimized && (sessionState === "running" || sessionState === "paused" || sessionState === "break-timer") && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#111", border: "1px solid #333", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", zIndex: 90, boxShadow: "0 8px 24px rgba(0,0,0,0.5)"}}>
          <div>
            <div style={{ fontSize: "10px", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {sessionState === "break-timer" ? "Break" : "Focus"}
            </div>
            <div style={{ fontSize: "24px", color: "#f0f0f0", fontWeight: 300 }}>{formatClock(sessionRemainingSec)}</div>
          </div>
          <button className="ghost-btn" style={{ height: "32px", padding: "0 12px", fontSize: "12px" }} onClick={() => setIsMinimized(false)}>
             Expand
          </button>
        </div>
      )}

      {/* IDLE OR BACKGROUND NORMAL APP VIEW */}
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "32px 40px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#444" }}>
            SOIES Focus {settings.username ? ` • ${settings.username}` : ""}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#111",
                padding: "6px 12px",
                borderRadius: "16px",
              }}
            >
              <span style={{ fontSize: "14px" }}>🔥 {streakCount}</span>
              <div style={{ width: "36px", height: "3px", background: "#222", borderRadius: "1.5px", overflow: "hidden" }}>
                <div style={{ width: `${progressPct}%`, height: "100%", background: "#c0540a", transition: "width 1s ease" }} />
              </div>
            </div>
            <button className="icon-btn" onClick={() => setDrawerOpen(true)}>
              <SettingsIcon />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: "72px", fontWeight: 300, color: "#f0f0f0", letterSpacing: "0.02em", lineHeight: 1 }}>
            {formatTimeHHMM(now)}
          </div>
          <div style={{ fontSize: "13px", color: "#444", letterSpacing: "0.06em", marginTop: "12px" }}>
            {formatDateLong(now)}
          </div>

          <div style={{ marginTop: "72px", minHeight: "140px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {sessionState === "idle" ? (
              <button
                className="ghost-btn"
                onClick={() => {
                  setSessionRemainingSec(settings.sessionMinutes * 60);
                  setSessionState("running");
                  focusTrackerRef.current = { hydrationAcc: 0, eyeRestAcc: 0, stretchAcc: 0 };
                  setIsMinimized(false);
                }}
              >
                Start session
              </button>
            ) : !isMinimized && sessionState === "break-timer" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#444" }}>
                  Break Time
                </div>
                <div style={{ fontSize: "42px", fontWeight: 300, margin: "16px 0", color: "#e0e0e0" }}>
                  {formatClock(sessionRemainingSec)}
                </div>

                <div style={{ width: "220px", height: "2px", background: "#1a1a1a", borderRadius: "1px", marginBottom: "32px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#555", width: `${Math.max(0, sessionProgressPct)}%`, transition: "width 1s linear" }} />
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button className="solid-btn" onClick={() => { setSessionState("idle"); setIsMinimized(false); }}>
                    End break
                  </button>
                  <button className="icon-btn" onClick={() => setIsMinimized(true)} style={{ border: "1px solid #333", borderRadius: "22px", padding: "0 16px" }}>
                     Minimize
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <div className="pill-row" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 24px", borderRadius: "24px" }}>
            <button className="icon-btn" onClick={handleAddWater}>
              <PlusIcon />
            </button>
            <div style={{ display: "flex", gap: "10px" }}>
              {Array.from({ length: Math.max(hydrationGoal, hydrationCount) }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: i < hydrationCount ? "#2c6ee8" : "#1e1e1e",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: "12px", color: "#555", minWidth: "36px", textAlign: "right" }}>
              {hydrationCount} <span style={{ opacity: 0.5 }}>/</span> {hydrationGoal}
            </div>
          </div>
        </div>
      </div>

      {/* ALERTS SYSTEM */}
      <div style={{ position: "fixed", bottom: "40px", left: "0", right: "0", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", gap: "8px", zIndex: 110 }}>
        {alerts.map((a) => (
          <div
            key={a.id}
            className="alert-pill"
            style={{
              pointerEvents: "auto",
              background: "#1a1a1a",
              border: "1px solid #333",
              padding: "10px 16px 10px 20px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: "13px", color: "#ddd" }}>{a.message}</span>
            <button onClick={() => dismissAlert(a.id)} style={{ background: "transparent", border: "none", color: "#666", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* SETTINGS DRAWER OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 120,
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
          backdropFilter: "blur(2px)",
        }}
        onClick={() => setDrawerOpen(false)}
      />
      {/* SETTINGS DRAWER */}
      <div
        className={`drawer ${drawerOpen ? "drawer-open" : "drawer-closed"}`}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "280px",
          background: "#0f0f0f",
          borderLeft: "0.5px solid #1e1e1e",
          zIndex: 130,
          padding: "32px 24px",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "12px", color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em" }}>Settings</div>
          <button className="icon-btn" onClick={() => setDrawerOpen(false)} style={{ color: "#fff" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <SettingRow label="Username">
          <input type="text" className="text-input" value={settings.username} onChange={(e) => updateSetting("username", e.target.value)} />
        </SettingRow>

        <Divider />

        <SettingRow label="Body weight (kg)">
          <NumberInput value={settings.weightKg || 70} onChange={(v) => updateSetting("weightKg", v)} min={30} max={150} step={1} />
        </SettingRow>
        <div style={{ fontSize: "10px", color: "#555", marginTop: "-12px", marginBottom: "20px" }}>Used to automate your daily hydration goal.</div>

        <Divider />

        <SettingRow label="Daily goal (min)">
          <NumberInput value={settings.goalMinutes} onChange={(v) => updateSetting("goalMinutes", v)} min={30} max={600} step={30} />
        </SettingRow>
        <div style={{ fontSize: "10px", color: "#555", marginTop: "-12px", marginBottom: "20px" }}>30 min minimum counts toward streak</div>

        <Divider />

        <SettingRow label="Session duration (min)">
          <NumberInput value={settings.sessionMinutes} onChange={(v) => updateSetting("sessionMinutes", v)} min={25} max={150} step={25} />
        </SettingRow>

        <Divider />

        <div style={{ fontSize: "12px", color: "#666", marginBottom: "16px", marginTop: "8px" }}>Reminders</div>
        <ReminderRow label="Hydration" field="hydration" settings={settings} updateSetting={updateSetting} />
        <ReminderRow label="Eye rest" field="eyeRest" settings={settings} updateSetting={updateSetting} />
        <ReminderRow label="Stretch" field="stretch" settings={settings} updateSetting={updateSetting} showInterval={true} />
      </div>
    </div>
  );
}
