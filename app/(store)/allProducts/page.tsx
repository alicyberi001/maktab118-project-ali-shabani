"use client";

import { deleteProductById, fetchProductsList } from "@/api/product.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EditModal } from "@/components/editProduct.modal";
import ProductCard from "@/components/productCard";

function AllProductPage() {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductsList({ page: 1, limit: 15 }),
  });

  if (isLoading) return;
  if (isError) return;

  // const totalPages = data?.total_pages || 1;

  // const generatePagination = (current: number, total: number) => {
  //   const pages: number[] = [];
  //   if (current > 1) pages.push(current - 1);
  //   pages.push(current);
  //   if (current < total) pages.push(current + 1);
  //   return pages;
  // };

  // const pagination = generatePagination(page, totalPages);

  const handleAddToCart = () => {
    alert("محصول به سبد خرید اضافه شد!");
  };

  return (
    <div dir="rtl" className="flex gap-10 pt-24 px-8">
      <aside className="w-80 h-96 bg-red-500 rounded-xl">sidebar</aside>
      <div className="w-full grid grid-cols-4 gap-4">
        {data?.data.products.map((product, index) => (
          <ProductCard
            key={index}
            image={`http://localhost:8000/images/products/images/${product.images[0]}`}
            title={product.name}
            price={product.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default AllProductPage;
