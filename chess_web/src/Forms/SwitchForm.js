import React, { useState } from "react";
import { Login } from './Login';
import { Register } from "./Register";
import './Form.css';
import { Outlet } from "react-router-dom";


const SwitchForm = () => {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <>
        <div className="App">
            { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
            <Outlet />
        </div>
        </>
    );
};

export default SwitchForm;
