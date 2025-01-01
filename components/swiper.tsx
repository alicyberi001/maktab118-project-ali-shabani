"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import { log } from "console";

interface Slide {
  image: string;
  caption: string;
  caption2: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  return (
    <div className="w-full mt-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className=""
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative">
              <div className="w-full bg-gradient-to-l from-slate-950/80 from-25% to-transparent to-85% h-full absolute right-0"></div>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover h-[500px] mobile:h-[270px]"
              />

              <div className="absolute bottom-12 right-3   flex items-center justify-end">
                <div
                  dir="rtl"
                  className="flex flex-col items-start pr-16 gap-5 mobile:gap-2 mobile:pr-5"
                >
                  <p className="text-white text-5xl font-bold text-center px-4 mobile:text-2xl">
                    {slide.caption}
                  </p>
                  <div className="flex items-center">
                    <p className="text-white text-lg font-semibold text-center px-6 mobile:pr-6 mobile:pl-2 mobile:text-xs">
                      {slide.caption2}
                    </p>
                    <button className="px-4 py-1 text-sm text-white border border-white rounded-full hover:bg-white hover:text-black mobile:text-xs mobile:px-2 mobile:py-1">
                      خرید
                    </button>
                  </div>
                  <a href="#" className="px-6 text-white mobile:text-[10px]">اطلاعات بیشتر</a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

  

export default ImageSlider;
