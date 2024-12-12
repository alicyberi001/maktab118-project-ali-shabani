import { z } from "zod";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { IProduct } from "@/types/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createProducts, EditProducts, IAddProduct } from "@/api/product.service";
import { EditorText } from "./wysiwyg";
import TemplateDemo from "./fileUploader";
import Editor from "react-simple-wysiwyg";

const productSchema = z.object({
  name: z.string().min(1, "نام کالا الزامی است"),
  brand: z.string().min(1, "برند کالا الزامی است"),
  quantity: z.number().min(0, "موجودی کالا نمی‌تواند منفی باشد"),
  price: z.number().min(0, "قیمت کالا نمی‌تواند منفی باشد"),
  category: z.string().min(1, "کتگوری الزامی است"),
  subcategory: z.string().min(1, "ساب کتگوری الزامی است"),
  //   images: z.any().refine((files) => Array.isArray(files) && files.length > 0, {
  //     message: "حداقل یک تصویر باید انتخاب شود",
  //   }),
  images: z.any(),
  description: z.string().min(4, "حداقل ۴ کاراکتر"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const CreateModalForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<
    { id: string; name: string }[]
  >([]);

  const categoryOptions: Record<string, { id: string; name: string }[]> = {
    "674c96cd591fa0b7179b5331": [
      { name: "اپل", id: "674c9b5a591fa0b7179b5341" },
      { name: "سامسونگ", id: "674c9bce591fa0b7179b5345" },
      { name: "شیاومی", id: "674c9be0591fa0b7179b5349" },
    ],
    "674c96e9591fa0b7179b533a": [
      { name: "اپل", id: "674d5293d81da64b1430d1c1" },
      { name: "ایسوس", id: "674c9cd0591fa0b7179b5359" },
      { name: "لنوو", id: "674ca29d591fa0b7179b535f" },
    ],
    "674c96d8591fa0b7179b5335": [
      { name: "اپل", id: "674c9c3e591fa0b7179b534d" },
      { name: "سامسونگ", id: "674c9c52591fa0b7179b5351" },
    ],
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<IAddProduct>({
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

  const onSubmit = async (form: ProductFormValues) => {
    try {
      console.log("created Data: ", form);
      const res = await createProducts(form);
      
      toast.success("محصول با موفقیت اضافه شد");
      setIsOpen(false)
    } catch (error) {
      toast.error("محصول اضافه نشد");
      setIsOpen(false)
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#202A30] text-sm border-2 border-gray-900 rounded-lg px-3 py-1 font-semibold absolute left-0 -top-10 hover:bg-gray-900 hover:text-white"
      >
        افزودن کالا +
      </button>

      {isOpen && (
        <div
          className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full flex flex-col items-center gap-4 relative transform scale-95 opacity-0 animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک روی بدنه مودال
          >
            <h2 className="text-lg font-bold text-center text-gray-900">
              ویرایش محصول
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="flex flex-col gap-4 ">
                <aside className="flex gap-5 justify-center">
                  <div>
                    <label className="block text-gray-700">نام کالا</label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-1 focus:border-black"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700">برند کالا</label>
                    <input
                      type="text"
                      {...register("brand")}
                      className="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-1 focus:border-black"
                    />
                    {errors.brand && (
                      <p className="text-red-500 text-sm">
                        {errors.brand.message}
                      </p>
                    )}
                  </div>
                </aside>

                <aside className="flex gap-5 justify-center">
                  <div>
                    <label className="block text-gray-700">موجودی کالا</label>
                    <input
                      type="number"
                      {...register("quantity", { valueAsNumber: true })}
                      className="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-1 focus:border-black"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700">قیمت کالا</label>
                    <input
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                      className="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-1 focus:border-black"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                </aside>

                <aside className="flex gap-5 justify-center">
                  <div>
                    <label className="block text-gray-700">کتگوری</label>
                    <select
                      {...register("category")}
                      className="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-1 focus:border-black pr-8"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="674c96cd591fa0b7179b5331">موبایل</option>
                      <option value="674c96e9591fa0b7179b533a">لپ تاپ</option>
                      <option value="674c96d8591fa0b7179b5335">تبلت</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block  text-gray-700">ساب کتگوری</label>
                    <select
                      {...register("subcategory")}
                      className="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-1 focus:border-black pr-8"
                      disabled={!selectedCategory}
                    >
                      <option value="">انتخاب کنید</option>
                      {subCategories.map((subCat) => (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>
                    {errors.subcategory && (
                      <p className="text-red-500 text-sm">
                        {errors.subcategory.message}
                      </p>
                    )}
                  </div>
                </aside>

                <aside dir="rtl" className="flex gap-4 justify-center">
                  {/* <EditorText /> */}
                  <div className="flex flex-col">
                    <label className="block text-gray-700">توضیحات کالا</label>
                    <input
                      type="string"
                      {...register("description")}
                      className="w-48 h-24 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-gray-700">تصویر محصول</label>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-48 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                      >
                        <div className="flex flex-col items-center justify-center pt-2 pb-2">
                          <svg
                            className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          {...register("images")}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </aside>
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

export default CreateModalForm;
