import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';
import { Leagues } from './Leagues';

export const Dashboard = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showLeagues, setShowLeagues] = useState(false);

    // crear logout endpoint
    const logout = async () => { 
        setAuth({});
        navigate('/');
    }

    return (
        <div className="home-page-container">
            <h1>Dashboard</h1>
            
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/homepage">Homepage</Link>
                <Link className="navigation-menu-link" to="/about">About</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
            </div>
            <p>You are logged in!</p>
            <div>
                {showLeagues && <Leagues />}
                <button onClick={() => setShowLeagues(!showLeagues)}>
                    {showLeagues ? 'Ocultar Ligas' : 'Mostrar Ligas'}
                </button>
            </div>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
            
        );
};


export default Dashboard;
