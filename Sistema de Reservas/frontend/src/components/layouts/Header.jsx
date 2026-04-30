import Nav from "./Nav";

const Header = () => {
  return (
    <header className="hero-header">
      <div className="hero-overlay"></div>

      <div className="hero-top">
        <h1 className="brand">PASTA PRONTO</h1>
        <Nav />
      </div>

      <div className="hero-center">
        <span className="hero-subtitle">PASTAS · VINOS · RESERVAS</span>

        <h2>
          La experiencia italiana <br />
          contada a través de la pasta
        </h2>

        <p>
          Restaurante exclusivo con reservas online. Disfrutá una noche especial.
        </p>

        <a href="/reservas" className="hero-button">
          RESERVÁ TU MESA
        </a>
      </div>

      <div className="hero-bottom">
        ROSARIO - SANTA FE
      </div>
    </header>
  );
};

export default Header;