import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import AuthContext from '../Router/AuthProvider';


export const Controller = () => {
    const { setAuth } = useContext(AuthContext);

    const [getOpenLeagues, setOpenLeagues,] = useState([]);


    useEffect(() => {
    
        const fetchLeagues = async () => {
            try {
                const openLeagues = await axios.get("http://127.0.0.1:8000/api/league/view/open/league");
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

    const handleCreator = async (leagueId) => {
        try {
            const token = localStorage.getItem('jwt_token');

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            };
            const enrollmentResponse = await axios.post(`http://127.0.0.1:8000/api/league/round/create/${leagueId}`, null, { headers } );

            console.log("Enrollment Response:", enrollmentResponse.data);
        } catch (error) {
            console.error("Fail to create rounds", error);
        }
    };

return (
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
					<td>
						{league.status === "Open" && (
							<button onClick={() => handleCreator(league.id)}>Create Rounds</button>
						)}
					</td>
				</tr>
                ))}
		    </tbody>
		</table>
	</div>

)

}

export default Controller;