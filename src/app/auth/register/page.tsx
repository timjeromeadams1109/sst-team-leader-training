"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, AlertCircle, ArrowRight } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/academy";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError("You must agree to the privacy policy and terms"); return; }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = nextUrl;
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-sst-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7 text-sst-orange" />
          </div>
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-sm text-sst-gray mt-1">
            Start your Team Leader training journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sst-border/40 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-sst-charcoal mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sst-gray" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  minLength={2}
                  className="w-full border border-sst-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-sst-orange focus:ring-1 focus:ring-sst-orange/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-sst-charcoal mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sst-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-sst-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-sst-orange focus:ring-1 focus:ring-sst-orange/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-sst-charcoal mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sst-gray" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  className="w-full border border-sst-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-sst-orange focus:ring-1 focus:ring-sst-orange/30 transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-sst-border accent-sst-orange"
              />
              <span className="text-xs text-sst-gray">
                I agree to the{" "}
                <Link href="/privacy" className="text-sst-orange hover:underline" target="_blank">Privacy Policy</Link>
                {" "}and{" "}
                <Link href="/terms" className="text-sst-orange hover:underline" target="_blank">Terms of Service</Link>
              </span>
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 mt-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold py-3 rounded-xl mt-5 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Creating Account..." : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-sst-gray mt-4">
          Already have an account?{" "}
          <Link href={`/auth/login?next=${encodeURIComponent(nextUrl)}`} className="text-sst-orange font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
