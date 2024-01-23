import axios from "axios";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(
  req: NextRequest
): Promise<Promise<NextResponse> | void> {
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log(authToken.value);
  const config = {
    headers: {
      Authorization: `Bearer ${authToken.value}`,
    },
  };
  console.log(process.env.NEXT_PUBLIC_API_URL + "/auth/profile");
  await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/auth/profile", config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.redirect(new URL("/login", req.url));
    });
}

export const config = {
  matcher: "/profile",
};
