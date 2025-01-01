"use client";

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string[];
//   description: string;
// }

// export interface CartState {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   decreaseQuantity: (id: string) => void;
//   clearCart: () => void;
//   totalAmount: () => number;
//   totalProducts: () => number;
//   ProductsCounter: () => number;
// }

// const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       addToCart: (product) =>
//         set((state) => {
//           const existingProduct = state.cart.find(
//             (item) => item._id === product._id
//           );
//           if (existingProduct) {
//             console.log("Cart before update:", state.cart);
//             const updatedCart = state.cart.map((item) =>
//               item._id === product._id
//                 ? { ...item, quantity: item.quantity + 1 }
//                 : item
//             );
//             console.log("Updated cart:", updatedCart);
//             return { cart: updatedCart };
//           }
//           const newCart = [...state.cart, product];
//           console.log("Adding to cart:", newCart);
//           return { cart: newCart };
//         }),

//       decreaseQuantity: (id) =>
//         set((state) => {
//           const updatedCart = state.cart
//             .map((item) =>
//               item._id === id ? { ...item, quantity: item.quantity - 1 } : item
//             )
//             .filter((item) => item.quantity > 0);
//           return { cart: updatedCart };
//         }),

//       clearCart: () => set({ cart: [] }),

//       totalAmount: () =>
//         get().cart.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         ),

//       totalProducts: () =>
//         get().cart.reduce((total, item) => total + item.quantity, 0),

//       ProductsCounter: () => get().cart.length,
//     }),
//     {
//       name: "product-storage",
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );

// export default useCartStore;

// import { create } from "zustand";

// export interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string[];
//   description: string;
// }

// export interface CartState {
//   cart: Product[];
//   fetchCart: () => Promise<void>;
//   addToCart: (product: Product) => Promise<void>;
//   decreaseQuantity: (id: string) => Promise<void>;
//   clearCart: () => Promise<void>;
//   totalAmount: () => number;
//   totalProducts: () => number;
//   ProductsCounter: () => number;
// }

// const useCartStore = create<CartState>((set, get) => ({
//   cart: [],

//   fetchCart: async () => {
//     const res = await fetch("/api/cart");
//     const data: Product[] = await res.json();
//     set({ cart: data });
//   },

//   addToCart: async (product) => {
//     await fetch("/api/cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });
//     get().fetchCart();
//   },

//   decreaseQuantity: async (id) => {
//     const product = get().cart.find((item) => item._id === id);
//     if (product) {
//       const newQuantity = product.quantity - 1;
//       await fetch("/api/cart", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, quantity: newQuantity }),
//       });
//       get().fetchCart();
//     }
//   },

//   clearCart: async () => {
//     await fetch("/api/cart", { method: "DELETE" });
//     get().fetchCart();
//   },

//   totalAmount: () =>
//     get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

//   totalProducts: () =>
//     get().cart.reduce((total, item) => total + item.quantity, 0),

//   ProductsCounter: () => get().cart.length,
// }));

// export default useCartStore;






import { create } from "zustand";
import useUserStore from "./users.store";

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
  description: string;
}

export interface CartState {
  cart: Product[];
  fetchCart: () => Promise<void>;
  addToCart: (product: Product) => Promise<void>;
  decreaseQuantity: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  mergeGuestCart: () => Promise<void>;
  totalAmount: () => number;
  totalProducts: () => number;
  ProductsCounter: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  fetchCart: async () => {
    const user = useUserStore.getState().users[0]; // فرض می‌کنیم کاربر لاگین شده اولین کاربر است
    if (!user) return;

    const res = await fetch("/api/cart", {
      headers: { "x-user-id": user._id },
    });
    const data: Product[] = await res.json();
    set({ cart: data });
  },

  addToCart: async (product) => {
    const user = useUserStore.getState().users[0];
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": user?._id || "" },
      body: JSON.stringify(product),
    });
    get().fetchCart();
  },

  decreaseQuantity: async (id) => {
    const user = useUserStore.getState().users[0];
    const product = get().cart.find((item) => item._id === id);
    if (product) {
      const newQuantity = product.quantity - 1;
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-user-id": user?._id || "" },
        body: JSON.stringify({ id, quantity: newQuantity }),
      });
      get().fetchCart();
    }
  },

  clearCart: async () => {
    const user = useUserStore.getState().users[0];
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "x-user-id": user?._id || "" },
    });
    set({ cart: [] });
  },

  mergeGuestCart: async () => {
    const user = useUserStore.getState().users[0];
    if (!user) return;

    const guestCart = get().cart;

    for (const product of guestCart) {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user._id },
        body: JSON.stringify(product),
      });
    }
    get().fetchCart();
  },

  totalAmount: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

  totalProducts: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  ProductsCounter: () => get().cart.length,
}));

export default useCartStore;
