export const urls = {
  auth: {
    admin: {
      login: "/auth/login",
    },
  },
  product: {
    getAll: "/products",
  },
  orders: {
    getAll: "/orders",
  },
  users: {
    getAll: "/users",
    ById: (id: string) => `/users/${id}`,
  },
};
