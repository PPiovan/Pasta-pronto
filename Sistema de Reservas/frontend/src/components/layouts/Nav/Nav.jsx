import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import "../../../styles/Nav.css";

const Nav = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="nav">

  <div className="nav-logo">
    <Link to="/">
      PASTA PRONTO
    </Link>
  </div>

    <div className="nav-links">

    {isHome ? (
      <>
        <a href="#menu">MENÚ</a>
        <a href="#eventos">EVENTOS</a>
        <a href="#contacto">CONTACTO</a>
      </>
    ) : (
      <>
        <Link to="/">INICIO</Link>

        {user && (
          <Link to="/mis-reservas">
            MIS RESERVAS
          </Link>
        )}
      </>
    )}

  </div>

  <div className="nav-user">

    {!user ? (
      <>
        <Link to="/login" className="nav-login">
          INGRESAR
        </Link>

        <Link to="/reservas" className="nav-reserve">
          RESERVAR
        </Link>
      </>
    ) : (
      <div
        className="user-menu"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {user.nombre} ▼

        {openMenu && (
          <div className="dropdown-menu">

            <Link to="/mis-reservas">
              Mis Reservas
            </Link>

            <button onClick={logout}>
              Cerrar sesión
            </button>

          </div>
        )}
      </div>
    )}

  </div>

</nav>
  );
};

export default Nav;