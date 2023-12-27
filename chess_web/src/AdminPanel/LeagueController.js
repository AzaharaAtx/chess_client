import axios from "axios";
import React, { useEffect, useState } from "react";

const LeagueController = () => {
    const [leagueName, setLeagueName] = useState('');
    const [response, setResponse] = useState(null);
    const [createdLeagueId, setCreatedLeagueId] = useState(null);
    
    const [getOpenLeagues, setOpenLeagues,] = useState([]);
    
    
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

useEffect(() => {
    
    const fetchLeagues = async () => {
        try {
            const openLeagues = await axios.get("http://127.0.0.1:8000/api/league/view_open_league");
            const leaguesData = openLeagues.data;
            const parsedData = JSON.parse(leaguesData[0]);
            
            setOpenLeagues(parsedData);
        } 
        catch (error) {
            console.error("Fail to fetch data", error);
        }
    };
    
    fetchLeagues();
}, []);


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
        )};
        {createdLeagueId && (
            <div>
            <p>¡Liga creada con ID: {createdLeagueId}!</p>
            </div>
            )}
            </div>
			<div>
				<h2>Ligas Abiertas</h2>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Status</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Rounds</th>
							<th>Soft Delete</th>
							<th>Winner League</th>
						</tr>
					</thead>
					<tbody>
					{Array.isArray(getOpenLeagues) && getOpenLeagues.map(league => (
						<tr key={league.id}>
							<td>{league.id}</td>
							<td>{league.leagueName}</td>
							<td>{league.status}</td>
							<td>{league.startDate ? new Date(league.startDate).toLocaleDateString() : 'N/A'}</td>
							<td>{league.endDate ? new Date(league.endDate).toLocaleDateString() : 'N/A'}</td>
							<td>{league.rounds ? league.rounds.join(', ') : 'N/A'}</td>
							<td>{league.softDelete ?? 'N/A'}</td>
							<td>{league.winnerLeague ?? 'N/A'}</td>
							{/* <td>
							{league.status === "Initial state" && (
								<button onClick={() => handleEnroll(league.id)}>Inscribirse</button>
								)}
							</td> */}
						</tr>
					))}
					</tbody>
				</table>
			</div>
</>
);
};
            
            export default LeagueController;