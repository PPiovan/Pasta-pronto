

import react from 'react';
import './FromReservas.css';

const FromReservas = () => {
    return (
        <div className = "form-reservas">
            <h1>Formulario de Reservas</h1>
            <form>
                <label>Nombre:</label>
                <input type="text" name="nombre"/>
                <label>Apellido:</label>
                <input type="text" name="apellido"/>
                <label>Email:</label>
                <input type="email" name="email"/>
                <label>Teléfono:</label>
                <input type="tel" name="telefono"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default FromReservas;