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

import { fetchProductsList } from "@/api/product.service";
import { EditProducts2 } from "@/api/product.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function PriceManage() {
  const [page, setPage] = useState(1);
  const [editableRows, setEditableRows] = useState({}); // Track editable rows
  const [editedData, setEditedData] = useState({}); // Track edited values

  const limit = 6;

  const response = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductsList({ page, limit }),
  });

  const totalPages = response.data?.total_pages || 1;

  const generatePagination = (current: number, total: number) => {
    const pages = [];
    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < total) pages.push(current + 1);
    return pages;
  };

  const pagination = generatePagination(page, totalPages);

  const handleEditToggle = (id) => {
    setEditableRows((prev) => ({ ...prev, [id]: !prev[Number(id)] }));
    if (!editableRows[Number(id)]) {
      setEditedData((prev) => ({
        ...prev,
        [Number(id)]: {
          quantity: response.data?.data.products.find((p) => Number(p._id) === Number(id))?.quantity,
          price: response.data?.data.products.find((p) => Number(p._id) === Number(id))?.price,
        },
      }));
    }
  };

  const handleInputChange = (Number(id), field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [Number(id)]: { ...prev[Number(id)], [field]: value },
    }));
  };

  const handleSave = async (Number(id)) => {
    try {
      await EditProducts2(Number(id), {
        quantity: editedData[Number(id)].quantity,
        price: editedData[Number(id)].price,
      });
      setEditableRows((prev) => ({ ...prev, [Number(id)]: false }));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSaveAll = async () => {
    try {
      const promises = Object.keys(editedData).map((Number(id)) =>
        EditProducts2(Number(id), {
          quantity: editedData[Number(id)].quantity,
          price: editedData[Number(id)].price,
        })
      );
      await Promise.all(promises);
      setEditableRows({});
      setEditedData({});
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  return (
    <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت موجودی و قیمت ها
      </span>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              <th scope="col" className="px-6 py-3">
                عملیات
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
                  {editableRows[Number(el._id)] ? (
                    <input
                      type="text"
                      value={editedData[Number(el._id)]?.price || ""}
                      onChange={(e) =>
                        handleInputChange(el._id, "price", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    el.price
                  )}
                </td>
                <td className="px-6 py-4">
                  {editableRows[Number(el._id)] ? (
                    <input
                      type="text"
                      value={editedData[Number(el._id)]?.quantity || ""}
                      onChange={(e) =>
                        handleInputChange(el._id, "quantity", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    el.quantity
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      editableRows[Number(el._id)] ? handleSave(el._id) : handleEditToggle(el._id)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {editableRows[Number(el._id)] ? "ذخیره" : "ویرایش"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        onClick={handleSaveAll}
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        ذخیره همه
      </button>
    </div>
  );
}

export default PriceManage;
