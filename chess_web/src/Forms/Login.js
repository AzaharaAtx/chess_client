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

    // Obtén la ruta de redirección desde el estado de la ubicación, o utiliza "/" como valor predeterminado
    const navigate = useNavigate();
    const location = useLocation();

    // const from = location.state?.from?.pathname || "/"; //--> Pq no funciona cuando le sale de ahi -.-
    // console.log(from);
    const {onResetForm} = useForm();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login_custom", {
                email: email,
                password: pass,
                
            });
    
            // Verificar estado solicitud
            if (response.status === 200) {
                console.log("Usuario logueado exitosamente:", response.data);
                    // redirigir a otra página o mostrar un mensaje de éxito aquí
                const roles = response.data[0];
                console.log(roles.includes('ROLE_ADMIN'));
                console.log(roles);

                if (roles.includes('ROLE_ADMIN')) {
                    setAuth({ email, pass, roles }) 
                    navigate('/adminhomepage', { replace: true });
                } 
                else {
                    setAuth({ email, pass, roles })
                    navigate('/homepage', { replace: true });
                }
                // setAuth({ email, pass, roles })

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
                    autoComplete="off" 
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
                    autoComplete="off"
                />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don´t have an account? Sing up here!</button>
        </div>
    )
}