"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  GraduationCap,
  FileText,
  Menu,
  X,
  ShieldCheck,
  UserCircle,
  MessageSquarePlus,
  Bot,
} from "lucide-react";

const navItems = [
  { href: "/academy", label: "Academy", icon: GraduationCap },
  { href: "/resources", label: "Documents", icon: FileText },
  { href: "/chat", label: "Ask AI", icon: Bot },
  { href: "/suggestions", label: "Suggestions", icon: MessageSquarePlus },
];

import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 bg-sst-dark/95 backdrop-blur-md text-white shadow-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-sst-orange rounded-lg flex items-center justify-center font-bold text-sm tracking-tight shadow-md shadow-sst-orange/20 group-hover:shadow-sst-orange/40 transition-shadow">
                SST
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold tracking-wide leading-tight">
                  SIMPSON STRONG-TIE
                </div>
                <div className="text-[10px] text-gray-400 tracking-wider uppercase">
                  Team Leader Training
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      active
                        ? "text-sst-orange bg-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <UserCircle className="w-4 h-4" />
                  <span className="max-w-24 truncate">{user?.name?.split(" ")[0]}</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <UserCircle className="w-4 h-4" />
                  Sign In
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-sst-dark border-l border-white/10 shadow-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sst-orange rounded-lg flex items-center justify-center font-bold text-xs text-white">
                  SST
                </div>
                <span className="text-sm font-bold text-white">Training</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "text-sst-orange bg-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 pt-6 border-t border-white/10 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-xs text-gray-500">
                    Signed in as <span className="text-gray-300">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/5 transition-all w-full text-left"
                  >
                    <UserCircle className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <UserCircle className="w-5 h-5" />
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sst-orange hover:bg-sst-orange/10 transition-all"
                  >
                    <UserCircle className="w-5 h-5" />
                    Create Account
                  </Link>
                </>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-[10px] text-gray-600 leading-relaxed">
                &ldquo;We help people build safer, stronger homes and
                buildings.&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
