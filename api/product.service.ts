import { IEditProductRes, IProduct, IProductById } from "@/types/product.api";
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

type fetchProductByIdType = (_: string) => Promise<IProductById>;
export const fetchProductById: fetchProductByIdType = async (id) => {
  const response = await client.get(urls.product.getById(id));
  return response.data;
};


type deleteProductById = (_: string) => Promise<null>;
export const deleteProductById: deleteProductById = async (id) => {
  const response = await client.delete(urls.product.delete(id));
  console.log("delete: ", response);
  return response.data;
};

export interface editProductBody {
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
//   const response = await client.patch(urls.product.edit(id), {
//     body: {
//       name: body?.name,
//       category: body?.category,
//       subcategory: body.subcategory,
//       price: body?.price,
//       quantity: body?.quantity,
//       brand: body?.brand,
//       description: body?.description,
//       thumbnail: body?.thumbnail,
//       images: body?.images,
//     },
//   });
//   console.log("edit: ", response);
//   return response.data;
// };


interface IAddProduct {
  name: string;
  brand: string;
  description: string;
  quantity: string;
  images: File[];
  subcategory: string;
  category: string;
  price: string;
  }


export const fetchEditProducts = async (id: string, data: IAddProduct) => {
  try {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("brand", data.brand);
  formData.append("description", data.description);
  formData.append("quantity", data.quantity.toString());
  formData.append("images", data.images[0]);
  formData.append("subcategory", data.subcategory);
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await client.patch(urls.product.edit(id), formData);
  return response.data;
  } catch (error) {
  throw error;
  }
  };