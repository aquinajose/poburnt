import { React, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import ctsLogo from '../../assets/images/image.png';
import './LoginPage.styles.scss';
import CustomButton from '../../components/customButton/customButton.component';
import CustomFormInput from '../../components/customFormInput/customFormInput.component';
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
            <CustomFormInput label="User Name" handleChange={handleChange} name="username" id="username" type="text" placeholder="user name"/>
            <CustomFormInput label="Password"  id="password" name="password" onChange={handleChange} type="password" placeholder="password" onKeyPress={e => onKeyPressHandler(e)}/>

            <CustomButton loginSignup onClickHandler={onClickHandler} >LOGIN</CustomButton>
            <Link to="/signup" className="sign-up--link">Don't have an Account? Click here to create One</Link>
        </form>
    </div>)
}

export default withRouter(LoginPage);


