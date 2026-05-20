import react from 'react';
import { useState } from 'react';
import './FromReservas.css';  //<-?

  

const FromReservas = () => {
const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [personas, setPersonas] = useState("");

  const confirmaReserva = ()=>{
    console.log(fecha);
    console.log(horario);
    console.log(personas);
  }

  const handleChangeFecha = (e)=>{
    setFecha(e.target.value);
  }
  const handleChangeHorario = (e)=>{
    setHorario(e.target.value);
  }
  const handleChangeCantPersonas = (e)=>{
    setPersonas(e.target.value);
  }
  const handleConfirmacion = (e) => {
  e.preventDefault();

  confirmaReserva();
}

//completamente robado
const limitesReserva = ()=>{
  const hoy = new Date();

  // Mínimo (Hoy)
  const anioMin = hoy.getFullYear();
  const mesMin = String(hoy.getMonth() + 1).padStart(2, '0');
  const diaMin = String(hoy.getDate()).padStart(2, '0');
  const min = `${anioMin}-${mesMin}-${diaMin}`;

  // Máximo (En 2 meses)
  const fechaMax = new Date();
  fechaMax.setMonth(hoy.getMonth() + 2);

  const anioMax = fechaMax.getFullYear();
  const mesMax = String(fechaMax.getMonth() + 1).padStart(2, '0');
  const diaMax = String(fechaMax.getDate()).padStart(2, '0');
  const max = `${anioMax}-${mesMax}-${diaMax}`;

  // Devolvemos las dos variables juntas adentro de un objeto
  return { min, max };
}

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

                <label>
                    fecha
                    <input type="date"  
                    min={limitesReserva().min} 
                    max={limitesReserva().max} 
                    name="fechaReserva" 
                    onChange={(e)=>handleChangeFecha(e)}
                    />
                </label>
                <label>
                    horario
                    <input type="time" name="horariosReserva" id="" onChange={(e)=>handleChangeHorario(e)}/>
                </label>
                <label>
                    Personas
                <input type="number" name="horariosReserva" id="" min="1" onChange={(e)=>handleChangeCantPersonas(e)}/>
                </label>
                    <button type="submit">confirmar reserva</button>
            </form>

        </div>
    );
}

export default FromReservas;