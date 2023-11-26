import React, { useState } from "react"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [full_name, setFull_name] = useState('');
    const [last_name, setLast_name] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label for="email">Email </label>
                <input value={email} type="email" placeholder="youremail@domain.com" id="email" name="email" />
                <label for="password">Password </label>
                <input value={pass} type="password" placeholder="*******" id="password" name="password" />
                <label for="full_name">Full Name </label>
                <input value={full_name} type="full_name" placeholder="Name" id="full_name" name="full_name" />
                <label for="last_name">Last Name </label>
                <input value={last_name} type="last_name" placeholder="Last name" id="last_name" name="last_name" />
                <button type="submit">Sing Up</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here!</button>
        </div>

    )
}