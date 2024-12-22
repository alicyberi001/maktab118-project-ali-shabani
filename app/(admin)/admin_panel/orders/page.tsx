// "use client";

// import { fetchOrdersList } from "@/api/orders.service";
// import { useQuery } from "@tanstack/react-query";
// import { toJalaali } from 'jalaali-js';
// import { useState } from "react";

// function Orders() {
//   const [filter, setFilter] = useState("all");
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () => fetchOrdersList(),
//   });

//   const formattedDate = (date: string): string => {
//     const gregorianDate: any = new Date(date);
//     const jalaaliDate: any = toJalaali(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate());
//     return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
//     };

//   if (isLoading) return;
//   if (isError) return;

//   const filteredOrders =
//     filter === "all"
//       ? data?.data.orders
//       : data?.data.orders.filter(
//           (order) =>
//             (filter === "pending" && !order.deliveryStatus) ||
//             (filter === "delivered" && order.deliveryStatus)
//         );

//   return (
//     <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
//       <div className="inline-flex rounded-md shadow-sm absolute -top-11 left-0 mobile:-top-14">
//         <button
//           onClick={() => setFilter("all")}
//           className={`px-4 py-2 text-sm font-medium ${
//             filter === "all"
//               ? "ring-2 dark:ring-blue-500 z-10"
//               : "text-gray-900 bg-gray-100"
//           } border border-gray-200 rounded-s-lg hover:bg-gray-100 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 `}
//         >
//           همه
//         </button>
//         <button
//           onClick={() => setFilter("pending")}
//           className={`px-4 py-2 text-sm font-medium ${
//             filter === "pending"
//               ? "ring-2 dark:ring-blue-500 z-10"
//               : "text-gray-900 bg-gray-100"
//           } border border-gray-200 hover:bg-gray-100 focus:z-10 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
//         >
//           در انتظار ارسال
//         </button>
//         <button
//           onClick={() => setFilter("delivered")}
//           className={`px-4 py-2 text-sm font-medium ${
//             filter === "delivered"
//               ? "ring-2 dark:ring-blue-500 z-10"
//               : "text-gray-900 bg-gray-100"
//           } border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 dark:bg-[#202A30] dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
//         >
//           تحویل شده
//         </button>
//       </div>
//       <span className="text-[#202A30] text-2xl font-semibold absolute -top-11 mobile:-top-24">
//         مدیریت سفارش ها
//       </span>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-b-xl">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 نام کاربر
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 مجموع مبلغ
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 زمان سفارش
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 جزییات
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((el, index) => (
//               <tr
//                 key={index}
//                 className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
//               >
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   {el.user}
//                 </th>
//                 <td className="px-6 py-4">{el.totalPrice}</td>
//                 <td className="px-6 py-4">{formattedDate(el.deliveryDate)}</td>
//                 <td className="px-6 py-4">
//                   <a
//                     href="#"
//                     className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     بررسی سفارش
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Orders;

"use client";

import { fetchUserByIdList, fetchUsersList } from "@/api/users.service";
import { fetchOrdersList } from "@/api/orders.service";
import { useQuery } from "@tanstack/react-query";
import { toJalaali } from "jalaali-js";
import { useEffect, useState } from "react";
import useUserStore from "@/lib/zustand/users.store";
import { Router } from "next/router";
import { redirect, useRouter } from "next/navigation";

const Orders: React.FC = () => {
  const router = useRouter();
  const { users } = useUserStore();
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (users.every((el) => el.role === "ADMIN") || users.length == 0) {
      redirect("/");
    }
  }, []);

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrdersList,
  });

  const userIds = ordersData?.data.orders.map((order) => order.user) || [];

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users", userIds],
    queryFn: async () => {
      const userPromises = userIds.map((id) => fetchUserByIdList(id));
      console.log(userPromises);
      const users = await Promise.all(userPromises);
      // console.log(users)
      return users;
    },
    enabled: userIds.length > 0,
  });

  const formattedDate = (date: string): string => {
    const gregorianDate = new Date(date);
    const jalaaliDate = toJalaali(
      gregorianDate.getFullYear(),
      gregorianDate.getMonth() + 1,
      gregorianDate.getDate()
    );
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  };

  if (ordersLoading || usersLoading) return <p>Loading...</p>;
  if (ordersError) return <p>Error loading orders</p>;

  const filteredOrders =
    filter === "all"
      ? ordersData?.data.orders
      : ordersData?.data.orders.filter(
          (order) =>
            (filter === "pending" && !order.deliveryStatus) ||
            (filter === "delivered" && order.deliveryStatus)
        );

  return (
    <div className="w-2/3 bg-slate-600 h-96 mr-96 rounded-3xl relative mobile:mx-auto mobile:mt-36">
      <div className="inline-flex rounded-md shadow-sm absolute -top-11 left-0 mobile:-top-14">
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
      <span className="text-[#202A30] text-2xl font-semibold absolute -top-11 mobile:-top-24">
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
                  {usersData?.find((us) => us.data.user._id === el.user)?.data
                    .user.lastname || "نامشخص"}
                </th>
                <td className="px-6 py-4">{el.totalPrice}</td>
                <td className="px-6 py-4">{formattedDate(el.deliveryDate)}</td>
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
};

export default Orders;
