import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';

export const Dashboard = () => {
    // const { setAuth } = useContext(AuthContext);
    // const navigate = useNavigate();

    // const logout = async () => {
    //     // if used in more components, this should be in context 
    //     // axios to /logout endpoint 
    //     setAuth({});
    //     navigate('/');
    // }


    // return (
    //     <div>
    //         <h1>Hom page</h1>
    //         <p>You are logged in!</p>
    //         <Link to="/homepage">HomePage</Link>
    //         <Link to="/about">About</Link>
    //         <Link to="/analytics">Analytics</Link>
    //         <div className="flexGrow">
    //             <button onClick={logout}>Sign Out</button>
    //         </div>
    //     </div>
    // );
};

export default Dashboard;
