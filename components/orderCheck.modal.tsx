"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrderByID } from "@/api/orders.service";
interface CheckOrderModalProps {
  orderID: string;
}

export const CheckOrderModal: React.FC<CheckOrderModalProps> = ({
  orderID,
}) => {
  console.log("Submitted Data: ", orderID);
  const { data } = useQuery({
    queryKey: ["ordere", orderID],
    queryFn: async () => await getOrderByID(orderID),
    enabled: !!orderID,
  });

  const onSubmit = () => {
    console.log("Submitted Data: ", orderID);
  };

  console.log(orderID);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          بررسی سفارش
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>بررسی سفارش</DialogTitle>
        </DialogHeader>
        <section className="max-w-xl p-4 bg-white rounded space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <span className="w-24">نام مشتری:</span>
              <span>{data?.data.order.user.username}</span>
            </div>
            <div className="flex gap-1">
              <span className="w-24">آدرس:</span>
              <span>{data?.data.order.user.address}</span>
            </div>
            <div className="flex gap-1">
              <span className="w-24">تلفن:</span>
              <span>{data?.data.order.user.phoneNumber}</span>
            </div>
            <div className="flex gap-1">
              <span className="w-24">زمان تحویل:</span>
              <span>{data?.data.order.deliveryDate}</span>
            </div>
            <div className="flex gap-1">
              <span className="w-24">زمان سفارش:</span>
              <span>{data?.data.order.user.createdAt}</span>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    کالا
                  </th>
                  <th scope="col" className="px-6 py-3">
                    مبلغ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تعداد
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.order.products?.map((el) => (
                  <tr
                    key={el._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{el?.product}</td>
                    <td className="px-6 py-4">{data.data.order.totalPrice}</td>
                    <td className="px-6 py-4">{el.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            ارسال
          </button>
        </section>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
