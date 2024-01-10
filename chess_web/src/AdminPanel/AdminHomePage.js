import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';
import '../Styles/homepage.css';


export const AdminHomePage = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [welcomeMessage, setWelcomeMessage] = useState('');


    const logout = async () => { 
        setAuth({});
        navigate('/');
    }

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
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/leaguecontroller">Leagues</Link>
                <Link className="navigation-menu-link" to="/usercontroller">User Management</Link>
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
            </div>
            <div className='div-msg'>
                <p id='welcome-msg'>{welcomeMessage}</p>
            </div>
            <div className="flexGrow">
                <button className='sign-out-button' onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

export default AdminHomePage;