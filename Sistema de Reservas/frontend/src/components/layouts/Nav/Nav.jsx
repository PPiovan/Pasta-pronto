import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // recarga navegación
  };

  return (
    <nav className="nav">
      <a href="#inicio">INICIO</a>
      <a href="#menu">MENÚ</a>
      <a href="#eventos">EVENTOS</a>
      <a href="#contacto">CONTACTO</a>

      {!user ? (
        <>
          <Link to="/login" className="nav-login">INGRESAR</Link>
          <Link to="/reservas" className="nav-reserve">RESERVAR</Link>
        </>
      ) : (
        <>
          <Link to="/" className="nav-login">INICIO</Link>
          <Link to="/mis-reservas" className="nav-login">MIS RESERVAS</Link>

          <button onClick={handleLogout} className="nav-reserve">
            CERRAR SESIÓN
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;