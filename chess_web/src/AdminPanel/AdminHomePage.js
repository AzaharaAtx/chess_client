import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';
import '../Styles/homepage.css';


export const AdminHomePage = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => { 
        setAuth({});
        navigate('/');
    }


    return (
        <div className="home-page-container">
            <h1>This is AdminHomePage</h1>
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/leaguecontroller">Leagues</Link>
                <Link className="navigation-menu-link" to="/about">About</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
            </div>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

export default AdminHomePage;