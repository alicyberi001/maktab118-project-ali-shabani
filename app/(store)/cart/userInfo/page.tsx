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

  const {users} = useUserStore()

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
          تکمیل اطلاعات
        </span>

        <section className="h-96 w-full bg-white border border-gray-300 rounded-xl shadow flex flex-col gap-4 justify-center items-center">
          <div className="w-full flex gap-10 justify-center">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
                نام
              </label>
              <input
              defaultValue={users[0].firstname}
                type="text"
                id="firstName"
                {...register("firstName")}
                className="mt-1 block w-80 border border-gray-300 shadow rounded-xl h-12 px-3 py-2 focus:outline-none focus:ring-0 focus:border-sky-500 transition-colors delay-150 duration-300 ease-in-out"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
                نام خانوادگی
              </label>
              <input
              defaultValue={users[0].lastname}
                type="text"
                id="lastName"
                {...register("lastName")}
                className="mt-1 block w-80 border border-gray-300 shadow rounded-xl h-12 px-3 py-2 focus:outline-none focus:ring-0 focus:border-sky-500 transition-colors delay-150 duration-300 ease-in-out"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex gap-10 justify-center">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-800"
              >
                شماره همراه
              </label>
              <input
              readOnly
              disabled
              defaultValue={users[0].phoneNumber}
                type="text"
                id="phoneNumber"
                {...register("phoneNumber")}
                className="mt-1 block w-80 border bg-slate-100 text-gray-500 border-gray-300 shadow rounded-xl h-12 px-3 py-2 focus:outline-none focus:ring-0 focus:border-sky-500 transition-colors delay-150 duration-300 ease-in-out"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="deliveryDate"
                className="block text-sm font-medium text-gray-800"
              >
                تاریخ تحویل
              </label>
              <Controller
                name="deliveryDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id="deliveryDate"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="mt-1 block w-80 border border-gray-300 shadow rounded-xl h-12 px-3 py-2 focus:outline-none focus:ring-0 focus:border-sky-500 transition-colors delay-150 duration-300 ease-in-out"
                    dateFormat="yyyy/MM/dd"
                    placeholderText="تاریخ را انتخاب کنید"
                  />
                )}
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deliveryDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-800">
              آدرس
            </label>
            <textarea
            defaultValue={users[0].address}
              id="address"
              {...register("address")}
              className="mt-1 block w-80 border border-gray-300 shadow rounded-xl  px-3 py-2 focus:outline-none focus:ring-0 focus:border-sky-500 transition-colors delay-150 duration-300 ease-in-out"
              rows={3}
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </section>
      </div>
      <section className="flex flex-col gap-6 w-[380px] ">
        <aside className="w-full flex flex-col gap-5 border bg-white border-gray-300 shadow-xl rounded-2xl px-5 py-4">
          <div className="w-full flex flex-col text-sm gap-3 text-gray-900 px-2 py-2">
            <div className="flex justify-between">
              <span>قیمت محصولات:</span>
              <span>
                {totalAmount()
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                تومان
              </span>
            </div>
            <div className="flex justify-between">
              <span>تعداد محصولات:</span>
              <span>{totalProducts()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>جمع کل:</span>
              <span>
                {totalAmount()
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                تومان
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full h-14 bg-[#202A30] text-white rounded-lg ${
              cart.length == 0 ? "bg-green-500" : "bg-green-500"
            }`}
          >
            پرداخت
          </button>
        </aside>
      </section>
    </form>
  );
};

export default UserInfo;
