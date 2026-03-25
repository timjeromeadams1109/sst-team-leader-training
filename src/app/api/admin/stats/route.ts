import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET() {
  const supabase = getServiceClient();

  if (!supabase) {
    // Return demo data when Supabase isn't configured
    return NextResponse.json({
      totalLearners: 0,
      activeLearners7d: 0,
      lessonsCompleted: 0,
      testsCompleted: 0,
      avgPassRate: 0,
      avgGrowth: 0,
      documentViews: 0,
      courseStats: [],
      recentEvents: [],
      connected: false,
    });
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Total unique learners
    const { data: learners } = await supabase
      .from("sst_events")
      .select("learner_id")
      .limit(10000);
    const uniqueLearners = new Set(learners?.map((e) => e.learner_id) || []);

    // Active learners (7 days)
    const { data: activeLearners } = await supabase
      .from("sst_events")
      .select("learner_id")
      .gte("created_at", sevenDaysAgo);
    const uniqueActive = new Set(activeLearners?.map((e) => e.learner_id) || []);

    // Lessons completed
    const { count: lessonsCompleted } = await supabase
      .from("sst_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "lesson_complete");

    // Tests completed
    const { data: testEvents } = await supabase
      .from("sst_events")
      .select("*")
      .eq("event_type", "test_result");

    const tests = testEvents || [];
    const postTests = tests.filter((t) => t.test_type === "post");
    const passedTests = postTests.filter((t) => t.passed);
    const avgPassRate = postTests.length > 0
      ? Math.round((passedTests.length / postTests.length) * 100)
      : 0;

    // Average growth (post score - pre score per learner/course)
    const preTests = tests.filter((t) => t.test_type === "pre");
    let growthSum = 0;
    let growthCount = 0;
    for (const post of postTests) {
      const pre = preTests.find(
        (p) => p.learner_id === post.learner_id && p.course_id === post.course_id
      );
      if (pre && post.score != null && pre.score != null) {
        growthSum += post.score - pre.score;
        growthCount++;
      }
    }
    const avgGrowth = growthCount > 0 ? Math.round(growthSum / growthCount) : 0;

    // Document views
    const { count: documentViews } = await supabase
      .from("sst_events")
      .select("*", { count: "exact", head: true })
      .in("event_type", ["document_view", "document_print"]);

    // Course stats
    const courseIds = ["tier-1-foundation", "tier-2-developing", "tier-3-advanced"];
    const courseStats = courseIds.map((cid) => {
      const courseTests = postTests.filter((t) => t.course_id === cid);
      const coursePassed = courseTests.filter((t) => t.passed);
      return {
        courseId: cid,
        attempts: courseTests.length,
        passed: coursePassed.length,
        passRate: courseTests.length > 0
          ? Math.round((coursePassed.length / courseTests.length) * 100)
          : 0,
        avgScore: courseTests.length > 0
          ? Math.round(
              courseTests.reduce((s, t) => s + (t.score || 0), 0) / courseTests.length
            )
          : 0,
      };
    });

    // Recent events (last 20)
    const { data: recentEvents } = await supabase
      .from("sst_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    return NextResponse.json({
      totalLearners: uniqueLearners.size,
      activeLearners7d: uniqueActive.size,
      lessonsCompleted: lessonsCompleted || 0,
      testsCompleted: tests.length,
      avgPassRate,
      avgGrowth,
      documentViews: documentViews || 0,
      courseStats,
      recentEvents: recentEvents || [],
      connected: true,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
