"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clipboard,
  Shield,
  Target,
  TrendingUp,
  Printer,
  ArrowRight,
  FileText,
} from "lucide-react";
import { documents, categoryLabels } from "@/data/documents";

const categoryConfig = {
  daily: { icon: Clipboard, color: "#0EA5E9", bg: "#0EA5E9" },
  safety: { icon: Shield, color: "#EF4444", bg: "#EF4444" },
  quality: { icon: Target, color: "#8B5CF6", bg: "#8B5CF6" },
  improvement: { icon: TrendingUp, color: "#22C55E", bg: "#22C55E" },
} as const;

const categories = ["all", "daily", "safety", "quality", "improvement"] as const;

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredDocs =
    activeTab === "all"
      ? documents
      : documents.filter((d) => d.category === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-14 h-14 bg-sst-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-7 h-7 text-sst-orange" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Team Leader Documents
        </h1>
        <p className="text-sst-gray max-w-lg mx-auto text-sm">
          Printable forms, checklists, and logs for daily use on the production
          floor. Click to view and print.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {categories.map((cat) => {
          const active = activeTab === cat;
          const config = cat !== "all" ? categoryConfig[cat] : null;
          const CatIcon = config?.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "text-white shadow-md"
                  : "bg-white border border-sst-border/40 text-sst-gray hover:text-sst-charcoal hover:border-sst-border"
              }`}
              style={
                active
                  ? { backgroundColor: config?.color ?? "#FF5308" }
                  : undefined
              }
            >
              {CatIcon && <CatIcon className="w-3.5 h-3.5" />}
              {cat === "all" ? "All Documents" : categoryLabels[cat]}
            </button>
          );
        })}
      </motion.div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filteredDocs.map((doc) => {
          const config = categoryConfig[doc.category];
          return (
            <Link
              key={doc.id}
              href={`/resources/${doc.id}`}
              className="bg-white rounded-2xl border border-sst-border/40 overflow-hidden hover-lift group"
            >
              {/* Color accent */}
              <div className="h-1" style={{ backgroundColor: config.color }} />
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.color + "12" }}
                  >
                    <span className="text-lg">{doc.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm group-hover:text-sst-orange transition-colors leading-tight">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-sst-gray mt-1 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-sst-border/20">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: config.color }}
                  >
                    {categoryLabels[doc.category]}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-sst-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Printer className="w-3 h-3" /> View & Print
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
