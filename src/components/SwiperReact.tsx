import React from "react"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Slide1 from "../images/slides/slide1.png"
import Slide2 from "../images/slides/slide2.png"
import Slide3 from "../images/slides/slide3.png"
import Slide4 from "../images/slides/slide4.png"

export const SwiperReact = () => {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <img src={Slide1} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide2} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide3} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide4} />
            </SwiperSlide>
        </Swiper>
    )
}