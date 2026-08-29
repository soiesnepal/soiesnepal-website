export const mockPreviousCommittees = [
  {
    _id: "mock-18",
    title: "18th Executive Committee",
    tenureNumber: 18,
    years: "2023 - 2024",
    description:
      "The 18th executive committee led a strong year of leadership development, member engagement, and strategic community initiatives across SOIES Nepal.",
    teamMembers: [
      {
        name: "Anish Panthi",
        role: "President",
        linkedin: "https://www.linkedin.com",
        socials: "Leadership",
        bio: "Guided the committee with a focus on student leadership and organizational growth.",
        photoUrl: null,
      },
      {
        name: "Shilpa Thapa Magar",
        role: "Vice President",
        linkedin: "https://www.linkedin.com",
        socials: "Operations",
        bio: "Led coordination and internal planning initiatives for the committee.",
        photoUrl: null,
      },
    ],
    committeePhotos: [
      {
        caption: "18th committee leadership team",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        caption: "Community engagement session",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    _id: "mock-19",
    title: "19th Executive Committee",
    tenureNumber: 19,
    years: "2024 - 2025",
    description:
      "The 19th tenure expanded SOIES Nepal's outreach with stronger event coordination, professional exposure, and member development programs.",
    teamMembers: [
      {
        name: "Sambhav Pandit",
        role: "Secretary",
        linkedin: "https://www.linkedin.com",
        socials: "Administration",
        bio: "Coordinated core organizational operations and internal communications.",
        photoUrl: null,
      },
      {
        name: "Subrat Lamichhane",
        role: "Treasurer",
        linkedin: "https://www.linkedin.com",
        socials: "Finance",
        bio: "Managed committee finances and coordinated sponsorship support.",
        photoUrl: null,
      },
    ],
    committeePhotos: [
      {
        caption: "19th committee planning session",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      },
      {
        caption: "Technical workshop moment",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    _id: "mock-20",
    title: "20th Executive Committee",
    tenureNumber: 20,
    years: "2025 - 2026",
    description:
      "The 20th executive term is building on the club's legacy with a stronger focus on research, practical learning, and community impact.",
    teamMembers: [
      {
        name: "Birat Tiwari",
        role: "Joint Secretary",
        linkedin: "https://www.linkedin.com",
        socials: "Coordination",
        bio: "Focused on cross-team collaboration and event execution strategy.",
        photoUrl: null,
      },
      {
        name: "Suprava Pyakurel",
        role: "Event Coordinator",
        linkedin: "https://www.linkedin.com",
        socials: "Events",
        bio: "Designed member-facing programs and built event momentum for the term.",
        photoUrl: null,
      },
    ],
    committeePhotos: [
      {
        caption: "20th committee team briefing",
        imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      },
      {
        caption: "Outreach and networking activity",
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

export const mockCommitteeEvents: Record<number, Array<{ _id: string; title: string; eventDate: string; description: string; category: string; status: string; images: string[]; }>> = {
  18: [
    {
      _id: "mock-event-18-1",
      title: "18th General Assembly",
      eventDate: "2024-03-15",
      description: "A major assembly presenting the committee's progress and upcoming goals.",
      category: "general",
      status: "completed",
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ],
  19: [
    {
      _id: "mock-event-19-1",
      title: "19th Leadership Workshop",
      eventDate: "2025-01-20",
      description: "A leadership and planning workshop for committee growth and execution.",
      category: "workshop",
      status: "completed",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ],
  20: [
    {
      _id: "mock-event-20-1",
      title: "20th Fellowship Drive",
      eventDate: "2026-02-12",
      description: "A community engagement and outreach event led by the 20th committee.",
      category: "general",
      status: "upcoming",
      images: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ],
};
