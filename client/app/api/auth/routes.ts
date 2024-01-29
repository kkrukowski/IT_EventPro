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

  return registerUser;
};

export const LoginUser = async (userData: any) => {
  const loginApiUrl = API_URL + "/auth/login";
  console.log(loginApiUrl)
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

export const getUserEvents = async (userId: any) => {
  const getUserApiUrl = API_URL + `/users/${userId}`;
  const getUserEvents = await fetch(getUserApiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.status === 200) {
      const data = await response.json();
      const eventsId = data.eventsId;
      return eventsId;
    }
  });
  return getUserEvents;
};

export const updateUser = async (userId: any, userData: any) => {
  Object.keys(userData).forEach(
    (key) => userData[key] === "" && delete userData[key]
  );
  console.log("userData", userData);
  const updateUserApiUrl = API_URL + `/users/${userId}`;
  const updateUser = await fetch(updateUserApiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(async (response) => {
    if (response.status === 200) {
      const data = await response.json();

      return data;
    }
  });
  return updateUser;
};
