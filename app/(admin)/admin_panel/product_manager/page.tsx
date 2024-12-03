"use client";

import { fetchProductsList } from "@/api/product.service";
import { IProduct } from "@/types/product.api";
import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function Orders() {
  const response = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductsList({ page: 1, limit: 6 }),
  });

  return (
    <div className="w-2/3 bg-slate-600 h-96  xl:mr-96 mx-auto rounded-3xl relative">
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت کالاها
      </span>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
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
                دسته بندی
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {response.data?.data.products.map((el) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
    </div>
  );
}
export default Orders;
