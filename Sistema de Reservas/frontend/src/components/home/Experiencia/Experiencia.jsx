import '../../../styles/Experiencia.css';

const stats = [
  { valor: "40", label: "Cubiertos" },
  { valor: "15", label: "Pasos" },
  { valor: "100%", label: "Reserva previa" },
];

const Experiencia = () => {
  return (
    <section id="experiencia" className="experiencia">
      <div className="exp-container">

        <div className="exp-texto">
          <span className="exp-label">LA EXPERIENCIA</span>
          <h2>Un recorrido de 15 pasos por la Argentina</h2>
          <p>
            Pasta Pronto redefine el concepto de restaurante italiano con una
            mirada contemporánea y sofisticada. Cada plato representa una
            experiencia pensada para compartir.
          </p>
          <p>
            Con espacio limitado, ofrecemos una experiencia exclusiva con
            reserva previa, donde cada detalle está cuidado al máximo.
          </p>

          <div className="exp-stats">
            {stats.map((s, i) => (
              <div className="exp-stat" key={i}>
                <span className="exp-stat-valor">{s.valor}</span>
                <span className="exp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="exp-galeria">
          <div className="exp-galeria-principal">
            <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141" alt="Plato principal" />
          </div>
          <div className="exp-galeria-secundarias">
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Pasta" />
            <img src="https://images.unsplash.com/photo-1447279506476-3faec8071eee?q=80&w=1170&auto=format&fit=crop" alt="Ambiente" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experiencia;