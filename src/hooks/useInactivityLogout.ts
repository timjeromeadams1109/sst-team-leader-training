"use client";

import { useEffect, useCallback, useRef } from "react";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export function useInactivityLogout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/auth/login?expired=1";
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    const events = ["mousedown", "keydown", "touchstart", "scroll", "mousemove"];

    // Only run if user is logged in (has cookie — check via quick fetch)
    let active = false;
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          active = true;
          resetTimer();
          events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
        }
      })
      .catch(() => {});

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (active) {
        events.forEach((e) => window.removeEventListener(e, resetTimer));
      }
    };
  }, [resetTimer]);
}
