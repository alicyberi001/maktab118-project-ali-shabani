"use client"

import { fetchProductsList } from "@/api/product.service";
import { fetchUserByIdList, fetchUsersList } from "@/api/users.service";
import { useQuery } from "@tanstack/react-query";


function PriceManage() {

  const response = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductsList({ page: 1, limit: 6 }),
  });


  const users = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserByIdList("67421b000ac89e34f1d7a9ce"),
  });


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
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.name}
                  </th>
                  <td className="px-6 py-4">{el.price}</td>
                  <td className="px-6 py-4">{el.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PriceManage;


// "use client";

// import { fetchProductsList, updateProduct } from "@/api/product.service";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useState } from "react";

// // Define product type
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface EditedData {
//   [key: string]: {
//     price?: number;
//     quantity?: number;
//   };
// }

// interface EditingState {
//   [key: string]: {
//     price?: boolean;
//     quantity?: boolean;
//   };
// }

// function PriceManage() {
//   const [editedData, setEditedData] = useState<EditedData>({});
//   const [isEditing, setIsEditing] = useState<EditingState>({});

//   const response = useQuery<{ data: { products: Product[] } }>({
//     queryKey: ["products"],
//     queryFn: () => fetchProductsList({ page: 1, limit: 6 }),
//   });

//   const mutation = useMutation((updates: Partial<Product>[]) => {
//     return Promise.all(updates.map((update) => updateProduct(update.id, update)));
//   });

//   const handleDoubleClick = (id: string, field: keyof Product) => {
//     setIsEditing((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: true },
//     }));
//   };

//   const handleChange = (id: string, field: keyof Product, value: string | number) => {
//     setEditedData((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: value },
//     }));
//   };

//   const handleBlur = (id: string, field: keyof Product) => {
//     setIsEditing((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: false },
//     }));
//   };

//   const handleSave = () => {
//     const updates = Object.entries(editedData).map(([id, data]) => ({
//       id,
//       ...data,
//     }));

//     mutation.mutate(updates, {
//       onSuccess: () => {
//         setEditedData({});
//         setIsEditing({});
//       },
//     });
//   };

//   return (
//     <div className="w-2/3 bg-slate-600 h-96 xl:mr-96 mx-auto rounded-3xl relative">
//       <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
//         مدیریت موجودی و قیمت‌ها
//       </span>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">کالا</th>
//               <th scope="col" className="px-6 py-3">قیمت</th>
//               <th scope="col" className="px-6 py-3">موجودی</th>
//             </tr>
//           </thead>
//           <tbody>
//             {response.data?.data.products.map((el) => (
//               <tr
//                 key={el.id}
//                 className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
//               >
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   {el.name}
//                 </th>
//                 <td
//                   className="px-6 py-4"
//                   onDoubleClick={() => handleDoubleClick(el.id, "price")}
//                 >
//                   {isEditing[el.id]?.price ? (
//                     <input
//                       type="number"
//                       value={editedData[el.id]?.price ?? el.price}
//                       onChange={(e) =>
//                         handleChange(el.id, "price", Number(e.target.value))
//                       }
//                       onBlur={() => handleBlur(el.id, "price")}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   ) : (
//                     el.price
//                   )}
//                 </td>
//                 <td
//                   className="px-6 py-4"
//                   onDoubleClick={() => handleDoubleClick(el.id, "quantity")}
//                 >
//                   {isEditing[el.id]?.quantity ? (
//                     <input
//                       type="number"
//                       value={editedData[el.id]?.quantity ?? el.quantity}
//                       onChange={(e) =>
//                         handleChange(el.id, "quantity", Number(e.target.value))
//                       }
//                       onBlur={() => handleBlur(el.id, "quantity")}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   ) : (
//                     el.quantity
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={handleSave}
//         disabled={mutation.isLoading}
//       >
//         ذخیره تغییرات
//       </button>
//     </div>
//   );
// }

// export default PriceManage;
