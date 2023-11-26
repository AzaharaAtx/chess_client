import React, { useState } from "react"

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }


    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label for="email">Email </label>
                <input value={email} type="email" placeholder="youremail@domain.com" id="email" name="email" />
                <label for="password">Password </label>
                <input value={pass} type="password" placeholder="*******" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don´t have an account? Sing up here!</button>
        </div>
    )
}