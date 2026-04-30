const Eventos = () => {
  return (
    <section id="eventos" className="eventos">
      <div className="eventos-container">
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

          <a href="#contacto" className="eventos-btn">
            Consultar disponibilidad
          </a>
        </div>

        <div className="eventos-img">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622"
            alt="Evento privado en restaurante"
          />
        </div>
      </div>
    </section>
  );
};

export default Eventos;