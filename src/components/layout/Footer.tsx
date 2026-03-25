import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-sst-dark text-gray-400 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-sst-orange rounded-lg flex items-center justify-center font-bold text-xs text-white">
                SST
              </div>
              <span className="text-sm font-bold text-white">
                Simpson Strong-Tie
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              &ldquo;We help people build safer, stronger homes and
              buildings.&rdquo;
            </p>
            <p className="text-[10px] text-gray-600 mt-3">
              Training grounded in Toyota Production System (TPS)
              <br />& World Class Manufacturing (WCM) principles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <nav className="space-y-2">
              {[
                { href: "/academy", label: "Training Academy" },
                { href: "/resources", label: "Team Leader Documents" },
                { href: "/admin", label: "Admin Dashboard" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-500 hover:text-sst-orange transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* BARC */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              BARC Principles
            </h3>
            <ul className="space-y-1.5 text-xs">
              {[
                { letter: "B", text: "e Customer Focused" },
                { letter: "A", text: "ct with Integrity" },
                { letter: "R", text: "espect Others" },
                { letter: "C", text: "ontinuously Improve" },
              ].map((item) => (
                <li key={item.letter} className="flex items-center gap-1">
                  <span className="text-sst-orange font-bold">
                    {item.letter}
                  </span>
                  <span className="text-gray-500">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-gray-600 mt-3 italic">
              &ldquo;Great companies are built with great people.&rdquo; — Barc
              Simpson, Founder
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
