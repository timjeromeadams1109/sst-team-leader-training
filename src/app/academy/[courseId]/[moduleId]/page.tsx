"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCourse, getModule } from "@/data/courses";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useProgress } from "@/hooks/useProgress";

function QuizBlock({
  quiz,
}: {
  quiz: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-6 mt-6">
      <h3 className="font-bold text-sst-orange text-sm uppercase tracking-wide">
        Knowledge Check
      </h3>
      {quiz.map((q, qi) => (
        <div key={qi} className="bg-sst-light-gray rounded-xl p-5">
          <p className="font-medium text-sm mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isRevealed = revealed[qi];
              const isCorrect = oi === q.correctIndex;
              let optClass =
                "border-sst-border/50 bg-white hover:bg-white/80";
              if (isRevealed && selected && isCorrect)
                optClass = "border-sst-success bg-sst-success/10";
              else if (isRevealed && selected && !isCorrect)
                optClass = "border-sst-error bg-sst-error/10";
              else if (isRevealed && isCorrect)
                optClass = "border-sst-success/50 bg-sst-success/5";

              return (
                <button
                  key={oi}
                  onClick={() => {
                    if (isRevealed) return;
                    setAnswers((a) => ({ ...a, [qi]: oi }));
                    setRevealed((r) => ({ ...r, [qi]: true }));
                  }}
                  className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-all ${optClass} ${
                    !isRevealed ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="font-medium mr-2">
                    {String.fromCharCode(65 + oi)})
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed[qi] && (
            <div
              className={`mt-3 text-sm p-3 rounded-lg animate-fade-in ${
                answers[qi] === q.correctIndex
                  ? "bg-sst-success/10 text-green-800"
                  : "bg-sst-error/10 text-red-800"
              }`}
            >
              <span className="font-semibold">
                {answers[qi] === q.correctIndex ? "Correct! " : "Incorrect. "}
              </span>
              {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TTSControls({
  tts,
  content,
}: {
  tts: ReturnType<typeof useTextToSpeech>;
  content: string;
}) {
  if (!tts.isSupported) return null;

  const speeds = [0.75, 1, 1.25, 1.5];

  return (
    <div className="flex items-center gap-3 bg-sst-light-gray rounded-xl px-4 py-3 mb-6">
      <button
        onClick={() => {
          if (tts.isPlaying && !tts.isPaused) tts.pause();
          else if (tts.isPaused) tts.resume();
          else tts.speak(content);
        }}
        className="w-9 h-9 flex items-center justify-center bg-sst-orange text-white rounded-full hover:bg-sst-orange-dark transition-colors flex-shrink-0"
      >
        {tts.isPlaying && !tts.isPaused ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="flex-1">
        <div className="text-xs text-sst-gray mb-1">
          {tts.isPlaying && !tts.isPaused
            ? "Listening..."
            : tts.isPaused
              ? "Paused"
              : "Listen to this lesson"}
        </div>
        <div className="h-1.5 bg-sst-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-sst-orange rounded-full transition-all"
            style={{ width: `${tts.progress}%` }}
          />
        </div>
      </div>

      {tts.isPlaying && (
        <button
          onClick={tts.stop}
          className="w-8 h-8 flex items-center justify-center text-sst-gray hover:text-sst-error transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        </button>
      )}

      <div className="flex items-center gap-1">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => tts.setSpeed(s)}
            className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
              tts.speed === s
                ? "bg-sst-orange text-white"
                : "text-sst-gray hover:bg-sst-border/30"
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}

function LessonContent({ content }: { content: string }) {
  const paragraphs = content.split("\n\n");

  return (
    <div className="prose prose-sm sm:prose max-w-none">
      {paragraphs.map((p, i) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        // Render formatted text
        const rendered = trimmed
          .replace(
            /\*\*([^*]+)\*\*/g,
            '<strong class="text-sst-charcoal">$1</strong>'
          )
          .replace(/\n/g, "<br />");

        // Check if it's a checklist item
        if (trimmed.startsWith("☐")) {
          return (
            <div
              key={i}
              className="flex items-start gap-2 py-1 text-sm"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          );
        }

        // Check if it's a bullet list
        if (trimmed.startsWith("•") || trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").filter((l) => l.trim());
          return (
            <ul key={i} className="space-y-1 my-3">
              {items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm text-sst-charcoal"
                >
                  <span className="text-sst-orange mt-1 flex-shrink-0">•</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item
                        .replace(/^[•\-]\s*/, "")
                        .replace(
                          /\*\*([^*]+)\*\*/g,
                          '<strong class="text-sst-charcoal">$1</strong>'
                        ),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={i}
            className="text-sm leading-relaxed text-sst-charcoal my-3"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        );
      })}
    </div>
  );
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const { courseId, moduleId } = use(params);
  const searchParams = useSearchParams();
  const lessonParam = searchParams.get("lesson");

  const course = getCourse(courseId);
  const mod = getModule(courseId, moduleId);
  const tts = useTextToSpeech();
  const { markComplete, isLessonComplete } = useProgress();

  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    if (mod && lessonParam) {
      const idx = mod.lessons.findIndex((l) => l.id === lessonParam);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const lesson = mod?.lessons[currentLessonIndex];

  // Build flat lesson list for prev/next across modules
  const allModuleLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
    );
  }, [course]);

  const globalIndex = useMemo(() => {
    if (!lesson) return -1;
    return allModuleLessons.findIndex((l) => l.id === lesson.id);
  }, [allModuleLessons, lesson]);

  if (!course || !mod || !lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <Link href="/academy" className="text-sst-orange hover:underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  const fullContent =
    lesson.content +
    (lesson.keyTakeaways.length > 0
      ? "\n\nKey Takeaways: " + lesson.keyTakeaways.join(". ")
      : "");

  const handleMarkComplete = () => {
    markComplete(courseId, lesson.id);
  };

  const handleNav = (direction: "prev" | "next") => {
    tts.stop();
    const newGlobal = direction === "prev" ? globalIndex - 1 : globalIndex + 1;
    if (newGlobal < 0 || newGlobal >= allModuleLessons.length) return;
    const target = allModuleLessons[newGlobal];
    if (target.moduleId === moduleId) {
      setCurrentLessonIndex(
        mod.lessons.findIndex((l) => l.id === target.id)
      );
    } else {
      window.location.href = `/academy/${courseId}/${target.moduleId}?lesson=${target.id}`;
    }
  };

  const complete = isLessonComplete(courseId, lesson.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-sst-gray mb-6">
        <Link href="/academy" className="hover:text-sst-orange transition-colors">
          Academy
        </Link>
        <span>/</span>
        <Link
          href={`/academy/${courseId}`}
          className="hover:text-sst-orange transition-colors"
        >
          {course.title}
        </Link>
        <span>/</span>
        <span className="text-sst-charcoal font-medium">{mod.title}</span>
      </nav>

      {/* Lesson sidebar on larger screens */}
      <div className="lg:flex lg:gap-8">
        {/* Sidebar - module lessons */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-xl border border-sst-border/50 p-4">
            <h3 className="font-bold text-sm mb-3">{mod.title}</h3>
            <div className="space-y-1">
              {mod.lessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => {
                    tts.stop();
                    setCurrentLessonIndex(i);
                  }}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    i === currentLessonIndex
                      ? "bg-sst-orange/10 text-sst-orange font-medium"
                      : "text-sst-charcoal hover:bg-sst-light-gray"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      isLessonComplete(courseId, l.id)
                        ? "bg-sst-success text-white"
                        : "bg-sst-light-gray text-sst-gray"
                    }`}
                  >
                    {isLessonComplete(courseId, l.id) ? "✓" : i + 1}
                  </span>
                  <span className="truncate">{l.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Lesson header */}
          <div className="mb-6">
            <span
              className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
              style={{
                backgroundColor: course.color + "15",
                color: course.color,
              }}
            >
              {mod.title} · Lesson {currentLessonIndex + 1} of{" "}
              {mod.lessons.length}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {lesson.title}
            </h1>
          </div>

          {/* TTS Controls */}
          <TTSControls tts={tts} content={fullContent} />

          {/* Lesson content */}
          <div className="bg-white rounded-xl border border-sst-border/50 p-5 sm:p-8">
            <LessonContent content={lesson.content} />

            {/* Key takeaways */}
            {lesson.keyTakeaways.length > 0 && (
              <div className="mt-8 bg-sst-orange/5 border border-sst-orange/20 rounded-xl p-5">
                <h3 className="font-bold text-sm text-sst-orange mb-3">
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-sst-charcoal"
                    >
                      <span className="text-sst-orange mt-0.5">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quiz */}
            {lesson.quiz && lesson.quiz.length > 0 && (
              <QuizBlock quiz={lesson.quiz} />
            )}
          </div>

          {/* Mark complete + Navigation */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleMarkComplete}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                complete
                  ? "bg-sst-success/10 text-sst-success border border-sst-success/30"
                  : "bg-sst-success text-white hover:bg-green-600"
              }`}
            >
              {complete ? "✓ Completed" : "Mark as Complete"}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav("prev")}
                disabled={globalIndex <= 0}
                className="px-4 py-2.5 rounded-lg border border-sst-border text-sm font-medium hover:bg-sst-light-gray transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={() => handleNav("next")}
                disabled={globalIndex >= allModuleLessons.length - 1}
                className="px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ backgroundColor: course.color }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
