"use client";

import { CubeIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
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
}) => {
    const test = "12000000"
  return (
    <div
      dir="rtl"
      className="max-w-xs h-[395px] flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition-shadow duration-200 px-4 py-3"
    >
      <img src={image} alt={title} />
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mt-2">{title}</h2>
        <p className="text-sm text-gray-600 truncate mt-1">{description}</p>
        <div className="flex gap-1 items-center text-sky-600 mt-4 text-sm" >
          <CubeIcon className="size-5"/>
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
    </div>
  );
};

export default ProductCard;
