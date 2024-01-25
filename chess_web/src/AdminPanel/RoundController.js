import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import LogoutButton from '../Component/Logout';
import { DropdownLeague, DropdownUser } from './DropdownMenu';

import '../Styles/leagueTable.css';
import '../Styles/homepage.css';
import Games from "./ShowRound";


export const RoundController = () => {
    const [response, setResponse] = useState([]);
    const [message, setMsg] = useState('');
    const [showGame, setShowGame] = useState(false);

    useEffect(() => {

        const fetchLeagues = async () => {
            try {
                const request = await axios.get("http://127.0.0.1:8000/api/league/view/open/league");
                const leaguesData = request.data;
                const parsedData = JSON.parse(leaguesData[0]);

                setResponse(parsedData);
            } 
            catch (error) {
                console.error("Fail to fetch data", error);
            }
        };

        fetchLeagues();
    }, []);

    const handleCreate = async (leagueId) => {
        try {
            const createResponse = await axios.post(`http://127.0.0.1:8000/api/league/view/edit/league/${leagueId}`); 

            console.log("Enrollment Response:", createResponse.data);

            if (createResponse.status === 200) {
                setMsg('Torneo creado exitosamente');
            } else {
                setMsg(`Error: ${createResponse.data.message}`);
            }
        } catch (error) {
            console.error("Fail to enroll in the league", error);
            setMsg('Ups.. algo ha pasado');
            console.error(message);
        }
    };

    const handleClickOutside = () => {
        setMsg('');
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []); 

    
    return (
        <>
        <div className="home-page-container">
            <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/adminhomepage">Homepage</Link>
                <DropdownLeague />
                <DropdownUser />
                <LogoutButton className="navigation-menu-link" /> 
            </div>
        </div>
            <h3 className="tittle">Open Leagues</h3>
            <table className="tableLeague">
                <thead className="theadTable">
                    <tr className="trTable" >
                        <th className="thTable">ID</th>
                        <th className="thTable">Round</th>
                        <th className="thTable">Status</th>
                        <th className="thTable">Start Date</th>
                        <th className="thTable">End Date</th>
                        <th className="thTable"></th>
                    </tr>
                    </thead>
                    <tbody className="tbodyTable">
                        {Array.isArray(response) && response.map(league => (
                            <tr className="trTable" key={league.id}>
                                <td className="tdTable" data-label="ID" >{league.id}</td>
                                <td className="tdTable" data-label="Name">{league.leagueName}</td>
                                <td className="tdTable" data-label="Status">{league.status}</td>
                                <td className="tdTable" data-label="Start Date">{league.startDate ? new Date(league.startDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="tdTable" data-label="End Date">{league.endDate ? new Date(league.endDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="tdTable" data-label="Enroll" id="enroll-btn">
                                        <button className="control-btn" onClick={() => handleCreate(league.id)}>Create Game</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                <div>
                    {message && <p>{message}</p>}
                </div>
            <div>
                {showGame && <Games />}
                <button className="controlShow" onClick={() => setShowGame(!showGame)}>
                    {showGame ? 'Hide' : 'Show Games'}
                </button>
            </div>
        </>
    );
}

export default RoundController;