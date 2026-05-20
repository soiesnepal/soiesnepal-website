"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ExternalLink,
  Search,
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface Subject {
  name: string;
  driveLink?: string;
}

interface Semester {
  _id: string;
  name: string;
  number: number;
  driveLink: string;
  subjects?: Subject[];
}

/* ───────── floating particles ───────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  icon: "book" | "grad" | "layers" | "sparkle";
}

function generateParticles(count: number): Particle[] {
  const icons: Particle["icon"][] = ["book", "grad", "layers", "sparkle"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 12 + Math.random() * 16,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * -20,
    opacity: 0.06 + Math.random() * 0.1,
    icon: icons[i % icons.length],
  }));
}

// particles will be generated on the client only to avoid hydration mismatch

function useParticles(count: number) {
  // generate once per component instance
  const ref = useRef<Particle[] | null>(null);
  if (ref.current === null) {
    ref.current = generateParticles(count);
  }
  return ref.current;
}

function ParticleIcon({ icon, size }: { icon: Particle["icon"]; size: number }) {
  const props = { size, strokeWidth: 1 };
  switch (icon) {
    case "book":
      return <BookOpen {...props} />;
    case "grad":
      return <GraduationCap {...props} />;
    case "layers":
      return <Layers {...props} />;
    case "sparkle":
      return <Sparkles {...props} />;
  }
}

/* ───────── 3D tilt card ───────── */
function TiltCard({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          ),
        }}
      />
    </motion.a>
  );
}

/* ───────── cycling placeholder ───────── */
const PLACEHOLDER_SUBJECTS = [
  "Thermodynamics",
  "Fluid Mechanics",
  "C-Programming",
  "Quality Management",
  "Project Management",
  "Operation Research",
  "CAD",
  "Material Science",
];

function useCyclingPlaceholder(subjects: string[], interval = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % subjects.length);
    }, interval);
    return () => clearInterval(timer);
  }, [subjects, interval]);
  return `Search "${subjects[index]}"...`;
}

const bgPositions = [
  "0% 0%",
  "50% 0%",
  "100% 0%",
  "0% 50%",
  "50% 50%",
  "100% 50%",
  "0% 100%",
  "50% 100%",
];

