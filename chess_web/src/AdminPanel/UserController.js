import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import LogoutButton from '../Component/Logout';
import DropdownMenu from './DropdownMenu';

// import '.."homepage.css';
import '../Styles/userTable.css';


const UserController = () =>{
    const [user, setUser] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedFields, setEditedFields] = useState({});
    const [editMsg, setMsg] = useState('');
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const request = await axios.get("http://127.0.0.1:8000/api/user/list");
                const userData = request.data;
                
                setUser(userData);
            } 
            catch (error) {
                console.error("Fail to fetch data", error);
            }
        };
        
        fetchUsers();
    }, []);
    
    const handleEdit = userId => {
        setEditingUserId(userId);
    };

    const handleSaveEdit = async userId => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/user/${userId}`, {...(editedFields || {})});
                    
            console.log("Edit", response.data);
    
            if (response.status === 200) {
            // Actualizar el estado de los usuarios después de la edición
            setMsg("Usuario editado correctamente");

            const updatedUsers = user.map(currentUser =>
                currentUser.id === userId ? {  ...currentUser, ...editedFields } : currentUser
            );
            setUser(updatedUsers);
            setEditingUserId(null);
            setEditedFields({}); 

            // Recargar la lista de usuarios
            const updatedRequest = await axios.get("http://127.0.0.1:8000/api/user/list");
            const updatedUserData = updatedRequest.data;
            setUser(updatedUserData);
            
            } else {
            console.error('Error al editar el usuario');
            setMsg("Error al editar usuario");
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de edición', error);
        }
    };

    const handleClickOutside = () => {
        setMsg('');
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditedFields({});
    };
    
    const handleFieldChange = (fieldName, value) => {
        setEditedFields(prevFields => ({
            ...prevFields,
            [fieldName]: value === undefined ? null : value,
            })
        );
    };

        return (
            <>
                <div className="home-page-container">
                <div className="navigation-menu">
                <Link className="navigation-menu-link" to="/leaguecontroller">Leagues</Link>
                <DropdownMenu />
                <Link className="navigation-menu-link" to="/analytics">Analytics</Link>
                <LogoutButton className="navigation-menu-link" />
                </div>
                </div>
                <div className="tableContainer">
                    <table className="tableuser">
                        <thead className="tableThead">
                            <tr className="tableTr">
                                <th className="tableTh">ID</th>
                                <th className="tableTh">Email</th>
                                <th className="tableTh">Role</th>
                                <th className="tableTh">Name</th>
                                <th className="tableTh">Last Name</th>
                                <th className="tableTh">Password</th>
                                <th className="tableTh">Username</th> 
                                <th className="tableTh">#</th> 
                                {/* <th className="tableTh">Token</th> */}
                                {/* <th className="tableTh">Friend Link</th> */}
                                {/* <th className="tableTh">Phone</th> */}
                                {/* <th className="tableTh">Leagues wins</th> */}
                                {/* <th className="tableTh">Games wins</th> */}
                            </tr>
                    </thead>
                        <tbody className="tableTbody">
                        { user.map(users => (
                            <tr key={users.id}>
                                <td className="tableTd" data-label="ID">{users.id}</td>
                                {/* <td className="tableTd" data-label="Email">{users.email}</td> */}
                                <td className="tableTd" data-label="Email">
                                    {editingUserId === users.id ? (
                                    <input
                                        type="email"
                                        value={editedFields.email !== undefined ? editedFields.email : users.email}
                                        onChange={e => handleFieldChange('email', e.target.value)}
                                    />
                                    ) : (
                                    users.email
                                    )}
                                </td>
                                {/* <td className="tableTd" data-label="Role">{users.roles}</td> */}
                                <td className="tableTd" data-label="Role">
                                    {editingUserId === users.id ? (
                                    <input
                                        type="role"
                                        value={editedFields.roles !== undefined ? editedFields.roles : users.roles}
                                        onChange={e => handleFieldChange('roles', e.target.value)}
                                    />
                                    ) : (
                                    users.roles
                                    )}
                                </td>
                                {/* <td className="tableTd" data-label="Name">{users.full_name}</td> */}
                                <td className="tableTd" data-label="Name">
                                    {editingUserId === users.id ? (
                                    <input
                                        type="full_name"
                                        value={editedFields.full_name !== undefined ? editedFields.full_name : users.full_name}
                                        onChange={e => handleFieldChange('full_name', e.target.value)}
                                    />
                                    ) : (
                                    users.full_name
                                    )}
                                </td>
                                {/* <td className="tableTd" data-label="Last Name">{users.last_name}</td> */}
                                <td className="tableTd" data-label="Last Name">
                                    {editingUserId === users.id ? (
                                    <input
                                        type="las_name"
                                        value={editedFields.last_name !== undefined ? editedFields.last_name : users.last_name}
                                        onChange={e => handleFieldChange('last_name', e.target.value)}
                                    />
                                    ) : (
                                    users.last_name
                                    )}
                                </td>
                                {/* <td className="tableTd" data-label="Password">{users.password}</td> */}
                                <td className="tableTd" data-label="Password">
                                    {editingUserId === users.id ? (
                                    <input
                                        type="password"
                                        value={editedFields.password !== undefined ? editedFields.password : users.password}
                                        onChange={e => handleFieldChange('password', e.target.value)}
                                    />
                                    ) : (
                                    users.password
                                    )}
                                </td>
                                {/* <td className="tableTd" data-label="Username">{users.username_in_chess}</td> */}
                                <td className="tableTd" data-label="Username">
                                    {editingUserId === users.id ? (
                                    <input
                                        type="username"
                                        value={editedFields.username_in_chess !== undefined ? editedFields.username_in_chess : users.username_in_chess}
                                        onChange={e => handleFieldChange('username_in_chess', e.target.value)}
                                    />
                                    ) : (
                                    users.username_in_chess
                                    )}
                                </td>
                                <td>
                                    {editingUserId === users.id ? (
                                        <>
                                        <button onClick={() => handleSaveEdit(users.id, 'username_in_chess')}>Guardar</button>
                                        <button onClick={() => { handleCancelEdit(users.id)}}>Cancelar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEdit(users.id)}>Editar</button>
                                    )}
                                </td>
                                {/* <td className="tableTd" data-label="Token">{users.token}</td> */}
                                {/* <td className="tableTd" data-label="Friend Link">{users.friend_link}</td> */}
                                {/* <td className="tableTd" data-label="Phone">{users.phone}</td> */}
                                {/* <td className="tableTd" data-label="Leagues wins">{users.leagues_wins}</td> */}
                                {/* <td className="tableTd" data-label="Games wins">{users.games_wins}</td> */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    <div>
                        {editMsg && <p>{editMsg}</p>}
                    </div>
                </>
            )
    }
            
            // https://codepen.io/force-framework/pen/MXwdvO 
            
export default UserController;
            