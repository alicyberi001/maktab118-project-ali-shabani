"use client";

import useCartStore from "@/lib/zustand/cart.store";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useUserStore from "@/lib/zustand/users.store";
import { createOrders } from "@/api/orders.service";
import toast from "react-hot-toast";

const UserInfo: React.FC = () => {
  const {
    cart,
    clearCart,
    fetchCart,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const { users } = useUserStore();

  const submitHandler = async () => {
    try {
      const productsArray = cart.map((el) => ({
        product: el._id,
        count: el.quantity,
      }));
      const body = {
        user: users[0]._id,
        products: productsArray,
        deliveryStatus: false,
      };
      console.log(body);

        await createOrders({
        user: body.user,
        products: body.products,
        deliveryStatus: body.deliveryStatus,
      });
      clearCart();
      toast.success("سفارش ثبت شد");
      setTimeout(() => {
        redirect("/")
      }, 3000);
    } catch (error) {
      toast.error("سفارش ثبت نشد");
    }
  };


  return (
    <div dir="rtl" className="flex gap-6 justify-center py-32 px-14">
      <div className="relative w-[60%] flex flex-col gap-8">
        <span className="absolute -top-8 right-1 text-lg font-semibold text-gray-800">
          صفحه پرداخت
        </span>

        <section className="h-96 w-full bg-white border border-gray-300 rounded-xl shadow flex flex-col gap-4 justify-center items-center">
          {" "}
          <button
            onClick={submitHandler}
            className="w-48 h-14 bg-green-500 text-white rounded-lg"
          >
            پرداخت
          </button>
          <button onClick={() => redirect("/payment/fail")} className="w-48 h-14 bg-red-500 text-white rounded-lg">
            انصراف
          </button>
        </section>
      </div>
    </div>
  );
};

export default UserInfo;
