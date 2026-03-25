"use client";

import { use, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCourse, getAssessment } from "@/data/courses";
import { useCertification } from "@/hooks/useCertification";
import { TestResult, AssessmentQuestion } from "@/data/courses/types";

type Phase = "intro" | "test" | "results" | "refresher";

/** Shuffle array using Fisher-Yates */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build a test set — for re-tests, use variant wordings and shuffle */
function buildTestQuestions(
  questions: AssessmentQuestion[],
  isRetest: boolean
): { question: string; options: string[]; correctIndex: number; explanation: string }[] {
  const shuffled = shuffle(questions);
  return shuffled.map((q) => {
    if (isRetest && q.variants && q.variants.length > 0) {
      // Pick a random variant
      const variant = q.variants[Math.floor(Math.random() * q.variants.length)];
      return {
        question: variant.question,
        options: variant.options,
        correctIndex: variant.correctIndex,
        explanation: q.explanation,
      };
    }
    // Shuffle option order for re-tests
    if (isRetest) {
      const indices = q.options.map((_, i) => i);
      const shuffledIndices = shuffle(indices);
      return {
        question: q.question,
        options: shuffledIndices.map((i) => q.options[i]),
        correctIndex: shuffledIndices.indexOf(q.correctIndex),
        explanation: q.explanation,
      };
    }
    return {
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    };
  });
}

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const searchParams = useSearchParams();
  const testType = (searchParams.get("type") as "pre" | "post") || "pre";

  const course = getCourse(courseId);
  const assessment = getAssessment(courseId);
  const {
    saveTestResult,
    getPreTestResult,
    getPostTestResult,
    isPreTestComplete,
    getPostTestAttempts,
  } = useCertification();

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [testQuestions, setTestQuestions] = useState<
    { question: string; options: string[]; correctIndex: number; explanation: string }[]
  >([]);

  const previousPre = getPreTestResult(courseId);
  const previousPost = getPostTestResult(courseId);
  const postAttempts = getPostTestAttempts(courseId);

  const isPre = testType === "pre";
  const isRetest = !isPre && postAttempts > 0;

  // Collect all key takeaways for refresher
  const refresherContent = useMemo(() => {
    if (!course) return [];
    return course.modules.map((mod) => ({
      title: mod.title,
      subtitle: mod.subtitle,
      takeaways: mod.lessons.flatMap((l) => l.keyTakeaways),
    }));
  }, [course]);

  const handleStart = useCallback(() => {
    if (!assessment) return;
    const isRetestNow = !isPre && postAttempts > 0;
    const questions = buildTestQuestions(assessment.questions, isRetestNow);
    setTestQuestions(questions);
    setPhase("test");
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  }, [assessment, isPre, postAttempts]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (!assessment) return;
      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (currentQ < testQuestions.length - 1) {
        setTimeout(() => setCurrentQ((q) => q + 1), 300);
      } else {
        const correct = newAnswers.filter(
          (a, i) => a === testQuestions[i].correctIndex
        ).length;
        const score = Math.round((correct / testQuestions.length) * 100);
        const passed = isPre ? true : score >= assessment.passingScore;
        const testResult: TestResult = {
          courseId,
          testType: isPre ? "pre" : "post",
          score,
          totalQuestions: testQuestions.length,
          passed,
          completedAt: new Date().toISOString(),
          answers: newAnswers,
          attempt: isPre ? 1 : postAttempts + 1,
        };
        saveTestResult(testResult);
        setResult(testResult);
        setTimeout(() => setPhase("results"), 500);
      }
    },
    [assessment, answers, currentQ, testQuestions, isPre, courseId, postAttempts, saveTestResult]
  );

  if (!course || !assessment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Assessment Not Found</h1>
        <Link href="/academy" className="text-sst-orange hover:underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  // INTRO PHASE
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <nav className="flex items-center gap-2 text-sm text-sst-gray mb-8">
          <Link href="/academy" className="hover:text-sst-orange transition-colors">Academy</Link>
          <span>/</span>
          <Link href={`/academy/${courseId}`} className="hover:text-sst-orange transition-colors">{course.title}</Link>
          <span>/</span>
          <span className="text-sst-charcoal font-medium">{isPre ? "Pre-Test" : "Post-Test"}</span>
        </nav>

        <div className="bg-white rounded-xl border border-sst-border/50 p-6 sm:p-10 text-center">
          <span className="text-5xl mb-4 block">{isPre ? "📋" : course.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            {isPre ? `Pre-Training Assessment` : `Post-Training Assessment`}
          </h1>
          <p className="text-lg font-medium mb-2" style={{ color: course.color }}>
            {course.title}
          </p>
          <p className="text-sst-gray mb-8 max-w-md mx-auto">
            {isPre
              ? "This establishes your baseline knowledge. Answer based on what you know NOW. There is no penalty for incorrect answers — this measures your growth."
              : isRetest
                ? "You've reviewed the material. This re-test has reshuffled and reworded questions. You need 80% to pass."
                : "This assessment measures what you learned. You need 80% to pass and unlock the next tier."}
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
            <div className="bg-sst-light-gray rounded-xl p-4">
              <div className="text-2xl font-bold">{assessment.questions.length}</div>
              <div className="text-xs text-sst-gray">Questions</div>
            </div>
            <div className="bg-sst-light-gray rounded-xl p-4">
              <div className="text-2xl font-bold">{assessment.timeMinutes}</div>
              <div className="text-xs text-sst-gray">Minutes</div>
            </div>
            <div className="bg-sst-light-gray rounded-xl p-4">
              <div className="text-2xl font-bold">{isPre ? "—" : `${assessment.passingScore}%`}</div>
              <div className="text-xs text-sst-gray">{isPre ? "Baseline" : "Passing"}</div>
            </div>
          </div>

          {isPre && previousPre && (
            <div className="mb-6 text-sm p-4 rounded-xl bg-blue-50 text-blue-800">
              Pre-test already completed: <strong>{previousPre.score}%</strong> baseline. You can retake to update.
            </div>
          )}

          {!isPre && previousPost && (
            <div className={`mb-6 text-sm p-4 rounded-xl ${previousPost.passed ? "bg-sst-success/10 text-green-800" : "bg-sst-warning/10 text-amber-800"}`}>
              Previous attempt #{previousPost.attempt}: <strong>{previousPost.score}%</strong> — {previousPost.passed ? "Passed ✓" : "Not passed"}
            </div>
          )}

          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
            style={{ backgroundColor: course.color }}
          >
            {isPre
              ? previousPre ? "Retake Pre-Test" : "Begin Pre-Test"
              : isRetest ? "Begin Re-Test" : "Begin Post-Test"}
          </button>

          {isPre && (
            <p className="text-xs text-sst-gray mt-4">
              You must complete the pre-test before accessing course content.
            </p>
          )}
        </div>
      </div>
    );
  }

  // TEST PHASE
  if (phase === "test" && testQuestions.length > 0) {
    const question = testQuestions[currentQ];
    const progressPct = Math.round(((currentQ + 1) / testQuestions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header label */}
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full" style={{ backgroundColor: course.color + "15", color: course.color }}>
            {isPre ? "Pre-Test" : isRetest ? "Re-Test" : "Post-Test"} · {course.tierLabel}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-sst-gray">Question {currentQ + 1} of {testQuestions.length}</span>
            <span className="font-medium" style={{ color: course.color }}>{progressPct}%</span>
          </div>
          <div className="h-2 bg-sst-light-gray rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%`, backgroundColor: course.color }} />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-xl border border-sst-border/50 p-6 sm:p-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: course.color }}>
              {currentQ + 1}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => handleAnswer(oi)}
                className="w-full text-left px-5 py-4 rounded-xl border border-sst-border/50 bg-white hover:bg-sst-light-gray hover:border-sst-orange/30 transition-all text-sm sm:text-base group"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sst-light-gray text-xs font-bold mr-3 group-hover:bg-sst-orange group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + oi)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS PHASE
  if (phase === "results" && result) {
    const passed = result.passed;
    const showRefresherOption = !isPre && !passed;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-white rounded-xl border border-sst-border/50 p-6 sm:p-10 text-center">
          <span className="text-6xl mb-4 block">
            {isPre ? "📊" : passed ? "🎉" : "📝"}
          </span>
          <h1 className="text-3xl font-bold mb-3">
            {isPre
              ? "Baseline Established"
              : passed
                ? "Congratulations!"
                : "Not Quite — Let's Review"}
          </h1>
          <p className="text-sst-gray mb-8">
            {isPre
              ? `Your baseline score is ${result.score}%. After completing the training, you'll take the post-test to measure your growth.`
              : passed
                ? `You passed the ${course.title} post-test! Your score: ${result.score}%`
                : `You scored ${result.score}% — you need ${assessment.passingScore}% to pass. Review the refresher below, then retake with reshuffled questions.`}
          </p>

          {/* Score circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#F4F4F4" strokeWidth="8" />
              <circle cx="60" cy="60" r="54" fill="none" stroke={isPre ? "#0EA5E9" : passed ? "#22C55E" : "#F59E0B"} strokeWidth="8" strokeDasharray={`${(result.score / 100) * 339.3} 339.3`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{result.score}%</span>
              <span className="text-xs text-sst-gray">
                {result.totalQuestions - result.answers.filter((a, i) => a !== testQuestions[i]?.correctIndex).length} / {result.totalQuestions} correct
              </span>
            </div>
          </div>

          {/* Pre-test: show comparison if post exists */}
          {isPre && previousPost && (
            <div className="mb-6 text-sm p-4 rounded-xl bg-sst-success/10 text-green-800">
              Growth: {previousPre?.score ?? result.score}% → {previousPost.score}% (+{(previousPost.score - (previousPre?.score ?? result.score))} points)
            </div>
          )}

          {/* Answer review */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-sm mb-4 text-center">Answer Review</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testQuestions.map((q, i) => {
                const userAnswer = result.answers[i];
                const correct = userAnswer === q.correctIndex;
                return (
                  <div key={i} className={`p-4 rounded-xl text-sm ${correct ? "bg-sst-success/5 border border-sst-success/20" : "bg-sst-error/5 border border-sst-error/20"}`}>
                    <div className="flex items-start gap-2">
                      <span className={`font-bold ${correct ? "text-sst-success" : "text-sst-error"}`}>{correct ? "✓" : "✗"}</span>
                      <div>
                        <p className="font-medium mb-1">{q.question}</p>
                        {!correct && (
                          <p className="text-xs text-sst-gray">
                            Your answer: {q.options[userAnswer]} → <span className="text-sst-success font-medium">Correct: {q.options[q.correctIndex]}</span>
                          </p>
                        )}
                        <p className="text-xs text-sst-gray mt-1">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isPre && (
              <Link
                href={`/academy/${courseId}`}
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: course.color }}
              >
                Start Course Content →
              </Link>
            )}
            {!isPre && passed && (
              <Link
                href="/academy"
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: course.color }}
              >
                Back to Academy →
              </Link>
            )}
            {showRefresherOption && (
              <button
                onClick={() => setPhase("refresher")}
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-colors bg-sst-orange hover:bg-sst-orange-dark"
              >
                Review Refresher & Re-Test
              </button>
            )}
            {!isPre && !passed && (
              <Link
                href={`/academy/${courseId}`}
                className="px-6 py-2.5 rounded-lg font-semibold border border-sst-border hover:bg-sst-light-gray transition-colors"
              >
                Review Full Material
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // REFRESHER PHASE (shown after failing post-test)
  if (phase === "refresher") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">📖</span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Quick Refresher</h1>
          <p className="text-sst-gray">
            Review these key takeaways from {course.title}, then retake the assessment.
          </p>
        </div>

        <div className="space-y-6 mb-10">
          {refresherContent.map((mod) => (
            <div key={mod.title} className="bg-white rounded-xl border border-sst-border/50 p-5 sm:p-6">
              <h3 className="font-bold mb-1">{mod.title}</h3>
              <p className="text-xs text-sst-gray mb-3">{mod.subtitle}</p>
              {mod.takeaways.length > 0 ? (
                <ul className="space-y-2">
                  {mod.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-sst-charcoal">
                      <span className="text-sst-orange mt-0.5 flex-shrink-0">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-sst-gray italic">Review the full lesson for this module.</p>
              )}
            </div>
          ))}
        </div>

        {/* Highlight missed questions */}
        {result && (
          <div className="bg-sst-warning/5 border border-sst-warning/20 rounded-xl p-5 sm:p-6 mb-10">
            <h3 className="font-bold mb-3 text-amber-800">Areas to Focus On</h3>
            <div className="space-y-3">
              {testQuestions
                .filter((_, i) => result.answers[i] !== testQuestions[i].correctIndex)
                .map((q, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium text-sst-charcoal">{q.question}</p>
                    <p className="text-sst-success text-xs mt-1">Answer: {q.options[q.correctIndex]}</p>
                    <p className="text-xs text-sst-gray mt-0.5">{q.explanation}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
            style={{ backgroundColor: course.color }}
          >
            Retake Assessment (Reshuffled)
          </button>
          <p className="text-xs text-sst-gray mt-3">
            Questions will be reworded and shuffled. You need {assessment.passingScore}% to pass.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
