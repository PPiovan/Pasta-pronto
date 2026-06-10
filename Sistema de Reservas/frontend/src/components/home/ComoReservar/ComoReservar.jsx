import '../../../styles/ComoReservar.css';
import { Link } from 'react-router-dom';

const pasos = [
  {
    numero: "01",
    titulo: "Elegí el día",
    descripcion: "Seleccioná la fecha y horario disponible desde nuestro sistema online.",
  },
  {
    numero: "02",
    titulo: "Indicá personas",
    descripcion: "El sistema verifica disponibilidad según la cantidad de comensales.",
  },
  {
    numero: "03",
    titulo: "Confirmá",
    descripcion: "Tu reserva queda registrada al instante y podés consultarla desde tu cuenta.",
  },
];

const ComoReservar = () => {
  return (
    <section className="como-reservar">
      <div className="cr-container">

        <div className="cr-header">
          <span className="cr-label">RESERVAS</span>
          <h2>Reservar una mesa es simple</h2>
          <p>En tres pasos tenés tu lugar asegurado para la experiencia.</p>
        </div>

        <div className="cr-steps">
          {pasos.map((paso, i) => (
            <article className="cr-step" key={i}>
              <span className="cr-step-numero">{paso.numero}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.descripcion}</p>
            </article>
          ))}
        </div>

        <div className="cr-cta">
          <Link to="/reservas" className="cr-btn">Hacer una reserva</Link>
        </div>

      </div>
    </section>
  );
};

export default ComoReservar;