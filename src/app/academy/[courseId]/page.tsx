"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  ClipboardCheck,
  Lock,
  Trophy,
  Play,
} from "lucide-react";
import { getCourse, getTotalLessons, getTotalDuration } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { useCertification } from "@/hooks/useCertification";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { Badge } from "@/components/shared/Badge";

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourse(courseId);
  const { isLessonComplete, getCourseProgress } = useProgress();
  const {
    isCourseUnlocked,
    isPostTestPassed,
    isPreTestComplete,
    getPreTestResult,
    getPostTestResult,
  } = useCertification();

  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <Link href="/academy" className="text-sst-orange hover:underline">Back to Academy</Link>
      </div>
    );
  }

  const unlocked = isCourseUnlocked(courseId);
  const totalLessons = getTotalLessons(course);
  const progress = getCourseProgress(courseId, totalLessons);
  const preTestDone = isPreTestComplete(courseId);
  const hasTierAssessment = course.tier !== "mes-mastery";
  const preResult = getPreTestResult(courseId);
  const postResult = getPostTestResult(courseId);
  const postPassed = isPostTestPassed(courseId);

  if (!unlocked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-sst-light-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-sst-border" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Course Locked</h1>
        <p className="text-sst-gray mb-6">Complete the previous tier post-test with 80% to unlock this course.</p>
        <Link href="/academy" className="inline-flex items-center gap-2 text-sst-orange font-semibold hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Academy
        </Link>
      </div>
    );
  }

  // Gate: pre-test required
  if (hasTierAssessment && !preTestDone) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: course.color + "12" }}>
            <ClipboardCheck className="w-7 h-7" style={{ color: course.color }} />
          </div>
          <h1 className="text-2xl font-bold mb-3">Pre-Test Required</h1>
          <p className="text-sst-gray mb-2">
            Before accessing <strong>{course.title}</strong>, complete the pre-test to establish your baseline.
          </p>
          <p className="text-xs text-sst-gray mb-8">No penalty for wrong answers — this measures your starting knowledge.</p>
          <Link
            href={`/academy/test/${courseId}?type=pre`}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-all hover:shadow-lg animate-pulse"
            style={{ backgroundColor: course.color, boxShadow: `0 4px 14px ${course.color}30` }}
          >
            Take Pre-Test <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-sst-gray mb-6">
        <Link href="/academy" className="hover:text-sst-orange transition-colors">Academy</Link>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-sst-charcoal font-medium">{course.title}</span>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden mb-8"
        style={{ background: `linear-gradient(135deg, ${course.color}08, ${course.color}15)` }}
      >
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge color={course.color} size="md">{course.tierLabel}</Badge>
              {postPassed && (
                <Badge color="#22C55E" variant="solid" size="md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
            <p className="text-sst-gray text-sm leading-relaxed mb-4">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-sst-gray">
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules.length} modules</span>
              <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" /> {totalLessons} lessons</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {getTotalDuration(course)} min</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <ProgressRing
              value={postPassed ? 100 : progress}
              size={110}
              strokeWidth={7}
              color={postPassed ? "#22C55E" : course.color}
              sublabel={postPassed ? "Certified" : "complete"}
            />
          </div>
        </div>

        {/* Step flow: Pre-Test → Study → Post-Test */}
        {hasTierAssessment && (
          <div className="border-t border-black/5 px-6 sm:px-8 py-4 flex items-center gap-3 overflow-x-auto text-xs">
            <Link
              href={`/academy/test/${courseId}?type=pre`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                preTestDone ? "bg-blue-50 text-blue-600" : "bg-white text-sst-gray"
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              Pre-Test {preTestDone ? `${preResult?.score}%` : ""}
            </Link>
            <ArrowRight className="w-3.5 h-3.5 text-sst-border flex-shrink-0" />
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap ${
              !postPassed ? "bg-sst-orange/10 text-sst-orange" : "bg-white text-sst-gray"
            }`}>
              <BookOpen className="w-3.5 h-3.5" />
              Study — {progress}%
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-sst-border flex-shrink-0" />
            <Link
              href={`/academy/test/${courseId}?type=post`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                postPassed ? "bg-green-50 text-green-600 font-semibold" : "bg-white text-sst-gray"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Post-Test {postResult ? `${postResult.score}%` : ""}
            </Link>
            {preResult && postResult && (
              <>
                <span className="text-sst-border">·</span>
                <span className="text-sst-charcoal font-semibold whitespace-nowrap">
                  +{Math.max(0, postResult.score - preResult.score)} growth
                </span>
              </>
            )}
          </div>
        )}
      </motion.div>

      {/* Learning Objectives */}
      {course.objectives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-sst-border/40 p-6 mb-8"
        >
          <h2 className="font-bold text-sm uppercase tracking-wider text-sst-gray mb-3">Learning Objectives</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {course.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-sst-charcoal">
                <CheckCircle2 className="w-4 h-4 text-sst-orange mt-0.5 flex-shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Modules */}
      <div className="space-y-3">
        {course.modules.map((mod, modIndex) => {
          const modComplete = mod.lessons.filter((l) => isLessonComplete(courseId, l.id)).length;
          const modDone = modComplete === mod.lessons.length && mod.lessons.length > 0;
          const isExpanded = expandedModule === mod.id;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + modIndex * 0.05 }}
              className="bg-white rounded-2xl border border-sst-border/40 overflow-hidden hover-lift"
            >
              {/* Module header - clickable */}
              <button
                onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    modDone ? "bg-sst-success text-white" : ""
                  }`}
                  style={modDone ? {} : { backgroundColor: course.color + "12", color: course.color }}
                >
                  {modDone ? <CheckCircle2 className="w-5 h-5" /> : modIndex + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base leading-tight">{mod.title}</h3>
                  <p className="text-xs text-sst-gray mt-0.5">{mod.subtitle}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold" style={{ color: course.color }}>
                      {modComplete}/{mod.lessons.length}
                    </div>
                    <div className="text-[10px] text-sst-gray">{mod.durationMinutes} min</div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-sst-gray transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* Expanded lesson list */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-sst-border/20 px-5 sm:px-6 pb-4">
                      {mod.lessons.map((lesson, li) => {
                        const done = isLessonComplete(courseId, lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/academy/${courseId}/${mod.id}?lesson=${lesson.id}`}
                            className="flex items-center gap-3 py-3 border-b border-sst-border/10 last:border-b-0 group"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                                done
                                  ? "bg-sst-success text-white"
                                  : "bg-sst-light-gray text-sst-gray group-hover:bg-sst-orange group-hover:text-white"
                              }`}
                            >
                              {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : li + 1}
                            </div>
                            <span className={`text-sm flex-1 ${done ? "text-sst-gray" : "text-sst-charcoal group-hover:text-sst-orange"} transition-colors`}>
                              {lesson.title}
                            </span>
                            <ArrowRight className="w-4 h-4 text-sst-border group-hover:text-sst-orange transition-colors" />
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Post-Test CTA */}
      {hasTierAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}CC)` }}
        >
          <div className="p-6 sm:p-8 text-center text-white">
            <Trophy className="w-8 h-8 mx-auto mb-3 opacity-80" />
            <h3 className="text-xl font-bold mb-2">
              {postPassed ? "You're Certified!" : "Ready for the Post-Test?"}
            </h3>
            <p className="text-sm opacity-80 mb-5 max-w-md mx-auto">
              {postPassed
                ? `You passed with ${postResult?.score}%. Your growth from pre-test: +${Math.max(0, (postResult?.score ?? 0) - (preResult?.score ?? 0))} points.`
                : "15 questions, 80% required to pass and unlock the next tier. Compare your post-test score to your pre-test."}
            </p>
            <Link
              href={`/academy/test/${courseId}?type=post`}
              className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:shadow-lg"
              style={{ color: course.color }}
            >
              {postPassed ? "Retake Post-Test" : "Take Post-Test"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
