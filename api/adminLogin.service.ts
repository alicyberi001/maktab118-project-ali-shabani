import { IAuth_admin_login, IAuth_admin_login_Res } from "@/types/auth.api";
import { urls } from "./urls";
import { client } from "./client";

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
