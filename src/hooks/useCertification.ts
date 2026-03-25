"use client";

import { useState, useCallback, useEffect } from "react";
import { TestResult, TierStatus } from "@/data/courses/types";

const STORAGE_KEY = "sst-training-certification";

interface CertState {
  testResults: Record<string, TestResult>;
}

function loadCert(): CertState {
  if (typeof window === "undefined") return { testResults: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { testResults: {} };
}

function saveCert(state: CertState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useCertification() {
  const [cert, setCert] = useState<CertState>({ testResults: {} });

  useEffect(() => {
    setCert(loadCert());
  }, []);

  const saveTestResult = useCallback((result: TestResult) => {
    setCert((prev) => {
      const next = {
        ...prev,
        testResults: { ...prev.testResults, [result.courseId]: result },
      };
      saveCert(next);
      return next;
    });
  }, []);

  const getTestResult = useCallback(
    (courseId: string): TestResult | undefined => {
      return cert.testResults[courseId];
    },
    [cert]
  );

  const isTestPassed = useCallback(
    (courseId: string): boolean => {
      const result = cert.testResults[courseId];
      return result?.passed ?? false;
    },
    [cert]
  );

  const getTierStatus = useCallback(
    (tier: "foundation" | "developing" | "advanced" | "mes-mastery"): TierStatus => {
      switch (tier) {
        case "foundation":
          return isTestPassed("tier-1-foundation") ? "completed" : "unlocked";
        case "developing":
          return isTestPassed("tier-2-developing")
            ? "completed"
            : isTestPassed("tier-1-foundation")
              ? "unlocked"
              : "locked";
        case "advanced":
          return isTestPassed("tier-3-advanced")
            ? "completed"
            : isTestPassed("tier-2-developing")
              ? "unlocked"
              : "locked";
        case "mes-mastery":
          return "unlocked"; // Always accessible
        default:
          return "locked";
      }
    },
    [isTestPassed]
  );

  const isCourseUnlocked = useCallback(
    (courseId: string): boolean => {
      switch (courseId) {
        case "tier-1-foundation":
          return true;
        case "tier-2-developing":
          return isTestPassed("tier-1-foundation");
        case "tier-3-advanced":
          return isTestPassed("tier-2-developing");
        case "mes-academy":
          return true; // Always accessible
        default:
          return false;
      }
    },
    [isTestPassed]
  );

  const isFullyCertified = useCallback((): boolean => {
    return (
      isTestPassed("tier-1-foundation") &&
      isTestPassed("tier-2-developing") &&
      isTestPassed("tier-3-advanced")
    );
  }, [isTestPassed]);

  const resetCertification = useCallback(() => {
    const next: CertState = { testResults: {} };
    saveCert(next);
    setCert(next);
  }, []);

  return {
    cert,
    saveTestResult,
    getTestResult,
    isTestPassed,
    getTierStatus,
    isCourseUnlocked,
    isFullyCertified,
    resetCertification,
  };
}
