export interface IEditProductRes {
  status: string;
  data: {
    product: {
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
      __v: number;
    };
  };
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

export interface IProductById {
  status: string;
  data: {
    product: {
      rating: {
        rate: number;
        count: number;
      };
      _id: string;
      category: {
        _id: string;
        name: string;
        icon: string;
        createdAt: string;
        updatedAt: string;
        slugname: string;
        __v: number;
      };
      subcategory: {
        _id: string;
        category: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        slugname: string;
        __v: number;
      };
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
      __v: number;
    };
  };
}
