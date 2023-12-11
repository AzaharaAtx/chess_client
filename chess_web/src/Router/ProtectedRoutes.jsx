import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

//Comprobamos si el usuario está autenticado
export const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('estoy aqui');

    return (
        auth?.email 
            ? <Outlet />
            : <Navigate to="/" state={{from: location}} replace />
        
    );
};

export const RequireAdminAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('estoy aqui admin', auth?.roles.includes('ROLE_ADMIN'));

    return (
        auth?.roles.includes('ROLE_ADMIN')
            ? <Outlet />
            : <Navigate to="/" state={{from: location}} replace />
    );
};

export default {RequireAuth, RequireAdminAuth};