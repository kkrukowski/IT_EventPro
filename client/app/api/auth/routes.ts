"use server";

import { createAuthToken, removeUserData, storeUserData } from "../../actions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const RegisterUser = async (userData: any) => {
  const registerApiUrl = API_URL + "/auth/register";
  const registerUser = await fetch(registerApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
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
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(registerUser);

  return registerUser;
};

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

export const LogoutUser = async () => {
  return await removeUserData();
};
