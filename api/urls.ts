export const urls = {
  auth: {
    admin: {
      login: "/auth/login",
    },
    user: {
      signup: "/auth/signup",
    },
    token: "/auth/token",
  },
  product: {
    getAll: "/products",
    create: "/products",
    getById: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
    edit: (id: string) => `/products/${id}`,
  },
  orders: {
    getAll: "/orders",
    create: "/orders",
    edit: (id: string) => `/orders/${id}`,
  },
  users: {
    getAll: "/users",
    ById: (id: string) => `/users/${id}`,
  },
  subcatrgories: {
    getAll: "/subcategories",
  },
};
