import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

// POST — submit a suggestion
export async function POST(request: NextRequest) {
  try {
    const { name, category, message } = await request.json();

    if (!message || message.trim().length < 5) {
      return NextResponse.json({ error: "Suggestion must be at least 5 characters" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

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
