import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse | void {
  const authToken = req.cookies.get("authToken");
  if (!authToken) {
    console.log("No auth token");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/profile",
};
