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

  // Nombre
  if (formData.nombre.trim() === "") {
    alert("Ingrese un nombre");
    return;
  }

  // Apellido
  if (formData.apellido.trim() === "") {
    alert("Ingrese un apellido");
    return;
  }

  // Mail
  if (formData.mail.trim() === "") {
    alert("Ingrese un email");
    return;
  }

  // Validación simple email
  if (!formData.mail.includes("@")) {
    alert("Ingrese un email válido");
    return;
  }

  // Teléfono
  if (formData.telefono.trim() === "") {
    alert("Ingrese un teléfono");
    return;
  }

  // Fecha
  if (formData.fecha === "") {
    alert("Seleccione una fecha");
    return;
  }

  // Horario
  if (formData.horario === "") {
    alert("Seleccione un horario");
    return;
  }

  // Personas
  if (formData.personas === "") {
    alert("Ingrese cantidad de personas");
    return;
  }

  if (Number(formData.personas) < 1) {
    alert("La cantidad mínima es 1");
    return;
  }

  console.log(formData);

  alert("Reserva enviada");
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
            required
            onChange={handleChange}
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            required
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="mail"
            required
            onChange={handleChange}
          />
        </label>

        <label>
          Teléfono:
          <input
            type="tel"
            name="telefono"
            required
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            required
            min={limitesReserva().min}
            max={limitesReserva().max}
            onChange={handleChange}
          />
        </label>

        <label>
        Horario:
          <select
            name="horario"
            required
            onChange={handleChange}
          >
            <option value="">Seleccione horario</option>

            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>

            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
            <option value="00:00">00:00</option>
          </select>
        </label>

        <label>
          Personas:
          <input
            type="number"
            name="personas"
            min="1"
            max="20"
            required
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