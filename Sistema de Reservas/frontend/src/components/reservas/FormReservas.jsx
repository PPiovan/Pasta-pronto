import React, { useState } from 'react';
import './FromReservas.css';

const FormReservas = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    mail: "",
    fecha: "",
    horario: "",
    personas: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const limitesReserva = () => {

    const hoy = new Date();

    // Fecha mínima = hoy
    const anioMin = hoy.getFullYear();
    const mesMin = String(hoy.getMonth() + 1).padStart(2, '0');
    const diaMin = String(hoy.getDate()).padStart(2, '0');

    const min = `${anioMin}-${mesMin}-${diaMin}`;

    // Fecha máxima = dentro de 2 meses
    const fechaMax = new Date();
    fechaMax.setMonth(hoy.getMonth() + 2);

    const anioMax = fechaMax.getFullYear();
    const mesMax = String(fechaMax.getMonth() + 1).padStart(2, '0');
    const diaMax = String(fechaMax.getDate()).padStart(2, '0');

    const max = `${anioMax}-${mesMax}-${diaMax}`;

    return { min, max };
  };

  return (

    <div className="form-reservas">

      <form onSubmit={handleSubmit}>

        <h1>Formulario de Reservas</h1>

        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="mail"
            onChange={handleChange}
          />
        </label>

        <label>
          Teléfono:
          <input
            type="tel"
            name="telefono"
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            min={limitesReserva().min}
            max={limitesReserva().max}
            onChange={handleChange}
          />
        </label>

        <label>
          Horario:
          <input
            type="time"
            name="horario"
            onChange={handleChange}
          />
        </label>

        <label>
          Personas:
          <input
            type="number"
            name="personas"
            min="1"
            onChange={handleChange}
          />
        </label>

        <button type="submit">
          Confirmar reserva
        </button>

      </form>

    </div>
  );
};

export default FormReservas;