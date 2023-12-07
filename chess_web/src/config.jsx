import axios from 'axios';
import { createContext, useContext, useState } from 'react';


// Recogemos token
export const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

//
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


// Comprobamos autenticacion
export const useAuth = () => {
    return useContext(AuthContext);
};