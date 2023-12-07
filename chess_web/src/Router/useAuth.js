import { useContext } from 'react';
import AuthContext from './AuthProvider';

// Comprobamos autenticacion
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;