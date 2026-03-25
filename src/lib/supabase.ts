import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Server-side client (service role)
export function getServiceClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Client-side client (anon key)
export function getAnonClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export interface TrainingEvent {
  id?: string;
  learner_id: string;
  event_type: "lesson_complete" | "test_result" | "document_view" | "document_print";
  course_id?: string;
  module_id?: string;
  lesson_id?: string;
  score?: number;
  test_type?: string;
  passed?: boolean;
  document_id?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
}
