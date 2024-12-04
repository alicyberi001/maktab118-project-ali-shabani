"use client";

import { fetchProductsList } from "@/api/product.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function ProductPage() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductsList({ page, limit }),
  });

  if (isLoading) return;
  if (isError) return;

  const totalPages = data?.total_pages || 1;

  // تولید صفحات برای نمایش
  const generatePagination = (current: number, total: number) => {
    const pages: number[] = [];
    if (current > 1) pages.push(current - 1); // صفحه قبل
    pages.push(current); // صفحه فعلی
    if (current < total) pages.push(current + 1); // صفحه بعد
    return pages;
  };

  const pagination = generatePagination(page, totalPages);

  return (
    <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت کالاها
      </span>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                تصویر
              </th>
              <th scope="col" className="px-6 py-3">
                نام کالا
              </th>
              <th scope="col" className="px-6 py-3">
                دسته‌بندی
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.products.map((el, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-12 rounded-lg aspect-square"
                    src={`http://localhost:8000/images/products/images/${el.images[0]}`}
                    alt={el.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{el.name}</td>
                <td className="px-6 py-4">{el.subcategory}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="text-sm text-red-600 border border-red-600 rounded-lg px-2 py-1 hover:bg-red-600 hover:text-gray-900">
                      حذف
                    </button>
                    <button className="text-sm text-cyan-600 border border-cyan-600 rounded-lg px-2 py-1 hover:bg-cyan-600 hover:text-gray-900">
                      ویرایش
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* کامپوننت صفحه‌بندی */}
      <div className="text-sm flex justify-center mt-4 gap-2 absolute -bottom-11 left-1/2 -translate-x-1/2 mobile:-bottom-20">
        {/* دکمه قبلی */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg ${
            page === 1 ? "text-gray-500 cursor-not-allowed" : "text-gray-900"
          }`}
        >
          قبلی
        </button>

        {/* شماره صفحات */}
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

        {/* دکمه بعدی */}
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
  );
}

export default ProductPage;
