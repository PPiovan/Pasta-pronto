import React from 'react'

const MenuDestacado = () => {
  return (
    <section id="menu" className="menu">

      <div className="menu-container">

        <span className="menu-label">MENÚ</span>

        <h2>Sabores que definen la experiencia</h2>

        <p className="menu-desc">
          Una selección de nuestros platos más representativos, pensados para
          acompañar cada momento de tu visita.
        </p>

        <div className="menu-grid">

          <article className="menu-card">
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" />
            <h3>Pasta artesanal</h3>
            <p>Preparada en el momento con ingredientes frescos.</p>
          </article>

          <article className="menu-card">
            <img src="https://images.unsplash.com/photo-1611575189074-9dfbbceb258a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <h3>Cava de Vinos</h3>
            <p>Vinos seleccionados.</p>
          </article>

          <article className="menu-card">
            <img src="https://plus.unsplash.com/premium_photo-1695028377519-70fb0c385db2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <h3>Postres</h3>
            <p>El cierre ideal para una experiencia única.</p>
          </article>

        </div>

      </div>

    </section>
  );
};

export default MenuDestacado;