import 'react-tabs/style/react-tabs.css';
import React, { Fragment, useEffect, useState } from 'react';
import Select from 'react-select'
import Styles from './ProductStyle.module.css';
import animationStyle from './animationStyle.module.css';
import swal from 'sweetalert';
import { Autoplay, Pagination, EffectCards } from 'swiper';
import { Button, Input, Navigation, SwiperSlider } from 'components';
import { Footer, Header } from 'layouts';
import { GetProduct, UpdateProduct } from 'api/Product.api.js';
import { GetUserFullName } from 'api/getUserData.api';
import { Helmet } from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { addToCart } from 'redux/actions';
import { convertMiladiToShamsi, ShowPrice } from 'utils/functions.util';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

export const ProductPage = (props) => {

    const params = useParams();
    const nav = useNavigate();
    const productId = params.productId;

    const [productInformation, setProductInformation] = useState({});
    const [productRawInformation, setProductRawInformation] = useState({});

    useEffect(() => {
        if(!productId) {
            swal('خطا', 'محصول مورد نظر یافت نشد', 'error');
            return;
        }
        GetProduct(productId).then(response => {
            if(response.status === 200) {
                setProductInformation(response.data);
                GetProduct(productId).then(response => {
                    if(response.status === 200) {
                        setProductRawInformation(response.data);
                    }
                });
            }
        }).catch(error => {
            swal('خطا', 'محصول مورد نظر یافت نشد', 'error');
            return;
        });

        window.scrollTo(0, 0);
    }, []);

    const [productSliderItems, setProductSliderItems] = useState([]);

    const [colorOoptions, setColorOoptions] = useState([]);
    const [garantyOptions, setGarantyOptions] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        let tempImages = [];
        if(productInformation.images) {
            for(let i = 0; i < productInformation.images.length; i++) {
                tempImages.push({
                    image: process.env.REACT_APP_BASE_URL + "/files/" + productInformation.images[i],
                    title: "",
                    description: ""
                });
            }
            setProductSliderItems(tempImages);
        }

        if(productInformation.colors) {
            const productColor = productInformation.colors.map(color => {
                return {
                    value: color.id,
                    label: <p style={{
                        backgroundColor: color['hex'],
                        padding: '0.5rem',
                        color: color['hex'].toLowerCase() == "#ffffff" ? 'black' : 'white',
                        borderRadius: '0.5rem', textAlign: 'center'}}>{color['color-name-fa']}</p>
                }
            });
            setColorOoptions(productColor);
        }

        if(productInformation.guarantees) {
            const productGaranty = productInformation.guarantees.map(garanty => {
                return {
                    value: garanty.id,
                    label: garanty['guarantee-name-fa']
                }
            });
            setGarantyOptions(productGaranty);
        }

        if(productInformation.comments) {            
            for(let i = 0; i < productInformation.comments.length; i++) {
                getCurrentCommentUser(productInformation, productInformation.comments[i]['user-id'])
            }
        }

    }, [productInformation]);

    const customDispatch = useDispatch();
    const cardShopping = useSelector(state => state.shoppingReducer.card);

    const addToCard = (e) => {
        e.preventDefault();
        if(!e.target.color.value) {
            swal('خطا', 'لطفا رنگ مورد نظر خود را انتخاب کنید', 'error');
            return;
        }

        if(!e.target.garanty.value) {
            swal('خطا', 'لطفا گارانتی مورد نظر خود را انتخاب کنید', 'error');
            return;
        }

        if(!e.target.productCounter.value) {
            swal('خطا', 'لطفا تعداد مورد نظر خود را انتخاب کنید', 'error');
            return;
        }

        if( e.target.productCounter.value > productInformation.count) {
            swal('خطا', 'تعداد مورد نظر بیشتر از موجودی محصول است', 'error');
            return;
        }

        if(e.target.productCounter.value <= 0) {
            swal('خطا', 'تعداد مورد نظر باید بزرگتر از 0 باشد', 'error');
            return;
        }

        swal('موفقیت', 'محصول با موفقیت به سبد خرید اضافه شد', 'success');
        const form = new FormData(e.target);
        form.append('productId', productId);
        const data = Object.fromEntries(form);

        const isExist = cardShopping.find(item => item.productId == productId);

        if(isExist) {
            if(isExist.quantity < productInformation.count ) {
                customDispatch(addToCart(+productId, +data.productCounter, +data.color, +data.garanty));
            } else {
                swal('خطا', 'تمام موجودی انتخاب شده است', 'error');
                return;
            }
        } else {
            customDispatch(addToCart(+productId, +data.productCounter, +data.color, +data.garanty));
        }
        
        //customDispatch(addToCart(data));
    }

    const getCurrentCommentUser = async (allComments, id) => {
        const response = await GetUserFullName(id);
        setComments(allComments.comments.map(comment => {
            if(comment['user-id'] === id) {
                comment['user-name'] = response;
            }
            return comment;
        }));
    }

    const addComment = (e) => {
        e.preventDefault();
        if(!e.target.comment.value) {
            swal('خطا', 'لطفا نظر خود را وارد کنید', 'error');
            return;
        }

        const newTime = new Date().getTime();

        setProductRawInformation({
            ...productRawInformation,
            comments: [
                ...productRawInformation.comments,
                {
                    id: productRawInformation.comments.length + 1,
                    "user-id": JSON.parse(localStorage.getItem('userData')).id,
                    comment: e.target.comment.value,
                    "createdAt": newTime
                }
            ]
        });

        setComments([
            ...comments,
            {
                id: comments.length + 1,
                "user-id": JSON.parse(localStorage.getItem('userData')).id,
                comment: e.target.comment.value,
                "createdAt": newTime,
                "user-name": JSON.parse(localStorage.getItem('userData')).firstName + " " + JSON.parse(localStorage.getItem('userData')).lastName
            }
        ]);
    }

    useEffect(() => {
        //check if comments changed
        if(productRawInformation.comments) {
            if(productRawInformation.comments.length !== productInformation.comments.length) {
                UpdateProduct(productId, productRawInformation).then(response => {
                    if(response.status === 200) {
                        swal('موفقیت', 'نظر شما با موفقیت ثبت شد', 'success');
                    }
                }).catch(error => {
                    swal('خطا', 'مشکلی در ثبت نظر به وجود آمده است', 'error');
                });
            }
        }
        
    }, [productRawInformation]);

    return (
        <div className="contentWithHeaderAndFooter">

            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${productInformation['product-name-fa']} | ${process.env.REACT_APP_WEBSITE_NAME}`}</title>
                <meta name="description" content={`${productInformation['product-name-fa']} %REACT_APP_WEBSITE_NAME%`} />
            </Helmet>

            <Header/>

            {productId && productInformation.id ?
                <Fragment>
                    

                    <div className={Styles.productContainer}>
                        
                        <div className={Styles.productHeader}>
                            <div className={Styles.productImage}>
                                <SwiperSlider
                                    dir='ltr'
                                    width={'100%'}
                                    effect={"cards"}
                                    height={'100%'}
                                    borderRadius={'1rem'}
                                    navigationIcon={false}
                                    grabCursor={true}
                                    items={productSliderItems}
                                    modules={[Autoplay, Pagination, EffectCards]}
                                />
                            </div>

                            <div className={Styles.productInfo}>
                                <h1>{productInformation['product-name-fa']}</h1>
                                <h3>{productInformation['product-name-en']}</h3>
                                <hr/>
                                <p className={Styles.productMiniDesc} dangerouslySetInnerHTML={{ __html: productInformation.description.fa}}></p>
                                
                                <p className={Styles.productPrice}><hr/>
                                {
                                    productInformation.price['amount-discount'] > 0 ?
                                    <Fragment>
                                        <div className={Styles.productPriceBox}>
                                            <span>قیمت : </span>
                                            <span style={{color: 'red', textDecoration: 'line-through'}}>
                                                <span style={{color: 'black'}}>{ShowPrice(productInformation.price.amount, true)}</span>
                                            </span>
                                            <span>{ShowPrice(String(productInformation.price.amount - productInformation.price['amount-discount']), true)} تومان</span>
                                        </div>
                                    </Fragment>
                                    :
                                    <span>{ShowPrice(productInformation.price.amount, true)} تومان</span>
                                } </p>
                            </div>

                            <div className={Styles.productAdd}>
                                <form onSubmit={addToCard}>
                                    {productInformation.count > 0 ?
                                    <Fragment>
                                        <Select options={colorOoptions} name="color" placeholder="انتخاب رنگ ..."/>
                                        <Select options={garantyOptions} name="garanty" placeholder="انتخاب گارانتی ..."/>
                                        <Input type="number" name="productCounter" id="productCounter" min={1} max={ +productInformation.count }  placeholder="تعداد ..." defaultValue={1}/>
                                        <Button text="افزودن به سبد خرید" type='success' size='small' borderRadius/>
                                    </Fragment>
                                    :
                                        <p className={Styles.productNotAvailable}>موجود نمی باشد</p>
                                    }
                                </form>
                            </div>
                        </div>

                        <div className={Styles.productDescription}>
                        <Tabs direction={'rtl'}>
                            <TabList>
                                <Tab style={{fontSize: '1.5rem', fontWeight: '600'}}>توضیحات محصول</Tab>
                                <Tab style={{fontSize: '1.5rem', fontWeight: '600'}}>مشخصات فنی</Tab>
                                <Tab style={{fontSize: '1.5rem', fontWeight: '600'}}>نظرات</Tab>
                            </TabList>

                            <TabPanel>
                                <br/>
                                <p className={Styles.productDesc} dangerouslySetInnerHTML={{ __html: productInformation.description.fa}}></p>
                            </TabPanel>
                            <TabPanel>
                                <table>
                                    {
                                        productInformation.properties.map((property, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{property['name-fa']}</td>
                                                    <td>{property.value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <div className={Styles.addComment}>
                                    {/*check used logeed in to add comment*/}
                                    {
                                        localStorage.hasOwnProperty('ACCESS_TOKEN') && ( localStorage.getItem('ACCESS_TOKEN') !== null || localStorage.getItem('ACCESS_TOKEN') !== "" ) && localStorage.getItem('IS_LOGGED_IN') == 'true' ?
                                        <Fragment>
                                            <form onSubmit={addComment}>
                                                <Input type="text" name="comment" id="comment" placeholder="نظر خود را بنویسید ..."/>
                                                <Button text="ارسال نظر" type='success' size='small' borderRadius/>
                                            </form>
                                        </Fragment>
                                        : 
                                        <Fragment>
                                            <p>برای ثبت نظر باید وارد شوید</p>
                                            <Navigation link={'/login'} text="ورود" internal />
                                        </Fragment>
                                    }
                                </div>
                                {
                                    comments.length > 0 ?
                                    comments.map((comment, index) => {
                                        return (
                                            <div className={Styles.productComment} key={index}>
                                                <div>
                                                    <p className={Styles.productCommentHeader}>
                                                        <span className={Styles.productCommentName}>{comment['user-name']}</span>
                                                        <span> در تاریخ </span>
                                                        <span className={Styles.productCommentDate}>{convertMiladiToShamsi(new Date(comment.createdAt).getFullYear(), new Date(comment.createdAt).getMonth() + 1, new Date(comment.createdAt).getDate())}</span>
                                                        <span> نوشت : </span>
                                                    </p>
                                                </div>
                                                <p className={Styles.productCommentText}>{comment.comment}</p>
                                            </div>
                                        )
                                    }) :
                                    <p className={Styles.productNoComment}>نظری برای این محصول ثبت نشده است</p>
                                }
                            </TabPanel>
                        </Tabs>
                        </div>

                    </div>


                </Fragment>
                :
                <Fragment>

                    <div className={animationStyle.area}>
                        <ul className={animationStyle.circles}>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                
                    <div className={Styles.notFoundBox}>
                        <h1>محصول مورد نظر یافت نشد</h1>
                        <Button click={() => nav('/')} text='بازگشت به صفحه اصلی' type='danger' borderRadius size='small'/>
                    </div>
                </Fragment>
            }

        <Footer/>
        </div>
    );
};
