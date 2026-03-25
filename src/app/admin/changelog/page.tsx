"use client";

import { motion } from "framer-motion";
import { Clock, GitBranch, Zap, Shield, Palette, Database, Users, FileText } from "lucide-react";

interface ChangeEntry {
  date: string;
  version: string;
  type: "feature" | "fix" | "improvement" | "security";
  title: string;
  details: string[];
}

const changelog: ChangeEntry[] = [
  {
    date: "2026-03-25",
    version: "1.4.0",
    type: "feature",
    title: "User Authentication & Legal Compliance",
    details: [
      "User registration with name/email/password (no email verification required)",
      "User login with JWT cookie sessions (30-day expiry)",
      "Privacy Policy page with full data handling disclosure",
      "Terms of Service page for professional training context",
      "Privacy consent checkbox required at registration",
    ],
  },
  {
    date: "2026-03-25",
    version: "1.3.0",
    type: "feature",
    title: "Admin Dashboard",
    details: [
      "Password-protected admin area with dark theme",
      "Dashboard overview: learner count, completions, pass rates, growth metrics",
      "Course management page with module inventory",
      "Analytics page with pass rate bars and volume charts",
      "Settings page with Supabase setup guide",
      "Event tracking from all learner interactions",
      "Mobile responsive sidebar with hamburger drawer",
    ],
  },
  {
    date: "2026-03-25",
    version: "1.2.0",
    type: "improvement",
    title: "World-Class UI/UX Overhaul",
    details: [
      "Shared component library (Badge, ProgressRing, StepIndicator)",
      "Header with mobile hamburger drawer and active link states",
      "Academy Hub: journey stepper, full-width tier cards, animated progress rings",
      "Course Detail: gradient hero, expandable modules, step flow bar",
      "Lesson Player: dark TTS bar, completion celebration toast, quiz animations",
      "Resources: category filter tabs, color-coded document cards",
      "Added framer-motion animations throughout",
    ],
  },
  {
    date: "2026-03-25",
    version: "1.1.0",
    type: "feature",
    title: "Pre/Post Testing & Documents",
    details: [
      "Mandatory pre-test before course content (baseline measurement)",
      "Post-test for certification (80% pass required)",
      "Refresher on fail: key takeaways review + reshuffled re-test",
      "Question variants for re-tests (reworded + shuffled)",
      "Pre vs Post score growth tracking",
      "12 printable team leader documents (checklists, logs, forms)",
    ],
  },
  {
    date: "2026-03-25",
    version: "1.0.0",
    type: "feature",
    title: "Initial Release",
    details: [
      "3-tier training program: Foundation, Developing, Advanced",
      "MES Mastery supplemental course (12 modules)",
      "Voice-enabled lessons via Web Speech API",
      "Interactive assessments with answer review",
      "Progress tracking via localStorage",
      "Simpson Strong-Tie branding with BARC principles",
      "TPS/WCM verified content (5S, SQDC, Kaizen, Jidoka, PDCA)",
    ],
  },
];

const typeConfig = {
  feature: { label: "Feature", color: "#22C55E", icon: Zap },
  fix: { label: "Fix", color: "#EF4444", icon: Shield },
  improvement: { label: "Improvement", color: "#0EA5E9", icon: Palette },
  security: { label: "Security", color: "#F59E0B", icon: Shield },
};

export default function AdminChangelogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-sst-orange" /> Changelog
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track all changes made to the training platform</p>
      </div>

      <div className="space-y-6">
        {changelog.map((entry, i) => {
          const config = typeConfig[entry.type];
          const TypeIcon = config.icon;
          return (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm font-bold text-white bg-white/[0.06] px-3 py-1 rounded-lg">
                  v{entry.version}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: config.color + "15", color: config.color }}
                >
                  <TypeIcon className="w-3 h-3" /> {config.label}
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {entry.date}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">{entry.title}</h3>
              <ul className="space-y-1.5">
                {entry.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-gray-600 mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
