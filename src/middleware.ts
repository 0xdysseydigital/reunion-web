import { NextRequest, NextResponse } from "next/server";

const COOKIE = "studio_session";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(COOKIE)?.value;
  const expected = process.env.STUDIO_SESSION_SECRET;

  if (!expected || session !== expected) {
    const loginUrl = new URL("/studio-login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
