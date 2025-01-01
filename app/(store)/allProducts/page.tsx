"use client";

import { fetchProductsList, fetchSubcategories } from "@/api/product.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/productCard";
import { useParams } from "next/navigation";
import FilterComponent from "@/containers/collapse";
import FilterComponent2 from "@/containers/collapse2";

function AllProductPage() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [selectedFilters, setSelectedFilters] = useState<{
    subcategory?: string;
    price?: string;
  }>({});

  const limit = 16;

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setSort(selectedFilters.price)
    console.log("Selected Filters:", {
      ...selectedFilters,
      [filterType]: value,
    });
  };


  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, sort, selectedFilters],
    queryFn: async() =>
      await fetchProductsList({
        page,
        limit,
        sort,
        subCategoryID: selectedFilters.subcategory || undefined,
      }),
  });

  const categoriesData = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchSubcategories(),
  });

  // const subcategoriesArray = categoriesData.data?.data.subcategories.filter(
  //   (el) => el.category == categoryID
  // );

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
      <aside className="w-64 h-96 border bg-white border-gray-300 shadow rounded-xl p-4 mt-48">
        <h3 className="text-lg font-bold mb-4">فیلترها</h3>
        <FilterComponent2
          subcategoriesArray={[]} 
          onFilterChange={handleFilterChange}
        />
      </aside>
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-5">
          <a href="/categories/674c96e9591fa0b7179b533a"><img className="w-64 h-44" src="/allposters/laptop.webp" alt="" /></a>
          <a href="/categories/674c96cd591fa0b7179b5331"><img className="w-64 h-44" src="/allposters/mobile.webp" alt="" /></a>
          <a href="/categories/674c96d8591fa0b7179b5335"><img className="w-64 h-44" src="/allposters/tablet.webp" alt="" /></a>
        </div>
        <div className="w-full grid grid-cols-4 gap-4">
          {data?.data.products.map((product) => (
            <ProductCard
              key={product._id}
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
