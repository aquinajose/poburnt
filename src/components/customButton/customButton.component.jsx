import React from 'react';

import './customButton.styles.scss';
const CustomButton =({children,loginSignup,onClickHandler})=>{
    return(
    <button className={`${loginSignup?'login':'upload-button '} custom-button`} type="button" onClick={onClickHandler} >
        {children}
    </button>
)};
export default CustomButton;