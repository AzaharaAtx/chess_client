import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leagues } from './Leagues';

import '../Styles/homepage.css';
import LogoutButton from '../Component/Logout';



export const Dashboard = () => {
    const [showLeagues, setShowLeagues] = useState(false);

    return (
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/homepage">Homepage</Link>
                <Link className="navigation-menu-link" to="/about">Profile</Link>
                <LogoutButton /> 
            </div>
            <br />
            <div>
                {showLeagues && <Leagues />}
                <button className='show-leagues-button' onClick={() => setShowLeagues(!showLeagues)}>
                {showLeagues ? 'Hide ' : 'Show Open Leagues'}
                </button>
            </div>
        </div>
        );
};


export default Dashboard;
