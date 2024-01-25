import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../Hook/useForm";
import useAuth from "../Router/useAuth.js";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export const Login = (props) => {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [token, setToken] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
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
                localStorage.setItem('id', id);

                setToken(token);
                setWelcomeMessage(`Hola, ${username}.`);

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
            setShowAlert(true);
        }

        onResetForm('');
    }

    const handleClickOutside = () => {
        setShowAlert('');
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
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
                        autoComplete="off" />
                    <label htmlFor="password">Password </label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="*******"
                        id="password"
                        name="password"
                        required
                        autoComplete="off" />
                    <button className="button" type="submit">
                        Log In
                    </button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don´t have an account? Sing up here!</button>
                {showAlert && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">Credenciales incorrectas. Por favor, inténtalo de nuevo.</Alert>
                    </Stack>
                )}
            </div>
        </>
    )
}