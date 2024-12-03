import { IOrdersRes } from "@/types/orders.api";
import { client } from "./client";
import { urls } from "./urls";



type fetchOrdersListType = () => Promise<IOrdersRes>;
export const fetchOrdersList: fetchOrdersListType = async () => {
  const response = await client.get(urls.orders.getAll);
  return response.data;
};