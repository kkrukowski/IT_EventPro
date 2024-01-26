import { get } from "http";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserData } from "./app/actions";

export async function middleware(
  req: NextRequest
): Promise<Promise<NextResponse> | void> {
  const authToken = req.cookies.get("authToken")?.value || "";

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/profile"],
};
