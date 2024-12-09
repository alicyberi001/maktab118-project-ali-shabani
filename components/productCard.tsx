"use client";

import Image from "next/image";

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
  return (
    <div
      dir="rtl"
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      <img src={image} alt={title} />

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 truncate">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-semibold text-gray-900">{price} تومان</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
