"use client";

// components/ImageSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import { log } from "console";

type ImageSliderProps = {
  images: object[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg"
      >
        {images.map((el, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <div className="w-full bg-gradient-to-l from-slate-950/80 from-25% to-transparent to-85% h-full absolute right-0"></div>
              <img
                src={el.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-[600px] object-cover rounded-lg"
              />
            </div>
            <div className="absolute right-0 text-3xl z-20">{el.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
