"use client";

import { fetchProductById } from "@/api/product.service";
import LoginForm from "@/components/loginForm";
import useCartStore, { Product } from "@/lib/zustand/cart.store";
import {
  ShieldCheckIcon,
  ChevronLeftIcon,
  PlusIcon,
  BuildingStorefrontIcon,
  InboxStackIcon,
  Cog6ToothIcon,
  CheckBadgeIcon,
  HeartIcon,
  BellAlertIcon,
  ScaleIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUserStore from "@/lib/zustand/users.store";

const customerSchema = z.object({
  firstName: z.string().min(3, "نام الزامی است."),
  lastName: z.string().min(3, "نام خانوادگی الزامی است."),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره همراه باید با فرمت صحیح باشد."),
  address: z.string().min(3, "آدرس الزامی است."),
  deliveryDate: z.date({ required_error: "تاریخ تحویل الزامی است." }),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const UserInfo: React.FC = () => {
  const {
    cart,
    decreaseQuantity,
    clearCart,
    totalAmount,
    addToCart,
    totalProducts,
  } = useCartStore();

  const { users } = useUserStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = (data: CustomerFormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir="rtl"
      className="flex gap-6 justify-center py-32 px-14"
    >
      <div className="relative w-[60%] flex flex-col gap-8">
        <span className="absolute -top-8 right-1 text-lg font-semibold text-gray-800">
          صفحه پرداخت
        </span>

        <section className="h-96 w-full bg-white border border-gray-300 rounded-xl shadow flex flex-col gap-4 justify-center items-center">
          {" "}
          <button className="w-48 h-14 bg-green-500 text-white rounded-lg">
            پرداخت
          </button>
          <button className="w-48 h-14 bg-red-500 text-white rounded-lg">
            انصراف
          </button>
        </section>
      </div>
    </form>
  );
};

export default UserInfo;
