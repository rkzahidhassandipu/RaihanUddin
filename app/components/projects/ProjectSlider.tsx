"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";



type ProjectSliderProps = {
  images: string[];
};

const ProjectSlider: React.FC<ProjectSliderProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-white/20 shadow-lg relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        className="w-full h-64 sm:h-80 custom-slider"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="relative">
             <Image
              src={img}
              alt={`Project image ${i + 1}`}
              fill
              className="object-cover"
            />
          </SwiperSlide>
        ))}

        {/* Custom arrow buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>

      {/* CSS to style arrows and dots */}
      <style jsx global>{`
        .custom-slider .swiper-button-next,
        .custom-slider .swiper-button-prev {
          color: #ef4444 !important; /* Red color */
          font-size: 24px;
        }

        .custom-slider .swiper-pagination-bullet-active {
          background: #ef4444 !important; /* Red color */
        }

        .custom-slider .swiper-pagination-bullet {
          background: #94a3b8; /* Slate color for inactive dots */
        }
      `}</style>
    </div>
  );
};

export default ProjectSlider;
