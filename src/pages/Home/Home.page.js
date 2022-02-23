import { SwiperSlider } from 'components/SwiperSlider/SwiperSlider.component';
import { Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';
import Styles from "./Home.page.module.css";

export const HomePage = (props) => {

    const sliderItems = [
        {
            image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            title: "First slide",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=939&q=80",
            title: "Second slide",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            image: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            title: "Third slide",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        }
    ];
    
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>خانه | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="%REACT_APP_WEBSITE_NAME% - REACT_APP_WEBSITE_DESCRIPTION" />
            </Helmet>

            <Header/>

            <div className={Styles.caroselContainer}>
                <SwiperSlider width={'100%'} height={'100%'} borderRadius={'1rem'} items={sliderItems} />
            </div>
            
        </div>
    );
};
