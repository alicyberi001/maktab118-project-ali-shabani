export interface IOrdersRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: { Orders: IOrders[] };
}

export interface IOrders {
  _id: string;
  user: string;
  products: [
    {
      product: string;
      count: number;
      _id: string;
    }
  ];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOrdersRes {
  status: string;
  data: {
    order: {
      user: string;
      products: [
        {
          product: {
            _id: string;
            price: number;
          };
          count: number;
          _id: string;
        }
      ];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

export interface ICReateOrderBody {
  user: string;
  products: [
    {
      product: string;
      count: number;
    }
  ];
  deliveryStatus: boolean;
}
