"use client";

import { use } from "react";
import Link from "next/link";
import { getCourse, getTotalLessons, getTotalDuration } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { useCertification } from "@/hooks/useCertification";

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourse(courseId);
  const { isLessonComplete, getCourseProgress } = useProgress();
  const { isCourseUnlocked, isPostTestPassed, isPreTestComplete, getPreTestResult, getPostTestResult } =
    useCertification();

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <Link href="/academy" className="text-sst-orange hover:underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  const unlocked = isCourseUnlocked(courseId);
  const totalLessons = getTotalLessons(course);
  const progress = getCourseProgress(courseId, totalLessons);
  const preTestDone = isPreTestComplete(courseId);
  const hasTierAssessment = course.tier !== "mes-mastery";

  // Gate: course locked (previous tier not passed)
  if (!unlocked) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <span className="text-4xl mb-4 block">🔒</span>
        <h1 className="text-2xl font-bold mb-4">Course Locked</h1>
        <p className="text-sst-gray mb-6">
          Complete the previous tier post-test with 80% to unlock this course.
        </p>
        <Link href="/academy" className="text-sst-orange hover:underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  // Gate: pre-test required before accessing content (tier courses only)
  if (hasTierAssessment && !preTestDone) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl mb-4 block">📋</span>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Pre-Test Required
        </h1>
        <p className="text-sst-gray mb-2 max-w-md mx-auto">
          Before accessing <strong>{course.title}</strong> content, you must
          complete the pre-training assessment to establish your baseline.
        </p>
        <p className="text-xs text-sst-gray mb-8">
          There is no penalty for incorrect answers — this measures your starting
          knowledge so we can track your growth.
        </p>
        <Link
          href={`/academy/test/${courseId}?type=pre`}
          className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
          style={{ backgroundColor: course.color }}
        >
          Take Pre-Test
        </Link>
        <div className="mt-4">
          <Link href="/academy" className="text-sm text-sst-gray hover:text-sst-orange transition-colors">
            ← Back to Academy
          </Link>
        </div>
      </div>
    );
  }

  const preResult = getPreTestResult(courseId);
  const postResult = getPostTestResult(courseId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-sst-gray mb-6">
        <Link href="/academy" className="hover:text-sst-orange transition-colors">
          Academy
        </Link>
        <span>/</span>
        <span className="text-sst-charcoal font-medium">{course.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{course.icon}</span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: course.color + "15", color: course.color }}
          >
            {course.tierLabel}
          </span>
          {isPostTestPassed(courseId) && (
            <span className="text-xs font-bold text-sst-success bg-sst-success/10 px-2.5 py-1 rounded-full">
              ✓ Certified
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {course.title}
        </h1>
        <p className="text-sst-gray">{course.description}</p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-sst-gray">
          <span>{course.modules.length} modules</span>
          <span>·</span>
          <span>{totalLessons} lessons</span>
          <span>·</span>
          <span>{getTotalDuration(course)} min total</span>
          <span>·</span>
          <span className="font-medium" style={{ color: course.color }}>
            {progress}% complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-sst-light-gray rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: course.color }}
          />
        </div>

        {/* Pre/Post test scores */}
        {hasTierAssessment && (preResult || postResult) && (
          <div className="flex flex-wrap gap-3 mt-4">
            {preResult && (
              <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
                Pre-Test: <strong>{preResult.score}%</strong>
              </div>
            )}
            {postResult && (
              <div className={`text-xs px-3 py-1.5 rounded-lg ${postResult.passed ? "bg-sst-success/10 text-green-700" : "bg-sst-warning/10 text-amber-700"}`}>
                Post-Test: <strong>{postResult.score}%</strong>
                {postResult.passed ? " ✓" : ` (attempt #${postResult.attempt})`}
              </div>
            )}
            {preResult && postResult && (
              <div className="text-xs bg-sst-light-gray text-sst-charcoal px-3 py-1.5 rounded-lg">
                Growth: <strong>+{Math.max(0, postResult.score - preResult.score)} points</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Learning objectives */}
      {course.objectives.length > 0 && (
        <div className="bg-sst-light-gray rounded-xl p-6 mb-8">
          <h2 className="font-bold mb-3">Learning Objectives</h2>
          <ul className="space-y-2">
            {course.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-sst-charcoal">
                <span className="text-sst-orange mt-0.5">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modules */}
      <div className="space-y-4">
        {course.modules.map((mod, modIndex) => {
          const modLessonsComplete = mod.lessons.filter((l) =>
            isLessonComplete(courseId, l.id)
          ).length;

          return (
            <div
              key={mod.id}
              className="bg-white rounded-xl border border-sst-border/50 overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-sst-gray">
                        Module {modIndex + 1}
                      </span>
                      <span className="text-xs text-sst-gray">
                        · {mod.durationMinutes} min
                      </span>
                      {modLessonsComplete === mod.lessons.length && mod.lessons.length > 0 && (
                        <span className="text-xs text-sst-success">✓</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold">{mod.title}</h3>
                    <p className="text-sm text-sst-gray mt-1">{mod.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium" style={{ color: course.color }}>
                      {modLessonsComplete}/{mod.lessons.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-sst-border/30">
                {mod.lessons.map((lesson, lessonIndex) => {
                  const complete = isLessonComplete(courseId, lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={`/academy/${courseId}/${mod.id}?lesson=${lesson.id}`}
                      className="flex items-center gap-3 px-5 sm:px-6 py-3.5 hover:bg-sst-light-gray/50 transition-colors border-b border-sst-border/20 last:border-b-0"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${complete ? "bg-sst-success text-white" : "bg-sst-light-gray text-sst-gray"}`}>
                        {complete ? "✓" : lessonIndex + 1}
                      </div>
                      <span className={`text-sm flex-1 ${complete ? "text-sst-gray" : "text-sst-charcoal"}`}>
                        {lesson.title}
                      </span>
                      <svg className="w-4 h-4 text-sst-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Post-Test CTA */}
      {hasTierAssessment && (
        <div className="mt-8 bg-white rounded-xl border border-sst-border/50 p-6 text-center">
          <h3 className="font-bold mb-2">Ready for the Post-Test?</h3>
          <p className="text-sm text-sst-gray mb-4">
            15 questions, 80% required to pass and unlock the next tier.
            Compare your score to your pre-test to see your growth.
          </p>
          <Link
            href={`/academy/test/${courseId}?type=post`}
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            style={{ backgroundColor: course.color }}
          >
            {isPostTestPassed(courseId) ? "Retake Post-Test" : "Take Post-Test"}
          </Link>
        </div>
      )}
    </div>
  );
}
