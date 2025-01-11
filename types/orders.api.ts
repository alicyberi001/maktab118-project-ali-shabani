export interface IOrdersRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: { Orders: IOrders[] };
}

interface ITest {
  product: boolean;
  count: number;
  _id: string;
}

export interface IOrders {
  _id: string;
  user: string;
  products: ITest[];
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

interface product {
  product: string;
  count: number;
}

export interface ICReateOrderBody {
  user: string;
  products: product[];
  deliveryStatus: boolean;
}



export interface IGetOrderRes {
  status: string;
  data: {
    order: {
      _id: string;
      user: {
        _id: string;
        firstname: string;
        lastname: string;
        username: string;
        phoneNumber: number;
        address: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      products: ITest[];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}
