import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-sm text-sst-gray mb-8">Last updated: March 25, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sst-charcoal">
        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed">By creating an account and using the Simpson Strong-Tie Team Leader Training Application (&ldquo;the Application&rdquo;), you agree to these Terms of Service. If you do not agree, do not use the Application.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">2. Purpose</h2>
          <p className="text-sm leading-relaxed">This Application provides team leader training content based on Toyota Production System (TPS) and World Class Manufacturing (WCM) principles. It is intended for professional development of Simpson Strong-Tie employees and authorized users.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">3. Account Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>You must provide accurate information when creating your account</li>
            <li>You are responsible for maintaining the security of your login credentials</li>
            <li>You must not share your account with others</li>
            <li>You must notify your administrator if you suspect unauthorized access</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">4. Acceptable Use</h2>
          <p className="text-sm leading-relaxed mb-2">You agree to use the Application only for its intended purpose: professional team leader training and development. You must not:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Attempt to access admin features without authorization</li>
            <li>Share assessment questions or answers outside the training context</li>
            <li>Reproduce or distribute training content without permission</li>
            <li>Attempt to manipulate progress or assessment records</li>
            <li>Use the Application for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">5. Intellectual Property</h2>
          <p className="text-sm leading-relaxed">All training content, including text, assessments, documents, and visual elements, is the property of Simpson Strong-Tie or its licensors. The training methodology references Toyota Production System and World Class Manufacturing principles, which are attributed to their respective originators.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">6. Certification</h2>
          <p className="text-sm leading-relaxed">Completion of training tiers and assessments is recorded for professional development purposes. Certifications earned through this platform are internal to Simpson Strong-Tie and may be subject to periodic revalidation.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">7. Disclaimer</h2>
          <p className="text-sm leading-relaxed">Training content is provided for educational purposes. While based on established manufacturing excellence principles (TPS/WCM), this Application does not replace on-the-job training, safety certifications, or regulatory compliance requirements. Always follow your facility&apos;s specific procedures and safety protocols.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">8. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed">The Application is provided &ldquo;as is&rdquo; without warranties of any kind. Simpson Strong-Tie shall not be liable for any damages arising from the use of or inability to use the Application.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">9. Termination</h2>
          <p className="text-sm leading-relaxed">Access to the Application may be terminated by your administrator at any time. Upon termination, your right to use the Application ceases immediately.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mt-8 mb-3">10. Changes to Terms</h2>
          <p className="text-sm leading-relaxed">We reserve the right to modify these terms at any time. Continued use of the Application after changes constitutes acceptance of the revised terms.</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-sst-border/30">
        <Link href="/" className="text-sm text-sst-orange hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}
