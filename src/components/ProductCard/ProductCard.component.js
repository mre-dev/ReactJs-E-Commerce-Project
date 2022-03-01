import PropTypes from 'prop-types';
import React from 'react';
import Styles from "assets/styles/components/ProductCard/ProductCard.module.css";
import { Navigation } from 'components';
import { ShowPrice } from 'utils/functions.util';
import { PATHS } from 'configs/routes.config';

export const ProductCard = (props) => {
    return (
        <div className={Styles.productContainer}>
            <Navigation text={<img src={process.env.REACT_APP_BASE_URL + "/files/" + props.image} alt={props.title}/>} link={PATHS.PRODUCT + "/" + props.id} internal />
            
            <div className={Styles.productInfo}>
                <h3><Navigation text={props.title} link={PATHS.PRODUCT + "/" + props.id} internal /></h3>
                <hr/>
                <p>{ShowPrice(props.price, true)} تومان</p>
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