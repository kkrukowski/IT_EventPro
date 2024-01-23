"use server";

import { cookies } from "next/headers";

export async function createAuthToken(token: string) {
  console.log("createAuthToken", token);
  cookies().set("authToken", token, {
    maxAge: 60 * 60,
  });
  if (cookies().get("authToken")) {
    return true;
  }
  return false;
}
