import React from 'react';

import './customButton.styles.scss';
const CustomButton =({children,login,onClickHandler})=>(
    <button className={`${login?'login':'upload-button '} custom-button`} type="button" onClick={onClickHandler}>
        {children}
    </button>
);
export default CustomButton;