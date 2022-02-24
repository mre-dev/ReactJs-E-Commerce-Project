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
            onBlur={props.onBlur}
            onDoubleClick={props.onDoubleClick}
            readOnly={props.readOnly}
            onFocus={props.onFocus}
            checked={props.checked}
            defaultChecked={props.defaultChecked}
            onClick={props.click}
            multiple={props.multiple}
            accept={props.accept}
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
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onDoubleClick: PropTypes.func,
    readOnly: PropTypes.bool,
    onFocus: PropTypes.func,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    click: PropTypes.func,
    multiple: PropTypes.bool,
    accept: PropTypes.string
};