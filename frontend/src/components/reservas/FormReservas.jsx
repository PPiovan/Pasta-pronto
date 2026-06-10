import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import '../../styles/FromReservas.css';

const formDataVacio = {
  fecha: "",
  horario: "",
  personas: "",
  observaciones: ""
};

const FormReservas = () => {

  useEffect(() => {

  const obtenerHorarios = async () => {

      const response = await fetch(
        "http://localhost:3000/api/horarios"
      );

      const data = await response.json();

      setHorarios(data);
    };

    obtenerHorarios();

  }, []);
  //uso el objeto de arriba para no repetir codigo
  const [formData, setFormData] = useState(formDataVacio);
  const [horarios, setHorarios] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.fecha === "") {
    alert("Seleccione una fecha");
    return;
  }

  if (formData.horario === "") {
    alert("Seleccione un horario");
    return;
  }

  if (formData.personas === "") {
    alert("Ingrese cantidad de personas");
    return;
  }

  try {
   const reserva = {
      id_usuario: user.id,
      id_horario: Number(formData.horario),
      fecha: formData.fecha,
      cantidad_comensales: Number(formData.personas),
      observaciones: formData.observaciones
    };

    console.log(reserva);

    const response = await fetch(
      "http://localhost:3000/api/reservas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reserva)
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear reserva");
    }

    alert("Reserva creada correctamente");

    navigate("/mis-reservas");

  } catch (error) {

    console.error(error);

    alert("No se pudo crear la reserva");

  }
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

        <h1>Reservar Mesa</h1>
        <p className="reserva-subtitle">
          Seleccioná fecha, horario y cantidad de comensales.
        </p>
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
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
            value={formData.horario}
            required
            onChange={handleChange}
          >
            <option value="">
              Seleccione horario
            </option>

            {horarios.map((horario) => (
              <option
                key={horario.id_horario}
                value={horario.id_horario}
              >
                {horario.hora.slice(0, 5)}
              </option>
            ))}
          </select>
        </label>
        <label>
            Cantidad de comensales:

            <input
              type="number"
              name="personas"
              value={formData.personas}
              min="1"
              max="20"
              required
              onChange={handleChange}
            />
          </label>

        <label className="full-width">
          Observaciones

          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Cumpleaños, mesa cerca de la ventana, silla para bebé..."
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