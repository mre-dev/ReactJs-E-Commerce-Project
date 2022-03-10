import React, { useEffect } from 'react';
import Styles from './PaymentStyle.module.css';
import { Button } from 'components';
import { Footer, Header } from 'layouts';
import { GetProduct, UpdateProduct } from 'api/Product.api';
import { Helmet } from 'react-helmet';
import { PATHS } from 'configs/routes.config';
import { VscError, GiConfirmed } from 'assets/images/icons';
import { addOrder } from 'api/updateOrder';
import { clearCart, deleteOrder } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentPage = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const Nav = useNavigate();
    const customDispatch = useDispatch();
    const orderInformation = useSelector(state => state.orderReducer);

    useEffect(() => {
        if(searchParams.get('status') == 'success') {
            orderInformation.products.map((item) => {
                GetProduct(item.productId).then((response) => {
                    if(response.status == 200) {
                        const data = response.data;
                        data.count -= item.quantity;
                        UpdateProduct(item.productId, data).then((response) => {
                            if(response.status == 200) {
                                addOrder(orderInformation).then((response) => {
                                    if(response.status == 201) {
                                        customDispatch(deleteOrder());
                                        customDispatch(clearCart());
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    }, [searchParams]);

    return (
        <div className="contentWithHeaderAndFooter">
            <Helmet>
                <title>{process.env.REACT_APP_WEBSITE_NAME} | وضعیت پرداخت</title>
            </Helmet>

            <Header />

            <div className="content">
                {
                    searchParams.get('status') == 'success' ?
                        <div className={Styles.paymentSuccess}>
                            <GiConfirmed />
                            <h1>پرداخت با موفقیت انجام شد</h1>
                            <p>
                                با تشکر از شما برای خرید . سفارش شما با موفقیت انجام شد.
                                برای دیدن اطلاعات سفارش به پنل کاربری خود مراجعه نمایید.
                            </p>
                            <Button borderRadius text="بازگشت به صفحه اصلی" type="success" size='small' click={() => Nav('/')} />
                        </div>
                        :
                        <div className={Styles.paymentFailure}>
                            <VscError />
                            <h1>پرداخت با موفقیت انجام نشد</h1>
                            <p>
                                هنگام انجام عملیات پرداخت به مشکلی برخورد کردید.
                                لطفا دوباره تلاش کنید یا با مدیر سایت تماس بگیرید.
                            </p>
                            <Button borderRadius text="مشاهده سبد خرید" type="dark" size='small' click={() => { Nav(PATHS.BASKET); }} />
                        </div>
                }
            </div>

            <Footer />
        </div>
    );
};
