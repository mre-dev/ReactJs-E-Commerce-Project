import { GetCategories } from 'api/getCategory.api';
import { SwiperSlider } from 'components/SwiperSlider/SwiperSlider.component';
import { Header } from 'layouts';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Styles from "./Home.page.module.css";
import { Navigation as CatNavigation} from 'components';

import CatStyles from "./catStyles.module.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { PATHS } from 'configs/routes.config';

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
    
    //get categories from api and set in state for use in component
    const [categories, setCategories] = React.useState([]);
    useEffect(() => {
        GetCategories().then(res => {
            setCategories(res.data);
        });
    }, []);

    //Cretae category array for use in swiper slider (withouth the first category)
    const categoryArray = categories.map((category, index) => {
        return {
            image: process.env.REACT_APP_BASE_URL + "/files/" + category.icon,
            title: <CatNavigation link={PATHS.PRODUCTS + "/" + category['name-en']} text={category['name-fa']} internal/>,
            description: ""
        }
    });

    //filter the first category from the array
    const filteredCategoryArray = categoryArray.filter((category, index) => {
        return index !== 0;
    });

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>خانه | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="%REACT_APP_WEBSITE_NAME% - REACT_APP_WEBSITE_DESCRIPTION" />
            </Helmet>

            <Header/>

            <div className={Styles.caroselContainer}>
                <SwiperSlider width={'100%'} height={'100%'} borderRadius={'1rem'} items={sliderItems} modules={[Autoplay, Pagination, Navigation]}/>
            </div>
            
            <div className={CatStyles.catContainer}>
                <h3>دسته بندی محصولات</h3>
                <SwiperSlider
                    width={'100%'}
                    height={'100%'}
                    borderRadius={'1rem'}
                    items={filteredCategoryArray}
                    slidesPerView={8}
                    spaceBetween={50}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    className={CatStyles.catSlider}
                    navigationIcon={false}
                    grabCursor={true}
                    modules={[Autoplay]}
                    autoplayDelay={5000}
                />
            </div>

        </div>
    );
};