/* ───────── subject aliases / acronyms / nicknames ───────── */
const SUBJECT_ALIASES: Record<string, string[]> = {
  // Semester 1
  "C-Programming": ["c programming", "c lang", "c language", "cprog", "c prog"],
  "Engineering Drawing I": ["ed1", "ed 1", "ed-1", "drawing 1", "engg drawing", "engineering draw"],
  "Engineering Mathematics I": ["math1", "math 1", "em1", "em 1", "engg math", "maths 1", "calculus"],
  "Engineering Mechanics I": ["mech1", "statics", "engg mechanics", "mechanics 1"],
  "Engineering Physics": ["physics", "phy", "engg physics", "ep"],
  "Basic Electrical Engineering": ["bee", "electrical basics", "basic electrical", "electric"],
  "Fundamentals of Electrical Engineering": ["fee", "foee", "electrical fundamentals"],
  "Fundamentals of Electronics Engineering": ["feee", "electronics fundamentals", "basic electronics"],
  "Computer Programming": ["cp", "programming", "coding", "computer prog"],
  "Applied Mechanics": ["applied mech", "am", "mechanics applied"],

  // Semester 2
  "Engineering Chemistry": ["chemistry", "chem", "engg chemistry", "ec"],
  "Engineering Mathematics II": ["math2", "math 2", "em2", "em 2", "maths 2", "laplace", "fourier"],
  "Engineering Mechanics II": ["mech2", "dynamics", "mechanics 2", "kinetics"],
  "Engineering Thermodynamics I": ["thermo1", "thermo 1", "td1", "thermodynamics 1", "thermo"],
  "Engineering Workshop": ["workshop", "ws", "engg workshop"],
  "Machine Drawing": ["md", "machine draw"],
  "Basic Electronics Engineering": ["basic electronics", "electronics", "bee"],
  "Engineering Drawing II": ["ed2", "ed 2", "ed-2", "drawing 2"],
  "Thermodynamics and Heat Transfer": ["thermo heat", "heat transfer", "tht", "td ht"],
  "Workshop Technology": ["workshop tech", "wt"],

  // Semester 3
  "Applied Thermodynamics": ["applied thermo", "at", "thermo applied"],
  "Engineering Mathematics III": ["math3", "math 3", "em3", "em 3", "maths 3", "complex analysis", "probability"],
  "Industrial Management": ["im", "industrial mgmt", "management"],
  "Manufacturing and Production Processes": ["mpp", "manufacturing process", "production process"],
  "Material Science": ["ms", "material sci", "materials", "metallurgy basics"],
  "Strength of Material": ["som", "strength material", "mechanics of materials", "solid mechanics"],
  "Computer Aided Drawing (CAD)": ["cad", "autocad", "computer aided design", "solidworks"],
  "Economics": ["eco", "economics", "engg economics basics"],
  "Fluid Mechanics and Machines": ["fmm", "fluid mechanics", "fm", "fluids", "hydraulics"],
  "Manufacturing Technology": ["mt", "manufacturing tech"],
  "Material Science and Metallurgy": ["msm", "metallurgy", "material metallurgy"],
  "Work Study and Ergonomics": ["wse", "ergonomics", "work study", "time study", "motion study"],

  // Semester 4
  "Electrical Machines": ["em", "electrical machine", "motor", "transformer", "generators"],
  "Group Work and Presentation": ["gwp", "group work", "presentation", "seminar"],
  "Industrial Economics": ["ie", "industrial eco", "economics industrial"],
  "Metrology and Instrumentation": ["mi", "metrology", "instrumentation", "measurement"],
  "Numerical Methods": ["nm", "numerical method", "numerical", "interpolation", "iteration"],
  "Work Study and Human Factor Engineering": ["wshfe", "human factor", "ergonomics", "work study hfe"],
  "Engineering Economics": ["ee", "engg eco", "engineering eco", "economics engineering"],
  "Heat and Mass Transfer": ["hmt", "heat mass", "heat transfer", "mass transfer", "conduction", "convection", "radiation"],
  "Probability and Statistics": ["prob", "stats", "statistics", "probability", "prob stats"],
  "Production Technology": ["pt", "production tech"],
  "Strength of Materials": ["som", "strength materials", "solid mechanics"],

  // Semester 5
  "Energy Audit": ["ea", "energy audit", "audit energy"],
  "Energy, Power and Technology": ["ept", "energy power", "power technology", "energy tech"],
  "Hydraulic and Pneumatic Controls": ["hpc", "hydraulic", "pneumatic", "hydraulics pneumatics"],
  "Metrology and Measurement": ["mm", "metrology measurement", "measurement"],
  "Numerical Method": ["nm", "numerical", "numerical methods"],
  "Project Management": ["pm", "project mgmt", "project management"],
  "Supply Chain Management": ["scm", "supply chain", "logistics", "inventory management"],

  // Semester 6
  "Communication English": ["english", "comm english", "communication", "technical writing"],
  "Concurrent Engineering and Value Engineering": ["ceve", "concurrent eng", "value engineering", "ve", "ce ve"],
  "Design of Machine Element": ["dome", "dme", "machine design", "machine element", "gear design", "shaft design"],
  "Entrepreneurship Development": ["ed", "entrepreneurship", "startup", "business development"],
  "Human Resource Management": ["hrm", "hr", "human resource", "hr management"],
  "Maintenance Engineering": ["me", "maintenance", "maintenance eng", "tpm", "predictive maintenance"],
  "New Product Development": ["npd", "product development", "product design"],
  "Theory of Machine": ["tom", "theory machine", "mechanism", "kinematics", "cam", "gear"],

  // Semester 7
  "Automobile Engineering": ["auto", "automobile", "automotive", "vehicle engineering"],
  "Engineering Ethics and Industrial Law": ["eeil", "ethics", "industrial law", "engineering ethics", "law"],
  "Operation Research": ["or", "operations research", "linear programming", "simplex", "optimization"],
  "Plant Layout Design and Operations Health and Safety": ["pld ohs", "plant layout", "ohs", "occupational health", "safety", "plant design"],
  "Quality Management": ["qm", "quality", "tqm", "total quality", "six sigma", "iso", "quality control", "qc"],
  "Refrigeration and HVAC System Design": ["hvac", "rac", "refrigeration", "air conditioning", "ac system"],

  // Semester 8
  "OJT Report": ["ojt", "on the job training", "internship", "training report"],
  "Seminar Reports": ["seminar", "report", "technical seminar"],
  "Final Year Project": ["fyp", "final project", "capstone", "thesis", "project"],
};

