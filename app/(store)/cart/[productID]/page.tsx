"use client";

import { fetchProductById } from "@/api/product.service";
import LoginForm from "@/components/loginForm";
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

const ProductPage: React.FC = () => {
  const { productID } = useParams();
  if (productID == undefined) return;

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductById(productID as string),
  });

  const price = "۲۹۳۰۰۰۰۰";

  return (
    <article dir="rtl" className="flex gap-6 justify-center py-32 px-14">
      <div className="w-[70%] flex flex-col gap-8">
        <section className=" h-80 flex gap-3 rounded-2xl border border-gray-300 bg-white/50 shadow-sm py-7 px-9">
          <div className="flex-grow h-full  flex flex-col gap-4">
            <p className="text-gray-950 text-lg font-semibold">
              {data?.data.product.name}
            </p>
            <p className="text-sm text-gray-700">
              {data?.data.product.description}
            </p>
            <span className="w-fit flex flex-col text-sm font-semibold gap-2 border-t border-gray-300 pl-5 pt-3">
              <span className="flex gap-2 ">
                <BuildingStorefrontIcon className="w-5 text-gray-700" />
                <span className="text-sm text-slate-700">تکنوسرویس</span>
              </span>
              <span className="flex gap-2">
                <InboxStackIcon className="w-5 text-gray-700" />
                <span className="text-sm text-slate-700">
                  موجود در انبار تکنوسرویس ( ارسال فوری )
                </span>
              </span>
              <div className="flex gap-2 items-center py-2 text-blue-600">
                <CheckBadgeIcon className="w-5" />
                <span className="text-xs ">18 ماه گارانتی شرکتی</span>
              </div>
            </span>
            <div className="flex items-center gap-4">
              <PlusIcon className="text-gray-900 w-5" />
              <span>0</span>
              <TrashIcon className="text-red-700 w-5" />
            </div>
          </div>
          <div className="flex flex-col justify-between w-[40%]">
            <img
              src={`http://localhost:8000/images/products/images/${data?.data.product.images[0]}`}
              alt={data?.data.product.name}
              className=" h-48"
            />
            <span className="text-left font-semibold">
              {data?.data.product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </span>
          </div>
        </section>
      </div>
      <section className="flex flex-col gap-6 w-[380px] ">
        <aside className="w-full flex flex-col gap-5 border bg-white border-gray-300 shadow-xl rounded-2xl px-5 py-4">
          <div className="w-full flex flex-col text-sm gap-3 text-gray-900 px-2 py-2">
            <div className="flex justify-between">
              <span>قیمت محصولات:</span>
              <span>
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
              </span>
            </div>
            <div className="flex justify-between">
              <span>تعداد محصولات:</span>
              <span>۳ عدد</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>جمع کل:</span>
              <span>
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
              </span>
            </div>
          </div>
          <button className="w-full h-14 bg-[#202A30] text-white rounded-lg">
            ادامه خرید
          </button>
        </aside>
      </section>
    </article>
  );
};

export default ProductPage;
