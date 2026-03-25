import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "sst-training-admin-secret-change-me"
);

const USER_JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_JWT_SECRET || "sst-user-auth-secret-change-me"
);

// Routes that require user login
const protectedUserPaths = [
  "/academy/tier-",
  "/academy/mes-",
  "/academy/test/",
  "/chat",
];

function isProtectedUserRoute(pathname: string): boolean {
  return protectedUserPaths.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin route protection ---
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/api/admin/auth")
  ) {
    const token = request.cookies.get("sst-admin-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(token, ADMIN_JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // --- User route protection ---
  if (isProtectedUserRoute(pathname)) {
    const token = request.cookies.get("sst-user-token")?.value;
    if (!token) {
      // Redirect to login with return URL
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    try {
      await jwtVerify(token, USER_JWT_SECRET);
      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/academy/:path*",
    "/chat",
  ],
};