/* ───────── fuzzy matching utilities ───────── */

/** Levenshtein distance between two strings */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/** Check if query fuzzy-matches a target (exact > contains > alias > levenshtein) */
function fuzzyMatch(query: string, subjectName: string): boolean {
  const q = query.toLowerCase();
  const name = subjectName.toLowerCase();

  // Exact or substring
  if (name.includes(q) || q.includes(name)) return true;

  // Word-level: any word in subject starts with query
  const words = name.split(/[\s,()/-]+/).filter(Boolean);
  if (words.some((w) => w.startsWith(q))) return true;

  // Alias match
  const aliases = SUBJECT_ALIASES[subjectName];
  if (aliases?.some((a) => a.includes(q) || q.includes(a))) return true;

  // Fuzzy: short queries need closer match
  const threshold = q.length <= 3 ? 1 : q.length <= 6 ? 2 : 3;

  // Check against each word
  if (words.some((w) => levenshtein(q, w) <= threshold)) return true;

  // Check against aliases
  if (aliases?.some((a) => {
    const aliasWords = a.split(/\s+/);
    return aliasWords.some((aw) => levenshtein(q, aw) <= threshold) || levenshtein(q, a) <= threshold;
  })) return true;

  return false;
}

/** Find "did you mean" suggestions from all subject names + aliases */
function findSuggestions(query: string, allSubjects: string[]): string[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  const scored: { name: string; score: number }[] = [];

  for (const name of allSubjects) {
    const nameLower = name.toLowerCase();
    const words = nameLower.split(/[\s,()/-]+/).filter(Boolean);
    let bestDist = Infinity;

    // Distance to full name
    bestDist = Math.min(bestDist, levenshtein(q, nameLower));

    // Distance to each word
    for (const w of words) {
      bestDist = Math.min(bestDist, levenshtein(q, w));
    }

    // Distance to aliases
    const aliases = SUBJECT_ALIASES[name] || [];
    for (const a of aliases) {
      bestDist = Math.min(bestDist, levenshtein(q, a));
      for (const aw of a.split(/\s+/)) {
        bestDist = Math.min(bestDist, levenshtein(q, aw));
      }
    }

    // Partial match bonus: if any word starts with first 2+ chars of query
    if (q.length >= 2 && (words.some((w) => w.startsWith(q.slice(0, 2))) || aliases.some((a) => a.startsWith(q.slice(0, 2))))) {
      bestDist = Math.min(bestDist, 2);
    }

    if (bestDist <= 4) {
      scored.push({ name, score: bestDist });
    }
  }

  scored.sort((a, b) => a.score - b.score);
  // Return top 3 unique suggestions
  return scored.slice(0, 3).map((s) => s.name);
}

