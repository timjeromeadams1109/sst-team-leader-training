import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken, COOKIE_NAME } from "@/lib/admin-auth";
import { validate, adminAuthSchema } from "@/lib/validation";
import { adminLoginLimiter, checkRateLimit } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = validate(adminAuthSchema, body);
    if ('error' in parsed) return parsed.error;
    const { password } = parsed.data;

    // Rate limiting — 3 attempts per 15 minutes per IP.
    // Fails open when Redis is unavailable so admin auth remains functional.
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const rl = await checkRateLimit(adminLoginLimiter, `admin-login:${ip}`);
    if (rl.limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfter) },
        }
      );
    }

    const valid = await verifyPassword(password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await createToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
