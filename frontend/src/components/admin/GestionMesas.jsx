import { useEffect, useState } from "react";
import "../../styles/GestionMesas.css";

const GestionMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mesaEditando, setMesaEditando] = useState(null);
  const [confirmando, setConfirmando] = useState(null);
  const [form, setForm] = useState({ numero: "", capacidad: "", ubicacion: "" });
  const [error, setError] = useState("");

  const fetchMesas = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/mesas");
      const data = await res.json();
      setMesas(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const abrirCrear = () => {
    setMesaEditando(null);
    setForm({ numero: "", capacidad: "", ubicacion: "" });
    setError("");
    setModalAbierto(true);
  };

  const abrirEditar = (mesa) => {
    setMesaEditando(mesa);
    setForm({ numero: mesa.numero, capacidad: mesa.capacidad, ubicacion: mesa.ubicacion ?? "" });
    setError("");
    setModalAbierto(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    setError("");
    try {
      const url = mesaEditando
        ? `http://localhost:3000/api/mesas/${mesaEditando.id_mesa}`
        : "http://localhost:3000/api/mesas";

      const method = mesaEditando ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.mensaje);
        return;
      }

      setModalAbierto(false);
      fetchMesas();
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  const handleEliminar = async (id_mesa) => {
    try {
      await fetch(`http://localhost:3000/api/mesas/${id_mesa}`, { method: "DELETE" });
      setConfirmando(null);
      setMesas((prev) => prev.filter((m) => m.id_mesa !== id_mesa));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (mesa) => {
    try {
      const res = await fetch(`http://localhost:3000/api/mesas/${mesa.id_mesa}/toggle`, {
        method: "PATCH",
      });
      const data = await res.json();
      setMesas((prev) => prev.map((m) => (m.id_mesa === mesa.id_mesa ? data : m)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="gestion-mesas">

      <div className="gm-header">
        <h2>Gestión de Mesas</h2>
        <button className="btn-agregar" onClick={abrirCrear}>+ Nueva mesa</button>
      </div>

      <table className="gm-tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Capacidad</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id_mesa}>
              <td>Mesa {mesa.numero}</td>
              <td>{mesa.capacidad} personas</td>
              <td>{mesa.ubicacion ?? "—"}</td>
              <td>
                <span className={`gm-badge ${mesa.activa ? "activa" : "inactiva"}`}>
                  {mesa.activa ? "Activa" : "Inactiva"}
                </span>
              </td>
              <td className="gm-acciones">
                <button className="btn-editar" onClick={() => abrirEditar(mesa)}>Editar</button>
                <button className="btn-toggle" onClick={() => handleToggle(mesa)}>
                  {mesa.activa ? "Desactivar" : "Activar"}
                </button>
                <button className="btn-eliminar" onClick={() => setConfirmando(mesa)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL CREAR / EDITAR */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{mesaEditando ? "Editar mesa" : "Nueva mesa"}</h2>
              <button className="modal-close" onClick={() => setModalAbierto(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label className="gm-label">
                Número de mesa
                <input
                  type="number"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  placeholder="Ej: 5"
                />
              </label>
              <label className="gm-label">
                Capacidad
                <input
                  type="number"
                  name="capacidad"
                  value={form.capacidad}
                  onChange={handleChange}
                  placeholder="Ej: 4"
                />
              </label>
              <label className="gm-label">
                Ubicación
                <input
                  type="text"
                  name="ubicacion"
                  value={form.ubicacion}
                  onChange={handleChange}
                  placeholder="Ej: Ventana, Terraza..."
                />
              </label>
              {error && <p className="gm-error">{error}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar-modal" onClick={() => setModalAbierto(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={handleGuardar}>
                {mesaEditando ? "Guardar cambios" : "Crear mesa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINAR */}
      {confirmando && (
        <div className="modal-overlay" onClick={() => setConfirmando(null)}>
          <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>¿Eliminar mesa?</h2>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro que querés eliminar la <strong>Mesa {confirmando.numero}</strong>? Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar-modal" onClick={() => setConfirmando(null)}>Volver</button>
              <button className="btn-eliminar-confirm" onClick={() => handleEliminar(confirmando.id_mesa)}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionMesas;