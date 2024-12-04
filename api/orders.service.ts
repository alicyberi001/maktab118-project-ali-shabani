import { IOrders } from "@/types/orders.api";
import { IGlobalRes } from "@/types/global";
import { client } from "./client";
import { urls } from "./urls";

type fetchOrdersListType = () => Promise<IGlobalRes<{ orders: IOrders[] }>>;
export const fetchOrdersList: fetchOrdersListType = async () => {
  const response = await client.get(urls.orders.getAll);
  return response.data;
};
