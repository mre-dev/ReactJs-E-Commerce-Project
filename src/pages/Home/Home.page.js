import { GetCategories } from 'api/getCategory.api';
import { SwiperSlider } from 'components/SwiperSlider/SwiperSlider.component';
import { Header } from 'layouts';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Styles from "./Home.page.module.css";
import { Button, Navigation as CatNavigation, ProductCard} from 'components';

import CatStyles from "./catStyles.module.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { PATHS } from 'configs/routes.config';
import { GetProducts } from 'api/Product.api';

import Marquee from "react-easy-marquee";
import { useNavigate } from 'react-router-dom';
import { ShowPrice } from 'utils/functions.util';
import { MdOutlineDeliveryDining } from 'assets/images/icons';
import { BiSupport } from 'assets/images/icons';
import { BsCreditCard2FrontFill } from 'assets/images/icons';

export const HomePage = (props) => {

    const Nav = useNavigate();

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

    //get All Products from api and set in state for use in component
    const [products, setProducts] = useState([]);
    useEffect(() => {
        GetProducts().then(res => {
            setProducts(res.data);
        });
    }, []);

    //find the frequency of each category in the products array
    const [TheMostFrequentCategories, setTheMostFrequentCategories] = useState([]);
    useEffect(() => {
        if(products.length > 0) {
            setTheMostFrequentCategories(findMostFrequentCategories(products));
        }
    }, [products]);

    function findMostFrequentCategories(arr) {
        let test = arr.reduce((x, y) => {
            if(x[y['category-id']]) {
                x[y['category-id']]++;
                return x;
            } else {
                let z = {};
                z[y['category-id']] = 1;
                return Object.assign(x, z);
            }
        }, {});
        return test;
    }

    //Set Product to state for use in component
    const [firstCategoryProducts, setFirstCategoryProducts] = useState([]);
    const [firstCategoryName, setFirstCategoryName] = useState("");
    const [secondCategoryProducts, setSecondCategoryProducts] = useState([]);
    const [secondCategoryName, setSecondCategoryName] = useState("");
    const [thirdCategoryProducts, setThirdCategoryProducts] = useState([]);
    const [thirdCategoryName, setThirdCategoryName] = useState("");

    useEffect(() => {
        if(Object.keys(TheMostFrequentCategories).length > 0) {

            setFirstCategoryProducts(products.filter(product => {
                return product['category-id'] == Object.keys(TheMostFrequentCategories)[0];
            }));

            setSecondCategoryProducts(products.filter(product => {
                return product['category-id'] == Object.keys(TheMostFrequentCategories)[1];
            }));

            setThirdCategoryProducts(products.filter(product => {
                return product['category-id'] == Object.keys(TheMostFrequentCategories)[2];
            }));
        }
    }, [TheMostFrequentCategories]);

    useEffect(() => {
        if(categories.length > 0) {
            if(categories[Object.keys(TheMostFrequentCategories)[0]]) {
                const tempCatNames = {
                    "fa": categories[Object.keys(TheMostFrequentCategories)[0]]['name-fa'],
                    "en": categories[Object.keys(TheMostFrequentCategories)[0]]['name-en']
                }
                setFirstCategoryName(tempCatNames);
            }
            if(categories[Object.keys(TheMostFrequentCategories)[1]]) {
                const tempCatNames = {
                    "fa": categories[Object.keys(TheMostFrequentCategories)[1]]['name-fa'],
                    "en": categories[Object.keys(TheMostFrequentCategories)[1]]['name-en']
                }
                setSecondCategoryName(tempCatNames);
            }
            if(categories[Object.keys(TheMostFrequentCategories)[2]]) {
                const tempCatNames = {
                    "fa": categories[Object.keys(TheMostFrequentCategories)[2]]['name-fa'],
                    "en": categories[Object.keys(TheMostFrequentCategories)[2]]['name-en']
                }
                setThirdCategoryName(tempCatNames);
            }
        }
    }, [categories]);

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
                <Marquee
                    duration={25000}
                    height="22rem"
                    width="100%"
                    axis="X"
                    align="center"
                    pauseOnHover={true}
                    reverse={false}
                >
                    {
                        filteredCategoryArray.map((category, index) => {
                            return (
                                <div className={CatStyles.catSlider} key={index}>
                                    <img src={category.image} alt=""/>
                                    <h2>{category.title}</h2>
                                </div>
                            )
                        })
                    }
                </Marquee>
                
            </div>

            { firstCategoryProducts.length > 0 ?
            <div className={Styles.firstCatProduct}>
                <div className={Styles.firstCatProductHeader}>
                    {
                        firstCategoryProducts.length > 0 ?
                        <Fragment>
                            <h3>محصولات {firstCategoryName['fa']}</h3>
                            <Button text='مشاهده تمام محصولات' type='info' size='small' borderRadius click={() => {
                                Nav(PATHS.PRODUCTS + "/" + firstCategoryName['en']);
                            }}/>
                        </Fragment>
                        : null
                    }
                </div>
                <div className={Styles.catProductsBox}>
                <Marquee
                    duration={75000}
                    height="40rem"
                    width="100%"
                    axis="X"
                    align="center"
                    pauseOnHover={true}
                    reverse={false}
                >
                        {
                            firstCategoryProducts.length > 0 ?
                            firstCategoryProducts.map((product, index) => {
                                return (
                                    <ProductCard key={index} id={product.id}
                                        image={product.thumbnail}
                                        title={product['product-name-fa']}
                                        price={product.price.amount}
                                    />
                                )
                            }) : null
                        }
                    </Marquee>
                </div>
            </div>
            : null }


            <div className={Styles.Services}>
                <div className={Styles.ServicesBox}>
                    <MdOutlineDeliveryDining/>
                    <h3>ارسال به سراسر کشور</h3>
                    <p>به سراسر کشور با کمترین هزینه<br/> محصولات ارزمنشد شما را صحیح و سالم<br />ارسال می کنیم.</p>
                </div>
                <div className={Styles.ServicesBox}>
                    <BsCreditCard2FrontFill/>
                    <h3>پرداخت امن</h3>
                    <p>در زمان پرداخت هزینه سبد خرید<br/>خیالتان آسوده باشد زیرا اطلاعات شما <br />در امنیت کامل است</p>
                </div>
                <div className={Styles.ServicesBox}>
                    <BiSupport/>
                    <h3>پشتیبانی آنلاین</h3>
                    <p>تیم ما به صورت تمام وقت در خدمت<br/>شماست . اگر سوالی داشتید خیلی سریع<br />پاسختان را می دهیم.</p>
                </div>
            </div>



            {secondCategoryProducts.length > 0 ?
            <div className={Styles.secondCatProduct}>
                <div className={Styles.secondCatProductHeader}>
                    {
                        secondCategoryProducts.length > 0 ?
                        <Fragment>
                            <h3>محصولات {secondCategoryName['fa']}</h3>
                            <Button text='مشاهده تمام محصولات' type='info' size='small' borderRadius click={() => {
                                Nav(PATHS.PRODUCTS + "/" + secondCategoryName['en']);
                            }}/>
                        </Fragment>
                        : null
                    }
                </div>
                <div className={Styles.catProductsBox}>
                <Marquee
                    duration={100000}
                    height="40rem"
                    width="100%"
                    axis="X"
                    align="center"
                    pauseOnHover={true}
                    reverse={false}
                >
                        {
                            secondCategoryProducts.length > 0 ?
                            secondCategoryProducts.map((product, index) => {
                                return (
                                    <ProductCard key={index} id={product.id}
                                        image={product.thumbnail}
                                        title={product['product-name-fa']}
                                        price={product.price.amount}
                                    />
                                )
                            }) : null
                        }
                    </Marquee>
                </div>
            </div>
            : null }

            {thirdCategoryProducts.length > 0 ?
            <div className={Styles.thirdCatProduct}>
                <div className={Styles.thirdCatProductHeader}>
                    {
                        thirdCategoryProducts.length > 0 ?
                        <Fragment>
                            <h3>محصولات {thirdCategoryName['fa']}</h3>
                            <Button text='مشاهده تمام محصولات' type='info' size='small' borderRadius click={() => {
                                Nav(PATHS.PRODUCTS + "/" + thirdCategoryName['en']);
                            }}/>
                        </Fragment>
                        : null
                    }
                </div>
                <div className={Styles.catProductsBox}>
                <Marquee
                    duration={100000}
                    height="40rem"
                    width="100%"
                    axis="X"
                    align="center"
                    pauseOnHover={true}
                    reverse={false}
                >
                        {
                            thirdCategoryProducts.length > 0 ?
                            thirdCategoryProducts.map((product, index) => {
                                return (
                                    <ProductCard key={index} id={product.id}
                                        image={product.thumbnail}
                                        title={product['product-name-fa']}
                                        price={product.price.amount}
                                    />
                                )
                            }) : null
                        }
                    </Marquee>
                </div>
            </div>
            : null }

        </div>
    );
};
