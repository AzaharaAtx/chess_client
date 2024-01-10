import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leagues } from './Leagues';

import '../Styles/homepage.css';
import LogoutButton from '../Component/Logout';



export const Dashboard = () => {
    const [showLeagues, setShowLeagues] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState('');

    const handleClickOutside = (e) => {
        setWelcomeMessage('');
        const divMsg = document.querySelector('.div-msg');
        if (divMsg && !divMsg.contains(e.target)) {
            divMsg.style.display = 'none';
        }
    };

    useEffect(() => {
        const welcomeMessage = localStorage.getItem('username_in_chess');

        if (welcomeMessage) {
            console.log(welcomeMessage);

            setWelcomeMessage((`Welcome, ${welcomeMessage}!`));        
        }

        const clearLocalStorageTimer = setTimeout(() => {
            localStorage.removeItem('username_in_chess');
        }, 5000);

        const handleBeforeUnload = () => {
            localStorage.removeItem('username_in_chess');
            const divMsg = document.querySelector('.div-msg');
            if (divMsg) {
                divMsg.innerHTML = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('click', handleClickOutside);

        return () => {
            clearTimeout(clearLocalStorageTimer);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);

    return (
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/homepage">Homepage</Link>
                <Link className="navigation-menu-link" to="/about">About</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
                <LogoutButton /> 
            </div>
            <div className='div-msg'>
                <p>{welcomeMessage}</p>
            </div>
            <br />
            <div>
                {showLeagues && <Leagues />}
                <button className='show-leagues-button' onClick={() => setShowLeagues(!showLeagues)}>
                {showLeagues ? 'Hide ' : 'Show Open Leagues'}
                </button>
            </div>
            <br />
            <br />
            
        </div>
        );
};


export default Dashboard;
