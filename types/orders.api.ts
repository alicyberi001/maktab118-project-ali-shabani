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
