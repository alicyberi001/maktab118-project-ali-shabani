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
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductPage: React.FC = () => {
  const { addToCart, cart, decreaseQuantity } = useCartStore();
  const { productID } = useParams();
  if (productID == undefined) return;

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductById(productID as string),
    enabled: !!productID, //
  });

  if (data === undefined) return;

  const productInCart = cart.find((item) => item._id === data.data.product._id);

  const handleAddToCart = () => {
    if (!productInCart) {
      const product: Product = {
        _id: data.data.product._id,
        name: data.data.product.name,
        price: data.data.product.price,
        quantity: 1,
        image: data.data.product.images,
        description: data.data.product.description,
      };
      addToCart(product);
    } else {
      redirect("/cart");
    }
  };

  return (
    <article dir="rtl" className="flex gap-6 justify-center py-32 px-14">
      <section className="w-[70%] flex gap-3 rounded-2xl border border-gray-300 bg-white/50 shadow-sm py-7 px-9">
        <div className="flex-grow h-full  flex flex-col gap-4">
          <p className="text-gray-950 text-lg font-semibold">
            {data?.data.product.name}
          </p>
          <p className="text-sm text-gray-700">
            {data?.data.product.description}
          </p>
          <span className="w-fit flex text-sm font-semibold gap-2 border-b border-gray-300 pl-5 py-4">
            <span className="text-zinc-900">نظرات کاربران</span>
            <span className="text-cyan-600">۰ نظر</span>
          </span>
          <span className="w-fit flex flex-col text-sm font-semibold gap-2 border-b border-gray-300 pl-5 pb-2">
            <span className="flex gap-1">
              <span className="text-zinc-500">رنگ:</span>
              <span className="text-zinc-800">مشکی</span>
            </span>
            <span className="text-cyan-600">۰ نظر</span>
          </span>
          <div className="text-zinc-950 flex flex-col gap-2">
            <span>ویژگی های اصلی</span>
            <div className="w-3/4 h-56 bg-white/80 border border-gray-400 rounded-2xl flex flex-col px-4 shadow-sm">
              <div className="w-full h-1/4 border-b border-dashed border-gray-400 flex items-center gap-2">
                <span className="text-gray-700">جنس بدنه:</span>
                <span>آلومینیوم</span>
              </div>
              <div className="w-full h-1/4 border-b border-dashed border-gray-400 flex items-center gap-2">
                <span className="text-gray-700">پردازنده:</span>
                <span>snapdragon zx-110</span>
              </div>
              <div className="w-full h-1/4 border-b border-dashed border-gray-400 flex items-center gap-2">
                <span className="text-gray-700">رم:</span>
                <span>16 گیگابایت</span>
              </div>
              <div className="w-full h-1/4  flex items-center gap-2">
                <span className="text-gray-700">مناسب برای:</span>
                <span>کاربری عمومی</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full flex flex-col items-center gap-7">
          <div className="flex justify-center gap-5 w-full">
            <span className="p-2 border shadow-md rounded-lg hover:cursor-pointer">
              <HeartIcon className="w-5" />
            </span>
            <span className="p-2 border shadow-md rounded-lg hover:cursor-pointer">
              <BellAlertIcon className="w-5" />
            </span>
            <span className="p-2 border shadow-md rounded-lg hover:cursor-pointer">
              <ScaleIcon className="w-5" />
            </span>
            <span className="p-2 border shadow-md rounded-lg hover:cursor-pointer">
              <ChatBubbleBottomCenterTextIcon className="w-5" />
            </span>
            <span className="p-2 border shadow-md rounded-lg hover:cursor-pointer">
              <ShareIcon className="w-5" />
            </span>
          </div>
          <img
            src={`http://localhost:8000/images/products/images/${data?.data.product.images[0]}`}
            alt={data?.data.product.name}
            className=""
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 w-[380px] ">
        <aside className="w-full flex flex-col gap-5 border bg-white border-gray-300 shadow-xl rounded-2xl px-5 py-4">
          <div className="w-full h-[100px] flex flex-col gap-1 text-gray-700 border border-gray-200 rounded-md shadow-md px-3 py-2">
            <div className=" w-full h-1/2 flex items-center justify-between">
              <span className="flex gap-2 items-center text-sm">
                <ShieldCheckIcon className="w-5" />
                <span>خرید بیمه برای کالا</span>
              </span>
              <span className="flex items-center text-xs">
                <span>نمایش جزییات</span>
                <ChevronLeftIcon className="w-4" />
              </span>
            </div>
            <div className="w-full h-1/2 flex items-center justify-between">
              <button className="flex gap-3 items-center w-fit h-[80%] border border-gray-700 text-gray-700 text-xs px-3 py-1  rounded-lg hover:bg-gray-700 hover:text-white">
                <span>بیمه می خواهم</span>
                <PlusIcon className="w-4" />
              </button>
              <span className="flex items-end gap-2">
                <del className="text-xs text-gray-500">560,000</del>
                <span className="text-sm text-blue-950">420,000 تومان</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full h-fit gap-1 bg-blue-50 text-gray-700 border border-gray-200 rounded-md px-4 py-3">
            <div className="flex flex-col gap-2 border-b-2 border-white pb-2">
              <span className="flex gap-2 ">
                <BuildingStorefrontIcon className="w-5" />
                <span className="text-sm text-slate-900">تکنوسرویس</span>
              </span>
              <span className="flex gap-2">
                <InboxStackIcon className="w-4 mr-0.5" />
                <span className="text-xs text-slate-700">
                  موجود در انبار تکنوسرویس ( ارسال فوری )
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 border-b-2 border-white py-2">
              <Cog6ToothIcon className="w-5" />
              <span className="text-xs text-slate-700">ارزیابی عملکرد:</span>
              <span className="text-xs text-slate-900">عالی</span>
            </div>
            <div className="flex gap-2 items-center py-2">
              <CheckBadgeIcon className="w-5" />
              <span className="text-xs text-slate-700">
                18 ماه گارانتی شرکتی
              </span>
            </div>
          </div>
          <div className="w-full h-20 rounded-lg flex flex-col gap-2 items-end">
            <div className="w-fit text-sm text-white px-4 py-1 bg-sky-500 rounded-full">
              800,000 تومان تخفیف خرید زودهنگام
            </div>
            <div className="text-gray-900 text-lg  font-semibold">
              {data?.data.product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={handleAddToCart}
              className={`h-14 rounded-lg transition-all duration-300 border-2 border-gray-800 font-semibold ${
                productInCart
                  ? "bg-white text-gray-900  w-2/3"
                  : "bg-gray-800 text-white w-full"
              }`}
            >
              {productInCart ? "مشاهده سبد خرید" : "افزودن به سبد خرید"}
            </button>
            {productInCart && (
              <button
                onClick={() => decreaseQuantity(data.data.product._id)}
                className={
                  "flex justify-center items-center size-14 rounded-lg transition-all duration-300 bg-white text-gray-900 font-semibold border-2 border-gray-800 "
                }
              >
                <TrashIcon className="size-6 text-gray-950" />
              </button>
            )}
          </div>
        </aside>
        <aside className="w-full h-44 flex flex-col bg-white border border-gray-300 shadow-xl text-slate-800 rounded-2xl px-4 py-3">
          <div className="flex justify-between px-4 py-3">
            <div className="flex flex-col gap-3">
              <span>ارسال امروز</span>
              <a className="flex items-center text-cyan-600">
                <span className="text-sm ">توضیحات بیشتر</span>
                <ChevronLeftIcon className="w-4" />
              </a>
            </div>
            <img src="/delivery_today.svg" alt="delivery" />
          </div>
          <div className="flex justify-between mt-auto items-center px-4 py-3 bg-blue-100 rounded-xl">
            <span className="">
              <span className="text-sm">تحویل حضوری رایگان</span>
            </span>
            <ChevronLeftIcon className="w-4" />
          </div>
        </aside>
      </section>
    </article>
  );
};

export default ProductPage;
