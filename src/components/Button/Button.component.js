import PropTypes from 'prop-types';
import React from 'react';
import Styles from "assets/styles/components/Button/Button.module.css";

export const Button = (props) => {
    return (
        <button className=
        {`
            ${Styles.btn}
            ${Styles[`btn__color__${props.type}`]}
            ${Styles[`btn__size__${props.size}`]}
            ${props.borderRadius ?  Styles.btn__borderRadius : ''}
        `}
        onClick={props.click}>

        {props.leftIcon}
        {props.text}
        {props.righIcon}

        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    click: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' ]).isRequired,
    size: PropTypes.oneOf(['small', 'normal', 'large', 'xlarge', 'xxlarge' ]).isRequired,
    borderRadius: PropTypes.bool,
    leftIcon: PropTypes.element,
    righIcon: PropTypes.element
};