"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "sst-training-progress";

interface ProgressState {
  completedLessons: Record<string, string[]>; // courseId -> lessonIds[]
}

function loadProgress(): ProgressState {
  if (typeof window === "undefined") return { completedLessons: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { completedLessons: {} };
}

function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({ completedLessons: {} });

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const markComplete = useCallback(
    (courseId: string, lessonId: string) => {
      setProgress((prev) => {
        const lessons = prev.completedLessons[courseId] || [];
        if (lessons.includes(lessonId)) return prev;
        const next = {
          ...prev,
          completedLessons: {
            ...prev.completedLessons,
            [courseId]: [...lessons, lessonId],
          },
        };
        saveProgress(next);
        return next;
      });
    },
    []
  );

  const isLessonComplete = useCallback(
    (courseId: string, lessonId: string): boolean => {
      return (progress.completedLessons[courseId] || []).includes(lessonId);
    },
    [progress]
  );

  const getCompletedCount = useCallback(
    (courseId: string): number => {
      return (progress.completedLessons[courseId] || []).length;
    },
    [progress]
  );

  const getCourseProgress = useCallback(
    (courseId: string, totalLessons: number): number => {
      if (totalLessons === 0) return 0;
      const completed = (progress.completedLessons[courseId] || []).length;
      return Math.round((completed / totalLessons) * 100);
    },
    [progress]
  );

  const resetProgress = useCallback(() => {
    const next: ProgressState = { completedLessons: {} };
    saveProgress(next);
    setProgress(next);
  }, []);

  return {
    progress,
    markComplete,
    isLessonComplete,
    getCompletedCount,
    getCourseProgress,
    resetProgress,
  };
}
