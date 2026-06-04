import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GestionMesas from "../components/admin/GestionMesas";
import GestionReservas from "../components/admin/GestionReservas";
import "../styles/Dashboard.css";

const secciones = [
  { id: "reservas", label: "Reservas" },
  { id: "mesas", label: "Mesas" },
  { id: "usuarios", label: "Usuarios" },
];

const Dashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState("reservas");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">

      <aside className="dashboard-sidebar">
        <div className="sidebar-top">
          <p className="sidebar-titulo">PANEL ADMIN</p>
          <p className="sidebar-user">{user?.nombre} {user?.apellido}</p>
        </div>

        <nav className="sidebar-nav">
          {secciones.map((s) => (
            <button
              key={s.id}
              className={'sidebar-item ${seccionActiva === s.id ? "activo" : ""}'}
              onClick={() => setSeccionActiva(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-item sidebar-inicio" onClick={() => navigate("/")}>
            ← Ir al inicio
          </button>
          <button className="sidebar-item sidebar-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        {seccionActiva === "reservas" && <GestionReservas />}
        {seccionActiva === "mesas" && <GestionMesas />}
        {seccionActiva === "usuarios" && <p>Próximamente: Gestión de Usuarios</p>}
      </main>

    </div>
  );
};

export default Dashboard;