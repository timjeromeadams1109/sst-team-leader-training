"use client";

import { useInactivityLogout } from "@/hooks/useInactivityLogout";

export function InactivityGuard() {
  useInactivityLogout();
  return null;
}
