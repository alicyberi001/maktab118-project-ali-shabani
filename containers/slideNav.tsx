"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { fetchProductsByCategory } from "@/api/product.service";
import ProductCard from "@/components/productCard";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

const SlideNav = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetchProductsByCategory({
        page: 1,
        limit: 10,
        categoryID: "674c96e9591fa0b7179b533a",
      }),
  });

  // Reference to the navigation bar
  const navRef = useRef<HTMLDivElement>(null);

  // Function to handle horizontal scroll
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
    <div dir="rtl" className="relative my-8">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-600 px-2 py-1 rounded-lg shadow-md hover:shadow"
      >
        <ArrowLeftIcon className="size-4"/>
      </button>

      {/* Navigation bar */}
      <nav
        ref={navRef}
        className="h-fit mx-10 bg-slate-100 border border-gray-800  rounded-xl overflow-x-scroll scrollbar-hide flex flex-nowrap gap-3 px-3 py-5"
      >
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
      </nav>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-600 px-2 py-1 rounded-lg shadow-md hover:shadow"
      >
        <ArrowRightIcon className="size-4"/>
      </button>
    </div>
  );
};

export default SlideNav;
