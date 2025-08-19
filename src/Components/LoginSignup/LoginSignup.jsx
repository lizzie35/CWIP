import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

import user_icon from '../Assets/person.jpg';
import email_icon from '../Assets/email.jpg';
import password_icon from '../Assets/password.jpg';

const LoginSignup = () => {

    const [action, setAction] = useState("Login");
    const navigate = useNavigate(); // Add navigation to the page

    const handleLogin = () => {
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    return (
        <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action === "Login" ? null : (
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input type="text" placeholder="Name" />
                </div>
            )}
            <div className="input">
                <img src={email_icon} alt=""/>
                <input type="email" placeholder="Email id" />
            </div>
            <div className="input">
                <img src={password_icon} alt=""/>
                <input type="password" placeholder="Password" />
            </div>
        </div>
        {action === "Login" && (
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
        )}
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={handleLogin}>Login</div>
        </div>
        </div>
    );
};

export default LoginSignup;

