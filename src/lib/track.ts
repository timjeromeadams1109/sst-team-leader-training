const LEARNER_ID_KEY = "sst-learner-id";

function getLearnerId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(LEARNER_ID_KEY);
  if (!id) {
    id = "learner_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(LEARNER_ID_KEY, id);
  }
  return id;
}

export function trackEvent(event: {
  event_type: string;
  course_id?: string;
  module_id?: string;
  lesson_id?: string;
  score?: number;
  test_type?: string;
  passed?: boolean;
  document_id?: string;
}) {
  const learnerId = getLearnerId();
  if (!learnerId) return;

  // Fire and forget — no blocking, no error handling
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ learner_id: learnerId, ...event }),
  }).catch(() => {});
}
