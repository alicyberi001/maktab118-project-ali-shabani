"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const MainPoster2: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={sectionRef} className="flex items-center justify-center gap-20">
      {inView && (
        <>
          <div className="flex flex-col items-center text-gray-900">
            <span className="text-5xl font-semibold">
              <CountUp end={7820} />
            </span>
            <span className="text-xl font-semibold">ارسال مرسوله</span>
            <span className="text-base w-80 text-center mt-3">
              تکنوسرویس در سال گذشته بیش از هفت هزار محصول را به سراسر ایران
              ارسال کرده است و توانست نام خود را در بین ۵ فروشگاه اینترنتی ایران
              ثبت کند
            </span>
          </div>
          <img src="/multi.png" alt="multi" className="w-[600px]" />
          <div className="flex flex-col items-center text-gray-900">
            <span className="text-5xl font-semibold">
              <CountUp end={1250} />
            </span>
            <span className="text-xl font-semibold">تنوع محصولی</span>
            <span className="text-base w-80 text-center mt-3">
              تکنو سرویس با تنوع محصولی بالا توانست در سال گذشته درصد رضایت
              بالای مشتریان را کسب کند و بتواند انبار محصول را به چهار برابر
              ظرفیت برساند
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPoster2;
