"use client";

import { IEditProductRes, IProduct, IProductById } from "@/types/product.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  productName: z.string().min(1, "نام کالا الزامی است"),
  productBrand: z.string().min(1, "برند کالا الزامی است"),
  productStock: z.number().min(0, "موجودی کالا نمی‌تواند منفی باشد"),
  productPrice: z.number().min(0, "قیمت کالا نمی‌تواند منفی باشد"),
  category: z.string().min(1, "کتگوری الزامی است"),
  subCategory: z.string().min(1, "ساب کتگوری الزامی است"),
  productImage: z.any().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function EditModal(data: IProduct) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Submitted Data: ", data);
    // Call your API function here
  };

  console.log(data.name);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ویرایش</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4"
        >
          <div>
            <label className="block text-gray-700">نام کالا</label>
            <input
              type="text"
              {...register("productName")}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">برند کالا</label>
            <input
              type="text"
              {...register("productBrand")}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.productBrand && (
              <p className="text-red-500 text-sm">
                {errors.productBrand.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">موجودی کالا</label>
            <input
              type="number"
              {...register("productStock", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.productStock && (
              <p className="text-red-500 text-sm">
                {errors.productStock.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">قیمت کالا</label>
            <input
              type="number"
              {...register("productPrice", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.productPrice && (
              <p className="text-red-500 text-sm">
                {errors.productPrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">کتگوری</label>
            <select
              {...register("category")}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">انتخاب کنید</option>
              <option value="electronics">الکترونیک</option>
              <option value="clothing">پوشاک</option>
              <option value="books">کتاب</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">ساب کتگوری</label>
            <select
              {...register("subCategory")}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">انتخاب کنید</option>
              <option value="mobile">موبایل</option>
              <option value="laptop">لپتاپ</option>
              <option value="tablet">تبلت</option>
            </select>
            {errors.subCategory && (
              <p className="text-red-500 text-sm">
                {errors.subCategory.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">تصویر محصول</label>
            <input
              type="file"
              {...register("productImage")}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            ارسال
          </button>
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
