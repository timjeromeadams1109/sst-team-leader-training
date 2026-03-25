"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getCourse, getAssessment } from "@/data/courses";
import { useCertification } from "@/hooks/useCertification";
import { TestResult } from "@/data/courses/types";

type Phase = "intro" | "test" | "results";

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourse(courseId);
  const assessment = getAssessment(courseId);
  const { saveTestResult, getTestResult } = useCertification();

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  const previousResult = getTestResult(courseId);

  if (!course || !assessment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Assessment Not Found</h1>
        <p className="text-sst-gray mb-4">
          This course does not have an assessment.
        </p>
        <Link href="/academy" className="text-sst-orange hover:underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  const handleStart = () => {
    setPhase("test");
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    if (currentQ < assessment.questions.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 300);
    } else {
      // Calculate score
      const correct = newAnswers.filter(
        (a, i) => a === assessment.questions[i].correctIndex
      ).length;
      const score = Math.round((correct / assessment.questions.length) * 100);
      const testResult: TestResult = {
        courseId,
        score,
        totalQuestions: assessment.questions.length,
        passed: score >= assessment.passingScore,
        completedAt: new Date().toISOString(),
        answers: newAnswers,
      };
      saveTestResult(testResult);
      setResult(testResult);
      setTimeout(() => setPhase("results"), 500);
    }
  };

  // Intro phase
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <nav className="flex items-center gap-2 text-sm text-sst-gray mb-8">
          <Link href="/academy" className="hover:text-sst-orange transition-colors">
            Academy
          </Link>
          <span>/</span>
          <span className="text-sst-charcoal font-medium">Assessment</span>
        </nav>

        <div className="bg-white rounded-xl border border-sst-border/50 p-6 sm:p-10 text-center">
          <span className="text-5xl mb-4 block">{course.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            {assessment.title}
          </h1>
          <p className="text-sst-gray mb-8 max-w-md mx-auto">
            This assessment measures your understanding of {course.title} content.
            Answer based on what you know.
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
              <div className="text-2xl font-bold">{assessment.passingScore}%</div>
              <div className="text-xs text-sst-gray">Passing</div>
            </div>
          </div>

          {previousResult && (
            <div
              className={`mb-6 text-sm p-4 rounded-xl ${
                previousResult.passed
                  ? "bg-sst-success/10 text-green-800"
                  : "bg-sst-warning/10 text-amber-800"
              }`}
            >
              Previous attempt: <strong>{previousResult.score}%</strong> —{" "}
              {previousResult.passed ? "Passed ✓" : "Not passed"}
            </div>
          )}

          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
            style={{ backgroundColor: course.color }}
          >
            {previousResult ? "Retake Assessment" : "Begin Assessment"}
          </button>
        </div>
      </div>
    );
  }

  // Test phase
  if (phase === "test") {
    const question = assessment.questions[currentQ];
    const progressPct = Math.round(
      ((currentQ + 1) / assessment.questions.length) * 100
    );

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-sst-gray">
              Question {currentQ + 1} of {assessment.questions.length}
            </span>
            <span className="font-medium" style={{ color: course.color }}>
              {progressPct}%
            </span>
          </div>
          <div className="h-2 bg-sst-light-gray rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%`, backgroundColor: course.color }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-xl border border-sst-border/50 p-6 sm:p-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: course.color }}
            >
              {currentQ + 1}
            </span>
            <span className="text-xs text-sst-gray font-medium uppercase tracking-wide">
              {course.tierLabel}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold mb-6">
            {question.question}
          </h2>

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

  // Results phase
  if (phase === "results" && result) {
    const passed = result.passed;
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-white rounded-xl border border-sst-border/50 p-6 sm:p-10 text-center">
          <span className="text-6xl mb-4 block">
            {passed ? "🎉" : "📝"}
          </span>
          <h1 className="text-3xl font-bold mb-3">
            {passed ? "Congratulations!" : "Keep Studying"}
          </h1>
          <p className="text-sst-gray mb-8">
            {passed
              ? `You passed the ${course.title} assessment!`
              : `You need ${assessment.passingScore}% to pass. Review the material and try again.`}
          </p>

          {/* Score circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#F4F4F4" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={passed ? "#22C55E" : "#F59E0B"}
                strokeWidth="8"
                strokeDasharray={`${(result.score / 100) * 339.3} 339.3`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{result.score}%</span>
              <span className="text-xs text-sst-gray">
                {result.totalQuestions -
                  result.answers.filter(
                    (a, i) => a !== assessment.questions[i].correctIndex
                  ).length}{" "}
                / {result.totalQuestions} correct
              </span>
            </div>
          </div>

          {/* Answer review */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-sm mb-4 text-center">
              Answer Review
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {assessment.questions.map((q, i) => {
                const userAnswer = result.answers[i];
                const correct = userAnswer === q.correctIndex;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl text-sm ${
                      correct
                        ? "bg-sst-success/5 border border-sst-success/20"
                        : "bg-sst-error/5 border border-sst-error/20"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`font-bold ${correct ? "text-sst-success" : "text-sst-error"}`}>
                        {correct ? "✓" : "✗"}
                      </span>
                      <div>
                        <p className="font-medium mb-1">{q.question}</p>
                        {!correct && (
                          <p className="text-xs text-sst-gray">
                            Your answer: {q.options[userAnswer]} →{" "}
                            <span className="text-sst-success font-medium">
                              Correct: {q.options[q.correctIndex]}
                            </span>
                          </p>
                        )}
                        <p className="text-xs text-sst-gray mt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!passed && (
              <button
                onClick={handleStart}
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: course.color }}
              >
                Try Again
              </button>
            )}
            <Link
              href={`/academy/${courseId}`}
              className="px-6 py-2.5 rounded-lg font-semibold border border-sst-border hover:bg-sst-light-gray transition-colors"
            >
              Review Material
            </Link>
            <Link
              href="/academy"
              className="px-6 py-2.5 rounded-lg font-semibold text-sst-orange hover:bg-sst-orange/10 transition-colors"
            >
              Back to Academy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
