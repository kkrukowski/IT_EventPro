import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(
  req: NextRequest
): Promise<Promise<NextResponse> | void> {
  const authToken = req.cookies.get("authToken")?.value || "";

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/auth/profile";

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  const res = await fetch(apiUrl, { headers, cache: "force-cache" })
    .then((res) => {
      if (res.status === 200) {
        return NextResponse.next();
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (!res) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/profile",
};
