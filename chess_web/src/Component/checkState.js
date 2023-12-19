import { useState, useEffect } from "react";
import axios from "axios";

// ESTO SEPONE EN HOMEPAGE, NO EN EL DASHBOARD

const CheckState = ({ leagueName }) => {
    const [ligaAbierta, setLigaAbierta] = useState(false);

    useEffect(() => {
        // Hacer una solicitud al backend para verificar el estado de la liga
        axios.post('http://127.0.0.1:8000/api/league/state', { league_name: leagueName })
            .then(response => {
                const isLigaAbierta = response.data.data;
                setLigaAbierta(isLigaAbierta);
            })
            .catch(error => {
                console.error('Error al obtener el estado de la liga', error);
            });
    }, [leagueName]);

    return (
        <div>
            <h1>Torneos</h1>
            <div>
                <h2>Torneos</h2>
                {ligaAbierta ? (
                    <button>Añadir Participantes</button>
                ) : (
                    <p>La liga está cerrada actualmente.</p>
                )}
                {/* Otros elementos del dashboard */}
            </div>
            {/* Resto del contenido de la página */}
        </div>
    );
};

export default CheckState;