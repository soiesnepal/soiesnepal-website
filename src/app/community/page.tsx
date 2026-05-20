"use client";

// Framer Motion fully removed for performance
import {
  MessageCircle,
  BookOpen,
  Users,
  ExternalLink,
  Share2,
  HelpCircle,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: HelpCircle,
    title: "Ask Questions",
    description:
      "Got doubts? Ask your seniors and peers. Get answers from the IE community.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Share2,
    title: "Share Materials",
    description:
      "Share lecture notes, assignments, lab reports, and useful links with fellow students.",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: Lightbulb,
    title: "Discussion Forums",
    description:
      "Engage in topic-based discussions about industrial engineering concepts and projects.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: GraduationCap,
    title: "Mentorship",
    description:
      "Connect with seniors and alumni who can guide you through academics and career.",
    gradient: "from-gold-500 to-gold-600",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Community
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Interactive <span className="gradient-text">Learning</span>{" "}
            Environment
          </h1>
          <p className="text-slate-600 dark:text-navy-300 text-lg max-w-2xl mx-auto mb-8">
            A collaborative space for Industrial Engineering students to learn,
            share, and grow together. Connect with peers, access study materials,
            and get help when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/soiesnepal"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#5865F2]/25"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Join Discord Server
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 border border-slate-300 dark:border-navy-600 text-slate-700 dark:text-navy-200 font-medium rounded-xl hover:border-gold-500/50 hover:text-gold-500 dark:hover:text-gold-400 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid sm:grid-cols-2 gap-6 mb-20">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="p-6 bg-white dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-2xl hover:border-gold-500/30 card-hover group"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon size={26} className="text-white" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            { icon: Users, value: "200+", label: "Community Members" },
            { icon: MessageCircle, value: "1000+", label: "Messages Shared" },
            { icon: BookOpen, value: "50+", label: "Resources Shared" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/30 rounded-2xl"
            >
              <stat.icon
                size={28}
                className="mx-auto text-gold-400 mb-3"
              />
              <p className="text-3xl font-black gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-slate-500 dark:text-navy-400 text-sm">{stat.label}</p>
            </div>
          ))}
            </div>

        {/* How to Join */}
        <div className="bg-gradient-to-br from-slate-100 dark:from-navy-900 to-slate-50 dark:to-navy-800 border border-slate-200 dark:border-navy-700/50 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">
            Ready to Join?
          </h2>
          <p className="text-slate-600 dark:text-navy-300 max-w-lg mx-auto mb-8">
            Our Discord server is the central hub for all SOIES Nepal community
            interactions. Join now and connect with your fellow IE students!
          </p>
          <a
            href="https://discord.gg/soiesnepal"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25"
          >
            <ExternalLink size={18} /> Join SOIES Community
          </a>
        </div>
      </div>
    </div>
  );
}
