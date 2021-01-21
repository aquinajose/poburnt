import React, { useState } from 'react';
import CustomButton from '../../components/customButton/customButton.component';
import CustomFormInput from '../../components/customFormInput/customFormInput.component';
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
    const [error, setError] = useState('');
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
        if(user.username===''||user.password===''||user.userId===''||user.confirmPassword===''){
            setError('Please Provide username,userId and password')
            return;
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
                <CustomFormInput label="User Name" handleChange={handleChange} name="username" id="username" type="text" placeholder="user name"/>
                <CustomFormInput label="Emp Id" handleChange={handleChange} name="userId" id="userId" type="text" placeholder="Employee Id" />
                <CustomFormInput label="Password" handleChange={handleChange} name="password" id="password" type="password" placeholder="password"/>
                <CustomFormInput label="Confirm Password" handleChange={handleChange}name="confirmPassword" id="confirmPassword" type="password" placeholder="confirm password" />
                {error && <p className="error">{error}</p>}
                <CustomButton loginSignup onClickHandler={onClickHandler} >SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUpPage;