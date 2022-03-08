import PropTypes from 'prop-types';
import React from 'react';
import Styles from "assets/styles/components/ProductCard/ProductCard.module.css";
import { GetProduct, UpdateProduct } from 'api/Product.api';
import { MdAddShoppingCart, CgDetailsMore, GiTechnoHeart, BsBookmarkPlus } from 'assets/images/icons';
import { Navigation } from 'components';
import { PATHS } from 'configs/routes.config';
import { ShowPrice } from 'utils/functions.util';
import { addToCart } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

export const ProductCard = (props) => {
    const Nav = useNavigate();
    const { addToast } = useToasts();

    const customDispatch = useDispatch();
    const ShoppingReducer = useSelector(state => state.shoppingReducer);

    return (
        <div className={Styles.productContainer}>
            <Navigation text={<img src={process.env.REACT_APP_BASE_URL + "/files/" + props.image} alt={props.title}/>} link={PATHS.PRODUCT + "/" + props.id} internal />
            
            <div className={Styles.productInfo}>
                <h3><Navigation text={props.title} link={PATHS.PRODUCT + "/" + props.id} internal /></h3>
                <hr/>
                <p>{ShowPrice(props.price, true)} تومان</p>
            </div>

            <div className={Styles.productButtons}>
                <GiTechnoHeart onClick={(e) => {
                    e.preventDefault();
                    GetProduct(props.id).then(res => {
                        if(res.status === 200) {
                            UpdateProduct(res.data.id, {
                                ...res.data,
                                likes: res.data.likes + 1
                            }).then(res1 => {
                                if(res1.status === 200) {
                                    addToast("ممنون که این محصول رو پسندیدی", {
                                        appearance: 'success',
                                        autoDismiss: true,
                                        autoDismissTimeout: 5000,
                                    });
                                }
                            });
                        }
                    });
                }} />
                <span className={Styles.GiTechnoHeart}>پسندیدم ✌️💖</span>
                <BsBookmarkPlus onClick={(e) => {
                    e.preventDefault();
                    if(localStorage.hasOwnProperty("IS_LOGGED_IN") && localStorage.getItem("IS_LOGGED_IN") == "true" && localStorage.hasOwnProperty("ACCESS_TOKEN") && localStorage.hasOwnProperty("userData")) {
                        addToast("محصول به لیست علاقه مندی ها اضافه شد", {
                            appearance: 'success',
                            autoDismiss: true,
                            autoDismissTimeout: 5000,
                        });
                    } else {
                        addToast("برای ذخیره کردن محصول باید وارد حساب کاربری خود شوید", {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 5000,
                        });
                    }
                }}/>
                <span className={Styles.BsBookmarkPlus}>افزودن به بوک مارک</span>

                <MdAddShoppingCart onClick={() => {

                    GetProduct(props.id).then(res => {
                        if(res.status === 200) {
                            // check if count equal to zero, toast message
                            if(res.data.count === 0) {
                                addToast("محصول مورد نطر موجود نیست", {
                                    appearance: 'warning',
                                    autoDismiss: true,
                                    autoDismissTimeout: 5000,
                                });
                                return;
                            }

                            const isItemInCart = ShoppingReducer.card.find(item => item.productId === res.data.id);

                            if(isItemInCart) {
                                if(isItemInCart.quantity < res.data.count) {
                                    customDispatch(addToCart(res.data.id));
                                    addToast("محصول به سبد خرید اضافه شد", {
                                        appearance: 'success',
                                        autoDismiss: true,
                                        autoDismissTimeout: 5000,
                                    });
                                } else {
                                    addToast("تمام موجودی محصول انتخاب شده است", {
                                        appearance: 'error',
                                        autoDismiss: true,
                                        autoDismissTimeout: 5000,
                                    });
                                }
                            } else {
                                customDispatch(addToCart(res.data.id));
                                addToast("محصول به سبد خرید اضافه شد", {
                                    appearance: 'success',
                                    autoDismiss: true,
                                    autoDismissTimeout: 5000,
                                });
                            }

                        } else {
                            addToast("محصول در دسترس نیست", {
                                appearance: 'error',
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                            });
                        }
                    });

                }}/>
                <span className={Styles.MdAddShoppingCart}>افزودن به سبد خرید</span>

                <CgDetailsMore onClick={() => {
                    Nav(PATHS.PRODUCT + "/" + props.id);
                }}/>
                <span className={Styles.CgDetailsMore}>مشاهده جزئیات</span>
            </div>

        </div>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
};