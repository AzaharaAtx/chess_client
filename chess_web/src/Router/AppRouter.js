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
import SwitchForm from "../Forms/SwitchForm";
import { RequireAuth, RequireAdminAuth } from "./ProtectedRoutes";
import Unauthorized from "../Pages/Unauthorized";
import AdminHomePage from "../AdminPanel/AdminHomePage";
import LeagueController from "../AdminPanel/LeagueController";



const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<SwitchForm />} />
                        {/*  public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* routes requiring authentication */}
                <Route element={<RequireAuth />} >
                    <Route path="homepage" element={<HomePage />} />
                    <Route path="dashboard" element={<Dashboard />} /> 
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="about" element={<About />} />
                </Route>

                    {/* Protected routes */}
                <Route element={<RequireAdminAuth />} >
                    <Route path="adminhomepage" element={<AdminHomePage />} />
                    <Route path="leaguecontroller" element={<LeagueController />} /> 
                    {/* <Route path="analytics" element={<Analytics />} />
                    <Route path="about" element={<About />} /> */}
                </Route>
            </Routes>
        </Router>
        
    );
};

export default AppRouter;
