// "use client";

// import { fetchProductsList } from "@/api/product.service";
// import { fetchUserByIdList, fetchUsersList } from "@/api/users.service";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";

// function PriceManage() {
//   const [page, setPage] = useState(1);
//   const limit = 6;

//   const response = useQuery({
//     queryKey: ["products", page],
//     queryFn: () => fetchProductsList({ page, limit }),
//   });

//   const totalPages = response.data?.total_pages || 1;

//   const generatePagination = (current: number, total: number) => {
//     const pages: number[] = [];
//     if (current > 1) pages.push(current - 1);
//     pages.push(current);
//     if (current < total) pages.push(current + 1);
//     return pages;
//   };

//   const pagination = generatePagination(page, totalPages);

//   return (
//     <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
//       <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
//         مدیریت موجودی و قیمت ها
//       </span>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-b-xl">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   کالا
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   قیمت
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   موجودی
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {response.data?.data.products.map((el) => (
//                 <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     {el.name}
//                   </th>
//                   <td className="px-6 py-4">{el.price}</td>
//                   <td className="px-6 py-4">{el.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="text-sm flex justify-center mt-4 gap-2 absolute -bottom-16 left-1/2 -translate-x-1/2 mobile:-bottom-20">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//               className={`px-4 py-2 rounded-lg ${
//                 page === 1
//                   ? "text-gray-500 cursor-not-allowed"
//                   : "text-gray-900"
//               }`}
//             >
//               قبلی
//             </button>
//             {pagination.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setPage(item)}
//                 className={`w-9 h-9 rounded-lg ${
//                   page === item
//                     ? "bg-gray-800 text-white"
//                     : "border border-gray-800 hover:bg-gray-400"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}

//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//               className={`px-4 py-2 rounded-lg ${
//                 page === totalPages
//                   ? "text-gray-500 cursor-not-allowed"
//                   : "text-gray-800"
//               }`}
//             >
//               بعدی
//             </button>
//           </div>
//     </div>
//   );
// }
// export default PriceManage;

"use client";

import { fetchProductsList, EditProducts } from "@/api/product.service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  quantity: number;
  images?: File[];
  subcategory: string;
  category: string;
  price: number;
}

const PriceManage = () => {
  const [page, setPage] = useState(1);
  const [editedProducts, setEditedProducts] = useState<Record<number, Partial<Product>>>({});
  const limit = 6;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductsList({ page, limit }),
  });

  const mutation = useMutation({
    mutationFn: async (updates: [number, Partial<Product>][]) => {
      const requests = updates.map(([id, changes]) =>
        EditProducts(id.toString(), {
          ...changes,
          name: changes.name || "",
          brand: changes.brand || "",
          description: changes.description || "",
          quantity: changes.quantity || 0,
          images: changes.images || [],
          subcategory: changes.subcategory || "",
          category: changes.category || "",
          price: changes.price || 0,
        } as Product)
      );
      return Promise.all(requests);
    },
    onSuccess: () => {
      refetch();
      setEditedProducts({});
    },
  });

  const handleEdit = (id: number, field: keyof Product, value: string | number | File[]) => {
    setEditedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    const updates: [number, Partial<Product>][] = Object.entries(editedProducts).map(
      ([id, changes]) => [Number(id), changes as Partial<Product>]
    );
    mutation.mutate(updates);
  };

  const generatePagination = (current: number, total: number) => {
    const pages: number[] = [];
    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < total) pages.push(current + 1);
    return pages;
  };

  const totalPages = data?.total_pages || 1;
  const pagination = generatePagination(page, totalPages);

  return (
    <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت موجودی و قیمت ها
      </span>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">کالا</th>
              <th scope="col" className="px-6 py-3">قیمت</th>
              <th scope="col" className="px-6 py-3">موجودی</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">در حال بارگذاری...</td>
              </tr>
            ) : (
              data?.data.products.map((el) => (
                <tr key={el._id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {el.name}
                  </th>
                  <td className="px-6 py-4">
                    {editedProducts[Number(el._id)]?.price !== undefined ? (
                      <input
                        type="number"
                        value={editedProducts[Number(el._id)]?.price || ""}
                        onChange={(e) => handleEdit(Number(el._id), "price", Number(e.target.value))}
                      />
                    ) : (
                      el.price
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editedProducts[Number(el._id)]?.quantity !== undefined ? (
                      <input
                        type="number"
                        value={editedProducts[Number(el._id)]?.quantity || ""}
                        onChange={(e) => handleEdit(Number(el._id), "quantity", Number(e.target.value))}
                      />
                    ) : (
                      el.quantity
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm flex justify-center mt-4 gap-2 absolute -bottom-16 left-1/2 -translate-x-1/2 mobile:-bottom-20">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg ${page === 1 ? "text-gray-500 cursor-not-allowed" : "text-gray-900"}`}
        >
          قبلی
        </button>
        {pagination.map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={`w-9 h-9 rounded-lg ${page === item ? "bg-gray-800 text-white" : "border border-gray-800 hover:bg-gray-400"}`}
          >
            {item}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg ${page === totalPages ? "text-gray-500 cursor-not-allowed" : "text-gray-800"}`}
        >
          بعدی
        </button>
      </div>

      <button
        onClick={handleSave}
        disabled={Object.keys(editedProducts).length === 0}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
      >
        ذخیره تغییرات
      </button>
    </div>
  );
};

export default PriceManage;
