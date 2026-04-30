const Contacto = () => {
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
            <p><strong>Dirección:</strong> San Genaro, Santa Fe</p>
            <p><strong>Teléfono:</strong> +54 9 3401 000000</p>
            <p><strong>Email:</strong> eventos@pastapronto.com</p>
          </div>
        </div>

        <form className="contacto-form">
          <input type="text" placeholder="Nombre completo" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="tel" placeholder="Teléfono" />
          <input type="number" placeholder="Cantidad de invitados" />
          <input type="date" />
          <textarea placeholder="Contanos qué tipo de evento querés realizar"></textarea>

          <button type="submit">Enviar consulta</button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;