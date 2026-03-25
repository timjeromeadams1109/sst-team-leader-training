import { tier1Foundation } from "./tier-1-foundation";
import { tier2Developing } from "./tier-2-developing";
import { tier3Advanced } from "./tier-3-advanced";
import { mesAcademy } from "./mes-academy";
import { assessments } from "./assessments";
import { CourseContent, Assessment } from "./types";

export const allCourses: CourseContent[] = [
  tier1Foundation,
  tier2Developing,
  tier3Advanced,
  mesAcademy,
];

export const tierCourses: CourseContent[] = [
  tier1Foundation,
  tier2Developing,
  tier3Advanced,
];

export function getCourse(courseId: string): CourseContent | undefined {
  return allCourses.find((c) => c.courseId === courseId);
}

export function getAssessment(courseId: string): Assessment | undefined {
  return assessments.find((a) => a.courseId === courseId);
}

export function getModule(courseId: string, moduleId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  return course.modules.find((m) => m.id === moduleId);
}

export function getLesson(courseId: string, moduleId: string, lessonId: string) {
  const mod = getModule(courseId, moduleId);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.id === lessonId);
}

export function getTotalLessons(course: CourseContent): number {
  return course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function getTotalDuration(course: CourseContent): number {
  return course.modules.reduce((sum, m) => sum + m.durationMinutes, 0);
}

export { tier1Foundation, tier2Developing, tier3Advanced, mesAcademy, assessments };
export type { CourseContent, Assessment } from "./types";
