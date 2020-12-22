import { React, useState } from 'react';
import { withRouter } from 'react-router-dom';

import ctsLogo from '../../assets/images/image.png'
import './LoginPage.styles.scss';
import CustomButton from '../../components/customButton/customButton.component';
import { userValidate } from '../../services/poServices';
import { setUserSession, getToken } from '../../utils/common';

const LoginPage = ({ history }) => {
    const [user, setUser] = useState({
        userId: '',
        password: ''
    });
    const handleChange = (e) => {
        let { name, value } = e.target;
        setUser({
            ...user, [name]: value
        })
    };
    const onClickHandler = () => {
        userValidate(user).then(res => {
            setUserSession(res.token, res.user);
            history.push('/')
        });

    }
    return (<div className="login-container">
        {/* <h3>I already have an Account</h3> */}
        <img className="cts-login-logo" src={ctsLogo} alt="Logo" />
        <h3 className="login-header">Login with your Id and password</h3>
        <form>
            <div>
                <p>Test User Id - 185596</p>
                <p>Test password - 17$IFTzbuYqP</p>
            </div>
            <div className="form-group">
                <label htmlFor="userId" className="form-input-label">Enter Your Id</label>
                <input className="form-input" onChange={handleChange} name="userId" id="userId" type="text" placeholder="user id" />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-input-label">Enter Your Password</label>
                <input className="form-input" id="password" name="password" onChange={handleChange} type="password" placeholder="password" />
            </div>
            <CustomButton login onClickHandler={onClickHandler}>LOGIN</CustomButton>
        </form>
    </div>)
}

export default withRouter(LoginPage);


