import React, { Fragment, useEffect, useState } from 'react';
import Styles from "./Basket.page.module.css";
import swal from 'sweetalert';
import { BsBasket2 } from 'assets/images/icons';
import { Button, Input, Navigation, Table } from 'components';
import { Footer, Header } from 'layouts';
import { GET_PRODUCT } from 'configs/url.config';
import { GetProduct } from 'api/Product.api';
import { Helmet } from 'react-helmet';
import { ShowPrice } from 'utils/functions.util';
import { addToCart, adjustQuantity, removeFromCart } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

export const BasketPage = (props) => {

    const { addToast } = useToasts();
    const customDispatch = useDispatch();
    const basketProducts = useSelector(state => state.shoppingReducer.card);
    const [tableData, setTableData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const basketTableHeader = [
        {
            Header: 'کد کالا',
            accessor: 'id'
        },
        {
            Header: 'کالا',
            accessor: 'productName',
            Cell: (value) => {
                return (
                    <Navigation link={`${GET_PRODUCT}/${value.row.original.id}`} text={value.row.original.productName} internal />
                )
            }

        },
        {
            Header: "قیمت",
            accessor: "price"
        },
        {
            Header: "رنگ",
            accessor: "colorHex",
            Cell: (value) => {
                return (
                    <div style={{
                        backgroundColor: value.row.original.colorHex,
                        borderRadius: "0.5rem",
                        padding: "0.5rem",
                        border: "0.1rem solid #e0e0e0"
                        }}>
                        <span style={{ filter: "contrast(0.5)"}}>{value.row.original.colorName}</span>
                    </div>
                )
            }
        },
        {
            Header: 'تعداد',
            accessor: 'count',
            Cell: (value) => {
                return (
                    <Input
                        id='count'
                        type="number"
                        defaultValue={value.value}
                        min={1}
                        max={value.row.original.defaultCount}
                        onKeyDown={(e) => {e.preventDefault() }}
                        onChange={(e) => {
                            customDispatch(adjustQuantity(value.row.original.id, Number(e.target.value)));
                        }}
                    />
                )
            }
        },
        {
            Header: 'حذف',
            accessor: 'delete',
            Cell: (value) => {
                return (
                    <Button type='danger' size='small' text='حذف' click={(e) => {
                        e.preventDefault();
                        removeProductFroneBasket(value.row.original.id);
                    }}/>
                );
            }
        }
    ];

    useEffect(() => {
        if(basketProducts.length > 0) {

            let tempTableData = [];
            let tempProduct = {};

            basketProducts.map(product => {

                GetProduct(product.productId).then(res => {

                    tempProduct = {
                        id: res.data.id,
                        productName: res.data['product-name-fa'],
                        price: ShowPrice(res.data.price.amount, true) + " تومان",
                        defaultPrice: res.data.price.amount,
                        count: product.quantity,
                        defaultCount: res.data.count,
                        colorHex: res.data.colors.find(color => color.id === product.colorId).hex,
                        colorName: res.data.colors.find(color => color.id === product.colorId)["color-name-fa"],
                        colorId: product.colorId,
                        garantyId: product.garantyId
                    };
                    
                }).then(() => {
                    tempTableData.push(tempProduct);
                }).then(() => {
                    if(tempTableData.length === basketProducts.length) {
                        setTotalPrice(tempTableData.reduce((total, product) => {
                            return total + product.count * product.defaultPrice;
                        }, 0));
                        setTableData(tempTableData);
                    }
                });

            });

        }
    }, [basketProducts]);

    const removeProductFroneBasket = (id) => {
        swal({
            title: "آیا مطمئن هستید؟",
            text: "بعد از حذف این محصول از سبد خرید شما خارج خواهد شد!",
            icon: "warning",
            buttons: {
                cancel: "خیر",
                catch: "بله"
            },
            dangerMode: true,
            className: Styles.sweetAlertDeleteProduct
        })
        .then((willDelete) => {
            if (willDelete) {
                customDispatch(removeFromCart(id));
                addToast("کالا با موفقیت از سبد خرید حذف شد", {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                });
            }
        });
    }

    return (
        <div className="contentWithHeaderAndFooter">
            <Header/>

            <Helmet>
                <title>{`سبد خرید | تعداد محصولات ${basketProducts.length}`}</title>
                <meta name="description" content={`سبد خرید فروشگاه اینترنتی فون نت | تعداد محصولات ${basketProducts.length}`} />
            </Helmet>

            <div className={Styles.basketPage}>
                {
                    basketProducts && basketProducts.length > 0 ?

                        <Fragment>
                            <div className={Styles.basketTable}>
                                <Table
                                    columns={basketTableHeader}
                                    data={tableData}
                                    className={Styles.ordersTable}
                                    sorting
                                    pagination
                                    filtering
                                />
                            </div>

                            <div className={Styles.basketTotal}>
                                <div className={Styles.basketTotalText}>
                                    <span>جمع کل : </span>
                                    <span>{ShowPrice(String(totalPrice), true)} تومان</span>
                                </div>
                                <Button type='success' size='large' text='تکمیل خرید' click={(e) => {
                                    e.preventDefault();
                                    console.log(basketProducts);
                                }}/>
                            </div>

                        </Fragment>
                        :
                        <div className={Styles.noProductMessage}>
                            <h1>سبد خرید خالی است <BsBasket2/> </h1>
                        </div>
                }
            </div>

            <Footer/>
        </div>
    );
};
