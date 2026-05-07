export interface Document {
  id: string;
  title: string;
  description: string;
  category: "daily" | "safety" | "quality" | "improvement";
  icon: string;
}

export const documents: Document[] = [
  {
    id: "pre-flight-checklist",
    title: "Pre-Flight Checklist",
    description: "Start-of-shift readiness verification. Universal + Welding + Fabrication sections.",
    category: "daily",
    icon: "✈️",
  },
  {
    id: "post-flight-checklist",
    title: "Post-Flight Checklist",
    description: "End-of-shift closeout and handoff preparation.",
    category: "daily",
    icon: "🛬",
  },
  {
    id: "shift-passdown",
    title: "Shift Passdown Communication",
    description: "Shift-to-shift handoff form. Status, Issues, Equipment, Quality, Safety.",
    category: "daily",
    icon: "📝",
  },
  {
    id: "tier-1-meeting-script",
    title: "Tier 1 Meeting Script",
    description: "10-15 minute daily huddle guide following SQDCPE sequence.",
    category: "daily",
    icon: "📋",
  },
  {
    id: "leader-standard-work",
    title: "Leader Standard Work",
    description: "Team Leader daily routine — shift start, hourly checks, shift end.",
    category: "daily",
    icon: "📅",
  },
  {
    id: "safety-cross",
    title: "Safety Cross — Monthly Calendar",
    description: "Daily safety tracking calendar. Color-code each day: Green, Yellow, Red.",
    category: "safety",
    icon: "➕",
  },
  {
    id: "good-catch-report",
    title: "Good Catch Report",
    description: "Hazard identification form. Stop → Report → Document → Recognize.",
    category: "safety",
    icon: "🟢",
  },
  {
    id: "scrap-log",
    title: "Scrap Log",
    description: "Daily scrap tracking by part, quantity, reason, and cost impact.",
    category: "quality",
    icon: "🗑️",
  },
  {
    id: "ncr-form",
    title: "Non-Conformance Report (NCR)",
    description: "Quality defect documentation. Stop → Segregate → Document → Notify.",
    category: "quality",
    icon: "⚠️",
  },
  {
    id: "5s-audit",
    title: "5S Audit Checklist",
    description: "Weekly 5S audit form. Score 0-4 for Sort, Set, Shine, Standardize, Sustain.",
    category: "improvement",
    icon: "✅",
  },
  {
    id: "5-why-worksheet",
    title: "5-Why Root Cause Analysis",
    description: "Structured problem-solving worksheet. Define problem → Ask Why 5 times → Fix the system.",
    category: "improvement",
    icon: "🔍",
  },
  {
    id: "andon-log",
    title: "Andon Event Log",
    description: "Track abnormality signals: time, area, issue type, response, resolution.",
    category: "quality",
    icon: "🚨",
  },
  {
    id: "lpa-calendar-instructions",
    title: "LPA Calendar Instructions (WKI 1200)",
    description: "How to complete a Layered Process Audit — standard method, weekly expectations, FAQs. Version 1.0, Jan 2026.",
    category: "quality",
    icon: "📆",
  },
  {
    id: "lpa-deployment-plan",
    title: "LPA Multi-Site Deployment Plan",
    description: "Riverside-proven 4-layer LPA rollout strategy for additional SST manufacturing locations. One site at a time, 18-month horizon.",
    category: "improvement",
    icon: "🏭",
  },
];

export const categoryLabels: Record<string, string> = {
  daily: "Daily Operations",
  safety: "Safety",
  quality: "Quality",
  improvement: "Continuous Improvement",
};

export function getDocument(id: string): Document | undefined {
  return documents.find((d) => d.id === id);
}
