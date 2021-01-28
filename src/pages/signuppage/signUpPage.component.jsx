import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import CustomButton from '../../components/customButton/customButton.component';
import CustomFormInput from '../../components/customFormInput/customFormInput.component';
import './SignUpPage.styles.scss';
import { userSignUp } from '../../services/poServices';
import ctsLogo from '../../assets/images/image.png'


const SignUpPage = ({history}) => {
    const [user, setUser] = useState({
        username: '',
        userId: '',
        password: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        });
    };
    const onClickHandler = () => {

        if(user.username===''||user.password===''||user.userId===''){
            setError('Please Provide username,userId and password')
            return;
        }
        userSignUp(user.username, user.userId, user.password).then(response => {
            if (response.status >= 200 && response.status <= 299) {
                history.push('/login');
                return
            } else {
                throw Error(response.statusText);
            }
        }).catch(error=>{
            console.log(error.response);
            setError(error.response.data.split(" ").slice(2).join(" "))
        });
    }
    return (
        <div className="sign-up-container">
            <img className="cts-login-logo" src={ctsLogo} alt="Logo" />
            <h3 className="login-header">Sign Up with  User name and password</h3>
            <form>
                <CustomFormInput label="User Name" handleChange={handleChange} name="username" id="username" type="text" placeholder="user name"/>
                <CustomFormInput label="Emp Id" handleChange={handleChange} name="userId" id="userId" type="text" placeholder="Employee Id" />
                <CustomFormInput label="Password" handleChange={handleChange} name="password" id="password" type="password" placeholder="password"/>
                {error && <p className="error">{error}</p>}
                <CustomButton loginSignup onClickHandler={onClickHandler} >SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default withRouter(SignUpPage);