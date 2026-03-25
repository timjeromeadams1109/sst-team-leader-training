"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  FileText,
  Activity,
  Trophy,
  Zap,
} from "lucide-react";

interface Stats {
  totalLearners: number;
  activeLearners7d: number;
  lessonsCompleted: number;
  testsCompleted: number;
  avgPassRate: number;
  avgGrowth: number;
  documentViews: number;
  courseStats: { courseId: string; attempts: number; passed: number; passRate: number; avgScore: number }[];
  recentEvents: { event_type: string; course_id?: string; learner_id: string; created_at: string; score?: number; passed?: boolean; document_id?: string }[];
  connected: boolean;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color,
  index,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sublabel?: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      {sublabel && <div className="text-[10px] text-gray-600 mt-1">{sublabel}</div>}
    </motion.div>
  );
}

const courseNames: Record<string, string> = {
  "tier-1-foundation": "Tier 1 — Foundation",
  "tier-2-developing": "Tier 2 — Developing",
  "tier-3-advanced": "Tier 3 — Advanced",
};

const eventLabels: Record<string, string> = {
  lesson_complete: "Completed lesson",
  test_result: "Submitted test",
  document_view: "Viewed document",
  document_print: "Printed document",
};

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-sst-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const s = stats || {
    totalLearners: 0, activeLearners7d: 0, lessonsCompleted: 0,
    testsCompleted: 0, avgPassRate: 0, avgGrowth: 0, documentViews: 0,
    courseStats: [], recentEvents: [], connected: false,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Training program overview
          {!s.connected && (
            <span className="ml-2 text-amber-500">(Supabase not connected — showing demo data)</span>
          )}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Learners" value={s.totalLearners} sublabel={`${s.activeLearners7d} active this week`} color="#0EA5E9" index={0} />
        <StatCard icon={BookOpen} label="Lessons Completed" value={s.lessonsCompleted} color="#22C55E" index={1} />
        <StatCard icon={ClipboardCheck} label="Tests Submitted" value={s.testsCompleted} sublabel={`${s.avgPassRate}% pass rate`} color="#FF5308" index={2} />
        <StatCard icon={TrendingUp} label="Avg Growth" value={s.avgGrowth > 0 ? `+${s.avgGrowth}pts` : "—"} sublabel="Pre → Post improvement" color="#8B5CF6" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Performance */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-sst-orange" /> Course Performance
          </h2>
          <div className="space-y-4">
            {(s.courseStats.length > 0 ? s.courseStats : [
              { courseId: "tier-1-foundation", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
              { courseId: "tier-2-developing", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
              { courseId: "tier-3-advanced", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
            ]).map((cs) => (
              <div key={cs.courseId} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{courseNames[cs.courseId] || cs.courseId}</span>
                    <span className="text-xs text-gray-500">{cs.passRate}% pass rate</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cs.passRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-sst-orange rounded-full"
                    />
                  </div>
                  <div className="flex gap-4 mt-1 text-[10px] text-gray-600">
                    <span>{cs.attempts} attempts</span>
                    <span>{cs.passed} passed</span>
                    <span>Avg: {cs.avgScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-sst-orange" /> Recent Activity
          </h2>
          {s.recentEvents.length === 0 ? (
            <p className="text-xs text-gray-600 text-center py-8">
              No events yet. Activity will appear here as learners use the training app.
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {s.recentEvents.slice(0, 15).map((e, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    e.event_type === "test_result" ? "bg-sst-orange" :
                    e.event_type === "lesson_complete" ? "bg-sst-success" :
                    "bg-blue-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300">
                      {eventLabels[e.event_type] || e.event_type}
                      {e.course_id && <span className="text-gray-500"> · {courseNames[e.course_id] || e.course_id}</span>}
                      {e.score != null && <span className="text-gray-500"> · {e.score}%</span>}
                      {e.passed != null && (
                        <span className={e.passed ? "text-green-500" : "text-amber-500"}>
                          {e.passed ? " ✓" : " ✗"}
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-gray-600">{timeAgo(e.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard icon={FileText} label="Document Views" value={s.documentViews} color="#0EA5E9" index={4} />
        <StatCard icon={Zap} label="Active This Week" value={s.activeLearners7d} color="#F59E0B" index={5} />
        <StatCard icon={Trophy} label="Pass Rate" value={`${s.avgPassRate}%`} color="#22C55E" index={6} />
        <StatCard icon={TrendingUp} label="Avg Growth" value={s.avgGrowth > 0 ? `+${s.avgGrowth}` : "—"} sublabel="points" color="#8B5CF6" index={7} />
      </div>
    </div>
  );
}
