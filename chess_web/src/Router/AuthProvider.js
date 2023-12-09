import { createContext, useState } from "react";

/**
 * Contexto de autenticación para gestionar la información de autenticación en la aplicación.
 * Propiedades:
 * - auth: Un objeto que contiene información de autenticación (por ejemplo, { user, isAuthenticated }).
 * - setAuth: Una función para actualizar el estado de autenticación.
 */
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();

    //renderizamos aceso componentes hijos == estado autenticado
    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children} 
        </AuthContext.Provider>
    );
};

export default AuthContext;