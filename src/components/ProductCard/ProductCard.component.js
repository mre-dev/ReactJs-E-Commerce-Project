import PropTypes from 'prop-types';
import React from 'react';
import Styles from "assets/styles/components/ProductCard/ProductCard.module.css";
import { Navigation } from 'components';
import { ShowPrice } from 'utils/functions.util';
import { PATHS } from 'configs/routes.config';
import { MdAddShoppingCart, CgDetailsMore, GiTechnoHeart, BsBookmarkPlus } from 'assets/images/icons';
import { useNavigate } from 'react-router-dom';

import { GetProduct, UpdateProduct } from 'api/Product.api';

import { useToasts } from 'react-toast-notifications';

export const ProductCard = (props) => {
    const Nav = useNavigate();
    const { addToast } = useToasts();

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
                <MdAddShoppingCart />
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