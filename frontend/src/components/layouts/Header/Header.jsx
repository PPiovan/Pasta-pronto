import Nav from "../Nav/Nav";
import '../../../styles/Header.css';

const Header = () => {
  return (
    <header className="hero-header">
      <div className="hero-overlay"></div>

      <Nav/>

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