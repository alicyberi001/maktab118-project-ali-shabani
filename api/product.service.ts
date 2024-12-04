import { IProduct } from "@/types/product.api";
import { IGlobalRes } from "@/types/global";
import { client } from "./client";
import { urls } from "./urls";

interface IParams {
  page?: number;
  limit?: number;
}

type fetchProductsListType = (_: IParams) => Promise<IGlobalRes<{products : IProduct[]}>>;
export const fetchProductsList: fetchProductsListType = async (params) => {
  const response = await client.get(urls.product.getAll, {
    params: { page: params?.page || 1, limit: params?.limit || 6 },
  });
  return response.data;
};
