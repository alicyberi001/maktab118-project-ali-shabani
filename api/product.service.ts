import { IEditProductRes, IProduct } from "@/types/product.api";
import { IGlobalRes } from "@/types/global";
import { client } from "./client";
import { urls } from "./urls";

interface IParams {
  page?: number;
  limit?: number;
}

type fetchProductsListType = (
  _: IParams
) => Promise<IGlobalRes<{ products: IProduct[] }>>;
export const fetchProductsList: fetchProductsListType = async (params) => {
  const response = await client.get(urls.product.getAll, {
    params: { page: params?.page || 1, limit: params?.limit || 6 },
  });
  return response.data;
};

type deleteProductById = (_: string) => Promise<null>;
export const deleteProductById: deleteProductById = async (id) => {
  const response = await client.delete(urls.product.delete(id));
  console.log("delete: ", response);
  return response.data;
};

interface editProductBody {
  category?: string;
  subcategory?: string;
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
}

// type editProductById = (
//   id: string,
//   _: editProductBody
// ) => Promise<IEditProductRes>;
// export const editProductById: editProductById = async (id, body) => {
//   const response = await client.patch(urls.product.edit(id), {body:{name?: body.name, category?: body.category,  }});
//   console.log("edit: ", response);
//   return response.data;
// };
