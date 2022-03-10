import React, { useEffect, useState } from 'react';
import Styles from "./Checkout.page.module.css";
import { Button, Input } from 'components';
import { Footer, Header } from 'layouts';
import { Helmet } from 'react-helmet';
import { englishNumber, persianNumber } from 'utils/functions.util';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object";
import { createOrder } from 'redux/actions';
import { GET_PRODUCTS } from 'configs/url.config';
import { GetProduct } from 'api/Product.api';

export const CheckoutPage = (props) => {

    const Nav = useNavigate();
    const customDispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin);
    const basket = useSelector(state => state.shoppingReducer);
    const [sendToDefaultAddress, setSendToDefaultAddress] = React.useState(true);
    const [dateValue, setDateValue] = useState(new Date());
    const [orderData, setOrderData] = useState({ products: []});
    const [totalPrice, setTotalPrice] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();

        const name = e.target.input_name.value;
        const family = e.target.input_family.value;
        const phone = englishNumber(e.target.input_phone.value);
        const address = e.target.input_address.value;

        let calculatedPrice = 0;
        basket.card.map((product, index) => {
            GetProduct(product.productId).then(res => {
                calculatedPrice += res.data.price.amount * product.quantity;
            }).then(() => {
                if (index === basket.card.length - 1) {
                    setTotalPrice(calculatedPrice);
                    setOrderData({
                        "user-id": userInfo.id,
                        status: "pending",
                        name: name,
                        family: family,
                        phone: phone,
                        address: address,
                        "total-price": totalPrice,
                        "delivery-date": new DateObject({ date: dateValue , calendar: persian}).format("YYYY/MM/DD"),
                        products: basket.card,
                        "map": {
                            "lat": "0",
                            "lng": "0"
                        },
                        "delivered-at": null
                    });
                }
            });
        });

    }

    useEffect(() => {
        if(orderData.products.length > 0 && totalPrice > 0) {
            customDispatch(createOrder({
                ...orderData,
                "total-price": totalPrice
            }));
            window.location.replace("http://localhost:5500/dargah.html");
        }
    }, [customDispatch, orderData, totalPrice])

    return (
        <div className="contentWithHeaderAndFooter">
            <Helmet>
                <title>{`${process.env.REACT_APP_WEBSITE_NAME} | نهایی کردن سبد خرید`}</title>
                <meta name="description" content="%REACT_APP_WEBSITE_NAME% | نهایی کردن سبد خرید" />
            </Helmet>

            <Header />

            {
                basket.card.length > 0 ?
                localStorage.hasOwnProperty('IS_LOGGED_IN') && localStorage.getItem('IS_LOGGED_IN') == 'true' ?
                    <div className={Styles.checkoutPage}>
                        <div className={Styles.checkoutPage__sendToDefault}>
                            <label className={Styles.checkoutPage__sendToDefault__label}> ارسال به آدرس پیشفرض </label>
                            <input type="checkbox" id="sendToDefaultAddressInput" name='sendToDefaultAddressInput' checked={sendToDefaultAddress} onChange={() => setSendToDefaultAddress(!sendToDefaultAddress)} />
                        </div>
                        <form onSubmit={handleChange}>
                            <div className={Styles.row}>
                                <div className={Styles.col}>
                                    <label>نام : </label>
                                    <Input name='input_name' id='input_name' type="text" defaultValue={userInfo.firstName} readOnly={sendToDefaultAddress} required/>
                                </div>
                                <div className={Styles.col}>
                                    <label>نام خانوادگی : </label>
                                    <Input name='input_family' id='input_family' type="text" defaultValue={userInfo.lastName} readOnly={sendToDefaultAddress} required />
                                </div>
                            </div>
                            <div className={Styles.row}>
                                <div className={Styles.col}>
                                    <div>
                                        <label>آدرس : </label>
                                        <Button text="انتخاب از نقشه" type="primary" size="small" disabled={sendToDefaultAddress} btnType="button" />
                                    </div>
                                    <textarea name='input_address' id='input_address' defaultValue={userInfo.address} readOnly={sendToDefaultAddress} required />
                                </div>
                                <div className={Styles.col}>
                                    <label>تلفن همراه : </label>
                                    <Input name='input_phone' id='input_phone' type="text" defaultValue={persianNumber(userInfo.phone)} readOnly={sendToDefaultAddress} required />
                                </div>
                            </div>
                            <div className={Styles.row}>
                                <div className={Styles.col}>
                                    <label>تاریخ ارسال : </label>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        weekPicker={false}
                                        value={dateValue}
                                        onChange={setDateValue}
                                        minDate={new DateObject({ calendar: persian })}
                                        disabled={sendToDefaultAddress}
                                        inputClass={Styles.custom_input}
                                    />
                                </div>
                                <div className={Styles.col}>
                                    <Button id='payBtn' text="پرداخت" type="primary" size="small" onClick={() => Nav(`${process.env.REACT_APP_PAYMENT_API_URL}/payment`)} btnType="submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                    :
                    <div className={Styles.loginBox}>
                        <h1>برای تکیمل خرید باید ابتدا وارد شوید</h1>
                        <div className={Styles.loginBox__buttons}>
                            <Button type='success' size='small' borderRadius text='ورود' click={(e) => {
                                e.preventDefault();
                                Nav('/login');
                            }} />
                            <Button type='success' size='small' borderRadius text='ثبت نام' click={(e) => {
                                e.preventDefault();
                                Nav('/register');
                            }} />
                        </div>
                    </div>
                :
                <div className={Styles.emptyBasket}>
                    <h1>سبد خرید شما خالی است</h1>
                    <Button type='success' size='small' borderRadius text='مشاهده محصولات' click={(e) => {
                        e.preventDefault();
                        Nav(GET_PRODUCTS);
                    }
                    } />
                </div>
            }

            <Footer />
        </div>
    );
};
