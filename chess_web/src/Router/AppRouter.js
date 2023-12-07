/**
 * Colocamos todas las rutas que necesita nuestra app 
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from "../Sidebar";
import { About } from "../Pages/About";
import {Dashboard} from '../Pages/Dashboard';
import { Analytics } from "../Pages/Analytics";
import { HomePage } from "../Pages/HomePage";
import { Login } from "../Forms/Login";
import { Register } from "../Forms/Register";
import { Admin } from "../Pages/Admin";
import SwitchForm from "../Forms/SwitchForm";
import RequireAuth from "./ProtectedRoutes";

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<SwitchForm />} />
                        {/*  public routes */}
                <Route path="/login" element={<Login />} />

                    {/* routes requiring authentication */}
                <Route element={<RequireAuth />} >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="homepage" element={<HomePage />} /> 
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="about" element={<About />} />
                </Route>

                    {/* Protected routes */}
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
        
    );
};

export default AppRouter;
