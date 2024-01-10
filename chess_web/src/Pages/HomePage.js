import React, { useContext, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../Styles/homepage.css';
import LogoutButton from '../Component/Logout';


export const HomePage = () => {
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
        console.log(welcomeMessage);

        if (welcomeMessage) {
            console.log(welcomeMessage);
            setWelcomeMessage((`Welcome, ${welcomeMessage}!`));        
        }

        const clearLocalStorageTimer = setTimeout(() => {
            localStorage.removeItem('username_in_chess');
        }, 5000);

        const handleBeforeUnload = () => {
            localStorage.removeItem('username_in_chess');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);

        clearTimeout(clearLocalStorageTimer);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    return (
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/dashboard">Leagues</Link>
                <Link className="navigation-menu-link" to="/about">About</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
                <LogoutButton className="navigation-menu-link" /> 
            </div>
            <div className='div-msg'>
                <p id='welcome-msg'>{welcomeMessage}</p>
            </div>
            
            
            <br />
            
        </div>
    );
};

export default HomePage;