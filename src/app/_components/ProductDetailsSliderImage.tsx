"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import type { Swiper as SwiperType } from "swiper";

export default function ProductDetailsSliderImage({
  images,
  title,
  coverImage,
}: {
  images?: string[];
  title?: string;
  coverImage?: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const allImages =
    images && images.length > 0 ? images : coverImage ? [coverImage] : [];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image slider */}
      <Swiper
        modules={[Thumbs]}
        loop
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full"
      >
        {allImages.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center h-[344px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-contain p-4"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail slider */}
      <Swiper
        modules={[Thumbs, FreeMode]}
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="w-full"
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={i} className="cursor-pointer">
            <div className="rounded-xl border-2 border-gray-200 w-full h-16 overflow-hidden flex items-center justify-center transition-all [.swiper-slide-thumb-active_&]:border-black">
              <img
                src={img}
                alt="product image"
                className="h-full w-full object-contain p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
