"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  BarChart3,
  Trophy,
  Cog,
  Lock,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";
import { allCourses, getTotalLessons, getTotalDuration } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { useCertification } from "@/hooks/useCertification";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { Badge } from "@/components/shared/Badge";
import { StepIndicator, Step } from "@/components/shared/StepIndicator";
import { useAuth } from "@/hooks/useAuth";

const tierIcons = {
  "tier-1-foundation": Shield,
  "tier-2-developing": BarChart3,
  "tier-3-advanced": Trophy,
  "mes-academy": Cog,
};

const tierDescriptions = {
  "tier-1-foundation":
    "Safety Excellence, SQDC Framework, 5S Methodology, Process Flow, and Shift Discipline. The bedrock of team leadership.",
  "tier-2-developing":
    "Cost of Quality, Root Cause Analysis, 5S Auditing, and Team Development. Sharpen your problem-solving and coaching skills.",
  "tier-3-advanced":
    "Change Management, Kaizen Culture, Strategic Alignment, and Leadership Legacy. Lead improvement and develop future leaders.",
  "mes-academy":
    "Deep-dive into the Manufacturing Execution System. Leader Standard Work, Tier meetings, Jidoka, A3, SMED, and TPM.",
};

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
  const { user } = useAuth();

  // Build journey steps for the top stepper
  const journeySteps: Step[] = [
    {
      label: "Tier 1",
      sublabel: "Foundation",
      status: isPostTestPassed("tier-1-foundation")
        ? "completed"
        : isCourseUnlocked("tier-1-foundation")
          ? "current"
          : "locked",
    },
    {
      label: "Tier 2",
      sublabel: "Developing",
      status: isPostTestPassed("tier-2-developing")
        ? "completed"
        : isCourseUnlocked("tier-2-developing")
          ? "current"
          : "locked",
    },
    {
      label: "Tier 3",
      sublabel: "Advanced",
      status: isPostTestPassed("tier-3-advanced")
        ? "completed"
        : isCourseUnlocked("tier-3-advanced")
          ? "current"
          : "locked",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {user ? `Welcome, ${user.name.split(" ")[0]}` : "Training Academy"}
        </h1>
        <p className="text-sst-gray max-w-lg mx-auto text-sm sm:text-base">
          Master each tier to earn your certification. Pre-test → Study → Post-test.
          Grounded in the Toyota Production System & World Class Manufacturing.
        </p>
        {isFullyCertified() && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-green-600 px-5 py-2.5 rounded-xl text-sm font-bold"
          >
            <Trophy className="w-5 h-5" />
            Fully Certified — All Three Tiers Complete
          </motion.div>
        )}
      </motion.div>

      {/* Journey Progress Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-sst-border/40 p-5 sm:p-8 mb-10 shadow-sm"
      >
        <div className="text-xs font-bold text-sst-gray uppercase tracking-wider mb-4 text-center">
          Your Progress
        </div>
        <StepIndicator steps={journeySteps} />
      </motion.div>

      {/* Course Sections */}
      <div className="space-y-6">
        {allCourses.map((course, index) => {
          const totalLessons = getTotalLessons(course);
          const totalMin = getTotalDuration(course);
          const progress = getCourseProgress(course.courseId, totalLessons);
          const unlocked = isCourseUnlocked(course.courseId);
          const postPassed = isPostTestPassed(course.courseId);
          const preDone = isPreTestComplete(course.courseId);
          const hasTierAssessment = course.tier !== "mes-mastery";
          const preResult = getPreTestResult(course.courseId);
          const postResult = getPostTestResult(course.courseId);
          const TierIcon = tierIcons[course.courseId as keyof typeof tierIcons] || BookOpen;

          // Determine primary CTA
          let ctaLabel = "Start Training";
          let ctaHref = `/academy/${course.courseId}`;
          let ctaPulse = false;

          if (!unlocked) {
            ctaLabel = "Locked";
            ctaHref = "/academy";
          } else if (hasTierAssessment && !preDone) {
            ctaLabel = "Take Pre-Test to Begin";
            ctaHref = `/academy/test/${course.courseId}?type=pre`;
            ctaPulse = true;
          } else if (postPassed) {
            ctaLabel = "Review Material";
          } else if (progress > 0) {
            ctaLabel = "Continue Training";
          }

          return (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className={`relative bg-white rounded-2xl border overflow-hidden transition-all ${
                unlocked
                  ? "border-sst-border/40 shadow-sm hover:shadow-md"
                  : "border-sst-border/20 opacity-50"
              }`}
            >
              {/* Accent stripe */}
              <div className="h-1" style={{ backgroundColor: course.color }} />

              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Left: Icon + Progress Ring */}
                  <div className="flex sm:flex-col items-center gap-4 sm:gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: course.color + "12" }}
                    >
                      {unlocked ? (
                        <TierIcon className="w-6 h-6" style={{ color: course.color }} />
                      ) : (
                        <Lock className="w-5 h-5 text-sst-border" />
                      )}
                    </div>
                    {unlocked && (
                      <ProgressRing
                        value={postPassed ? 100 : progress}
                        size={64}
                        strokeWidth={5}
                        color={postPassed ? "#22C55E" : course.color}
                        sublabel={postPassed ? "done" : ""}
                      />
                    )}
                  </div>

                  {/* Center: Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge color={course.color}>{course.tierLabel}</Badge>
                      {postPassed && (
                        <Badge color="#22C55E" variant="solid">
                          <CheckCircle2 className="w-3 h-3" /> Certified
                        </Badge>
                      )}
                      {unlocked && hasTierAssessment && preResult && !postPassed && (
                        <Badge color="#0EA5E9">Pre: {preResult.score}%</Badge>
                      )}
                      {postResult && (
                        <Badge color={postResult.passed ? "#22C55E" : "#F59E0B"}>
                          Post: {postResult.score}%
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                      {course.title}
                    </h2>
                    <p className="text-sm text-sst-gray leading-relaxed mb-4">
                      {tierDescriptions[course.courseId as keyof typeof tierDescriptions] ||
                        course.description}
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-sst-gray mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.modules.length} modules
                      </span>
                      <span>·</span>
                      <span>{totalLessons} lessons</span>
                      <span>·</span>
                      <span>{totalMin} min</span>
                      {unlocked && progress > 0 && !postPassed && (
                        <>
                          <span>·</span>
                          <span className="font-semibold" style={{ color: course.color }}>
                            {progress}% complete
                          </span>
                        </>
                      )}
                    </div>

                    {/* Step flow for tier courses */}
                    {unlocked && hasTierAssessment && (
                      <div className="flex items-center gap-2 text-xs mb-4">
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                            preDone
                              ? "bg-blue-50 text-blue-600"
                              : "bg-sst-light-gray text-sst-gray"
                          }`}
                        >
                          <ClipboardCheck className="w-3 h-3" />
                          Pre-Test {preDone ? `${preResult?.score}%` : ""}
                        </span>
                        <ArrowRight className="w-3 h-3 text-sst-border" />
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                            preDone && !postPassed
                              ? "bg-sst-orange/10 text-sst-orange font-semibold"
                              : preDone
                                ? "bg-sst-light-gray text-sst-gray"
                                : "bg-sst-light-gray text-sst-border"
                          }`}
                        >
                          <BookOpen className="w-3 h-3" />
                          Study
                        </span>
                        <ArrowRight className="w-3 h-3 text-sst-border" />
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                            postPassed
                              ? "bg-green-50 text-green-600"
                              : "bg-sst-light-gray text-sst-border"
                          }`}
                        >
                          <Trophy className="w-3 h-3" />
                          Post-Test {postPassed ? `${postResult?.score}% ✓` : ""}
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    {unlocked ? (
                      <Link
                        href={ctaHref}
                        className={`inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg ${
                          ctaPulse ? "animate-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: postPassed ? "#22C55E" : course.color,
                          boxShadow: `0 4px 14px ${(postPassed ? "#22C55E" : course.color)}30`,
                        }}
                      >
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="inline-flex items-center gap-2 text-sst-gray bg-sst-light-gray px-5 py-2.5 rounded-xl text-sm">
                        <Lock className="w-4 h-4" />
                        Complete previous tier to unlock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom motivational */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="bg-sst-dark text-white rounded-2xl p-6 sm:p-8">
          <p className="text-sm font-medium mb-1">
            &ldquo;We help people build safer, stronger homes and buildings.&rdquo;
          </p>
          <p className="text-xs text-gray-500">
            Be Customer Focused · Act with Integrity · Respect Others · Continuously Improve
          </p>
        </div>
      </motion.div>
    </div>
  );
}
