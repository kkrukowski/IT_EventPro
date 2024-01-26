"use server";

import { createAuthToken, storeUserData } from "../../actions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const LoginUser = async (userData: any) => {
  const loginApiUrl = API_URL + "/auth/login";
  const loginUser = await fetch(loginApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(async (response) => {
    if (response.status === 200) {
      const data = await response.json();
      const token = await createAuthToken(data.access_token);

      if (token) {
        const storeData = await storeUserData(data.userInfo);
        if (!storeData) {
          return false;
        }
        return true;
      }
    }
  });

  if (!loginUser) {
    return false;
  }

  return loginUser;
};
