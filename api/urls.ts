export const urls = {
  auth: {
    admin: {
      login: "/auth/login",
    },
  },
  product: {
    getAll: "/products",
    delete: (id: string) => `/products/${id}`,
    edit: (id: string) => `/products/${id}`,
  },
  orders: {
    getAll: "/orders",
  },
  users: {
    getAll: "/users",
    ById: (id: string) => `/users/${id}`,
  },
};
