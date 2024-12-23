import {
  ICReateOrderBody,
  ICreateOrdersRes,
  IOrders,
} from "@/types/orders.api";
import { IGlobalRes } from "@/types/global";
import { client } from "./client";
import { urls } from "./urls";

type fetchOrdersListType = () => Promise<IGlobalRes<{ orders: IOrders[] }>>;
export const fetchOrdersList: fetchOrdersListType = async () => {
  const response = await client.get(urls.orders.getAll);
  return response.data;
};

type createOrdersType = (_: ICReateOrderBody) => Promise<ICreateOrdersRes>;
export const createOrders: createOrdersType = async (body) => {
  const response = await client.post(urls.orders.create, body);
  return response.data;
};

type editOrdersType = (
  id: string,
  _: Omit<ICReateOrderBody, "deliveryStatus">
) => Promise<ICreateOrdersRes>;
export const editOrders: editOrdersType = async (id, body) => {
  const response = await client.patch(urls.orders.edit(id), body);
  return response.data;
};
