"use client"
// carusel estilo catalogo
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';


SwiperCore.use([Navigation, Pagination, Scrollbar]);

export default function Carusel({ images }) {
    return (
        <Swiper

            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="flex justify-center">
                        <Image src={image} alt="imagen" width={500} height={500} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
