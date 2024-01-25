import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import LogoutButton from '../Component/Logout';


import '../Styles/homepage.css';
import '../Styles/leaguesController.css';



export const UpdateUserComponent = () => {
    const [userData, setUserData] = useState({
        email: '',
        full_name: '',
        last_name: '',
        username_in_chess: '',
        password: '',
        friend_link: '',
        phone: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt_token');

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            };

            const editedData = Object.fromEntries(
                Object.entries(userData)
                    .filter(([key, value]) => value !== '' && value !== null)
            );

            const response = await axios.put("http://127.0.0.1:8000/api/user", editedData, { headers } );

            setUserData(response.data);
            
            console.log('Usuario actualizado:', response.data);

        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };
    

    return (
        <>
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/dashboard">Leagues</Link>
                <Link className="navigation-menu-link" to="/homepage">Homepage</Link>
                <LogoutButton className="navigation-menu-link" />
            </div>
        </div>
        <div className='containerForm'>
            <form className='leagueForm' onSubmit={handleSubmit}>
                <label className='labelLabel'>
                    Email:
                <input className="labelForm"
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange} />
                </label>
                <br />
                <label className='labelLabel'>
                    Nombre:
                <input className="labelForm"
                    type="text"
                    name="full_name"
                    value={userData.full_name}
                    onChange={handleChange} />
                </label>
                <br />
                <label className='labelLabel'>
                    Apellido:
                <input className="labelForm"
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange} />
                </label>
                <br />
                <label className='labelLabel'>
                    Nombre de usuario:
                <input className="labelForm"
                    type="text"
                    name="username_in_chess"
                    value={userData.username_in_chess}
                    onChange={handleChange} />
                </label>
                <br />
                <label className='labelLabel'>
                    Contraseña:
                <input className="labelForm"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange} />
                </label>
                <br />
                <label className='labelLabel'>
                    Enlace de amigo:
                <input className="labelForm"
                    type="text"
                    name="friend_link"
                    value={userData.friend_link}
                    onChange={handleChange} />
                </label>
                <br />
                <label className='labelLabel'>
                    Teléfono:
                <input className="labelForm"
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange} />
                </label>
                <br />
                <button className='btnLeague' type="submit">Actualizar Usuario</button>
            </form>
        </div>
        </>
    
    );

};

export default UpdateUserComponent;

