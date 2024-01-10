import React, { useContext } from 'react';
import AuthContext from '../Router/AuthProvider';
import { useNavigate } from 'react-router-dom';

import '../Styles/homepage.css';


const LogoutButton = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await setAuth({}); 
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button className="navigation-menu-link" id='btn-link' onClick={handleLogout}>
            Log Out
        </button>
    );
};

export default LogoutButton;
