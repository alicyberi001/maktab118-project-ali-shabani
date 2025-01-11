"use client";

import React, { useState } from "react";


interface ProductCardProps {
  id?: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

const ProductCard2: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  description,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const offer = Math.ceil(price * 0.7);

  return (
    <a
      href={`/product/${id}`}
      dir="rtl"
      className="relative min-w-[240px] max-w-[240px] h-[360px] flex flex-col bg-neutral-400/20 border border-white rounded-3xl shadow hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute min-w-[240px] max-w-[240px] ${
          isHovered ? "h-[275px]" : "h-[360px]"
        } flex flex-col text-gray-900 bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-500 ease-in-out`}
      >
        <img src={image} alt={title} className="size-40 mx-auto mt-5" />
        <div className="p-4 flex flex-col">
          <h2 className="text-base font-bold text-gray-800 mt-2 w-full truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 truncate mt-1">{description}</p>
          <div dir="ltr" className={`flex flex-col mt-8 transition-colors duration-500 ${isHovered ? "text-white" : "text-gray-900"}`}>
            <span className="flex gap-1 text-xl font-semibold">
              <p>تومان</p>
              <p>{offer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </span>
            <del className="flex gap-1 text-gray-400">
              <p>تومان</p>
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </del>
          </div>
        </div>
      </div>
      <span
        className={`absolute bottom-9 right-3 flex justify-center items-center rounded-full size-9 text-sm transition-colors duration-500 ease-in-out ${
          isHovered ? "bg-white text-gray-900" : "bg-sky-500 text-white"
        }`}
      >
        %30
      </span>
    </a>
  );
};

export default ProductCard2;
