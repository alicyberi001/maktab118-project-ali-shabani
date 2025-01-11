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
    const user = useUserStore.getState().users[0];
    const headers = user ? { "user-id": user._id } : undefined;

    const res = await fetch("/api/cart", { headers });
    const data: Product[] = await res.json();
    set({ cart: data });
  },

  addToCart: async (product) => {
    const user = useUserStore.getState().users[0];
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (user) {
      headers["user-id"] = user._id;
      await fetch("/api/cart", {
        method: "POST",
        headers,
        body: JSON.stringify(product),
      });
      get().fetchCart();
    } else {

      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existingProduct = guestCart.find(
        (item: Product) => item._id === product._id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        guestCart.push({ ...product, quantity: product.quantity || 1 });
      }
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      set({ cart: guestCart });
    }
  },


  decreaseQuantity: async (id) => {
    const user = useUserStore.getState().users[0];
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (user) {
      headers["user-id"] = user._id;
      const product = get().cart.find((item) => item._id === id);
      if (product) {
        const newQuantity = product.quantity - 1;
        await fetch("/api/cart", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id, quantity: newQuantity }),
        });
        get().fetchCart();
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const updatedCart = guestCart
        .map((item: Product) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item: Product) => item.quantity > 0);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      set({ cart: updatedCart });
    }
  },


  clearCart: async () => {
    const user = useUserStore.getState().users[0];
    if (user) {
      const headers = { "user-id": user._id };
      await fetch("/api/cart", {
        method: "DELETE",
        headers,
      });
      set({ cart: [] });
    } else {
      localStorage.removeItem("guestCart");
      set({ cart: [] });
    }
  },


  mergeGuestCart: async () => {
    const user = useUserStore.getState().users[0];
    if (!user) return;

    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

    for (const product of guestCart) {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": user._id,
        },
        body: JSON.stringify(product),
      });
    }

    localStorage.removeItem("guestCart"); 
    get().fetchCart();
  },

  totalAmount: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

  totalProducts: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  ProductsCounter: () => get().cart.length,
}));

export default useCartStore;
