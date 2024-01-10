import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom";
import AuthContext from '../Router/AuthProvider';

import '../Styles/homepage.css';



export function UserController(){
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => { 
        setAuth({});
        navigate('/');
    }
    
    return (
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/leaguecontroller">Leagues</Link>
                <Link className="navigation-menu-link" to="/adminhomepage">Homepage</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
            </div>
            <br />
            <br />
            <div className="flexGrow">
                <button className='sign-out-button' onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

// https://codepen.io/force-framework/pen/MXwdvO 

export default UserController;
