import { IUsers, IUsersById } from "@/types/users.api";
import { IGlobalRes } from "@/types/global";
import { client } from "./client";
import { urls } from "./urls";

const token = sessionStorage.getItem("accessToken");

type fetchUsersListType = () => Promise<IGlobalRes<{ users: IUsers[] }>>;
export const fetchUsersList: fetchUsersListType = async () => {
  const response = await client.get(urls.users.getAll, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return response.data;
};

type fetchUserByIdListType = (_: string) => Promise<IUsersById>;
export const fetchUserByIdList: fetchUserByIdListType = async (id) => {
  const response = await client.get(urls.users.ById(id));
  return response.data;
};
