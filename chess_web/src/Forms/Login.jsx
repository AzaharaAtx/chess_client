import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login_check", {
                email: email,
                password: pass,
                
            });
            console.log(response.data);
            // Verificar si la solicitud fue exitosa
            if (response.status === 200) {
                console.log("Usuario logueado exitosamente:", response.data);
                // redirigir a otra página o mostrar un mensaje de éxito aquí
                navigate('./Dashboard', {
                    replace: true,
                    state: {
                        logged: true
                    },
                });
            } else {
                console.log("Error al loguear usuario:", response.data);
                // mostrar un mensaje de error o realizar otras acciones
            }
        } catch (error) {
            //Errores
            console.error("Fail to send data", error);
        }

        onResetForm();
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
                />
                <label htmlFor="password">Password </label>
                <input 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    placeholder="*******" 
                    id="password" 
                    name="password" 
                    required 
                />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don´t have an account? Sing up here!</button>
        </div>
    )
}