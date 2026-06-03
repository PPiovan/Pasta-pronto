import { useEffect, useState } from "react";
import "../../styles/GestionReservas.css";

const ESTADOS = ["todos", "confirmada", "pendiente", "cancelada", "finalizada"];

const badgeClass = {
  confirmada: "badge-confirmada",
  pendiente: "badge-pendiente",
  cancelada: "badge-cancelada",
  finalizada: "badge-finalizada",
  modificada: "badge-modificada",
};

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [modalReserva, setModalReserva] = useState(null);
  const [mesaSeleccionada, setMesaSeleccionada] = useState("");

  const fetchReservas = async () => {
    try {
      const params = new URLSearchParams();
      if (filtroFecha) params.append("fecha", filtroFecha);
      if (filtroEstado !== "todos") params.append("estado", filtroEstado);

      const res = await fetch(`http://localhost:3000/api/admin/reservas?${params}`);
      const data = await res.json();
      setReservas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMesas = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/mesas");
      const data = await res.json();
      setMesas(data.filter((m) => m.activa));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, [filtroFecha, filtroEstado]);

  useEffect(() => {
    fetchMesas();
  }, []);

  const handleCambiarEstado = async (id_reserva, estado) => {
    try {
      await fetch(`http://localhost:3000/api/admin/reservas/${id_reserva}/estado`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      fetchReservas();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAsignarMesa = async () => {
    if (!mesaSeleccionada) return;
    try {
      await fetch(`http://localhost:3000/api/admin/reservas/${modalReserva.id_reserva}/mesa`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_mesa: mesaSeleccionada }),
      });
      setModalReserva(null);
      fetchReservas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="gestion-reservas">

      <div className="gr-header">
        <h2>Gestión de Reservas</h2>
        <div className="gr-filtros">
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </option>
            ))}
          </select>
          {(filtroFecha || filtroEstado !== "todos") && (
            <button className="btn-limpiar" onClick={() => { setFiltroFecha(""); setFiltroEstado("todos"); }}>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <table className="gr-tabla">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Personas</th>
            <th>Mesa</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr>
              <td colSpan="8" className="gr-vacio">No hay reservas para mostrar</td>
            </tr>
          ) : (
            reservas.map((r) => (
              <tr key={r.id_reserva}>
                <td>#{String(r.id_reserva).padStart(3, "0")}</td>
                <td>
                  <span className="gr-cliente-nombre">{r.Usuario?.nombre} {r.Usuario?.apellido}</span>
                  <span className="gr-cliente-email">{r.Usuario?.email}</span>
                </td>
                <td>{r.fecha}</td>
                <td>{r.Horario?.hora ?? "—"}</td>
                <td>{r.cantidad_comensales}</td>
                <td>
                  {r.Mesa ? `Mesa ${r.Mesa.numero}` : (
                    <button className="btn-asignar-mesa" onClick={() => { setModalReserva(r); setMesaSeleccionada(""); }}>
                      Asignar
                    </button>
                  )}
                </td>
                <td>
                  <span className={`gr-badge ${badgeClass[r.estado]}`}>
                    {r.estado}
                  </span>
                </td>
                <td className="gr-acciones">
                  {r.estado !== "finalizada" && r.estado !== "cancelada" && (
                    <>
                      <button className="btn-finalizar" onClick={() => handleCambiarEstado(r.id_reserva, "finalizada")}>
                        Finalizar
                      </button>
                      <button className="btn-cancelar-res" onClick={() => handleCambiarEstado(r.id_reserva, "cancelada")}>
                        Cancelar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL ASIGNAR MESA */}
      {modalReserva && (
        <div className="modal-overlay" onClick={() => setModalReserva(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Asignar mesa — Reserva #{String(modalReserva.id_reserva).padStart(3, "0")}</h2>
              <button className="modal-close" onClick={() => setModalReserva(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Cliente: <strong>{modalReserva.Usuario?.nombre} {modalReserva.Usuario?.apellido}</strong></p>
              <p>Fecha: <strong>{modalReserva.fecha}</strong> · Hora: <strong>{modalReserva.Horario?.hora}</strong></p>
              <p>Personas: <strong>{modalReserva.cantidad_comensales}</strong></p>
              <label className="gm-label">
                Seleccioná una mesa
                <select value={mesaSeleccionada} onChange={(e) => setMesaSeleccionada(e.target.value)}>
                  <option value="">-- Elegir mesa --</option>
                  {mesas.map((m) => (
                    <option key={m.id_mesa} value={m.id_mesa}>
                      Mesa {m.numero} — {m.capacidad} personas {m.ubicacion ? `(${m.ubicacion})` : ""}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar-modal" onClick={() => setModalReserva(null)}>Cancelar</button>
              <button className="btn-guardar" onClick={handleAsignarMesa}>Asignar mesa</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionReservas;