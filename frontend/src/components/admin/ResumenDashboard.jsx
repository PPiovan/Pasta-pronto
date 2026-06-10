import { useEffect, useState } from "react";
import "../../styles/ResumenDashboard.css";

const ResumenDashboard = () => {
  const [metricas, setMetricas] = useState(null);

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/metricas");
        const data = await res.json();
        setMetricas(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMetricas();
  }, []);

  if (!metricas) return <p className="rd-cargando">Cargando métricas...</p>;

  const { hoy, semana, totales } = metricas;

  const diasSemana = Object.entries(semana.porFecha).map(([fecha, total]) => {
    const d = new Date(fecha + "T00:00:00");
    return {
      label: d.toLocaleDateString("es-AR", { weekday: "short", day: "numeric" }),
      total,
      fecha,
    };
  });

  const maxBar = Math.max(...diasSemana.map((d) => d.total), 1);

  const badgeColor = {
    confirmada: "badge-confirmada",
    pendiente: "badge-pendiente",
    cancelada: "badge-cancelada",
    finalizada: "badge-finalizada",
  };

  return (
    <div className="resumen-dashboard">

      <h2 className="rd-titulo">Resumen</h2>

      {/* CARDS MÉTRICAS */}
      <div className="rd-cards">
        <div className="rd-card">
          <p className="rd-card-label">Reservas hoy</p>
          <p className="rd-card-value">{hoy.totalReservas}</p>
        </div>
        <div className="rd-card">
          <p className="rd-card-label">Comensales hoy</p>
          <p className="rd-card-value">{hoy.totalComensales}</p>
        </div>
        <div className="rd-card">
          <p className="rd-card-label">Reservas este mes</p>
          <p className="rd-card-value">{totales.reservasMes}</p>
        </div>
        <div className="rd-card">
          <p className="rd-card-label">Clientes registrados</p>
          <p className="rd-card-value">{totales.usuarios}</p>
        </div>
      </div>

      <div className="rd-grid">

        {/* GRÁFICO SEMANA */}
        <div className="rd-bloque">
          <p className="rd-bloque-titulo">Reservas últimos 7 días</p>
          <div className="rd-barras">
            {diasSemana.map((d) => (
              <div key={d.fecha} className="rd-barra-wrap">
                <span className="rd-barra-valor">{d.total}</span>
                <div
                  className="rd-barra"
                  style={{ height: `${(d.total / maxBar) * 100}%` }}
                />
                <span className="rd-barra-label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ESTADO HOY */}
        <div className="rd-bloque">
          <p className="rd-bloque-titulo">Estado de reservas hoy</p>
          {Object.keys(hoy.porEstado).length === 0 ? (
            <p className="rd-vacio">Sin reservas hoy</p>
          ) : (
            <div className="rd-estados">
              {Object.entries(hoy.porEstado).map(([estado, cantidad]) => (
                <div key={estado} className="rd-estado-row">
                  <span className={`rd-badge ${badgeColor[estado] ?? ""}`}>{estado}</span>
                  <span className="rd-estado-cantidad">{cantidad}</span>
                </div>
              ))}
            </div>
          )}

          {/* TURNOS HOY */}
          <p className="rd-bloque-titulo" style={{ marginTop: "20px" }}>Ocupación por turno</p>
          {Object.keys(hoy.porTurno).length === 0 ? (
            <p className="rd-vacio">Sin turnos ocupados</p>
          ) : (
            <div className="rd-turnos">
              {Object.entries(hoy.porTurno).map(([hora, datos]) => (
                <div key={hora} className="rd-turno-row">
                  <span className="rd-turno-hora">{hora}</span>
                  <span className="rd-turno-info">{datos.total} reservas · {datos.comensales} personas</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ResumenDashboard;