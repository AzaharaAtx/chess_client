import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller } from "../AdminPanel/Controller";


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
            setCreatedLeagueId(dataResponse.data.id); // Guarda el ID de la liga creada
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
    <div>
        <h2>Ingresa el nombre de la liga</h2>
        <form onSubmit={createLeague}>
            <label>League Name</label>
            <input
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            type="league_name"
            placeholder="League example name"
            id="leagueName"
            name="leagueName"
            required
            autoComplete="off" />
            <button type="submit">Create League</button>
        </form>
        
        {response && (
            <div>
            <h2>{response.message}</h2>
            <p>ID de la Liga: {response.data.id}</p>
            <p>Nombre de la Liga: {response.data.leagueName}</p>
            <p>Estado: {response.data.status}</p>
            </div>
            )}
            {createdLeagueId && (
                <div>
                <p>¡Liga creada con ID: {createdLeagueId}!</p>
                </div>
                )}
        </div>
        <div>
            {showLeagues && <Controller />}
            <button onClick={() => setShowLeagues(!showLeagues)}>
                {showLeagues ? 'Ocultar Ligas' : 'Mostrar Ligas'}
            </button>
        </div>
			
</>
);

};
            
export default LeagueController;