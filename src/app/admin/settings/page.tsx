"use client";

import { motion } from "framer-motion";
import { Settings, Database, Shield, Globe, Info } from "lucide-react";

export default function AdminSettingsPage() {
  const supabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">System configuration and status</p>
      </div>

      <div className="space-y-6">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
        >
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-sst-orange" /> System Status
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: Database,
                label: "Supabase Events",
                status: supabaseConfigured ? "Connected" : "Not configured",
                ok: supabaseConfigured,
                note: supabaseConfigured ? "Events are being tracked" : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
              },
              {
                icon: Shield,
                label: "Admin Auth",
                status: "Active",
                ok: true,
                note: "Password-protected with JWT sessions (24h expiry)",
              },
              {
                icon: Globe,
                label: "Deployment",
                status: "Vercel",
                ok: true,
                note: "Auto-deploys on git push",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 py-2">
                <item.icon className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.ok ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Training Config */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
        >
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-sst-orange" /> Training Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Passing Score", value: "80%", desc: "Required to certify on post-test" },
              { label: "Pre-Test", value: "Required", desc: "Mandatory before course access" },
              { label: "Re-Test Variants", value: "Enabled", desc: "Questions reshuffled/reworded on retry" },
              { label: "Tier Progression", value: "Sequential", desc: "Must pass each tier to unlock next" },
              { label: "MES Academy", value: "Always Open", desc: "No prerequisites required" },
              { label: "TTS Voice", value: "Enabled", desc: "Web Speech API for lesson audio" },
            ].map((item) => (
              <div key={item.label} className="bg-white/[0.02] rounded-xl p-3">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
                <p className="text-[10px] text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Supabase Setup Guide */}
        {!supabaseConfigured && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6"
          >
            <h2 className="text-sm font-bold text-amber-400 mb-3">Connect Supabase for Analytics</h2>
            <div className="text-xs text-gray-400 space-y-2">
              <p>1. Create a Supabase project (or use an existing one)</p>
              <p>2. Run this SQL to create the events table:</p>
              <pre className="bg-black/30 rounded-lg p-3 text-[11px] text-gray-300 overflow-x-auto mt-2">
{`create table sst_events (
  id uuid default gen_random_uuid() primary key,
  learner_id text not null,
  event_type text not null,
  course_id text,
  module_id text,
  lesson_id text,
  score integer,
  test_type text,
  passed boolean,
  document_id text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index idx_sst_events_learner on sst_events(learner_id);
create index idx_sst_events_type on sst_events(event_type);
create index idx_sst_events_created on sst_events(created_at);

-- User accounts
create table sst_users (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text default 'learner',
  created_at timestamptz default now()
);
create index idx_sst_users_email on sst_users(email);

-- Suggestions
create table sst_suggestions (
  id uuid default gen_random_uuid() primary key,
  name text default 'Anonymous',
  category text not null,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);
create index idx_sst_suggestions_status on sst_suggestions(status);`}
              </pre>
              <p className="mt-2">3. Add these env vars in Vercel:</p>
              <pre className="bg-black/30 rounded-lg p-3 text-[11px] text-gray-300 mt-1">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
