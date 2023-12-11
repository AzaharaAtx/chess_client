import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';

import '../Styles/homepage.css';


export const Analytics = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    // crear logout endpoint
    const logout = async () => { 
        setAuth({});
        navigate('/');
    }
    
    return (
        <div className="home-page-container">
            <h1>Analytics</h1>
            
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/dashboard">Dashboard</Link>
                <Link className="navigation-menu-link" to="/about">About</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
            </div>
            <p>You are logged in!</p>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

export default Analytics;

