"use client";


import React from "react";
import "react-datepicker/dist/react-datepicker.css";

const FailPage: React.FC = () => {
  return (
    <div dir="rtl" className="flex gap-6 justify-center py-32 px-14">
      <div className="relative w-[60%] flex flex-col gap-8">
        <div>سفارش با موفقیت ثبت شد</div>
        <a href="/" className="w-48 h-14  rounded-lg">
          بازگشت به صفحه اصلی
        </a>
      </div>
    </div>
  );
};

export default FailPage;
