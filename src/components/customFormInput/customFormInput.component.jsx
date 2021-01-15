import React from 'react';

import './customFormInput.scss';

const CustomFormInput = ({id,label,handleChange, ...otherProps}) => {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-input-label">Enter Your {label}</label>
            <input className="form-input" id={id}  onChange={(e) => handleChange(e)} {...otherProps} />
        </div>

    )
}

export default CustomFormInput;