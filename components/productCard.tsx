/* eslint-disable @next/next/no-img-element */
"use client";

import { CubeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ProductCardProps {
  id?: string;
  image: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  description,
  id,
}) => {
  const test = "12000000";
  return (
    <Link
      href={`/product/${id}`}
      dir="rtl"
      className="min-w-[240px] max-w-[240px] flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition-shadow "
    >
      <img src={image} alt={title} className="size-36 mx-auto mt-3" />
      <div className="p-4 flex flex-col">
        <h2 className="text-base font-bold text-gray-800 mt-2 w-full truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-600 truncate mt-1">{description}</p>
        <div className="flex gap-1 items-center text-sky-600 mt-4 text-sm">
          <CubeIcon className="size-5" />
          <span>موجود در انبار</span>
        </div>
        <div dir="ltr" className="flex flex-col mt-3">
          <span className="flex gap-1 text-xl font-semibold text-gray-900">
            <p>تومان</p>
            <p>{price}</p>
          </span>
          <del className="flex gap-1 text-gray-400">
            <p>تومان</p>
            {test.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </del>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
