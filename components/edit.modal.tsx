import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct } from "@/types/product.api";

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

const FormModal = (data: IProduct) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const categoryOptions = {
    electronics: ["اپل", "سامسونگ", "شیاومی"],
    clothing: ["اپل", "ایسوس", "لنوو"],
    books: ["اپل", "سامسونگ"],
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const selectedCategory = watch("category");

  React.useEffect(() => {
    if (selectedCategory) {
      setSubCategories(
        categoryOptions[selectedCategory as keyof typeof categoryOptions] || []
      );
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const onSubmit = (data: ProductFormValues) => {
    console.log("Submitted Data: ", data);
    // Call your API function here
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-cyan-600 border border-cyan-600 rounded-lg px-2 py-1 hover:bg-cyan-600 hover:text-gray-900"
      >
        ویرایش
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full space-y-4 relative"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک روی بدنه مودال
          >
            <h2 className="text-lg font-bold text-center">ویرایش محصول</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="flex flex-col gap-4 ">
                <aside className="flex gap-5">
                  <div>
                    <label className="block text-gray-700">نام کالا</label>
                    <input
                    defaultValue={data.name}
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
                    defaultValue={data.brand}
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
                </aside>

                <aside className="flex gap-5">
                  <div>
                    <label className="block text-gray-700">موجودی کالا</label>
                    <input
                    defaultValue={data.quantity}
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
                    defaultValue={data.price}
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
                </aside>

                <aside className="flex gap-5">
                  <div>
                    <label className="text-gray-700">کتگوری</label>
                    <select
                      {...register("category")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="electronics">موبایل</option>
                      <option value="clothing">لپ تاپ</option>
                      <option value="books">تبلت</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className=" text-gray-700">ساب کتگوری</label>
                    <select
                      {...register("subCategory")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                      disabled={!selectedCategory}
                    >
                      <option value="">انتخاب کنید</option>
                      {subCategories.map((subCat) => (
                        <option key={subCat} value={subCat}>
                          {subCat}
                        </option>
                      ))}
                    </select>
                    {errors.subCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.subCategory.message}
                      </p>
                    )}
                  </div>
                </aside>

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
                  className="w-full bg-[#202A30] text-white py-2 rounded hover:bg-[#273239]"
                >
                  ارسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
