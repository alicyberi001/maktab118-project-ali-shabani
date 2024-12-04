"use client";

// components/ImageSlider.tsx
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
    <div className="w-full mx-auto py-14">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative">
              <div className="w-full bg-gradient-to-l from-slate-950/80 from-25% to-transparent to-85% h-full absolute right-0"></div>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover h-[600px]"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-end">
                <div
                  dir="rtl"
                  className="flex flex-col items-start pr-16 gap-5"
                >
                  <p className="text-white text-5xl  font-bold text-center px-4">
                    {slide.caption}
                  </p>
                  <div className="flex items-center">
                    <p className="text-white text-lg  font-semibold text-center px-6">
                      {slide.caption2}
                    </p>
                    <button className="px-4 py-1 text-sm text-white border border-white rounded-full hover:bg-white hover:text-black">
                      خرید
                    </button>
                  </div>
                  <a href="#" className="px-6 text-white">اطلاعات بیشتر</a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// interface Iiamge {
//   url: string;
//   title: string;
// }

// type ImageSliderProps = {
//   images: Iiamge[];
// };

// const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
//   return (
//     <div className="w-full mx-auto">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay, Scrollbar]}
//         navigation={{
//           nextEl: ".custom-next",
//           prevEl: ".custom-prev",
//         }}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         className=""
//       >
//         {images.map((el, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative">
//               <div className="w-full bg-gradient-to-l from-slate-950/80 from-25% to-transparent to-85% h-full absolute right-0"></div>
//               <img
//                 src={el.url}
//                 alt={`Slide ${index + 1}`}
//                 className="w-full h-[600px] object-cover"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

export default ImageSlider;
