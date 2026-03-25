import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-sst-gray mb-8">Last updated: March 25, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sst-charcoal">
        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">1. Introduction</h2>
          <p className="text-sm leading-relaxed">
            Simpson Strong-Tie Team Leader Training (&ldquo;the Application&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our training platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">2. Information We Collect</h2>
          <p className="text-sm leading-relaxed mb-2"><strong>Account Information:</strong> When you create an account, we collect your name, email address, and a securely hashed password. We do not store your password in plain text.</p>
          <p className="text-sm leading-relaxed mb-2"><strong>Training Progress:</strong> We track your lesson completions, assessment scores (pre-test and post-test), and certification status to provide personalized training experiences and measure growth.</p>
          <p className="text-sm leading-relaxed mb-2"><strong>Usage Data:</strong> We collect anonymous usage events including lesson completions, document views, and assessment submissions to improve the training program. These events are associated with anonymous learner identifiers.</p>
          <p className="text-sm leading-relaxed"><strong>Device Information:</strong> We may collect basic browser and device information for compatibility purposes (e.g., to enable text-to-speech features).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>To provide and maintain the training platform</li>
            <li>To track your training progress and certification status</li>
            <li>To generate aggregate analytics for training program improvement</li>
            <li>To enable features like text-to-speech lesson playback</li>
            <li>To communicate important updates about the training program</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">4. Data Storage and Security</h2>
          <p className="text-sm leading-relaxed mb-2">Your training progress is stored locally in your browser (localStorage) for offline access and on our secure servers (Supabase) for persistence. Passwords are hashed using bcrypt before storage.</p>
          <p className="text-sm leading-relaxed">We use HTTPS encryption for all data transmission. Authentication tokens are stored in httpOnly cookies that cannot be accessed by client-side scripts.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">5. Data Sharing</h2>
          <p className="text-sm leading-relaxed">We do not sell, trade, or rent your personal information to third parties. Aggregate, anonymized training analytics may be shared with Simpson Strong-Tie management for program improvement purposes.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">6. Data Retention</h2>
          <p className="text-sm leading-relaxed">We retain your account and training data for the duration of your active use of the platform. You may request deletion of your account and associated data at any time by contacting your system administrator.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">7. Your Rights</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Access:</strong> You can view your training data through the platform</li>
            <li><strong>Correction:</strong> You can update your account information</li>
            <li><strong>Deletion:</strong> You can request account deletion</li>
            <li><strong>Portability:</strong> You can request an export of your training data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">8. Cookies</h2>
          <p className="text-sm leading-relaxed">We use essential cookies for authentication (session tokens) and localStorage for training progress. We do not use advertising or third-party tracking cookies.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">9. Children&apos;s Privacy</h2>
          <p className="text-sm leading-relaxed">This platform is intended for adult employees in a professional training context. We do not knowingly collect information from individuals under 18.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">10. Changes to This Policy</h2>
          <p className="text-sm leading-relaxed">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">11. Contact</h2>
          <p className="text-sm leading-relaxed">For privacy-related questions or data requests, contact your Simpson Strong-Tie training administrator.</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-sst-border/30">
        <Link href="/" className="text-sm text-sst-orange hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}
