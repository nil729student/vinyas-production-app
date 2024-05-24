"use client"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {

    const images = [
        '/images/img1.jpg',
        '/images/img2.jpg',
        '/images/img3.jpg',
        '/images/img4.jpg'
    ];


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
            {images.map((image, index) => (

                <SwiperSlide key={index}>
                    <div className='flex justify-center m-10 relative'>
                        <div className="flex justify-center m-10">
                            <Image src={image} alt="imagen" width={800} height={800} />
                            <a href="https://example.com" className="absolute top-0 left-0">
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            ))
            }

        </Swiper>
    );
};