"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  HardHat,
  AlertCircle,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What is the TPS House?",
  "Explain the 5 Whys method",
  "What does SQDC stand for?",
  "How do I run a Tier 1 meeting?",
  "What are the 7 wastes (Muda)?",
  "Explain Jidoka",
  "What is the 1-10-100 Rule?",
  "BARC principles",
];

function formatMessage(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/^- /gm, "• ")
    .replace(/\n/g, "<br />");
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (res.ok && data.response) {
        setMessages([...newMessages, { role: "assistant", content: data.response }]);
      } else {
        setError(data.error || "Failed to get a response");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="py-4 sm:py-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sst-orange/10 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-sst-orange" />
          </div>
          <div>
            <h1 className="text-lg font-bold">SST Training Assistant</h1>
            <p className="text-xs text-sst-gray">
              Ask about Lean, TPS, WCM, SQDC, 5S, PDCA, BARC, or any training topic
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-sst-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HardHat className="w-8 h-8 text-sst-orange" />
            </div>
            <h2 className="text-lg font-bold mb-2">
              Welcome, Team Leader
            </h2>
            <p className="text-sm text-sst-gray max-w-md mx-auto mb-6">
              I&apos;m your training assistant — grounded in TPS, WCM, and Simpson Strong-Tie principles.
              Ask me anything about lean manufacturing, safety, quality, or leadership.
            </p>

            {/* Quick questions */}
            <div className="flex flex-wrap justify-center gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-white border border-sst-border/40 rounded-full px-3 py-1.5 text-sst-charcoal hover:border-sst-orange hover:text-sst-orange transition-colors"
                >
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-sst-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-sst-orange" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-sst-orange text-white rounded-br-md"
                    : "bg-sst-light-gray text-sst-charcoal rounded-bl-md"
                }`}
                dangerouslySetInnerHTML={
                  msg.role === "assistant"
                    ? { __html: formatMessage(msg.content) }
                    : undefined
                }
              >
                {msg.role === "user" ? msg.content : undefined}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 bg-sst-charcoal rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 bg-sst-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-sst-orange" />
            </div>
            <div className="bg-sst-light-gray rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="w-4 h-4 text-sst-gray animate-spin" />
            </div>
          </motion.div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="py-4 border-t border-sst-border/30 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about TPS, 5S, SQDC, safety, quality..."
            disabled={loading}
            className="flex-1 border border-sst-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sst-orange focus:ring-1 focus:ring-sst-orange/30 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-sst-orange hover:bg-sst-orange-dark text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-sst-gray text-center mt-2">
          Powered by AI — answers grounded in TPS, WCM & Simpson Strong-Tie training content
        </p>
      </div>
    </div>
  );
}
