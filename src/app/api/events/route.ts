import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { validate, eventSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = validate(eventSchema, body);
    if ('error' in parsed) return parsed.error;
    const event = parsed.data;

    const supabase = getServiceClient();
    if (!supabase) {
      // No Supabase configured — silently succeed (events are optional)
      return NextResponse.json({ success: true, stored: false });
    }

    const { error } = await supabase.from("sst_events").insert({
      learner_id: event.learner_id,
      event_type: event.event_type,
      course_id: event.course_id || null,
      module_id: event.module_id || null,
      lesson_id: event.lesson_id || null,
      score: event.score || null,
      test_type: event.test_type || null,
      passed: event.passed ?? null,
      document_id: event.document_id || null,
      metadata: event.metadata || null,
    });

    if (error) {
      console.error("Event insert error:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
