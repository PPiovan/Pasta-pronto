const Experiencia = () => {
  return (
    <section id="experiencia" className="experiencia">

      <div className="exp-container">

        <div className="exp-texto">
          <span className="exp-label">LA EXPERIENCIA</span>

          <h2>
            Un recorrido de 15 pasos por la Argentina
          </h2>

          <p>
            Pasta Pronto redefine el concepto de restaurante italiano con una
            mirada contemporánea y sofisticada. Cada plato representa una
            experiencia pensada para compartir.
          </p>

          <p>
            Con espacio limitado, ofrecemos una experiencia exclusiva con
            reserva previa, donde cada detalle está cuidado.
          </p>

          <div className="exp-footer">
            <span>40 cubiertos</span>
            <span>Mesas privadas</span>
            <span>Solo con reserva</span>
          </div>
        </div>

       
        <div className="exp-galeria">
          <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141" />
          <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" />
          <img src="https://images.unsplash.com/photo-1447279506476-3faec8071eee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>

      </div>

    </section>
  );
};

export default Experiencia;