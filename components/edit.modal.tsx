import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct } from "@/types/product.api";
import Editor from "react-simple-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorText } from "./wysiwyg";
import { EditProducts, IAddProduct } from "@/api/product.service";

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

const FormModal = (data: IProduct) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<
    { id: string; name: string }[]
  >([]);

  //   const optionsCategory = [
  //     { value: "674c96cd591fa0b7179b5331", label: "قهوه اسپرسو" },
  //     { value: "674c96e9591fa0b7179b533a", label: "قهوه ترک" },
  //     { value: "674c96d8591fa0b7179b5335", label: "قهوه فرانسه" },
  //     ];

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

  const onSubmit = async(form: ProductFormValues) => {
    console.log("Submitted Data: ", form);
    const res = await EditProducts(data._id, form);
    console.log(res)
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
                      {...register("name")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
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
                      defaultValue={data.brand}
                      type="text"
                      {...register("brand")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.brand && (
                      <p className="text-red-500 text-sm">
                        {errors.brand.message}
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
                      {...register("quantity", { valueAsNumber: true })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
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
                      defaultValue={data.price}
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
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
                    <label className=" text-gray-700">ساب کتگوری</label>
                    <select
                      {...register("subcategory")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
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

                <div>
                  <label className="block text-gray-700">تصویر محصول</label>
                  <input
                    type="file"
                    {...register("images")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {/* <EditorText /> */}
                  <div>
                    <label className="block text-gray-700">توضیحات کالا</label>
                    <input
                      defaultValue={data.description}
                      type="string"
                      {...register("description")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
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
