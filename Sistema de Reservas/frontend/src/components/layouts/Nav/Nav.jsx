import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav">
      <a href="#experiencia">EXPERIENCIA</a>
      <a href="#menu">MENÚ</a>
      <a href="#eventos">EVENTOS</a>
      <a href="#contacto">CONTACTO</a>

      <Link to="/login" className="nav-login">INGRESAR</Link>
      <Link to="/reservas" className="nav-reserve">RESERVAR</Link>
    </nav>
  );
};

export default Nav;