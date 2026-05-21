import react from 'react';
import { useState } from 'react';
import './FromReservas.css';  //<-?

  

const FromReservas = () => {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [personas, setPersonas] = useState("");

  const handleChangeNombre = (e)=>{
    setNombre(e.target.value)
  }
  const handleChangeApellido = (e)=>{
    setApellido(e.target.value)
  }
  const handleChangeMail = (e)=>{
    setMail(e.target.value)
  }
  const handleChangeTelefono = (e)=>{
    setTelefono(e.target.value)
  }

  const handleChangeFecha = (e)=>{
    setFecha(e.target.value);
  }
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

  const handleChangeHorario = (e)=>{
    setHorario(e.target.value);
  }
  const handleChangeCantPersonas = (e)=>{
    setPersonas(e.target.value);
  }
  //para cuando se hace el submit del form
  const handleConfirmacion = (e) => {
    e.preventDefault();

    if(
      !nombre ||
      !apellido ||
      !mail ||
      !telefono ||
      !fecha ||
      !horario ||
      !personas
    ){
      alert("Complete todos los campos.");
      return;
    }
    //esto todavia no esta declarado ni tiene lógica
    confirmaReserva();
  }

//completamente robado


    return (
        <div className = "form-reservas">

            <form onSubmit={handleConfirmacion}>
                <h1>Formulario de Reservas</h1>

                <label>
                  Nombre
                  <input type="text" name="nombre" onChange={handleChangeNombre}/>
                </label>

                <label>
                  Apellido
                  <input type="text" name="apellido" onChange={handleChangeApellido}/>
                </label>

                <label>
                  Email
                  <input type="email" name="email" onChange={handleChangeMail}/>
                </label>

                <label>
                  Teléfono
                  <input type="tel" name="telefono" onChange={handleChangeTelefono} />
                </label>

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
                    <input type="time" name="horariosReserva" onChange={(e)=>handleChangeHorario(e)}/>
                </label>
                <label>
                    Personas
                <input type="number" name="horariosReserva" min="1" onChange={(e)=>handleChangeCantPersonas(e)}/>
                </label>
                
                <button type="submit">confirmar reserva</button>
            </form>

        </div>
    );
}

export default FromReservas;