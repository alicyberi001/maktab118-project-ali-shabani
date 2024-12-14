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
import { fetchProductsByCategory } from "@/api/product.service";
import ProductCard from "@/components/productCard";

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
      <div className="">
        <Navbar />
        <ImageSlider slides={slides} />
        <SlideNav />
        {/* <nav className="w-full h-72 border border-gray-800 bg-red-400 rounded-xl overflow-x-scroll">
          {data?.data.products.map((product, index) => (
            <ProductCard
              key={index}
              image={`http://localhost:8000/images/products/images/${product.images[0]}`}
              title={product.name}
              price={product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              description={product.description}
            />
          ))}
        </nav> */}
        <div className="flex justify-center gap-10 text-gray-900 my-10">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/asus lap.webp"
              alt="asusLap"
              className="w-56 aspect-square rounded-3xl mobile:w-16"
            />
            <span className="font-semibold text-lg mobile:text-sm">
              لپ تاپ ایسوس
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/apple lap.webp"
              alt="appleLap"
              className="w-56 aspect-square rounded-3xl mobile:w-16"
            />
            <span className="font-semibold text-lg mobile:text-sm">
              لپ تاپ اپل
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/lenovo lap.webp"
              alt="lenovoLap"
              className="w-56 aspect-square rounded-3xl mobile:w-16"
            />
            <span className="font-semibold text-lg mobile:text-sm">
              لپ تاپ لنوو
            </span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
