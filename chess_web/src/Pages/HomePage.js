import React, { useContext, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Component/Logout';
import axios from 'axios';

import '../Styles/homepage.css';
import '../Styles/games.css';

export const HomePage = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [game, setGame] = useState([]);
    
    const idUser = localStorage.getItem('id');

    const handleClickOutside = (e) => {
        setWelcomeMessage('');
        const divMsg = document.querySelector('.div-msg');
        if (divMsg && !divMsg.contains(e.target)) {
            divMsg.style.display = 'none';
        }
    };

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/show/create/rounds&games")
                const gamesData = response.data;
                const filteredGames = gamesData.filter(game => {
                    return game.status === "In progress" &&
                        (String(game.white_player_fk) === String(idUser) || String(game.black_player_fk) === String(idUser));
                });
    
                setGame(filteredGames);
            } catch (error) {
                console.error("Fail to fetch data", error);
            }
        };
    
        fetchGame();
    }, [idUser]); 

    useEffect(() => {
        const welcomeMessage = localStorage.getItem('username_in_chess');

        if (welcomeMessage) {
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

    const noGamesMessage = <p className='format'>No tienes partidas pendientes.</p>;


    return (
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/dashboard">Leagues</Link>
                <Link className="navigation-menu-link" to="/about">Profile</Link>
                <LogoutButton className="navigation-menu-link" /> 
            </div>
            <div className='div-msg'>
                <p id='welcome-msg'>{welcomeMessage}</p>
            </div>
            <div>
            {game.length > 0 ? (
                <table className="games-table">
                    <thead className="thead-Table">
                        <tr>
                            <th>#</th>
                            <th>Round Number</th>
                            <th>Status</th>
                            <th>White Player</th>
                            <th>Black Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        {game.map(game => (
                            <tr key={game.id}>
                                <td data-label="#">{game.id}</td>
                                <td data-label="Round Number">{game.round_fk_id}</td>
                                <td data-label="Status">{game.status}</td>
                                <td data-label="Black Player">{game.black_player_fk}</td>
                                <td data-label="White Player">{game.white_player_fk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                noGamesMessage
            )}  
            </div>
        </div>
    );
};

export default HomePage;