import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Router/AuthProvider';
import '../Styles/homepage.css';


export const AdminHomePage = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => { 
        setAuth({});
        navigate('/');
    }


    return (
        <div>
            <h1>This is AdminHomePage</h1>
            <p>You are logged in!</p>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/analytics">Analytics</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

export default AdminHomePage;