import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Component/Logout';
import { DropdownLeague, DropdownUser } from './DropdownMenu';

import '../Styles/homepage.css';


export const AdminHomePage = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');

    const handleBeforeUnload = () => {
        localStorage.removeItem('full_name');
        const divMsg = document.querySelector('.div-msg');
        if (divMsg) {
            divMsg.innerHTML = '';
        }
    };
    
    const handleClickOutside = (e) => {
        setWelcomeMessage('');
        const divMsg = document.querySelector('.div-msg');
        if (divMsg && !divMsg.contains(e.target)) {
            divMsg.style.display = 'none';
        }
    };
    
    useEffect(() => {
        const welcomeMessage = localStorage.getItem('full_name');
        
        if (welcomeMessage) {
            console.log(welcomeMessage);
            setWelcomeMessage((`Welcome, ${welcomeMessage}!`));        
        }
        
        const clearLocalStorageTimer = setTimeout(() => {
            localStorage.removeItem('full_name');
        }, 5000);
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            clearTimeout(clearLocalStorageTimer);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('click', handleClickOutside);
            
        };
    }, []);
    
    return (
        <>
            <div className="home-page-container">
                <div className="navigation-menu">
                    <DropdownLeague />
                    <DropdownUser />
                    <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
                    <LogoutButton className="navigation-menu-link" />
                </div>
            </div>
            <div className='div-msg'>
                <p id='welcome-msg'>{welcomeMessage}</p>
            </div>
        </>
        
        );
    };
    
    export default AdminHomePage;