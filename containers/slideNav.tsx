"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { fetchProductsList } from "@/api/product.service";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import ProductCard2 from "@/components/productCard2";

const SlideNav = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetchProductsList({
        page: 1,
        limit: 10,
        categoryID: "674c96e9591fa0b7179b533a",
      }),
  });

  const navRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div dir="rtl" className="relative my-14 mx-8">
      <span className="absolute -top-10 text-xl font-semibold ">
        جدیدترین محصولات
      </span>
      <button
        onClick={scrollLeft}
        className="flex items-center justify-center absolute left-8 top-1/2 -translate-y-1/2 z-10 border bg-gray-100 text-gray-900 size-7 rounded-full shadow-lg hover:shadow"
      >
        <ArrowLeftIcon className="size-4" />
      </button>
      <nav
        ref={navRef}
        className="h-fit bg-gray-900 border border-gray-800  rounded-xl overflow-x-scroll scrollbar-hide flex flex-nowrap gap-3 px-3 py-5"
      >
        {data?.data.products.map((product, index) => (
          <ProductCard2
            key={product._id}
            image={`http://localhost:8000/images/products/images/${product.images[0]}`}
            title={product.name}
            price={product.price}
            description={product.description}
            id={product._id}
          />
        ))}
      </nav>
      <button
        onClick={scrollRight}
        className="flex items-center justify-center absolute right-8 top-1/2 -translate-y-1/2 z-5 border bg-gray-100 text-gray-900 size-7 rounded-full shadow-lg hover:shadow"
      >
        <ArrowRightIcon className="size-4" />
      </button>
    </div>
  );
};

export default SlideNav;
