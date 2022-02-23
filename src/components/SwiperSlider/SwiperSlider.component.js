import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Styles from "assets/styles/components/SwiperSlider/SwiperSlider.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';

export const SwiperSlider = (props) => {

    if(props.items.length > 1) {
        require('assets/styles/components/SwiperSlider/publicSwiperStyle.css');
    }

    return (
        <Fragment>
            <Swiper
                dir="rtl"
                style={{
                    width: props.width ?? '100%',
                    height: props.height ?? '100%',
                    borderRadius: props.borderRadius ?? '0rem'
                }}
                grabCursor={true}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={Styles.mySwiper}
            >
                {
                    props.items.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={Styles.slide}>
                                    <div className={Styles.slideImage}>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className={Styles.slideContent}>
                                        <div className={Styles.slideTitle}>
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div className={Styles.slideDescription}>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Fragment>
    );
};

SwiperSlider.propTypes = {
    items: PropTypes.array.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string
};