export interface IProductRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: { products: IProduct[] };
}

export interface IProduct {
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
