import {
  IAuth_admin_login,
  IAuth_admin_login_Res,
  IAuth_user_signup,
  IAuth_user_signup_Res,
} from "@/types/auth.api";
import { urls } from "./urls";
import { client } from "./client";
import { removeSessionToken } from "@/lib/session_manager";
import Cookies from "js-cookie";
import useUserStore from "@/lib/zustand/users.store";


type auth_admin_login_type = (
  _: IAuth_admin_login
) => Promise<IAuth_admin_login_Res>;
export const auth_admin_login: auth_admin_login_type = async ({
  username,
  password,
}) => {
  const response = await client.post<IAuth_admin_login_Res>(
    urls.auth.admin.login,
    { username, password }
  );
  return response.data;
};

type auth_user_signup_type = (
  _: IAuth_user_signup
) => Promise<IAuth_user_signup_Res>;
export const auth_user_signup: auth_user_signup_type = async ({
  firstname,
  lastname,
  username,
  password,
  phoneNumber,
  address,
}) => {
  const response = await client.post<IAuth_user_signup_Res>(
    urls.auth.user.signup,
    {
      firstname,
      lastname,
      username,
      password,
      phoneNumber,
      address,
    }
  );
  return response.data;
};

interface ITokenRes {
  status: string;
  token: {
    accessToken: string;
  };
}

type auth_token = (_: string) => Promise<ITokenRes>;
export const generateToken: auth_token = async (refreshToken) => {
  const response = await client.post(urls.auth.token, { refreshToken });
  return response.data;
};

export const logout = async () => {
  const token = Cookies.get("accessToken");
  const response = await client.get(urls.auth.logout, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  removeSessionToken()
  console.log(response.data);
  return response.data;
};
