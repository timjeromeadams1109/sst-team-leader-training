"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  BarChart3,
  Trophy,
  Headphones,
  Smartphone,
  ClipboardCheck,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Wrench,
  HardHat,
  Cog,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const childFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero with SST product silhouettes */}
      <section className="relative bg-sst-dark text-white py-20 sm:py-28 overflow-hidden">
        {/* Background: floating SST product silhouettes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Joist hangers / connectors floating */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-[8%] opacity-[0.04]"
          >
            <HardHat className="w-32 h-32 sm:w-48 sm:h-48" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-24 right-[10%] opacity-[0.04]"
          >
            <Wrench className="w-28 h-28 sm:w-40 sm:h-40" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-16 left-[15%] opacity-[0.04]"
          >
            <Cog className="w-24 h-24 sm:w-36 sm:h-36" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-24 right-[12%] opacity-[0.04]"
          >
            <Shield className="w-32 h-32 sm:w-44 sm:h-44" />
          </motion.div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,83,8,0.03)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-sst-orange/10 border border-sst-orange/20 rounded-full px-4 py-1.5 mb-6"
              >
                <BookOpen className="w-3.5 h-3.5 text-sst-orange" />
                <span className="text-sst-orange text-xs font-semibold tracking-wide">
                  TPS & WCM Certified Training
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Team Leader
                <br />
                <span className="gradient-text">Training Academy</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed">
                Build the skills to lead with excellence. Grounded in the
                Toyota Production System and World Class Manufacturing
                principles that drive Simpson Strong-Tie&apos;s commitment to safety,
                quality, and continuous improvement.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 lg:justify-start justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-lg shadow-lg shadow-sst-orange/20 hover:shadow-sst-orange/30 hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-all hover:bg-white/5"
                >
                  <BookOpen className="w-4 h-4" />
                  Browse Courses
                </Link>
              </div>
            </motion.div>

            {/* Right: Barc Simpson tribute + stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="relative w-72 sm:w-80">
                {/* Silhouette frame */}
                <div className="bg-gradient-to-br from-sst-orange/10 to-sst-orange/5 border border-sst-orange/10 rounded-3xl p-8 backdrop-blur-sm">
                  {/* Barc Simpson silhouette - represented as an abstract leader figure */}
                  <div className="text-center mb-6">
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <div className="absolute inset-0 bg-sst-orange/20 rounded-full animate-pulse" />
                      <div className="absolute inset-2 bg-sst-dark rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-sst-orange/60" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic leading-relaxed">
                      &ldquo;Great companies are built<br />with great people.&rdquo;
                    </p>
                    <p className="text-[10px] text-sst-orange font-semibold mt-1 tracking-wider uppercase">
                      Barc Simpson, Founder
                    </p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "3", label: "Training Tiers", icon: Trophy },
                      { value: "25+", label: "Modules", icon: BookOpen },
                      { value: "45", label: "Assessments", icon: ClipboardCheck },
                      { value: "12", label: "Documents", icon: Shield },
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center"
                      >
                        <stat.icon className="w-4 h-4 text-sst-orange mx-auto mb-1" />
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-[9px] text-gray-500">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating SST connector illustrations */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-sst-orange/10 border border-sst-orange/20 rounded-xl flex items-center justify-center"
                >
                  <HardHat className="w-5 h-5 text-sst-orange" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-3 -left-3 w-10 h-10 bg-sst-orange/10 border border-sst-orange/20 rounded-lg flex items-center justify-center"
                >
                  <Wrench className="w-4 h-4 text-sst-orange" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 sm:py-20 bg-sst-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Three Pillars of Focus</h2>
            <p className="text-sst-gray max-w-xl mx-auto text-sm">
              When you take care of People and serve Customers through standard processes, Growth follows naturally.
            </p>
          </motion.div>
          <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "People", subtitle: "Our Employees", desc: "Safety, development, engagement, respect. Every team member matters. Safety is non-negotiable.", color: "#0EA5E9" },
              { icon: TrendingUp, title: "Customers", subtitle: "External & Internal", desc: "Quality, delivery — the next process is your customer. Never pass defects downstream.", color: "#FF5308" },
              { icon: BarChart3, title: "Growth", subtitle: "Standard Processes", desc: "Adherence to standards, continuous improvement. Follow the process, improve the process.", color: "#22C55E" },
            ].map((pillar) => (
              <motion.div
                key={pillar.title}
                {...childFade}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sst-border/40 text-center transition-shadow hover:shadow-md"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: pillar.color + "12" }}
                >
                  <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                </div>
                <h3 className="text-xl font-bold mb-1">{pillar.title}</h3>
                <p className="text-sm text-sst-orange font-medium mb-3">{pillar.subtitle}</p>
                <p className="text-sst-gray text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Tiers */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Three-Tier Training Path</h2>
            <p className="text-sst-gray max-w-xl mx-auto text-sm">
              Progress from Foundation to Advanced. Pre-test → Study → Post-test. Voice-enabled lessons grounded in TPS & WCM.
            </p>
          </motion.div>
          <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: "Tier 1", label: "Foundation", level: "Beginner", color: "#22C55E", icon: Shield, topics: ["Safety Excellence", "SQDC Framework", "5S Methodology (Seiri–Shitsuke)", "Process Flow & One-Piece Flow", "Pre/Post-Flight Checklists"] },
              { tier: "Tier 2", label: "Developing", level: "Intermediate", color: "#F59E0B", icon: BarChart3, topics: ["Cost of Quality (1-10-100)", "Root Cause Analysis (5 Whys)", "5S Auditing & Sustainment", "Team Development (Tell-Show-Do-Review)"] },
              { tier: "Tier 3", label: "Advanced", level: "Experienced", color: "#8B5CF6", icon: Trophy, topics: ["Change Management (Change Curve)", "Kaizen Culture & PDCA", "Strategic Alignment", "Leadership Legacy & Succession"] },
            ].map((t) => (
              <motion.div
                key={t.tier}
                {...childFade}
                whileHover={{ y: -4 }}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sst-border/40 overflow-hidden transition-shadow hover:shadow-md group"
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: t.color }} />
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: t.color + "12" }}
                  >
                    <t.icon className="w-5 h-5" style={{ color: t.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: t.color + "15", color: t.color }}>{t.level}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">{t.tier}</h3>
                <p className="text-sst-gray text-sm mb-4">{t.label}</p>
                <ul className="space-y-2">
                  {t.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm text-sst-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/academy"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
                  style={{ color: t.color }}
                >
                  Start {t.label} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-sst-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Built for Real Learning</h2>
            <p className="text-sst-gray max-w-xl mx-auto text-sm">
              Every feature designed to help team leaders master their craft — on the floor, at their pace.
            </p>
          </motion.div>
          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Headphones, title: "Voice-Enabled", desc: "Listen to every lesson with text-to-speech. Adjust speed from 0.75x to 1.5x.", color: "#8B5CF6" },
              { icon: Smartphone, title: "Mobile Friendly", desc: "Train on any device. Responsive design for phone, tablet, and desktop.", color: "#0EA5E9" },
              { icon: ClipboardCheck, title: "Pre & Post Tests", desc: "Baseline your knowledge, study, then prove your growth. 80% to certify.", color: "#FF5308" },
              { icon: Award, title: "Certification", desc: "Complete all three tiers to earn full Team Leader certification.", color: "#22C55E" },
            ].map((f) => (
              <motion.div
                key={f.title}
                {...childFade}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sst-border/40 text-center transition-shadow hover:shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: f.color + "12" }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-sst-gray leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TPS/WCM Foundation */}
      <motion.section {...fadeUp} className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sst-dark rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,83,8,0.08)_0%,_transparent_50%)]" />
            <div className="relative">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">TPS</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Toyota Production System</div>
                </div>
                <div className="text-gray-600 text-xl">+</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">WCM</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">World Class Manufacturing</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                Every lesson is grounded in proven manufacturing excellence principles.
                From 5S (Seiri–Shitsuke) to Jidoka and Kaizen — this isn&apos;t theory.
                It&apos;s the same system that built Toyota and drives Simpson Strong-Tie.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-sst-orange/20 hover:shadow-sst-orange/30 hover:-translate-y-0.5"
              >
                Begin Your Training <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BARC with Barc Simpson tribute */}
      <section className="py-12 sm:py-16 bg-sst-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Simpson Strong-Tie BARC Principles</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium mb-6">
              {[
                { letter: "B", text: "e Customer Focused" },
                { letter: "A", text: "ct with Integrity" },
                { letter: "R", text: "espect Others" },
                { letter: "C", text: "ontinuously Improve" },
              ].map((item, i) => (
                <motion.span
                  key={item.letter}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-sst-orange font-bold text-lg">{item.letter}</span>
                  <span className="text-gray-300">{item.text}</span>
                </motion.span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="w-8 h-8 bg-sst-orange/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-sst-orange/60" />
              </div>
              <p className="text-xs text-gray-500 italic">
                &ldquo;Great companies are built with great people.&rdquo; — <span className="text-gray-400 font-medium">Barc Simpson, Founder</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
