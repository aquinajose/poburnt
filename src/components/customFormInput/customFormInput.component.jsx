import React from 'react';

import './customFormInput.scss';

const CustomFormInput = (handleChange, label, ...otherProps) => {

    return (
        <div className="form-group">
            {
                label ?
                    (<label className="form-input-label" htmlFor={label}>{label}</label>)
                    : null
            }
            <input className="form-input" id={label} name={label} onChange={(e) => handleChange(e)} {...otherProps} />
        </div>

    )
}

export default CustomFormInput;