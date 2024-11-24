import SwiperComp from "@/components/swiper";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ImageSlider from "@/components/swiper";

const images = [
  { url : "./Apple-Watch-Series-10.webp", title : "اپل واچ های سری ۱۰"},
  { url : "./iPhone-16-colors-all-the-official-shades.jpg", title : "سری آیفون ۱۶ در رنگ های خاص"},
  { url : "./samsung-galaxy-s24-ultra-JW-AP-cameras-bokeh-IMG_20240115_145323.webp", title : "سامسونگ اس ۲۴ اولترا"},
];

export default function Home() {
  return <ImageSlider images={images} />;
}
