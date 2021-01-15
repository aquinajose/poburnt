import React, { useState } from 'react';
import CustomButton from '../../components/customButton/customButton.component';
import './SignUpPage.styles.scss';
import { userSignUp } from '../../services/poServices';
import ctsLogo from '../../assets/images/image.png'


const SignUpPage = () => {
    const [user, setUser] = useState({
        username: '',
        userId: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        });
        console.log(user)
    };
    const onClickHandler = () => {
        if (user.password !== user.confirmPassword) {
            alert("Password didnt match");
        }
        userSignUp(user.username, user.userId, user.password).then(res => {
            console.log(res)
        })
    }
    return (
        <div className="sign-up-container">
            <img className="cts-login-logo" src={ctsLogo} alt="Logo" />
            <h3 className="login-header">Sign Up with  User name and password</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="username" className="form-input-label">Enter Your User Name</label>
                    <input className="form-input" onChange={handleChange} name="username" id="username" type="text" placeholder="user name" />
                </div>
                <div className="form-group">
                    <label htmlFor="userId" className="form-input-label">Enter Your Emp Id</label>
                    <input className="form-input" onChange={handleChange} name="userId" id="userId" type="text" placeholder="Employee Id" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-input-label">Enter Your Password</label>
                    <input className="form-input" id="password" name="password" onChange={handleChange} type="password" placeholder="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cconfirmPassword" className="form-input-label">Confirm Password</label>
                    <input className="form-input" id="confirmPassword" name="confirmPassword" onChange={handleChange} type="password" placeholder="confirm password" />
                </div>
                <CustomButton loginSignup onClickHandler={onClickHandler} >SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUpPage;