// "use client";

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
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
//   totalAmount: () => number;
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
//                 ? { ...item, quantity: item.quantity + product.quantity }
//                 : item
//             );
//             console.log("Updated cart:", updatedCart);
//             return { cart: updatedCart };
//           }
//           const newCart = [...state.cart, product];
//           console.log("Adding to cart:", newCart);
//           return { cart: newCart };
//         }),

//       removeFromCart: (id) =>
//         set((state) => ({
//           cart: state.cart.filter((item) => item._id !== id),
//         })),

//       clearCart: () => set({ cart: [] }),

//       totalAmount: () =>
//         get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
//     }),
//     {
//       name: "product-storage", // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// );

// export default useCartStore;

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalAmount: () => number;
  totalProducts: () => number;
  ProductsCounter: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item._id === product._id
          );
          if (existingProduct) {
            console.log("Cart before update:", state.cart);
            const updatedCart = state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            console.log("Updated cart:", updatedCart);
            return { cart: updatedCart };
          }
          const newCart = [...state.cart, product];
          console.log("Adding to cart:", newCart);
          return { cart: newCart };
        }),

      decreaseQuantity: (id) =>
        set((state) => {
          const updatedCart = state.cart
            .map((item) =>
              item._id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0);
          return { cart: updatedCart };
        }),

      clearCart: () => set({ cart: [] }),

      totalAmount: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      totalProducts: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      ProductsCounter: () => get().cart.length,
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCartStore;
