"use client";

import { client } from "@/api/client";
import { fetchProductsList } from "@/api/product.service";
import { urls } from "@/api/urls";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IEditProductData {
  quantity?: string;
  price?: string;
}

const editProducts = async (
  updates: { id: string; data: IEditProductData }[]
) => {
  try {
    const requests = updates.map(({ id, data }) => {
      const formData = new FormData();
      if (data.price) formData.append("price", data.price);
      if (data.quantity) formData.append("quantity", data.quantity);
      return client.patch(urls.product.edit(id), formData);
    });
    await Promise.all(requests);
  } catch (error) {
    throw error;
  }
};

function PriceManage() {
  const queryClient = useQueryClient(); // برای مدیریت کش کوئری‌ها
  const [editableCells, setEditableCells] = useState<{
    [id: string]: IEditProductData;
  }>({});
  const [page, setPage] = useState(1);
  const limit = 6;

  const response = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductsList({ page, limit }),
  });

  const totalPages = response.data?.total_pages || 1;

  const handleInputChange = (
    id: string,
    field: keyof IEditProductData,
    value: string
  ) => {
    setEditableCells((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleCellClick = (
    id: string,
    field: keyof IEditProductData,
    initialValue: string
  ) => {
    setEditableCells((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: prev[id]?.[field] || initialValue, // مقدار اولیه فقط یک بار تنظیم می‌شود
      },
    }));
  };

  const handleSaveChanges = async () => {
    const updates = Object.entries(editableCells).map(([id, data]) => ({
      id,
      data,
    }));
    await editProducts(updates);
    setEditableCells({});
    // بازخوانی کوئری‌ها
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const generatePagination = (current: number, total: number) => {
    const pages: number[] = [];
    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < total) pages.push(current + 1);
    return pages;
  };

  const pagination = generatePagination(page, totalPages);

  return (
    <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت موجودی و قیمت ها
      </span>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-b-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  کالا
                </th>
                <th scope="col" className="px-6 py-3">
                  قیمت
                </th>
                <th scope="col" className="px-6 py-3">
                  موجودی
                </th>
              </tr>
            </thead>
            <tbody>
              {response.data?.data.products.map((el) => (
                <tr
                  key={el._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.name}
                  </th>
                  <td className="px-6 py-4">
                    {editableCells[el._id]?.price !== undefined ? (
                      <input
                        type="number"
                        value={editableCells[el._id]?.price || ""}
                        onChange={(e) =>
                          handleInputChange(el._id, "price", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 px-2 py-1"
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleCellClick(el._id, "price", el.price.toString())
                        }
                        className="cursor-pointer"
                      >
                        {el.price}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editableCells[el._id]?.quantity !== undefined ? (
                      <input
                        type="number"
                        value={editableCells[el._id]?.quantity || ""}
                        onChange={(e) =>
                          handleInputChange(el._id, "quantity", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 px-2 py-1"
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleCellClick(
                            el._id,
                            "quantity",
                            el.quantity.toString()
                          )
                        }
                        className="cursor-pointer"
                      >
                        {el.quantity}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm flex justify-center mt-4 gap-2 absolute -bottom-16 left-1/2 -translate-x-1/2 mobile:-bottom-20">
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

      <button
        onClick={handleSaveChanges}
        disabled={Object.keys(editableCells).length === 0}
        className={`px-4 py-2 text-sm rounded-lg absolute -top-12 left-0  
    ${
      Object.keys(editableCells).length === 0
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-green-600 text-white hover:bg-green-700"
    }`}
      >
        ذخیره تغییرات
      </button>
    </div>
  );
}

export default PriceManage;
