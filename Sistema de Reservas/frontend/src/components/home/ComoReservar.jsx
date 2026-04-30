const ComoReservar = () => {
  return (
    <section className="section-light">
      <span className="section-label">RESERVAS</span>
      <h2>Reservar una mesa es simple</h2>

      <div className="steps">
        <article>
          <h3>1. Elegí el día</h3>
          <p>Seleccioná la fecha y horario disponible.</p>
        </article>

        <article>
          <h3>2. Indicá personas</h3>
          <p>El sistema asigna una mesa según la cantidad de comensales.</p>
        </article>

        <article>
          <h3>3. Confirmá</h3>
          <p>Tu reserva queda registrada y podés consultarla desde tu cuenta.</p>
        </article>
      </div>
    </section>
  );
};

export default ComoReservar;