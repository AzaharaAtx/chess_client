import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Controller } from "../AdminPanel/Controller";
import LogoutButton from '../Component/Logout';
import { DropdownLeague, DropdownUser } from './DropdownMenu';

import '../Styles/homepage.css';
import '../Styles/leaguesController.css';

const LeagueController = () => {
    const [leagueName, setLeagueName] = useState('');
    const [response, setResponse] = useState(null);
    const [createdLeagueId, setCreatedLeagueId] = useState(null);
    const [showLeagues, setShowLeagues] = useState(false);
    
    const createLeague = async(e) => {
        e.preventDefault();
        
        try {
            const request = await axios.post("http://127.0.0.1:8000/api/league/create", {
            league_name: leagueName
            })
        
            const dataResponse = request.data;
            setResponse(dataResponse);
            
            if(request.status === 200) {
                setCreatedLeagueId(dataResponse.data.id); 
                console.log(request.data);
            } 
            else {
                console.log("Algo ha salido mal", request.data);
            }
        } catch (error) {
            console.error("Fail to send data", error);
        }
    setLeagueName('');
    };

    return (
        <>
            <div className="home-page-container">
                    <div className="navigation-menu">
                        <Link className="navigation-menu-link" to="/adminhomepage">Homepage</Link>
                        <DropdownLeague />
                        <DropdownUser />
                        <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
                        <LogoutButton className="navigation-menu-link" /> 
                    </div>
            </div>
            <div className="flexContainer">
                <div className="containerForm">
                    <h2 className="headerForm">Ingresa el nombre de la liga</h2>
                    <form className="leagueForm" onSubmit={createLeague}>
                        <label  >League Name</label>
                        <input className="labelForm"
                            value={leagueName}
                            onChange={(e) => setLeagueName(e.target.value)}
                            type="league_name"
                            placeholder="League example name"
                            id="leagueName"
                            name="leagueName"
                            required
                            autoComplete="off" />
                        <button className="btnLeague" type="submit">Create League</button>
                    </form>
                </div>
                
                {response && (
                    <div className="containerCreated">
                        <h2>{response.message}</h2>
                            <p>ID de la Liga: {response.data.id}</p>
                            <p>Nombre de la Liga: {response.data.leagueName}</p>
                            <p>Estado: {response.data.status}</p>
                        <div>
                            {showLeagues && <Controller />}
                            <button className="btnLeague" onClick={() => setShowLeagues(!showLeagues)}>
                                {showLeagues ? 'Ocultar Ligas' : 'Mostrar Ligas'}
                            </button>
                            
                        </div>
                    </div>
                )}
            </div>
        </>
    );

};
            
export default LeagueController;