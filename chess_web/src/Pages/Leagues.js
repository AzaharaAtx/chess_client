import axios from "axios";
import React, { useState, useEffect } from "react";

import '../Styles/leagueTable.css';
import '../Styles/homepage.css';


export const Leagues = () => {
    const [response, setResponse] = useState([]);
    const [enrollmentMessage, setEnrollmentMessage] = useState('');

    useEffect(() => {

        const fetchLeagues = async () => {
            try {
                const request = await axios.get("http://127.0.0.1:8000/api/league/view/init/league");
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
            const token = localStorage.getItem('jwt_token');

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            };
            const enrollmentResponse = await axios.post(`http://127.0.0.1:8000/api/league/enroll/${leagueId}`, null, { headers } );

            console.log("Enrollment Response:", enrollmentResponse.data);

            if (enrollmentResponse.status === 200) {
                setEnrollmentMessage('Te has inscrito correctamente a la Liga');
            } else {
                setEnrollmentMessage(`Error: ${enrollmentResponse.data.message}`);
            }
        } catch (error) {
            console.error("Fail to enroll in the league", error);
            setEnrollmentMessage('Ya estás inscrito en esta');
            console.error(enrollmentMessage);
        }
    };

    const handleClickOutside = () => {
        setEnrollmentMessage('');
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []); // El segundo argumento del useEffect asegura que se añada y quite el manejador solo al montar y desmontar el componente
    
    return (
        <div>
            <>
            <h3 className="tittle">Open Leagues</h3>
            <table className="tableLeague">
                <thead className="theadTable">
                    <tr className="trTable" >
                        <th className="thTable">ID</th>
                        <th className="thTable">Name</th>
                        <th className="thTable">Status</th>
                        <th className="thTable">Start Date</th>
                        <th className="thTable">End Date</th>
                        {/* <th>Rounds</th> */}
                        {/* <th>Soft Delete</th> */}
                        {/* <th>Winner League</th> */}
                        <th className="thTable">Enroll</th>
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
                                {/* <td>{league.rounds ? league.rounds.join(', ') : 'N/A'}</td> */}
                                {/* <td data-label="ID">{league.softDelete ?? 'N/A'}</td> */}
                                {/* <td>{league.winnerLeague ?? 'N/A'}</td> */}
                                <td className="tdTable" data-label="Enroll" id="enroll-btn">
                                    {league.status === "Initial state" && (
                                        <button className="control-btn" onClick={() => handleEnroll(league.id)}>Inscribirse</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                <div>
                    {enrollmentMessage && <p>{enrollmentMessage}</p>}
                </div>
            </>
        </div>
    );
}

export default Leagues;