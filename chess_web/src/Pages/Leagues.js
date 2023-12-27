import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';


export const Leagues = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);
    const [idLeague, setIdLeague] = useState('');
    
    // const token = localStorage.getItem('token');
    // if (token) {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }


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
                const parsedData = JSON.parse(leaguesData[0]);

                setResponse(parsedData);
            } 
            catch (error) {
                console.error("Fail to fetch data", error);
            }
        };

        fetchLeagues();
    }, []);

    const handleEnroll = async (leagueId) => {
        try {
            // Obtener el token almacenado en localStorage
            const token = localStorage.getItem('jwt_token');

            // Configurar la cabecera con el token
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido adecuado
            };
                // Lógica para enviar una solicitud de inscripción a la liga con el ID leagueId
            const enrollmentResponse = await axios.post(`http://127.0.0.1:8000/api/league/enroll/${leagueId}`, null, { headers } );
            // Manejar la respuesta de la inscripción según tus necesidades
            console.log("Enrollment Response:", enrollmentResponse.data);
        } catch (error) {
            console.error("Fail to enroll in the league", error);
        }
    };

    
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
                            <td>
                                {league.status === "Initial state" && (
                                    <button onClick={() => handleEnroll(league.id)}>Inscribirse</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                        
        </div>
    );
}

export default Leagues;