// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import LogoutButton from '../Component/Logout';
// import { DropdownLeague, DropdownUser } from './DropdownMenu';

// import  '../Styles/leagueTable.css';

// export const EditWinner = () => {
//     const [leagues, setLeagues] = useState([]);
//     const [editLeagueId, setEditLeagueId] = useState(null);
//     const [editedFields, setEditedFields] = useState({});
//     const [editMsg, setMsg] = useState('');


//     useEffect(() => {
//         const fetchLeagues = async () => {
//             try {
//                 const request = await axios.get("http://127.0.0.1:8000/api/league/read");
//                 const leaguesData = request.data;
                
//                 setLeagues(leaguesData);
//             } 
//             catch (error) {
//                 console.error("Fail to fetch data", error);
//             }
//         };
        
//         fetchLeagues();
//     }, []);

//     const handleEdit = leagueId => {
//         const leagueToEdit = leagues.find(league => league.id === leagueId);

//         setEditLeagueId(leagueId);
//         setEditedFields({ ...leagueToEdit });
//     };

//     const handleSaveEdit = async (leagueId) => {
//         try {
//             const request = await axios.put(`http://127.0.0.1:8000/api/league/view/edit/league/${leagueId}`,  { ...(editedFields || {}) })
        
//             if (request.status === 200) {
//                 setMsg("Liga editada correctamente");
    
//                 const updateLeagues = leagues.map(currentLeague =>
//                     currentLeague.id === leagueId ? {  ...currentLeague, ...editedFields } : currentLeague
//                 );

//                 setLeagues(updateLeagues);
//                 setEditLeagueId(null);
//                 setEditedFields({}); 
    
//                 const updatedRequest = await axios.get("http://127.0.0.1:8000/api/league/read");
//                 const updatedLeagueData = updatedRequest.data;

//                 setLeagues(updatedLeagueData);
                
//                 } else {
//                     console.error('Error al editar el liga');
//                     setMsg("Error al editar liga");
//                 }
//             } catch (error) {
//                 console.error('Error al enviar la solicitud de edición', error);
//             }
//     };

//     const handleClickOutside = () => {
//         setMsg('');
//     }

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//     return () => {
//         document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     const handleCancelEdit = () => {
//         setEditLeagueId(null);
//         setEditedFields({});
//     };
    
//     const handleFieldChange = (fieldName, value) => {
//         setEditedFields(prevFields => ({
//             ...prevFields,
//             [fieldName]: value instanceof Date
//                 ? value.toISOString().split('T')[0]
//                 : value === undefined
//                     ? null
//                     : value,
//         }));
//     };

//     return(
//         <>
//             <div className="home-page-container">
//                 <div className="navigation-menu">
//                     <DropdownLeague />
//                     <DropdownUser />
//                     <LogoutButton className="navigation-menu-link" />
//                 </div>
//             </div>
//             <div className="tableLeagueContainer">
//                 <table className="tableLeague">
//                     <thead className="theadTable">
//                         <tr className="trTable">
//                             <th className="thTable">ID</th>
//                             <th className="thTable">Name</th>
//                             <th className="thTable">Status</th>
//                             <th className="thTable">Start Date</th>
//                             <th className="thTable">End Date</th>
//                             <th className="thTable">Winner League</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody className="tbodyTable">
//                         {Array.isArray(leagues) && leagues.map(league => (
//                             <tr className="tr" key={league.id}>
//                                 <td className="tdTable" data-label="ID" >{league.id}</td>
//                                 <td className="tdTable" data-label="Name">
//                                     {editLeagueId === league.id ? (
//                                         <input 
//                                             type="name_league"
//                                             value={editedFields.name_league !== undefined ? editedFields.name_league : league.name_league}
//                                             onChange={e => handleFieldChange('name_league', e.target.value)}
//                                         />
//                                         ) : (
//                                         league.name_league
//                                     )}
//                                 </td>
//                                 <td className="tdTable" data-label="Status">
//                                     {editLeagueId === league.id ? (
//                                         <input 
//                                             type="status"
//                                             value={editedFields.status !== undefined ? editedFields.status : league.status}
//                                             onChange={e => handleFieldChange('status', e.target.value)}
//                                         />
//                                         ) : (
//                                         league.status
//                                     )}
//                                 </td>
//                                 <td className="tdTable" data-label="Start Date">
//                                     {editLeagueId === league.id ? (
//                                         <DatePicker
//                                             selected={editedFields.start_date !== null ? new Date(editedFields.start_date) : ''}
//                                             onChange={date => handleFieldChange('start_date', date)}
//                                             dateFormat="dd/MM/yyyy"
//                                         />
//                                         ) : (
//                                         league.start_date
//                                     )}                                
//                                 </td>
//                                 <td className="tdTable" data-label="End Date">
//                                     {editLeagueId === league.id ? (
//                                         <DatePicker
//                                             selected={editedFields.end_date !== null ? new Date(editedFields.end_date) : ''}
//                                             onChange={date => handleFieldChange('end_date', date)}
//                                             dateFormat="dd/MM/yyyy"
//                                         />
//                                         ) : (
//                                         league.end_date
//                                     )}    
//                                 </td>
//                                 <td className="tdTable" data-label="Winner League" >
//                                     {editLeagueId === league.id ? (
//                                         <input 
//                                             type="Winner League"
//                                             value={editedFields.winner_league !== null ? editedFields.winner_league : ''}
//                                             onChange={e => handleFieldChange('winner_league', e.target.value)}
//                                         />
//                                         ) : (
//                                         league.winner_league
//                                     )}
//                                 </td>
//                                 <td className="tdTable">
//                                     {editLeagueId === league.id ? (
//                                         <>
//                                         <button className="control-btn" onClick={() => handleSaveEdit(league.id)}>Guardar</button>
//                                         <button className="control-btn" onClick={() => { handleCancelEdit(league.id)}}>Cancelar</button>
//                                         </>
//                                     ) : (
//                                         <button className="control-btn" onClick={() => handleEdit(league.id)}>Editar</button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 {editMsg && <p>{editMsg}</p>}
//             </div>
//         </>
//     );
// };

// export default EditWinner;