import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { validate, suggestionSchema } from "@/lib/validation";

// POST — submit a suggestion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = validate(suggestionSchema, body);
    if ('error' in parsed) return parsed.error;
    const { name, category, message } = parsed.data;

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { error } = await supabase.from("sst_suggestions").insert({
      name: name?.trim() || "Anonymous",
      category,
      message: message.trim(),
      status: "new",
    });

    if (error) {
      console.error("Suggestion insert error:", error);
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET — fetch suggestions (admin)
export async function GET() {
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ suggestions: [], connected: false });
  }

  const { data, error } = await supabase
    .from("sst_suggestions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  return NextResponse.json({ suggestions: data || [], connected: true });
}
