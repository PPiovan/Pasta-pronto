import { useState } from "react";
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

  return (
    <div className="dashboard">

      <aside className="dashboard-sidebar">
        <p className="sidebar-titulo">PANEL ADMIN</p>
        <nav>
          {secciones.map((s) => (
            <button
              key={s.id}
              className={`sidebar-item ${seccionActiva === s.id ? "activo" : ""}`}
              onClick={() => setSeccionActiva(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
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