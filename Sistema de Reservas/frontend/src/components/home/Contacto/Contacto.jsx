import '../../../styles/Contacto.css';
import { useState } from 'react';

const Contacto = () => {
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
    }, 1200);
  };

  return (
    <section id="contacto" className="contacto-eventos">
      <div className="contacto-container">

        <div className="contacto-info">
          <span className="contacto-label">CONTACTO</span>
          <h2>Consultá por tu evento privado</h2>
          <p>
            Completá tus datos y nos comunicaremos para coordinar fecha,
            cantidad de personas y propuesta gastronómica.
          </p>

          <div className="contacto-datos">
            <div className="contacto-dato">
              <span className="cd-label">Dirección</span>
              <span className="cd-valor">Rosario, Santa Fe</span>
            </div>
            <div className="contacto-dato">
              <span className="cd-label">Teléfono</span>
              <span className="cd-valor">+54 9 341 3413413</span>
            </div>
            <div className="contacto-dato">
              <span className="cd-label">Email</span>
              <span className="cd-valor">eventos@pastapronto.com</span>
            </div>
            <div className="contacto-dato">
              <span className="cd-label">Horario</span>
              <span className="cd-valor">Martes a Domingo · 20:00 — 00:00</span>
            </div>
          </div>
        </div>

        <div className="contacto-form-wrap">
          {enviado ? (
            <div className="contacto-enviado">
              <span className="ce-icono">✓</span>
              <h3>¡Consulta enviada!</h3>
              <p>Nos comunicaremos a la brevedad para coordinar tu evento.</p>
            </div>
          ) : (
            <form className="contacto-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Nombre completo" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input type="tel" placeholder="Teléfono" />
              <input type="number" placeholder="Cantidad de invitados" />
              <input type="date" />
              <textarea placeholder="Contanos qué tipo de evento querés realizar" />
              <button type="submit" disabled={loading}>
                {loading ? (
                  <span className="contacto-spinner-wrap">
                    <span className="contacto-spinner" />
                    Enviando...
                  </span>
                ) : "Enviar consulta"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contacto;