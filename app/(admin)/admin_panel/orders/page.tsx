// "use client";

// import { fetchOrdersList } from "@/api/orders.service";
// import ButtonGroups from "@/components/(adminPanel)/button_groups";
// import { useQuery } from "@tanstack/react-query";

// function Orders() {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () => fetchOrdersList(),
//   });

//   return (
//     <div className="w-2/3 bg-slate-600 h-96  xl:mr-96 mx-auto rounded-3xl relative">
//       <div className="inline-flex rounded-md shadow-sm absolute -top-11 left-0">
//         <a
//           href="#"
//           aria-current="page"
//           className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//         >
//           همه
//         </a>
//         <a
//           href="#"
//           className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//         >
//           در انتظار ارسال
//         </a>
//         <a
//           href="#"
//           className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//         >
//           تحویل شده
//         </a>
//       </div>
//       <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
//         مدیریت سفارش ها
//       </span>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   نام کاربر
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   مجموع مبلغ
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   زمان سفارش
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   جزيیات
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.data.orders.map((el) => (
//                 <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     {el.user}
//                   </th>
//                   <td className="px-6 py-4">{el.totalPrice}</td>
//                   <td className="px-6 py-4">{el.deliveryDate}</td>
//                   <td className="px-6 py-4">
//                     <a
//                       href="#"
//                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                     >
//                       بررسی سفارش
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Orders;





"use client";

import { fetchOrdersList } from "@/api/orders.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Orders() {
  const [filter, setFilter] = useState("all");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrdersList(),
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطایی رخ داده است!</p>;

  // فیلتر کردن داده‌ها
  const filteredOrders =
    filter === "all"
      ? data?.data.orders
      : data?.data.orders.filter(
          (order) =>
            (filter === "pending" && !order.deliveryStatus) ||
            (filter === "delivered" && order.deliveryStatus)
        );

  return (
    <div className="w-2/3 bg-slate-600 h-96 xl:mr-96 mx-auto rounded-3xl relative">
      <div className="inline-flex rounded-md shadow-sm absolute -top-11 left-0">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm font-medium ${
            filter === "all"
              ? "ring-2 dark:ring-blue-500 z-10"
              : "text-gray-900 bg-gray-100"
          } border border-gray-200 rounded-s-lg hover:bg-gray-100 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 `}
        >
          همه
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 text-sm font-medium ${
            filter === "pending"
              ? "ring-2 dark:ring-blue-500 z-10"
              : "text-gray-900 bg-gray-100"
          } border border-gray-200 hover:bg-gray-100 focus:z-10 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
        >
          در انتظار ارسال
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 text-sm font-medium ${
            filter === "delivered"
              ? "ring-2 dark:ring-blue-500 z-10"
              : "text-gray-900 bg-gray-100"
          } border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
        >
          تحویل شده
        </button>
      </div>
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11">
        مدیریت سفارش ها
      </span>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام کاربر
              </th>
              <th scope="col" className="px-6 py-3">
                مجموع مبلغ
              </th>
              <th scope="col" className="px-6 py-3">
                زمان سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                جزییات
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((el, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {el.user}
                </th>
                <td className="px-6 py-4">{el.totalPrice}</td>
                <td className="px-6 py-4">{el.deliveryDate}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    بررسی سفارش
                  </a>
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
