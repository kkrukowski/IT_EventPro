"use server";

import { cookies } from "next/headers";

export async function createAuthToken(token: string) {
  cookies().set("authToken", token, {
    maxAge: 60 * 60,
  });
  if (cookies().get("authToken")) {
    return true;
  }
  return false;
}

export async function storeUserData(userInfo: any) {
  const { name, surname, email } = userInfo;
  // Add userinfo to cookies
  cookies().set("userName", name, {
    maxAge: 60 * 60,
  });
  cookies().set("userSurname", surname, {
    maxAge: 60 * 60,
  });
  cookies().set("userEmail", email, {
    maxAge: 60 * 60,
  });
  if (
    cookies().get("userName") &&
    cookies().get("userSurname") &&
    cookies().get("userEmail")
  ) {
    return true;
  }
}

export async function getUserData() {
  const userData = {
    name: cookies().get("userName")?.value,
    surname: cookies().get("userSurname")?.value,
    email: cookies().get("userEmail")?.value,
  };
  return userData;
}

export async function removeUserData() {
  cookies().delete("userName");
  cookies().delete("userSurname");
  cookies().delete("userEmail");
  cookies().delete("authToken");
  return true;
}
