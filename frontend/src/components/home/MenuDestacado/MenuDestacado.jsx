import React from 'react';
import '../../../styles/MenuDestacado.css';

const platos = [
  {
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    categoria: "PASTA",
    nombre: "Pasta artesanal",
    descripcion: "Preparada en el momento con ingredientes frescos y salsas de autor."
  
  },
  {
    img: "https://images.unsplash.com/photo-1611575189074-9dfbbceb258a?q=80&w=1170&auto=format&fit=crop",
    categoria: "VINOS",
    nombre: "Cava de Vinos",
    descripcion: "Selección de vinos nacionales e importados maridados con cada plato."
    
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1695028377519-70fb0c385db2?q=80&w=1171&auto=format&fit=crop",
    categoria: "POSTRES",
    nombre: "Postres de autor",
    descripcion: "El cierre ideal para una experiencia gastronómica única e inolvidable."
    
  },
];

const MenuDestacado = () => {
  return (
    <section id="menu" className="menu">
      <div className="menu-container">

        <div className="menu-header">
          <span className="menu-label">MENÚ DESTACADO</span>
          <h2>Sabores que definen la experiencia</h2>
          <p className="menu-desc">
            Una selección de nuestros platos más representativos, pensados para
            acompañar cada momento de tu visita.
          </p>
        </div>

        <div className="menu-grid">
          {platos.map((plato, i) => (
            <article className="menu-card" key={i}>
              <div className="menu-card-img-wrap">
                <img src={plato.img} alt={plato.nombre} />
                <span className="menu-card-categoria">{plato.categoria}</span>
              </div>
              <div className="menu-card-body">
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
                <span className="menu-card-precio">{plato.precio}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuDestacado;