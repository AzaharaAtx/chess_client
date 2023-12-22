import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';


export const Leagues = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);


    // crear logout endpoint
    const logout = async () => { 
        setAuth({});
        navigate('/');
    }

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const request = await axios.get("http://127.0.0.1:8000/api/league/view_open_league");
                const leaguesData = request.data;
                
                setResponse(leaguesData);
            } 
            catch (error) {
                console.error("Fail to fetch data", error);
            }
        };

        fetchLeagues();
    }, []);

    
    console.log(response);
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
                    {Array.isArray(response) && response.map(league => ( 
                        <tr key={league.id}> 
                            <td>{league.id}</td>
                            <td>{league.leagueName}</td>
                            <td>{league.status}</td>
                            <td>{league.startDate ? new Date(league.startDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{league.endDate ? new Date(league.endDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{league.rounds ? league.rounds.join(', ') : 'N/A'}</td>
                            <td>{league.softDelete ?? 'N/A'}</td>
                            <td>{league.winnerLeague ?? 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                        
        </div>
    );
}

export default Leagues;