import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-sst-dark text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sst-orange/10 border border-sst-orange/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-sst-orange rounded-full animate-pulse" />
            <span className="text-sst-orange text-sm font-medium">
              Free Training Program
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Team Leader
            <br />
            <span className="text-sst-orange">Training Academy</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Build the skills to lead with excellence. Safety, quality,
            continuous improvement — from foundation to advanced leadership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
            >
              Start Training
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 bg-sst-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Three Pillars of Focus</h2>
          <p className="text-sst-gray text-center mb-12 max-w-xl mx-auto">
            When you take care of People and serve Customers through standard processes, Growth follows naturally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "👥", title: "People", subtitle: "Our Employees", desc: "Safety, development, engagement, respect. Every team member matters." },
              { icon: "🤝", title: "Customers", subtitle: "External & Internal", desc: "Quality, delivery — the next process is your customer. Never pass defects downstream." },
              { icon: "📈", title: "Growth", subtitle: "Standard Processes", desc: "Adherence to standards, continuous improvement. Follow the process, improve the process." },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-sst-border/50 text-center">
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-1">{pillar.title}</h3>
                <p className="text-sm text-sst-orange font-medium mb-3">{pillar.subtitle}</p>
                <p className="text-sst-gray text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Three-Tier Training Path</h2>
          <p className="text-sst-gray text-center mb-12 max-w-xl mx-auto">
            Progress from Foundation to Advanced. Each tier builds on the last with assessments, voice-enabled lessons, and hands-on activities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: "Tier 1", label: "Foundation", level: "Beginner", color: "#22C55E", topics: ["Safety Excellence", "SQDC Framework", "5S Methodology", "Process Flow", "Pre/Post-Flight"] },
              { tier: "Tier 2", label: "Developing", level: "Intermediate", color: "#F59E0B", topics: ["Cost of Quality", "Root Cause Analysis", "5S Auditing", "Team Development"] },
              { tier: "Tier 3", label: "Advanced", level: "Experienced", color: "#8B5CF6", topics: ["Change Management", "Kaizen Culture", "Strategic Alignment", "Leadership Legacy"] },
            ].map((t) => (
              <div key={t.tier} className="relative bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-sst-border/50 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: t.color }} />
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: t.color + "15", color: t.color }}>{t.level}</span>
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
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/academy" className="inline-flex items-center gap-2 bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Enter the Academy
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-sst-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔊", title: "Voice-Enabled", desc: "Listen to lessons with built-in text-to-speech. Adjustable speed." },
              { icon: "📱", title: "Mobile Friendly", desc: "Train on any device — phone, tablet, or desktop." },
              { icon: "✅", title: "Assessments", desc: "Pre and post-training assessments with 80% passing score." },
              { icon: "🏅", title: "Certification", desc: "Complete all three tiers to earn full certification." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-sst-gray">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BARC */}
      <section className="py-12 bg-sst-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400 mb-3">Simpson Strong-Tie BARC Principles</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium">
            <span><span className="text-sst-orange font-bold">B</span>e Customer Focused</span>
            <span className="text-gray-600">·</span>
            <span><span className="text-sst-orange font-bold">A</span>ct with Integrity</span>
            <span className="text-gray-600">·</span>
            <span><span className="text-sst-orange font-bold">R</span>espect Others</span>
            <span className="text-gray-600">·</span>
            <span><span className="text-sst-orange font-bold">C</span>ontinuously Improve</span>
          </div>
          <p className="text-xs text-gray-500 mt-4">&ldquo;Great companies are built with great people.&rdquo; — Barc Simpson, Founder</p>
        </div>
      </section>
    </div>
  );
}
