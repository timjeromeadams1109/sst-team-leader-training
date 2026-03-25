"use client";

import { use, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Headphones,
  Pause,
  Play,
  Square,
  Volume2,
  PartyPopper,
} from "lucide-react";
import { getCourse, getModule } from "@/data/courses";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useProgress } from "@/hooks/useProgress";
import { Badge } from "@/components/shared/Badge";

/* ─── Quiz Block ─── */
function QuizBlock({
  quiz,
}: {
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <div className="mt-8 pt-6 border-t border-sst-border/20">
      <h3 className="flex items-center gap-2 font-bold text-sm text-sst-orange uppercase tracking-wider mb-4">
        <CheckCircle2 className="w-4 h-4" /> Knowledge Check
      </h3>
      <div className="space-y-4">
        {quiz.map((q, qi) => (
          <div key={qi} className="bg-sst-light-gray/70 rounded-xl p-5">
            <p className="font-semibold text-sm mb-3">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isRevealed = revealed[qi];
                const isCorrect = oi === q.correctIndex;

                let cls = "border-sst-border/40 bg-white hover:bg-sst-light-gray/50 hover:border-sst-orange/30 cursor-pointer";
                if (isRevealed) {
                  cls = "cursor-default ";
                  if (selected && isCorrect) cls += "border-sst-success bg-sst-success/10";
                  else if (selected && !isCorrect) cls += "border-sst-error bg-sst-error/10";
                  else if (isCorrect) cls += "border-sst-success/40 bg-sst-success/5";
                  else cls += "border-sst-border/20 bg-white opacity-50";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => {
                      if (isRevealed) return;
                      setAnswers((a) => ({ ...a, [qi]: oi }));
                      setRevealed((r) => ({ ...r, [qi]: true }));
                    }}
                    className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all ${cls}`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sst-light-gray text-xs font-bold mr-2">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {revealed[qi] && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 text-sm p-3 rounded-xl ${
                    answers[qi] === q.correctIndex
                      ? "bg-sst-success/10 text-green-800"
                      : "bg-sst-error/10 text-red-800"
                  }`}
                >
                  <strong>{answers[qi] === q.correctIndex ? "Correct! " : "Incorrect. "}</strong>
                  {q.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TTS Controls ─── */
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
    <div className="flex items-center gap-3 bg-sst-dark rounded-2xl px-4 py-3 mb-6 text-white">
      <button
        onClick={() => {
          if (tts.isPlaying && !tts.isPaused) tts.pause();
          else if (tts.isPaused) tts.resume();
          else tts.speak(content);
        }}
        className="w-10 h-10 flex items-center justify-center bg-sst-orange rounded-xl hover:bg-sst-orange-dark transition-colors flex-shrink-0"
      >
        {tts.isPlaying && !tts.isPaused ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs mb-1.5">
          <Headphones className="w-3 h-3 text-gray-400" />
          <span className="text-gray-400">
            {tts.isPlaying && !tts.isPaused
              ? "Listening..."
              : tts.isPaused
                ? "Paused"
                : "Listen to this lesson"}
          </span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sst-orange rounded-full"
            animate={{ width: `${tts.progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {tts.isPlaying && (
        <button onClick={tts.stop} className="p-2 text-gray-400 hover:text-white transition-colors">
          <Square className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-center gap-1 ml-1">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => tts.setSpeed(s)}
            className={`text-[10px] px-1.5 py-0.5 rounded-md transition-colors ${
              tts.speed === s ? "bg-sst-orange text-white" : "text-gray-500 hover:text-white"
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Lesson Content Renderer ─── */
function LessonContent({ content }: { content: string }) {
  const paragraphs = content.split("\n\n");

  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        // Bullet list
        if (trimmed.startsWith("•") || trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").filter((l) => l.trim());
          return (
            <ul key={i} className="space-y-1.5">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-sst-charcoal leading-relaxed">
                  <span className="text-sst-orange mt-1 flex-shrink-0">•</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item
                        .replace(/^[•\-]\s*/, "")
                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        }

        // Checklist
        if (trimmed.startsWith("☐")) {
          const items = trimmed.split("\n").filter((l) => l.trim());
          return (
            <div key={i} className="bg-sst-light-gray/50 rounded-xl p-4 space-y-2">
              {items.map((item, j) => (
                <div key={j} className="flex items-start gap-2 text-sm">
                  <span className="w-4 h-4 border-2 border-sst-border rounded mt-0.5 flex-shrink-0" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item
                        .replace(/^☐\s*/, "")
                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                </div>
              ))}
            </div>
          );
        }

        // Regular paragraph
        const rendered = trimmed
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-sst-charcoal">$1</strong>')
          .replace(/\n/g, "<br />");

        return (
          <p
            key={i}
            className="text-sm leading-relaxed text-sst-charcoal"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        );
      })}
    </div>
  );
}

/* ─── Completion Celebration ─── */
function CompletionToast({ show, onNext }: { show: boolean; onNext?: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-sst-dark text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <PartyPopper className="w-5 h-5 text-sst-orange" />
          <span className="text-sm font-medium">Lesson complete!</span>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-1 bg-sst-orange px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-sst-orange-dark transition-colors"
            >
              Next <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Page ─── */
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
  const [showCelebration, setShowCelebration] = useState(false);

  const lesson = mod?.lessons[currentLessonIndex];

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

  const handleNav = useCallback(
    (direction: "prev" | "next") => {
      tts.stop();
      setShowCelebration(false);
      const newGlobal = direction === "prev" ? globalIndex - 1 : globalIndex + 1;
      if (newGlobal < 0 || newGlobal >= allModuleLessons.length) return;
      const target = allModuleLessons[newGlobal];
      if (target.moduleId === moduleId) {
        setCurrentLessonIndex(mod!.lessons.findIndex((l) => l.id === target.id));
      } else {
        window.location.href = `/academy/${courseId}/${target.moduleId}?lesson=${target.id}`;
      }
    },
    [tts, globalIndex, allModuleLessons, moduleId, mod, courseId]
  );

  if (!course || !mod || !lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <Link href="/academy" className="text-sst-orange hover:underline">Back to Academy</Link>
      </div>
    );
  }

  const fullContent =
    lesson.content +
    (lesson.keyTakeaways.length > 0
      ? "\n\nKey Takeaways: " + lesson.keyTakeaways.join(". ")
      : "");

  const complete = isLessonComplete(courseId, lesson.id);

  const handleMarkComplete = () => {
    markComplete(courseId, lesson.id);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const canGoNext = globalIndex < allModuleLessons.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-sst-gray mb-5">
        <Link href="/academy" className="hover:text-sst-orange transition-colors">Academy</Link>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <Link href={`/academy/${courseId}`} className="hover:text-sst-orange transition-colors">{course.title}</Link>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-sst-charcoal font-medium">{mod.title}</span>
      </nav>

      <div className="lg:flex lg:gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-60 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-sst-border/40 p-4 shadow-sm">
            <h3 className="font-bold text-xs uppercase tracking-wider text-sst-gray mb-3">
              {mod.title}
            </h3>
            <div className="space-y-0.5">
              {mod.lessons.map((l, i) => {
                const done = isLessonComplete(courseId, l.id);
                const active = i === currentLessonIndex;
                return (
                  <button
                    key={l.id}
                    onClick={() => { tts.stop(); setCurrentLessonIndex(i); setShowCelebration(false); }}
                    className={`w-full text-left text-xs px-3 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
                      active ? "bg-sst-orange/10 text-sst-orange font-semibold" : "text-sst-charcoal hover:bg-sst-light-gray"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                      done ? "bg-sst-success text-white" : active ? "bg-sst-orange text-white" : "bg-sst-light-gray text-sst-gray"
                    }`}>
                      {done ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Lesson header */}
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <Badge color={course.color} size="sm">
              Lesson {currentLessonIndex + 1} of {mod.lessons.length}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              {lesson.title}
            </h1>
          </motion.div>

          {/* TTS */}
          <TTSControls tts={tts} content={fullContent} />

          {/* Content */}
          <motion.div
            key={lesson.id + "-content"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-sst-border/40 p-5 sm:p-8 shadow-sm"
          >
            <LessonContent content={lesson.content} />

            {/* Key Takeaways */}
            {lesson.keyTakeaways.length > 0 && (
              <div className="mt-8 bg-sst-orange/5 border border-sst-orange/15 rounded-2xl p-5">
                <h3 className="flex items-center gap-2 font-bold text-sm text-sst-orange mb-3">
                  <Volume2 className="w-4 h-4" /> Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-sst-charcoal">
                      <CheckCircle2 className="w-4 h-4 text-sst-orange mt-0.5 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quiz */}
            {lesson.quiz && lesson.quiz.length > 0 && <QuizBlock quiz={lesson.quiz} />}
          </motion.div>

          {/* Bottom actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleMarkComplete}
              disabled={complete}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                complete
                  ? "bg-sst-success/10 text-sst-success border border-sst-success/30 cursor-default"
                  : "bg-sst-success text-white hover:bg-green-600 shadow-md shadow-sst-success/20"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {complete ? "Completed" : "Mark as Complete"}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav("prev")}
                disabled={globalIndex <= 0}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-sst-border/40 text-sm font-medium hover:bg-sst-light-gray transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={() => handleNav("next")}
                disabled={!canGoNext}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                style={{ backgroundColor: course.color, boxShadow: `0 4px 14px ${course.color}25` }}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration toast */}
      <CompletionToast
        show={showCelebration}
        onNext={canGoNext ? () => handleNav("next") : undefined}
      />
    </div>
  );
}
