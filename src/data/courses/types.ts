export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  keyTakeaways: string[];
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
  durationMinutes: number;
}

export interface CourseContent {
  courseId: string;
  title: string;
  tier: "foundation" | "developing" | "advanced" | "mes-mastery";
  tierLabel: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  modules: Module[];
  icon: string;
  color: string;
}

export interface AssessmentQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** Alternative wordings for re-test shuffling */
  variants?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

export interface Assessment {
  courseId: string;
  title: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  timeMinutes: number;
}

export interface TestResult {
  courseId: string;
  testType: "pre" | "post";
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
  answers: number[];
  attempt: number;
}

export type TierStatus = "unlocked" | "locked" | "completed";
