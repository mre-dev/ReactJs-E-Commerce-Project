import PropTypes from 'prop-types';
import React from 'react';
import Styles from "assets/styles/components/Input/Input.module.css";

export const Input = (props) => {
    return (
        <input
            value={props.value}
            onChange={props.onChange}
            className={Styles.input}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            required={props.required}
            disabled={props.disabled}
            min={props.min}
            max={props.max}
            defaultValue={props.defaultValue}
        />
    );
};

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.string
};