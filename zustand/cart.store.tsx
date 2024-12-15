import { create } from 'zustand';

// تعریف نوع (Type) برای محصولات
type Product = {
  id: string; // شناسه محصول
  name: string; // نام محصول
  price: number; // قیمت محصول
  quantity: number; // تعداد محصول
};

// تعریف نوع (Type) برای Store
type CartState = {
  cart: Product[]; // لیست محصولات در سبد
  addToCart: (product: Product) => void; // تابع برای افزودن محصول
  removeFromCart: (id: string) => void; // تابع برای حذف محصول
  clearCart: () => void; // تابع برای خالی کردن سبد
  totalAmount: () => number; // تابع برای محاسبه قیمت کل
};

const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  // افزودن محصول به سبد
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        // اگر محصول قبلاً اضافه شده بود، تعداد را افزایش بده
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        };
      }
      // در غیر این صورت، محصول جدید را اضافه کن
      return { cart: [...state.cart, product] };
    }),

  // حذف محصول از سبد
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // خالی کردن سبد خرید
  clearCart: () => set({ cart: [] }),

  // محاسبه قیمت کل
  totalAmount: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));

export default useCartStore;
