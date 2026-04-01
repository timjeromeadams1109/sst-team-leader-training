import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { getServiceClient } from "@/lib/supabase";
import { validate, authLoginSchema } from "@/lib/validation";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_JWT_SECRET || "sst-user-auth-secret-change-me"
);
const COOKIE_NAME = "sst-user-token";

// POST /api/auth — login or register
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = validate(authLoginSchema, body);
    if ('error' in parsed) return parsed.error;
    const { action, name, email, password } = parsed.data;

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured. Set Supabase environment variables." },
        { status: 503 }
      );
    }

    if (action === "register") {
      if (!name || name.trim().length < 2) {
        return NextResponse.json({ error: "Name is required (min 2 characters)" }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }

      // Check if email already exists
      const { data: existing } = await supabase
        .from("sst_users")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .single();

      if (existing) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const { data: user, error } = await supabase
        .from("sst_users")
        .insert({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password_hash: hashedPassword,
          role: "learner",
        })
        .select("id, name, email, role")
        .single();

      if (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
      }

      const token = await new SignJWT({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(JWT_SECRET);

      const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return response;
    }

    // Login
    const { data: user, error } = await supabase
      .from("sst_users")
      .select("id, name, email, password_hash, role")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/auth — get current user from cookie
export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return NextResponse.json({
      user: {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}

// DELETE /api/auth — logout
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
