import SwiperComp from "@/components/swiper";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ImageSlider from "@/components/swiper";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const slides = [
  {
    image: "./Apple-Watch-Series-10.webp",
    caption: "اپل واچ های سری ۱۰",
    caption2: "کاوش در اعماق اقیانوس ها",
  },
  {
    image: "./iPhone-16-colors-all-the-official-shades.jpg",
    caption: "آیفون های سری۱۶",
    caption2: "بی رقیب و متمایز از رقبا",
  },
  {
    image:
      "./samsung-galaxy-s24-ultra-JW-AP-cameras-bokeh-IMG_20240115_145323.webp",
    caption: "سامسونگ اس۲۴ اولترا",
    caption2: "۲۰۰ مگاپیگسلی بی رقیب",
  },
];

export default function Home() {
  return (
    <div className="bg-[#f8f8f8]">
      <Navbar />
      <ImageSlider slides={slides} />;
      <div className="flex gap-20 justify-center text-gray-900 my-10">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/asus lap.webp"
            alt="appleLap"
            className="w-56 aspect-square rounded-3xl"
          />
          <span className="font-semibold text-lg">لپ تاپ ایسوس</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img
            src="/apple lap.webp"
            alt="appleLap"
            className="w-56 aspect-square rounded-3xl"
          />
          <span className="font-semibold text-lg">لپ تاپ اپل</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img
            src="/lenovo lap.webp"
            alt="appleLap"
            className="w-56 aspect-square rounded-3xl"
          />
          <span className="font-semibold text-lg">لپ تاپ لنوو</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
