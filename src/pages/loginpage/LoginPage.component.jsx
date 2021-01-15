import { React, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import ctsLogo from '../../assets/images/image.png'
import './LoginPage.styles.scss';
import CustomButton from '../../components/customButton/customButton.component';
import { userValidate } from '../../services/poServices';
import { setUserSession, getToken } from '../../utils/common';


const LoginPage = ({ history }) => {
    const [user, setUser] = useState({
        username: '',
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
    const onKeyPressHandler = (e) => {
        if (e.code == "Enter") {
            onClickHandler();
        }

    }
    return (<div className="login-container">
        <img className="cts-login-logo" src={ctsLogo} alt="Logo" />
        <h3 className="login-header">Login with your User name and password</h3>
        <form>
            <div className="form-group">
                <label htmlFor="userId" className="form-input-label">Enter Your User Name</label>
                <input className="form-input" onChange={handleChange} name="username" id="username" type="text" placeholder="user name" />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-input-label">Enter Your Password</label>
                <input className="form-input" id="password" name="password" onChange={handleChange} type="password" placeholder="password" onKeyPress={e => onKeyPressHandler(e)} />
            </div>
            <CustomButton loginSignUp onClickHandler={onClickHandler} >LOGIN</CustomButton>
            <Link to="/signup" className="sign-up--link">Don't have an Account? Click here to create One</Link>
        </form>
    </div>)
}

export default withRouter(LoginPage);


