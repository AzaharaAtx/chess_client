import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

//Comprobamos si el usuario está autenticado
export const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.email 
            ? <Outlet />
            : <Navigate to="/" state={{from: location}} replace />
        
    );
};

export const RequireAdminAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles && auth.roles.includes('ROLE_ADMIN')
            ? <Outlet />
            : <Navigate to="/" state={{from: location}} replace />
    );
};

export default {RequireAuth, RequireAdminAuth};