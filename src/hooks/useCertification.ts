"use client";

import { useState, useCallback, useEffect } from "react";
import { TestResult, TierStatus } from "@/data/courses/types";
import { trackEvent } from "@/lib/track";

const STORAGE_KEY = "sst-training-certification";

interface CertState {
  preTestResults: Record<string, TestResult>;
  postTestResults: Record<string, TestResult>;
}

function loadCert(): CertState {
  if (typeof window === "undefined")
    return { preTestResults: {}, postTestResults: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Migration: old format had testResults, new has pre/post
      if (parsed.testResults && !parsed.postTestResults) {
        return {
          preTestResults: {},
          postTestResults: parsed.testResults,
        };
      }
      return {
        preTestResults: parsed.preTestResults || {},
        postTestResults: parsed.postTestResults || {},
      };
    }
  } catch {
    // ignore
  }
  return { preTestResults: {}, postTestResults: {} };
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
  const [cert, setCert] = useState<CertState>({
    preTestResults: {},
    postTestResults: {},
  });

  useEffect(() => {
    setCert(loadCert());
  }, []);

  const saveTestResult = useCallback((result: TestResult) => {
    setCert((prev) => {
      const key =
        result.testType === "pre" ? "preTestResults" : "postTestResults";
      const next = {
        ...prev,
        [key]: { ...prev[key], [result.courseId]: result },
      };
      saveCert(next);
      trackEvent({
        event_type: "test_result",
        course_id: result.courseId,
        score: result.score,
        test_type: result.testType,
        passed: result.passed,
      });
      return next;
    });
  }, []);

  const getPreTestResult = useCallback(
    (courseId: string): TestResult | undefined => {
      return cert.preTestResults[courseId];
    },
    [cert]
  );

  const getPostTestResult = useCallback(
    (courseId: string): TestResult | undefined => {
      return cert.postTestResults[courseId];
    },
    [cert]
  );

  const isPreTestComplete = useCallback(
    (courseId: string): boolean => {
      return !!cert.preTestResults[courseId];
    },
    [cert]
  );

  const isPostTestPassed = useCallback(
    (courseId: string): boolean => {
      const result = cert.postTestResults[courseId];
      return result?.passed ?? false;
    },
    [cert]
  );

  const getPostTestAttempts = useCallback(
    (courseId: string): number => {
      const result = cert.postTestResults[courseId];
      return result?.attempt ?? 0;
    },
    [cert]
  );

  const getTierStatus = useCallback(
    (
      tier: "foundation" | "developing" | "advanced" | "mes-mastery"
    ): TierStatus => {
      switch (tier) {
        case "foundation":
          return isPostTestPassed("tier-1-foundation")
            ? "completed"
            : "unlocked";
        case "developing":
          return isPostTestPassed("tier-2-developing")
            ? "completed"
            : isPostTestPassed("tier-1-foundation")
              ? "unlocked"
              : "locked";
        case "advanced":
          return isPostTestPassed("tier-3-advanced")
            ? "completed"
            : isPostTestPassed("tier-2-developing")
              ? "unlocked"
              : "locked";
        case "mes-mastery":
          return "unlocked";
        default:
          return "locked";
      }
    },
    [isPostTestPassed]
  );

  const isCourseUnlocked = useCallback(
    (courseId: string): boolean => {
      switch (courseId) {
        case "tier-1-foundation":
          return true;
        case "tier-2-developing":
          return isPostTestPassed("tier-1-foundation");
        case "tier-3-advanced":
          return isPostTestPassed("tier-2-developing");
        case "mes-academy":
          return true;
        default:
          return false;
      }
    },
    [isPostTestPassed]
  );

  const isFullyCertified = useCallback((): boolean => {
    return (
      isPostTestPassed("tier-1-foundation") &&
      isPostTestPassed("tier-2-developing") &&
      isPostTestPassed("tier-3-advanced")
    );
  }, [isPostTestPassed]);

  const resetCertification = useCallback(() => {
    const next: CertState = { preTestResults: {}, postTestResults: {} };
    saveCert(next);
    setCert(next);
  }, []);

  return {
    cert,
    saveTestResult,
    getPreTestResult,
    getPostTestResult,
    isPreTestComplete,
    isPostTestPassed,
    getPostTestAttempts,
    getTierStatus,
    isCourseUnlocked,
    isFullyCertified,
    resetCertification,
  };
}
