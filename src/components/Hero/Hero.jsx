import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import image1 from "../../assets/images/image1.avif";
import image2 from "../../assets/images/photo-1519389950473-47ba0277781c.avif";
import image3 from "../../assets/images/photo-1578574577315-3fbeb0cecdc2.avif";
import image4 from "../../assets/images/photo-1581934932994-e4ac37c0c882.avif";

export default function Hero() {
  return (
    <div className="h-[800px] max-w-11/12 mx-auto">
      <Swiper
        navigation
        modules={[Navigation]}
        className="mySwiper h-[70vh] w-full"
      >
        <SwiperSlide className="">
          <img src={image1} className="w-full h-full object-cover" alt="hero" />
        </SwiperSlide>

        <SwiperSlide className=" flex items-center justify-center">
          <img src={image2} alt="" />
        </SwiperSlide>
        <SwiperSlide className=" flex items-center justify-center">
          <img src={image3} alt="" />
        </SwiperSlide>
        <SwiperSlide className=" flex items-center justify-center">
          <img src={image4} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
