import React, { useState } from "react";
import axios from "axios";
import { useForm } from "../Hook/useForm";
import { useNavigate } from "react-router-dom";



export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [full_name, setFull_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const { onResetForm } = useForm();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://127.0.0.1:8000/user/register", {
                email: email,
                password: pass,
                last_name: last_name,
                full_name: full_name
            });
            console.log(response.data);
            //Respuesta API
            // Verificar si la solicitud fue exitosa
            if (response.status === 201) {
                console.log("Usuario registrado exitosamente:", response.data);
                // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
                navigate('/dashboard', {
                    replace: true,
                    state: {
                    logged: true
                    },
                });
            } else {
                console.log("Error al registrar usuario:", response.data);
                // Puedes mostrar un mensaje de error o realizar otras acciones
            }
        } catch (error) {
            //Errores
            console.error("Fail to send data", error);
        }
        onResetForm();
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email </label>
                <input value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="youremail@domain.com" 
                    id="email" 
                    name="email" 
                    required
                    autoComplete="off"
                />
                <label htmlFor="password">Password</label>
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
                <label htmlFor="last_name">Last Name </label>
                <input 
                    value={last_name} 
                    onChange={(e) => setLast_name(e.target.value)} 
                    type="last_name" 
                    placeholder="Last name" 
                    id="last_name" 
                    name="last_name" 
                    required 
                    autoComplete="off"
                />
                <label htmlFor="full_name">Name</label>
                <input 
                    value={full_name} 
                    onChange={(e) => setFull_name(e.target.value)} 
                    type="full_name" 
                    placeholder="Name" 
                    id="full_name" 
                    name="full_name" 
                    required 
                    autoComplete="off"
                />
                <button type="submit">Sing Up</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here!</button>
        </div>

    )
}