/* ───────── main component ───────── */
export default function LibraryClient({ semesters }: { semesters: Semester[] }) {
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = useCyclingPlaceholder(PLACEHOLDER_SUBJECTS);
  const query = (activeChip || search).trim().toLowerCase();

  // Collect all subject names for suggestion engine
  const allSubjectNames = useMemo(
    () => semesters.flatMap((s) => s.subjects?.map((sub) => sub.name) || []),
    [semesters],
  );

  const filtered = useMemo(() => {
    if (!query) return semesters.map((sem) => ({ sem, matchedSubjects: [] as string[] }));
    return semesters
      .map((sem) => {
        const semMatch = sem.name.toLowerCase().includes(query) || sem.number.toString() === query;
        const matched =
          sem.subjects
            ?.filter((s) => fuzzyMatch(query, s.name))
            .map((s) => s.name) || [];
        if (semMatch || matched.length > 0) {
          return { sem, matchedSubjects: matched };
        }
        return null;
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);
  }, [semesters, query]);

  // "Did you mean?" suggestions when no results
  const suggestions = useMemo(() => {
    if (!query || filtered.length > 0) return [];
    return findSuggestions(query, allSubjectNames);
  }, [query, filtered.length, allSubjectNames]);

  const isSearching = query.length > 0;

  // ----- bored learning randomizer -----
  const refreshItems = [
    "Take a 5-minute walk",
    "Listen to your favorite song",
    "Drink a glass of water",
    "Do a quick stretch",
    "Look at something green",
    "Close your eyes and breathe",
    "Jot down a fun fact",
    "Watch a short funny clip",
    "Call a friend",
    "Draw a doodle",
    "Write down one thing you're grateful for",
    "Look at the sky for a minute",
    "Stand up and sit down 10 times",
    "Hum your favorite tune",
    "Do a 30-second plank",
    "Read a random Wikipedia page",
    "Try a tongue twister",
    "Rotate your wrists and ankles",
    "Name five countries that start with S",
    "Sketch the view from your window",
    "Say the alphabet backwards",
    "Touch your toes 5 times",
    "Whistle a melody",
    "Snap a photo of something interesting",
    "Write a haiku about today",
    "List three goals for tomorrow",
    "Do 10 jumping jacks",
    "Look for shapes in the clouds",
    "Crack your knuckles (gently!)",
    "Try a new food item",
    "Read a random poem",
    "Copy a motivational quote",
    "Practice a deep breathing exercise",
    "Describe your favorite movie without naming it",
    "Check the time on your watch/unclock",
    "Mix a quick snack",
    "Look up a new word and its meaning",
    "Try a funny accent for one sentence",
    "Recite a childhood memory",
    "Flip something over on your desk",
    "Write down the last dream you remember",
    "Stretch your neck slowly",
    "Close one eye and open the other repeatedly",
    "Toss a paper ball into a trash can",
    "Rearrange one item on your desk",
    "Name five fruits that are red",
    "Do a small meditation for one minute",
    "Imagine a peaceful place",
    `Say "hello" in three different languages`,
    "Touch your nose with your tongue",
    "Spin in your chair once",
    "Draw a quick smiley face",
    "Recall your first day at school",
    "Tell yourself a joke silently",
    "Look at a picture of someone you love",
    "Write down three things you like about yourself",
    "Think of a word that rhymes with 'orange'",
    "Snap your fingers rhythmically",
    "Shift your chair slightly to the left",
    "Blow a kiss to yourself",
    "Think of your favorite dessert",
    "Fold a paper airplane",
    "Say 'I am awesome' out loud",
    "Spin slowly in place",
    "Touch your right ear with left hand and vice versa",
    "Think of a random animal and mimic its sound",
    "Look around and count 10 blue objects",
    "Gently tap your shoulders 10 times",
    "Do a quick yoga pose",
    "Recite three colors of the rainbow",
    "Write your name with your non-dominant hand",
    "Imagine you're a superhero for a moment",
    "Listen for 10 seconds to ambient sounds",
    "Reach up high and then touch your toes",
    "Say the first thing that comes to mind",
    "Look at something small and describe it",
    "Pucker lips and hold for 5 seconds",
    "Pretend to play an invisible piano",
    "Think of a happy memory",
    "Pat your head and rub your belly",
    "Count backwards from 20",
    "Practice a new handshake",
    "Pretend to juggle",
    "Write a one-sentence story",
    "Say 'thank you' to yourself",
    "Imagine painting with your finger",
    "Do 5 calf raises",
    "Say your favorite book title out loud",
    "Touch each fingertip with your thumb",
    "Invent a new word",
    "Smile widely for 10 seconds",
    "Bounce gently in your seat",
    "Look at something shiny",
    "Think of a song you can hum",
    "Pretend you're in a movie",
    "Stretch arms wide like a star",
    "Close eyes and tilt your head side to side",
    "Whisper the alphabet",
    "Discuss an idea in your head",
    "Imagine flying like a bird",
    "Tap your knee rhythmically",
    "Take a slow sip of water",
    "Match two colors around you",
    "Write a short list of favorite things",
    "Do a quick handshake with yourself",
    "Pick a random letter and say five words starting with it",
    "Think of a place you'd like to visit",
    "Roll your shoulders forward and back",
    "Snap a selfie and delete it",
    "Compliment yourself internally",
    "Pretend to play a guitar",
    "Stretch your arms above your head",
    "Say 'I can do this'",
    "Think of a season you like",
    "Blink rapidly for a count of five",
    "Press your palms together and release",
    "Think of a famous landmark",
    "Count how many steps you've taken today",
    "Pretend to drink from an empty cup",
    "Look left, then right, then up, then down",
    "Say your initials backwards",
    "Touch your heel to your opposite knee",
    "Think of a color you haven't seen yet",
    "Hum the first song that comes to mind",
  ];
  const [mindRefresh, setMindRefresh] = useState<string | null>(null);
  const handleRefresh = () => {
    const choice = refreshItems[Math.floor(Math.random() * refreshItems.length)];
    setMindRefresh(choice);
  };

  /* quick-filter chips — popular subject keywords */
  const chips = ["Thermodynamics", "Mechanics", "Management", "Mathematics", "Engineering Drawing"];

  const handleChip = (chip: string) => {
    if (activeChip === chip) {
      setActiveChip(null);
      setSearch("");
    } else {
      setActiveChip(chip);
      setSearch("");
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-navy-950 overflow-hidden">
      {/* ── Floating particles background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {useParticles(40).map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-gold-500/30 dark:text-gold-400/20"
            animate={{
              y: [0, -60, 20, -40, 0],
              x: [0, 30, -20, 10, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity }}
          >
            <ParticleIcon icon={p.icon} size={p.size} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold-500/10 dark:bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 dark:border-gold-400/20 mb-5"
            >
              <BookOpen size={14} />
              Resources
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white">
              <span className="gradient-text">Library</span>
            </h1>
            <p className="text-slate-500 dark:text-navy-300 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Access study materials for{" "}
              <span className="text-gold-500 font-semibold">48+ subjects</span>{" "}
              across{" "}
              <span className="text-gold-500 font-semibold">{semesters.length} semesters</span>{" "}
              of Industrial Engineering.
            </p>
          </motion.div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-6 sm:gap-10 mb-10"
          >
            {[
              { label: "Semesters", value: semesters.length },
              { label: "Subjects", value: "48+" },
              { label: "Google Drives", value: semesters.length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.span
                  className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {stat.value}
                </motion.span>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-navy-400 uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* ── Interactive Learning Environment Initiative ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-gold-50/80 via-white/90 to-navy-50/80 dark:from-navy-900/80 dark:via-navy-950/90 dark:to-navy-900/80 border border-gold-200 dark:border-navy-700 rounded-2xl p-6 shadow-lg">
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#5865F2] text-white text-3xl shadow-md">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#5865F2"/><path d="M24.5 21.167c-1.167.5-2.417.833-3.75 1.083-.333-.5-.667-1.083-.917-1.583 1.75-.25 3.333-.667 4.75-1.25.083.583.083 1.167-.083 1.75zm-13 1.083c-1.333-.25-2.583-.583-3.75-1.083-.167-.583-.167-1.167-.083-1.75 1.417.583 3 .917 4.75 1.25-.25.5-.583 1.083-.917 1.583zm10.083-2.083c-2.083.333-4.25.333-6.333 0-.25-.5-.5-1.083-.667-1.667 2.25.333 4.5.333 6.75 0-.167.584-.417 1.167-.75 1.667zm-8.25-2.25c-2.083-.5-3.917-1.25-5.25-2.167.25-1.167.833-2.25 1.667-3.167 1.25.917 2.833 1.667 4.75 2.167-.25.667-.417 1.334-.417 2.167zm13.334-2.167c.834.917 1.417 2 1.667 3.167-1.333.917-3.167 1.667-5.25 2.167 0-.833-.167-1.5-.417-2.167 1.917-.5 3.5-1.25 4.75-2.167zm-6.667-1.167c-2.25-.333-4.417-.917-6.25-1.75.25-.917.667-1.75 1.25-2.5 1.667.75 3.75 1.25 6 1.5-.083.667-.167 1.334-.167 2.25zm8.25-1.75c.583.75 1 1.583 1.25 2.5-1.833.833-4 1.417-6.25 1.75 0-.916-.083-1.583-.167-2.25 2.25-.25 4.333-.75 6-1.5zm-7.25-1.083c-2.083-.25-4.083-.75-5.75-1.5.5-.833 1.167-1.583 2-2.167 1.5.667 3.25 1.083 5 1.25-.083.5-.167 1.083-.25 1.417zm8.5-1.5c.833.584 1.5 1.334 2 2.167-1.667.75-3.667 1.25-5.75 1.5-.083-.334-.167-.917-.25-1.417 1.75-.167 3.5-.583 5-1.25z" fill="#fff"/></svg>
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-1">Interactive Learning Environment</h2>
                <p className="text-navy-700 dark:text-navy-200 text-sm mb-2">
                  A unique initiative by the 18th Executive Committee, the Interactive Learning Environment is a dedicated Discord channel where seniors actively help juniors with notes, resources, and problem-solving. Whether you’re stuck on a tough concept, need past notes, or want to discuss real-world applications, you’ll find a supportive community ready to help you grow.
                </p>
                <ul className="list-disc pl-5 text-navy-600 dark:text-navy-300 text-xs mb-2">
                  <li>Get help with coursework, assignments, and exam prep</li>
                  <li>Access curated notes and resources from seniors</li>
                  <li>Ask questions and get real-time answers</li>
                  <li>Collaborate on problem-solving and projects</li>
                  <li>Build connections across batches</li>
                </ul>
                <a
                  href="https://discord.gg/CaKVvnE9z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-5 py-2.5 bg-[#5865F2] text-white font-semibold rounded-lg shadow hover:bg-[#4752c4] transition-colors"
                >
                  Join the Discord Channel
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="max-w-xl mx-auto mb-4"
          >
            <div className="relative group/search">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500/20 via-gold-400/10 to-gold-500/20 rounded-2xl opacity-0 group-hover/search:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-500 transition-colors group-focus-within/search:text-gold-500"
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={activeChip ? `Filtering: ${activeChip}` : placeholder}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveChip(null);
                  }}
                  className="w-full pl-11 pr-10 py-4 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-navy-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/50 transition-all text-sm shadow-sm"
                />
                {(search || activeChip) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveChip(null);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-navy-300 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── Quick-filter chips ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto"
          >
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeChip === chip
                    ? "bg-gold-500 text-white border-gold-500 shadow-md shadow-gold-500/25"
                    : "bg-slate-50 dark:bg-navy-900/40 text-slate-500 dark:text-navy-400 border-slate-200 dark:border-navy-700/50 hover:border-gold-500/50 hover:text-gold-500"
                }`}
              >
                {chip}
              </button>
            ))}
          </motion.div>

          {/* ── Search result count ── */}
          <AnimatePresence>
            {isSearching && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-xs text-slate-400 dark:text-navy-500 mb-6"
              >
                {filtered.length === 0
                  ? "No semesters matched"
                  : `${filtered.length} semester${filtered.length !== 1 ? "s" : ""} matched`}
                {activeChip && (
                  <span className="ml-1 text-gold-500">
                    for &ldquo;{activeChip}&rdquo;
                  </span>
                )}
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Cards grid ── */}
          {filtered.length === 0 && isSearching ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen size={56} className="mx-auto text-slate-200 dark:text-navy-700 mb-4" />
              </motion.div>
              <p className="text-slate-500 dark:text-navy-400 text-lg font-medium">
                No results for &ldquo;{search || activeChip}&rdquo;
              </p>
              <p className="text-slate-400 dark:text-navy-500 text-sm mt-1">
                Try searching by subject name, acronym, or semester number
              </p>

              {/* Did you mean? */}
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <p className="text-sm text-slate-400 dark:text-navy-500 mb-2">
                    Did you mean?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSearch(s);
                          setActiveChip(null);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 hover:border-gold-500/40 transition-all duration-200 cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(({ sem, matchedSubjects }, i) => (
                  <motion.div
                    key={sem._id}
                    layout
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      layout: { duration: 0.3 },
                    }}
                  >
                    {(!sem.subjects || sem.subjects.length === 0 || !sem.driveLink) ? (
                      <div className="group relative block rounded-2xl overflow-hidden shadow-lg bg-slate-100 dark:bg-navy-900/60 flex flex-col items-center justify-center h-52 sm:h-60 text-center p-6">
                        <Sparkles size={40} className="mx-auto mb-3 text-gold-400" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-1">{sem.name}</h3>
                        <p className="text-slate-500 dark:text-navy-300 text-sm mb-2">Coming Soon</p>
                        <a
                          href="https://discord.gg/CaKVvnE9z"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 px-4 py-2 bg-[#5865F2] text-white font-semibold rounded-lg shadow hover:bg-[#4752c4] transition-colors text-xs"
                        >
                          Contribute Resources
                        </a>
                      </div>
                    ) : (
                      <TiltCard
                        href={sem.driveLink}
                        className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gold-500/20 transition-shadow duration-500 cursor-pointer"
                      >
                        {/* Background image with gradient overlay */}
                        <div className="relative h-52 sm:h-60 overflow-hidden">
                          <div
                            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                            style={{
                              backgroundImage: "url(/library.webp)",
                              backgroundSize: "300% 300%",
                              backgroundPosition:
                                bgPositions[(sem.number - 1) % bgPositions.length],
                            }}
                          />
                          {/* Dark gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-transparent transition-all duration-500" />

                          {/* Semester number */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                              SEM {sem.number}
                            </span>
                          </div>

                          {/* ExternalLink indicator */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <ExternalLink size={20} className="text-white" />
                            </div>
                          </div>

                          {/* Bottom content */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                            <h3 className="text-white text-lg sm:text-xl font-bold drop-shadow-lg">
                              {sem.name}
                            </h3>
                            <p className="text-white/60 text-xs mt-0.5 group-hover:text-white/80 transition-colors">
                              Click to open Google Drive
                            </p>
                          </div>
                        </div>

                        {/* Matched subjects panel */}
                        <AnimatePresence>
                          {isSearching && matchedSubjects.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-slate-50 dark:bg-navy-900/60 px-3 py-2.5 space-y-1 border-t border-slate-100 dark:border-navy-800">
                                {matchedSubjects.slice(0, 4).map((name, si) => (
                                  <div key={si} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                                    <span className="text-[11px] text-slate-600 dark:text-navy-300 truncate">
                                      {name}
                                    </span>
                                  </div>
                                ))}
                                {matchedSubjects.length > 4 && (
                                  <p className="text-[10px] text-slate-400 dark:text-navy-500 pl-3">
                                    +{matchedSubjects.length - 4} more
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </TiltCard>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Bored learning section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="max-w-md mx-auto my-12 text-center"
          >
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Feeling stuck?
            </p>
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-gold-500 text-white rounded-lg shadow hover:bg-gold-600 transition-colors"
            >
              Bored learning?
            </button>
            {mindRefresh && (
              <p className="mt-4 text-sm text-slate-700 dark:text-navy-300">
                💡 {mindRefresh}
              </p>
            )}
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-xs text-slate-400 dark:text-navy-500">
              All materials are hosted on Google Drive. Click any semester to access resources.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
