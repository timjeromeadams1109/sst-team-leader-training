"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  User,
  Loader2,
  Sparkles,
  MessageCircle,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What is SQDC?",
  "Explain 5S",
  "TPS House",
  "5 Whys method",
  "BARC principles",
];

function formatMessage(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/^- /gm, "• ")
    .replace(/\n/g, "<br />");
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
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
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.error || "Sorry, I couldn't process that. Try again." },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-sst-orange hover:bg-sst-orange-dark text-white rounded-full shadow-lg shadow-sst-orange/30 flex items-center justify-center transition-colors print:hidden"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-5 right-5 z-50 w-[340px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-sst-border/40 flex flex-col overflow-hidden print:hidden"
          >
            {/* Header */}
            <div className="bg-sst-dark text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-sst-orange/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-sst-orange" />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">SST Training Assistant</div>
                  <div className="text-[10px] text-gray-400">Lean · TPS · WCM · SQDC · 5S</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <Bot className="w-10 h-10 text-sst-orange/30 mx-auto mb-3" />
                  <p className="text-xs text-sst-gray mb-4">
                    Ask me about Lean, TPS, WCM, safety, quality, or any training topic.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-[10px] bg-sst-light-gray border border-sst-border/30 rounded-full px-2.5 py-1 text-sst-charcoal hover:border-sst-orange hover:text-sst-orange transition-colors"
                      >
                        <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 bg-sst-orange/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-sst-orange" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sst-orange text-white rounded-br-sm"
                        : "bg-sst-light-gray text-sst-charcoal rounded-bl-sm"
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
                    <div className="w-6 h-6 bg-sst-charcoal rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-sst-orange/10 rounded-md flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-sst-orange" />
                  </div>
                  <div className="bg-sst-light-gray rounded-xl rounded-bl-sm px-3 py-2">
                    <Loader2 className="w-3.5 h-3.5 text-sst-gray animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-sst-border/30 px-3 py-2.5 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about TPS, 5S, safety..."
                  disabled={loading}
                  className="flex-1 border border-sst-border/40 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sst-orange transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-sst-orange hover:bg-sst-orange-dark text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
