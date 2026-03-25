"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquarePlus,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  Wrench,
  Lightbulb,
  Users,
  ClipboardList,
} from "lucide-react";

const categories = [
  { id: "safety", label: "Safety", icon: Shield, color: "#EF4444" },
  { id: "quality", label: "Quality", icon: ClipboardList, color: "#8B5CF6" },
  { id: "process", label: "Process Improvement", icon: Wrench, color: "#0EA5E9" },
  { id: "training", label: "Training Content", icon: Lightbulb, color: "#F59E0B" },
  { id: "team", label: "Team / People", icon: Users, color: "#22C55E" },
  { id: "other", label: "Other", icon: MessageSquarePlus, color: "#848484" },
];

export default function SuggestionsPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: anonymous ? "" : name,
          category,
          message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setName("");
        setCategory("");
        setMessage("");
        setAnonymous(false);
      } else {
        setError(data.error || "Failed to submit");
        setStatus("error");
      }
    } catch {
      setError("Connection error");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-14 h-14 bg-sst-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageSquarePlus className="w-7 h-7 text-sst-orange" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Suggestion Box</h1>
        <p className="text-sst-gray text-sm max-w-md mx-auto">
          Your ideas matter. Submit suggestions for safety improvements, process changes,
          training content, or anything that helps the team. Anonymous submissions welcome.
        </p>
      </motion.div>

      {status === "success" ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-sst-success/10 border border-sst-success/30 rounded-2xl p-8 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-sst-success mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Thank You!</h2>
          <p className="text-sm text-sst-gray mb-6">
            Your suggestion has been submitted. Every idea helps us improve.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="inline-flex items-center gap-2 bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Submit Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-sst-border/40 p-6 shadow-sm"
        >
          {/* Anonymous toggle */}
          <label className="flex items-center gap-3 mb-5 cursor-pointer">
            <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${anonymous ? "bg-sst-orange" : "bg-sst-border"}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${anonymous ? "translate-x-4" : ""}`} />
            </div>
            <span className="text-sm text-sst-charcoal">Submit anonymously</span>
          </label>

          {/* Name (if not anonymous) */}
          {!anonymous && (
            <div className="mb-4">
              <label className="block text-xs font-medium text-sst-charcoal mb-1.5">
                Your Name <span className="text-sst-gray">(optional)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name or full name"
                className="w-full border border-sst-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sst-orange focus:ring-1 focus:ring-sst-orange/30 transition-all"
              />
            </div>
          )}

          {/* Category */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-sst-charcoal mb-2">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                    category === cat.id
                      ? "text-white border-transparent shadow-md"
                      : "border-sst-border/40 text-sst-charcoal hover:border-sst-border"
                  }`}
                  style={category === cat.id ? { backgroundColor: cat.color } : {}}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-sst-charcoal mb-1.5">Your Suggestion</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your idea, concern, or suggestion..."
              required
              minLength={5}
              rows={4}
              className="w-full border border-sst-border/50 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-sst-orange focus:ring-1 focus:ring-sst-orange/30 transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !category || message.trim().length < 5}
            className="w-full bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit Suggestion
              </>
            )}
          </button>

          <p className="text-[10px] text-sst-gray text-center mt-3">
            All suggestions are reviewed by the training team. Anonymous submissions cannot be followed up on directly.
          </p>
        </motion.form>
      )}
    </div>
  );
}
