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
    <div className="bg-[#D4D9D5]">
      <Navbar />
      <ImageSlider slides={slides} />;
      <Footer />
    </div>
  );
}
