/* eslint-disable @next/next/no-img-element */
"use client";

import {
  deleteProductById,
  fetchProductsList,
} from "@/api/product.service";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { EditModal } from "@/components/editProduct.modal";
import FormModal from "@/components/edit.modal";
import CreateModalForm from "@/components/createProduct.modal";
import { redirect } from "next/navigation";
import useUserStore from "@/lib/zustand/users.store";

function ProductPage() {
  const [page, setPage] = useState(1);
  // const [editModalOpen, seteditModalOpen] = useState(false);
  const limit = 6;
  const { users } = useUserStore();

  useEffect(() => {
    if (users.every((el) => el.role === "USER") || users.length == 0) {
      redirect("/");
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //   if (users.every((el) => el.role === "USER") || users.length === 0) {
  //   redirect("/");
  //   }
  //   }
  //   }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductsList({ page, limit }),
  });

  
  if (isLoading) return;
  if (isError) return;

  const totalPages = data?.total_pages || 1;

  const generatePagination = (current: number, total: number) => {
    const pages: number[] = [];
    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < total) pages.push(current + 1);
    return pages;
  };

  const pagination = generatePagination(page, totalPages);

  async function handleDeleteProduct(id: string) {
    try {
      await deleteProductById(id);
      toast.success("کاربر با موفقیت حذف شد");
    } catch (error) {
      toast.error("درخواست انجام نشد!");
    }
  }

  return (
    <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
      <CreateModalForm />
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت کالاها
      </span>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-b-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                تصویر
              </th>
              <th scope="col" className="px-6 py-3 w-44">
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
            {data?.data.products.map((el) => (
              <tr
                key={el._id}
                className=" odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  <img
                    className="w-12 rounded-lg aspect-square"
                    src={`http://localhost:8000/images/products/images/${el.images[0]}`}
                    alt={el.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-20 truncate">{el.name}</td>
                <td className="px-6 py-4">{el.subcategory}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDeleteProduct(el._id)}
                      className="text-sm text-red-600 border border-red-600 rounded-lg px-2 py-1 hover:bg-red-600 hover:text-gray-900"
                    >
                      حذف
                    </button>
                    <FormModal {...el} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm flex justify-center mt-4 gap-2 absolute z-10 -bottom-48 left-1/2 -translate-x-1/2 mobile:-bottom-20">
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
  );
}

export default ProductPage;
