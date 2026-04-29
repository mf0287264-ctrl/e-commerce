"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
interface SliderPropsType {
  images: string[];
  spaces?: number;
  perView?: number;
}
interface slideInfoType {
  title: string;
  subtitle: string;
}
export default function Slider({
  images,
  spaces = 50,
  perView = 3,
}: SliderPropsType) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesInfo: slideInfoType[] = [
    {
      title: "Fresh Products Delivered to your Door",
      subtitle: "Get 20% off your first order",
    },
    {
      title: "Organic & Healthy Choices Every Day",
      subtitle: "Farm-Fresh Veggies at Your Fingertips",
    },
    {
      title: "Fast & free Delivery",
      subtitle: "Same day delivery available",
    },
  ];
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={spaces}
      slidesPerView={perView}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
      loop
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{
        clickable: true,
        // bulletActiveClass: "bg-white! opacity-100! w-5! rounded-[6px]!",
      }}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            src={image}
            alt="slider image"
            className="w-full h-[400px] object-cover relative"
          />

          <div className="absolute bg-gradient-to-r from-[#00C950E5] to-[#05DF7280] pointer-events-none inset-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={
                activeIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6 }}
              className="ms-25 mt-30 lg:ms-80 lg:mt-30 md:ms-50 md:mt-30 flex flex-col justify-center gap-4 w-[390px]"
            >
              <span className="text-4xl text-white font-bold">
                {slidesInfo[i].title}
              </span>
              <span className="text-xl text-white">
                {slidesInfo[i].subtitle}
              </span>
              <div className="flex gap-5">
                <Button className="text-2xl font-bold p-6 bg-white text-[#00C950]">
                  <Link href={"/allProducts"}> shop now </Link>
                </Button>
                <Button className="text-2xl font-bold p-6 bg-transparent border border-gray-100">
                  learn more
                </Button>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
