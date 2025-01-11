// "use client"

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
import SlideNav from "@/containers/slideNav";
import { useQuery } from "@tanstack/react-query";
// import { fetchProductsByCategory } from "@/api/product.service";
import ProductCard from "@/components/productCard";
import Link from "next/link";
import Categories from "@/containers/mainCategories";
import InfoCards from "@/containers/infoCart";
import MainPoster2 from "@/containers/mainPoster2";
import Testi from "@/components/swiper_test";

const slides = [
  {
    id: "831",
    image: "./Apple-Watch-Series-10.webp",
    caption: "اپل واچ های سری ۱۰",
    caption2: "کاوش در اعماق اقیانوس ها",
  },
  {
    id: "832",
    image: "./iPhone-16-colors-all-the-official-shades.jpg",
    caption: "آیفون های سری۱۶",
    caption2: "بی رقیب و متمایز از رقبا",
  },
  {
    id: "833",
    image:
      "./samsung-galaxy-s24-ultra-JW-AP-cameras-bokeh-IMG_20240115_145323.webp",
    caption: "سامسونگ اس۲۴ اولترا",
    caption2: "۲۰۰ مگاپیگسلی بی رقیب",
  },
];

export default function Home() {
  return (
    <div className="bg-[#f8f8f8] container">
      <div className="">
        <Navbar />
        <ImageSlider slides={slides} />
        <Categories />
        <SlideNav />
        <InfoCards />
        <MainPoster2 />
        <Footer />
      </div>
    </div>
  );
}
