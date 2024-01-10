import React, { useContext, useState } from "react";
import axios from "axios";
import "./Form.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../Hook/useForm";
import useAuth from "../Router/useAuth.js";


export const Login = (props) => {
    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [token, setToken] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');


    const navigate = useNavigate();
    
    const {onResetForm} = useForm();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login_custom", {
                email: email,
                password: pass,
                
            });
            if (response.status === 200) {

                console.log("Usuario logueado exitosamente:", response.data);

                const roles = response.data[0];
                const id = response.data[1];
                const token = response.data[2];
                const name = response.data[3];
                const username = response.data[4];


                localStorage.setItem('jwt_token', token);
                localStorage.setItem('username_in_chess', username);
                localStorage.setItem('full_name', name);

                setToken(token);
                setWelcomeMessage(`Hola, ${username}.`);

                console.log(token);
                console.log(username);
                console.log(roles.includes('ROLE_ADMIN'));
                console.log(roles, id);

                if (roles.includes('ROLE_ADMIN')) {
                    setAuth({ email, pass, roles }) 
                    navigate('/adminhomepage', { replace: true });
                } 
                else {
                    setAuth({ email, pass, roles })
                    navigate('/homepage', { replace: true });
                }

            } else {
                console.log("Error al loguear usuario:", response.data);
            }
        } catch (error) {
            console.error("Fail to send data", error);
        }

        onResetForm('');
    }


    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email </label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="youremail@domain.com" 
                    id="email" 
                    name="email" 
                    required
                    autoComplete="off" 
                />
                <label htmlFor="password">Password </label>
                {/* <div className="input-container"> */}
                    <input 
                        value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                        type="password" 
                        placeholder="*******" 
                        id="password" 
                        name="password" 
                        required 
                        autoComplete="off"
                    />
                    <button className="button" type="submit">Log In</button>
                {/* </div> */}
                
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don´t have an account? Sing up here!</button>
        </div>
    )
}