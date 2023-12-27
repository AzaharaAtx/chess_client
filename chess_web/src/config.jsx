import axios from 'axios';

// Recogemos token
export const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// //Decodificamos el token
// export const decodeToke = (token) => {
//     try{
//         const decodedToken = jwt.verify(token, 'b3e01246fa9c5534d1044fdd31010b234cddd2ceb74f4f50fc6e73b12a105b24');
//         return decodedToken;
//     } catch (error) {
//         console.error('Error al decodificar el token: ', error);
//         return null;
//     }
// };
