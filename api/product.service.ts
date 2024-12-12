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

export interface IAddProduct {
  name: string;
  brand: string;
  description: string;
  quantity: number;
  images?: File[];
  subcategory: string;
  category: string;
  price: number;
}

export const EditProducts = async (id: string, data: IAddProduct) => {
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
    const response = await client.patch(urls.product.edit(id), formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export interface IAddProduct2 {
  quantity: string;
  price: string;
}

export const EditProducts2 = async (id:string , data: IAddProduct2) => {
  try {
    const formData = new FormData();
    formData.append("quantity", data.quantity.toString());
    formData.append("price", data.price.toString());
    const response = await client.patch(urls.product.edit(id), formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const token = sessionStorage.getItem("accessToken");

export const createProducts = async (data: IAddProduct) => {
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
    const response = await client.post(urls.product.create, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
