"use client";

import { fetchProductsList, fetchSubcategories } from "@/api/product.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/productCard";
import { useParams } from "next/navigation";
import FilterComponent from "@/containers/collapse";

function AllProductPage() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const limit = 16;
  const { categoryID } = useParams();

  if (categoryID == undefined) return;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, sort],
    queryFn: () =>
      fetchProductsList({
        page,
        limit,
        categoryID: categoryID as string,
        sort,
      }),
  });

  const categoriesData = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchSubcategories(),
  });

  const subcategoriesArray = categoriesData.data?.data.subcategories.filter( (el) => el.category == categoryID )
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const totalPages = data?.total_pages || 1;

  const generatePagination = (current: number, total: number) => {
    const pages: number[] = [];
    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < total) pages.push(current + 1);
    return pages;
  };

  const pagination = generatePagination(page, totalPages);

  return (
    <div dir="rtl" className="flex gap-10 pt-24 px-8">
      <aside className="w-64 h-auto bg-cyan-500 rounded-xl p-4">
        <h3 className="text-lg font-bold mb-4">فیلترها</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSort("price")}
            className={`px-4 py-2 rounded-lg ${
              sort === "price" ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            قیمت صعودی
          </button>
          <button
            onClick={() => setSort("-price")}
            className={`px-4 py-2 rounded-lg ${
              sort === "-price" ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            قیمت نزولی
          </button>
        </div>
        <FilterComponent subcategoriesArray = {subcategoriesArray || []}/>
      </aside>
      <div className="flex flex-col items-center">
        <div className="w-full grid grid-cols-4 gap-4">
          {data?.data.products.map((product, index) => (
            <ProductCard
              key={index}
              image={`http://localhost:8000/images/products/images/${product.images[0]}`}
              title={product.name}
              description={product.description}
              id={product._id}
              price={product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            />
          ))}
        </div>
        <div className="text-sm flex justify-center mt-4 mb-14 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg ${
              page === 1 ? "text-gray-500 cursor-not-allowed" : "text-gray-900"
            }`}
          >
            قبلی
          </button>
          {pagination.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`w-9 h-9 rounded-lg ${
                page === item
                  ? "bg-gray-800 text-white"
                  : "border border-gray-800 hover:bg-gray-400"
              }`}
            >
              {item}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-800"
            }`}
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllProductPage;
