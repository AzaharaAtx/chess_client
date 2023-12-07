import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../config";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ? <Outlet /> //permite proteger todos los componentes secundarios que estén anidados dentro
            : <Navigate to="/login" state={{from: location}} replace /> //reseteamos el historial de navegacion para q vuelva al login
    );
};

export default RequireAuth;