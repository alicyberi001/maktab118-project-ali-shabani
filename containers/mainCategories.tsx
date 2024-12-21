"use client";

import Link from "next/link";

const Categories = () => {
  return (
    <div className="w-full flex flex-col items-center mt-12">
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl font-medium">دسته های پربازدید</span>
        <span className="w-10 h-1 bg-gray-900"></span>
      </div>
      <div className="w-full flex justify-center gap-20 my-11">
        <Link
          href={`/categories/674c96cd591fa0b7179b5331`}
          className="flex flex-col items-center gap-3 hover:cursor-pointer"
        >
          <img src="/mobile.png" alt="" className="w-40 h-32" />
          <span className="ml-8 font-semibold">موبایل</span>
        </Link>
        <Link
          href={`/categories/674c96e9591fa0b7179b533a`}
          className="flex flex-col items-center gap-3 hover:cursor-pointer"
        >
          <img src="/laptop.png" alt="" className="w-40 h-32" />
          <span className="ml-6 font-semibold">لپ تاپ</span>
        </Link>
        <Link
          href={`/categories/674c96d8591fa0b7179b5335`}
          className="flex flex-col items-center gap-3 hover:cursor-pointer"
        >
          <img src="/tablet.png" alt="" className="w-40 h-32" />
          <span className="ml-6 font-semibold">تبلت</span>
        </Link>
        <Link
          href={`/categories/674c96cd591fa0b7179b5331`}
          className="flex flex-col items-center gap-3 hover:cursor-pointer"
        >
          <img src="/watch.png" alt="" className="w-40 h-32" />
          <span className="ml-6 font-semibold">ساعت هوشمند</span>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
