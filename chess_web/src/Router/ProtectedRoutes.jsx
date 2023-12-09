import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

//Comprobamos si el usuario está autenticado
const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('estoy aqui');

    return (
        auth?.email && auth?.roles?.includes('ROLE_ADMIN')
            ? <Navigate to="/adminhomepage" state={{from: location}} replace />
            : auth?.email 
                ? <Outlet />
                : <Navigate to="/" state={{from: location}} replace />
        // auth?.email
        //     ? <Outlet /> //Renderiza los componentes secundarios (anidados) si el usuario está autenticado
        //     : <Navigate to="/" state={{from: location}} replace /> //reseteamos el historial de navegacion para q vuelva al login si no está autenticado
    
    );
    
};

export default RequireAuth;