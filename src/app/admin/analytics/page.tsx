"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Users } from "lucide-react";

interface Stats {
  totalLearners: number;
  activeLearners7d: number;
  lessonsCompleted: number;
  testsCompleted: number;
  avgPassRate: number;
  avgGrowth: number;
  documentViews: number;
  courseStats: { courseId: string; attempts: number; passed: number; passRate: number; avgScore: number }[];
  connected: boolean;
}

const courseNames: Record<string, string> = {
  "tier-1-foundation": "Foundation",
  "tier-2-developing": "Developing",
  "tier-3-advanced": "Advanced",
};

const courseColors: Record<string, string> = {
  "tier-1-foundation": "#22C55E",
  "tier-2-developing": "#F59E0B",
  "tier-3-advanced": "#8B5CF6",
};

export default function AdminAnalyticsPage() {
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
    courseStats: [], connected: false,
  };

  const maxAttempts = Math.max(...(s.courseStats.map((c) => c.attempts) || [1]), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Training performance metrics
          {!s.connected && <span className="text-amber-500 ml-2">(Demo data — connect Supabase for live metrics)</span>}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: "Learners", value: s.totalLearners, color: "#0EA5E9" },
          { icon: Target, label: "Pass Rate", value: `${s.avgPassRate}%`, color: "#22C55E" },
          { icon: TrendingUp, label: "Avg Growth", value: s.avgGrowth > 0 ? `+${s.avgGrowth}pts` : "—", color: "#8B5CF6" },
          { icon: BarChart3, label: "Tests Taken", value: s.testsCompleted, color: "#FF5308" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
          >
            <card.icon className="w-5 h-5 mb-2" style={{ color: card.color }} />
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <div className="text-xs text-gray-500">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pass Rate by Course */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-6">Pass Rate by Course</h2>
          <div className="space-y-6">
            {(s.courseStats.length > 0 ? s.courseStats : [
              { courseId: "tier-1-foundation", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
              { courseId: "tier-2-developing", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
              { courseId: "tier-3-advanced", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
            ]).map((cs) => (
              <div key={cs.courseId}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">
                    {courseNames[cs.courseId] || cs.courseId}
                  </span>
                  <span className="text-sm font-bold text-white">{cs.passRate}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cs.passRate}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: courseColors[cs.courseId] || "#FF5308" }}
                  />
                </div>
                <div className="flex gap-4 mt-1 text-[10px] text-gray-600">
                  <span>{cs.passed}/{cs.attempts} passed</span>
                  <span>Avg score: {cs.avgScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attempts Volume */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-6">Test Volume by Course</h2>
          <div className="flex items-end gap-6 h-48">
            {(s.courseStats.length > 0 ? s.courseStats : [
              { courseId: "tier-1-foundation", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
              { courseId: "tier-2-developing", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
              { courseId: "tier-3-advanced", attempts: 0, passed: 0, passRate: 0, avgScore: 0 },
            ]).map((cs) => {
              const height = maxAttempts > 0 ? (cs.attempts / maxAttempts) * 100 : 5;
              return (
                <div key={cs.courseId} className="flex-1 flex flex-col items-center">
                  <div className="text-xs font-bold text-white mb-1">{cs.attempts}</div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 5)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-12 rounded-t-lg"
                    style={{ backgroundColor: courseColors[cs.courseId] || "#FF5308" }}
                  />
                  <div className="text-[10px] text-gray-500 mt-2 text-center">
                    {courseNames[cs.courseId]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
