"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Clock, Shield, BarChart3, Cog } from "lucide-react";
import { allCourses, getTotalLessons, getTotalDuration } from "@/data/courses";
import { assessments } from "@/data/courses/assessments";

const courseIcons: Record<string, React.ElementType> = {
  "tier-1-foundation": Shield,
  "tier-2-developing": BarChart3,
  "tier-3-advanced": Trophy,
  "mes-academy": Cog,
};

export default function AdminCoursesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Courses</h1>
        <p className="text-sm text-gray-500 mt-1">Manage training content and assessments</p>
      </div>

      <div className="space-y-4">
        {allCourses.map((course, index) => {
          const Icon = courseIcons[course.courseId] || BookOpen;
          const totalLessons = getTotalLessons(course);
          const totalMin = getTotalDuration(course);
          const assessment = assessments.find((a) => a.courseId === course.courseId);

          return (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: course.color + "15" }}
                >
                  <Icon className="w-6 h-6" style={{ color: course.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{course.title}</h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: course.color + "15", color: course.color }}
                    >
                      {course.tierLabel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{course.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white/[0.03] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <BookOpen className="w-3 h-3" /> Modules
                      </div>
                      <div className="text-lg font-bold text-white">{course.modules.length}</div>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <Users className="w-3 h-3" /> Lessons
                      </div>
                      <div className="text-lg font-bold text-white">{totalLessons}</div>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <Clock className="w-3 h-3" /> Duration
                      </div>
                      <div className="text-lg font-bold text-white">{totalMin} min</div>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <Trophy className="w-3 h-3" /> Pass Score
                      </div>
                      <div className="text-lg font-bold text-white">
                        {assessment ? `${assessment.passingScore}%` : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Module list */}
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Modules</h4>
                    <div className="space-y-1">
                      {course.modules.map((mod, mi) => (
                        <div key={mod.id} className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-white/[0.03] text-sm">
                          <span className="text-gray-300">
                            <span className="text-gray-600 mr-2">{mi + 1}.</span>
                            {mod.title}
                          </span>
                          <span className="text-xs text-gray-600">
                            {mod.lessons.length} lessons · {mod.durationMinutes} min
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment questions count */}
                  {assessment && (
                    <div className="mt-3 text-xs text-gray-600">
                      Assessment: {assessment.questions.length} questions · {assessment.timeMinutes} min · {assessment.passingScore}% to pass
                      · {assessment.questions.filter((q) => q.variants && q.variants.length > 0).length} questions have re-test variants
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
