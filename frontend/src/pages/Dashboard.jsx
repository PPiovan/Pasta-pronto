import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResumenDashboard from "../components/admin/ResumenDashboard";
import GestionMesas from "../components/admin/GestionMesas";
import GestionReservas from "../components/admin/GestionReservas";
import GestionUsuarios from "../components/admin/GestionUsuarios";
import Configuracion from "../components/admin/Configuracion";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const esSuperAdmin = Number(user?.rol) === 1;

  const secciones = [
    { id: "resumen",        label: "Resumen",        icon: "ti-layout-dashboard" },
    { id: "reservas",       label: "Reservas",       icon: "ti-calendar-event" },
    { id: "mesas",          label: "Mesas",          icon: "ti-armchair" },
    { id: "usuarios",       label: "Usuarios",       icon: "ti-users" },
    ...(esSuperAdmin
      ? [{ id: "configuracion", label: "Configuración", icon: "ti-settings" }]
      : []),
  ];

  const [seccionActiva, setSeccionActiva] = useState("resumen");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const iniciales = `${user?.nombre?.charAt(0) ?? ""}${user?.apellido?.charAt(0) ?? ""}`;
  const rolLabel = esSuperAdmin ? "Super Admin" : "Admin";

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">
          <p className="sidebar-brand-name">Pasta Pronto</p>
          <p className="sidebar-brand-sub">Panel de administración</p>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{iniciales}</div>
          <div>
            <p className="sidebar-user-name">{user?.nombre} {user?.apellido}</p>
            <p className="sidebar-user-role">{rolLabel}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-section">Gestión</p>
          {secciones.map((s) => (
            <button
              key={s.id}
              className={`sidebar-item ${seccionActiva === s.id ? "activo" : ""}`}
              onClick={() => setSeccionActiva(s.id)}
            >
              <i className={`ti ${s.icon}`} aria-hidden="true"></i>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-item sidebar-inicio" onClick={() => navigate("/")}>
            <i className="ti ti-arrow-left" aria-hidden="true"></i>
            Ir al inicio
          </button>
          <button className="sidebar-item sidebar-logout" onClick={handleLogout}>
            <i className="ti ti-logout" aria-hidden="true"></i>
            Cerrar sesión
          </button>
        </div>

      </aside>

      <main className="dashboard-content">
        {seccionActiva === "resumen"        && <ResumenDashboard />}
        {seccionActiva === "reservas"       && <GestionReservas />}
        {seccionActiva === "mesas"          && <GestionMesas />}
        {seccionActiva === "usuarios"       && <GestionUsuarios />}
        {seccionActiva === "configuracion"  && <Configuracion />}
      </main>
    </div>
  );
};

export default Dashboard;