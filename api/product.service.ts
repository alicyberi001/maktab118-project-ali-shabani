import { client } from "./client";
import { IProduct, IProductRes } from "@/types/product.api";
import { urls } from "./urls";

interface IParams {
  page?: number;
  limit?: number;
}

type fetchProductsListType = (_: IParams) => Promise<IProductRes>;
export const fetchProductsList: fetchProductsListType = async (params) => {
  const response = await client.get(urls.product.getAll, {
    params: { page: params?.page || 1, limit: params?.limit || 6 },
  });
  return response.data;
};
