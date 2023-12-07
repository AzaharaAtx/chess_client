import { useContext } from 'react';
import AuthContext from './AuthProvider';

// Comprobamos autenticacion
export const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;