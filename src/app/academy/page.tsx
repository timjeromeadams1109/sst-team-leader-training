"use client";

import Link from "next/link";
import { allCourses, getTotalLessons, getTotalDuration } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { useCertification } from "@/hooks/useCertification";

export default function AcademyHub() {
  const { getCourseProgress } = useProgress();
  const {
    getTierStatus,
    isCourseUnlocked,
    isPostTestPassed,
    isPreTestComplete,
    isFullyCertified,
    getPreTestResult,
    getPostTestResult,
  } = useCertification();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Training Academy
        </h1>
        <p className="text-sst-gray max-w-xl mx-auto">
          Complete each tier in order. Take the pre-test first, then study the
          material, then pass the post-test with 80% to unlock the next tier.
        </p>
        {isFullyCertified() && (
          <div className="mt-4 inline-flex items-center gap-2 bg-sst-success/10 border border-sst-success/30 text-sst-success px-4 py-2 rounded-lg text-sm font-semibold">
            <span className="text-lg">🏆</span> Fully Certified — All Three
            Tiers Complete!
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allCourses.map((course) => {
          const totalLessons = getTotalLessons(course);
          const totalMin = getTotalDuration(course);
          const progress = getCourseProgress(course.courseId, totalLessons);
          const unlocked = isCourseUnlocked(course.courseId);
          const postPassed = isPostTestPassed(course.courseId);
          const preDone = isPreTestComplete(course.courseId);
          const tierStatus = getTierStatus(course.tier);
          const hasTierAssessment = course.tier !== "mes-mastery";
          const preResult = getPreTestResult(course.courseId);
          const postResult = getPostTestResult(course.courseId);

          return (
            <div
              key={course.courseId}
              className={`relative bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
                unlocked
                  ? "border-sst-border/50 hover:shadow-md"
                  : "border-sst-border/30 opacity-60"
              }`}
            >
              <div className="h-1.5" style={{ backgroundColor: course.color }} />

              <div className="p-6">
                {/* Badge row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{course.icon}</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: course.color + "15", color: course.color }}
                    >
                      {course.tierLabel}
                    </span>
                  </div>
                  {tierStatus === "completed" || postPassed ? (
                    <span className="text-xs font-bold text-sst-success bg-sst-success/10 px-2.5 py-1 rounded-full">
                      ✓ Certified
                    </span>
                  ) : tierStatus === "locked" ? (
                    <span className="text-xs text-sst-gray bg-sst-light-gray px-2.5 py-1 rounded-full">
                      🔒 Locked
                    </span>
                  ) : null}
                </div>

                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-sm text-sst-gray mb-4">{course.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-sst-gray mb-4">
                  <span>{course.modules.length} modules</span>
                  <span>·</span>
                  <span>{totalLessons} lessons</span>
                  <span>·</span>
                  <span>{totalMin} min</span>
                </div>

                {/* Pre/Post test scores */}
                {unlocked && hasTierAssessment && (preResult || postResult) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {preResult && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        Pre: {preResult.score}%
                      </span>
                    )}
                    {postResult && (
                      <span className={`text-xs px-2 py-1 rounded ${postResult.passed ? "bg-sst-success/10 text-green-700" : "bg-sst-warning/10 text-amber-700"}`}>
                        Post: {postResult.score}%{postResult.passed ? " ✓" : ""}
                      </span>
                    )}
                    {preResult && postResult && (
                      <span className="text-xs bg-sst-light-gray text-sst-charcoal px-2 py-1 rounded">
                        +{Math.max(0, postResult.score - preResult.score)} growth
                      </span>
                    )}
                  </div>
                )}

                {/* Progress bar */}
                {unlocked && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-sst-gray">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 bg-sst-light-gray rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, backgroundColor: course.color }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                {unlocked ? (
                  <div className="flex flex-col gap-2">
                    {/* Main action */}
                    <Link
                      href={`/academy/${course.courseId}`}
                      className="text-center text-sm font-semibold text-white py-2.5 rounded-lg transition-colors"
                      style={{ backgroundColor: course.color }}
                    >
                      {hasTierAssessment && !preDone
                        ? "Take Pre-Test to Start"
                        : progress > 0
                          ? "Continue Training"
                          : "Start Training"}
                    </Link>
                    {/* Test buttons for tier courses */}
                    {hasTierAssessment && (
                      <div className="flex gap-2">
                        <Link
                          href={`/academy/test/${course.courseId}?type=pre`}
                          className={`flex-1 text-center text-xs font-medium py-2 rounded-lg border transition-colors ${
                            preDone
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-sst-border hover:bg-sst-light-gray text-sst-charcoal"
                          }`}
                        >
                          {preDone ? `Pre-Test: ${preResult?.score}%` : "Pre-Test"}
                        </Link>
                        <Link
                          href={`/academy/test/${course.courseId}?type=post`}
                          className={`flex-1 text-center text-xs font-medium py-2 rounded-lg border transition-colors ${
                            postPassed
                              ? "border-sst-success/30 bg-sst-success/10 text-green-700"
                              : "border-sst-border hover:bg-sst-light-gray text-sst-charcoal"
                          }`}
                        >
                          {postPassed ? `Post-Test: ${postResult?.score}% ✓` : "Post-Test"}
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-sm text-sst-gray py-2.5 bg-sst-light-gray rounded-lg">
                    Complete the previous tier to unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BARC reminder */}
      <div className="mt-12 text-center text-sm text-sst-gray">
        <p className="font-medium text-sst-charcoal mb-1">
          &ldquo;We help people build safer, stronger homes and buildings.&rdquo;
        </p>
        <p>
          Be Customer Focused · Act with Integrity · Respect Others · Continuously Improve
        </p>
      </div>
    </div>
  );
}
