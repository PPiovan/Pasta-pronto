import '../../../styles/Eventos.css';

const Eventos = () => {
  return (
    <section id="eventos" className="eventos">
      <div className="eventos-container">

        <div className="eventos-img">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622"
            alt="Evento privado en restaurante"
          />
          <div className="eventos-img-badge">
            <span>EVENTOS </span>
            <span>PRIVADOS</span>
          </div>
        </div>

        <div className="eventos-texto">
          <span className="eventos-label">EVENTOS PRIVADOS</span>
          <h2>Un espacio íntimo para celebraciones especiales</h2>
          <p>
            Organizamos cenas privadas, cumpleaños, reuniones empresariales y
            encuentros familiares con reserva previa.
          </p>
          <p>
            Nuestro equipo prepara una experiencia personalizada según la
            cantidad de invitados, el tipo de evento y el menú elegido.
          </p>

          <div className="eventos-features">
            <div className="eventos-feature">
              <span className="ef-titulo">Menú personalizado</span>
              <span className="ef-desc">Diseñado especialmente para tu evento</span>
            </div>
            <div className="eventos-feature">
              <span className="ef-titulo">Espacio exclusivo</span>
              <span className="ef-desc">Salón privado con capacidad para 40 personas</span>
            </div>
            <div className="eventos-feature">
              <span className="ef-titulo">Atención dedicada</span>
              <span className="ef-desc">Personal asignado exclusivamente a tu evento</span>
            </div>
          </div>

          <a href="#contacto" className="eventos-btn">
            Consultar disponibilidad
          </a>
        </div>

      </div>
    </section>
  );
};

export default Eventos;