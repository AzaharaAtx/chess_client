import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateUserComponent from "../Pages/About";
import {Dashboard} from '../Pages/Dashboard';
import { Analytics } from "../Pages/Analytics";
import { HomePage } from "../Pages/HomePage";
import { Login } from "../Forms/Login";
import SwitchForm from "../Forms/SwitchForm";
import { RequireAuth, RequireAdminAuth } from "./ProtectedRoutes";
import Unauthorized from "../Pages/Unauthorized";
import AdminHomePage from "../AdminPanel/AdminHomePage";
import LeagueController from "../AdminPanel/LeagueController";
import { Leagues } from "../Pages/Leagues";
import { Controller } from "../AdminPanel/Controller";
import UserController from "../AdminPanel/UserController";
import LogoutButton from "../Component/Logout";
import EditLeague from "../AdminPanel/EditLeague";
import RoundController from "../AdminPanel/RoundController";
import EditWinner from "../AdminPanel/EditWinner";



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
                    <Route path="dashboard/leagues" element={<Leagues />} />
                    <Route path="about" element={<UpdateUserComponent />} />
                    <Route path="logout" element={<LogoutButton />} />                
                </Route>

                    {/* Protected routes */}
                <Route element={<RequireAdminAuth />} >
                    <Route path="adminhomepage" element={<AdminHomePage />} />
                    <Route path="leaguecontroller" element={<LeagueController />} />
                    <Route path="editleague" element={<EditLeague />} />
                    <Route path="roundcontroller" element={<RoundController />} />
                    <Route path="leaguecontroller/controller" element={<Controller />} /> 
                    <Route path="usercontroller" element={<UserController />} />
                    <Route path="logout" element={<LogoutButton />} />                
                </Route>
            </Routes>
        </Router>
        
    );
};

export default AppRouter;
