import axios, { AxiosError } from "axios";
import type { User } from "@/types";
export const base = "http://127.0.0.1:8000/api/v1/user/";

export const createUser = async (
  email: string,
  password: string,
  f_name: string,
  l_name: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `${base}register/`,
        {
          email,
          password,
          f_name,
          l_name,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      resolve(data.message);
    } catch (err: any) {
      if (err.response) {
        reject(err.response.data.message);
      } else {
        console.log(err.name);
        reject(err.name);
      }
    }
  });
};

export const login = async (
  email: string,
  password: string
): Promise<
  [User, ""] | [null, "wrong credentials" | "something went wrong"]
> => {
  try {
    const { data } = await axios.post(
      `${base}tokens/`,
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    return [data.user as User, ""];
  } catch (err: unknown) {
    if (
      err instanceof AxiosError &&
      err.response?.data.detail ===
        "No active account found with the given credentials"
    ) {
      return [null, "wrong credentials"];
    }
    return [null, "something went wrong"];
  }
};

export const fetchUser = async () => {
  try {
    const { data } = await axios.get(`${base}get_user/`, {
      withCredentials: true,
    });
    return data.user as User;
  } catch (err) {
    return null;
  }
};

export const googleSignin = async (
  access_token: string
): Promise<[User, ""] | [null, "Something went wrong."]> => {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/user/google/auth/",
      { access_token: access_token },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return [data.user as User, ""];
  } catch (err) {
    // toast("Something went wrong");
    console.log(err);
    return [null, "Something went wrong."];
  }
};

export const logout = async () => {
  try {
    await axios.post(`${base}logout/`, {}, { withCredentials: true });
    return true;
  } catch (err) {
    return false;
  }
};
