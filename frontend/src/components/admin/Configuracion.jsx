import { useEffect, useState } from "react";
import "../../styles/Configuracion.css";

const Configuracion = () => {
  const [config, setConfig] = useState({ capacidad_maxima: "", tolerancia_minutos: 15 });
  const [horarios, setHorarios] = useState([]);
  const [nuevaHora, setNuevaHora] = useState("");
  const [mensajeConfig, setMensajeConfig] = useState({ texto: "", error: false });
  const [mensajeHorario, setMensajeHorario] = useState({ texto: "", error: false });
  const [confirmando, setConfirmando] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/configuracion");
      const data = await res.json();
      if (data) setConfig({ capacidad_maxima: data.capacidad_maxima, tolerancia_minutos: data.tolerancia_minutos });
    } catch (err) { console.error(err); }
  };

  const fetchHorarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/horarios");
      const data = await res.json();
      setHorarios(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchConfig();
    fetchHorarios();
  }, []);

  const handleGuardarConfig = async () => {
    setLoadingConfig(true);
    setMensajeConfig({ texto: "", error: false });
    try {
      const res = await fetch("http://localhost:3000/api/admin/configuracion", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (res.ok) {
        setMensajeConfig({ texto: "Configuración guardada correctamente", error: false });
      } else {
        setMensajeConfig({ texto: data.mensaje, error: true });
      }
    } catch (err) {
      setMensajeConfig({ texto: "Error al conectar con el servidor", error: true });
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleAgregarHorario = async () => {
    setMensajeHorario({ texto: "", error: false });
    if (!nuevaHora) return;
    try {
      const res = await fetch("http://localhost:3000/api/admin/horarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hora: nuevaHora }),
      });
      const data = await res.json();
      if (res.ok) {
        setNuevaHora("");
        fetchHorarios();
      } else {
        setMensajeHorario({ texto: data.mensaje, error: true });
      }
    } catch (err) {
      setMensajeHorario({ texto: "Error al conectar", error: true });
    }
  };

  const handleToggleHorario = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/admin/horarios/${id}/toggle`, { method: "PATCH" });
      fetchHorarios();
    } catch (err) { console.error(err); }
  };

  const handleEliminarHorario = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/admin/horarios/${id}`, { method: "DELETE" });
      setConfirmando(null);
      fetchHorarios();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="configuracion">

      <h2 className="conf-titulo">Configuración del restaurante</h2>

      {/* CAPACIDAD */}
      <div className="conf-bloque">
        <div className="conf-bloque-header">
          <h3>Capacidad y tolerancia</h3>
          <p>Define cuántos comensales puede recibir el restaurante por turno y el tiempo de tolerancia para llegar.</p>
        </div>

        <div className="conf-grid">
          <label className="conf-label">
            Capacidad máxima de comensales
            <input
              type="number"
              min="1"
              value={config.capacidad_maxima}
              onChange={(e) => setConfig({ ...config, capacidad_maxima: e.target.value })}
            />
          </label>
          <label className="conf-label">
            Tolerancia (minutos)
            <input
              type="number"
              min="0"
              value={config.tolerancia_minutos}
              onChange={(e) => setConfig({ ...config, tolerancia_minutos: e.target.value })}
            />
          </label>
        </div>

        {mensajeConfig.texto && (
          <p className={mensajeConfig.error ? "conf-error" : "conf-ok"}>
            {mensajeConfig.texto}
          </p>
        )}

        <button className="conf-btn-guardar" onClick={handleGuardarConfig} disabled={loadingConfig}>
          {loadingConfig ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      {/* HORARIOS */}
      <div className="conf-bloque">
        <div className="conf-bloque-header">
          <h3>Turnos disponibles</h3>
          <p>Agregá o desactivá los horarios en los que el restaurante acepta reservas.</p>
        </div>

        <div className="conf-horario-add">
          <input
            type="time"
            value={nuevaHora}
            onChange={(e) => setNuevaHora(e.target.value)}
          />
          <button className="conf-btn-agregar" onClick={handleAgregarHorario}>
            + Agregar turno
          </button>
        </div>

        {mensajeHorario.texto && (
          <p className={mensajeHorario.error ? "conf-error" : "conf-ok"}>
            {mensajeHorario.texto}
          </p>
        )}

        <div className="conf-horarios-lista">
          {horarios.length === 0 ? (
            <p className="conf-vacio">No hay turnos configurados</p>
          ) : (
            horarios.map((h) => (
              <div key={h.id_horario} className={`conf-horario-item ${!h.activo ? "inactivo" : ""}`}>
                <span className="conf-horario-hora">{h.hora}</span>
                <span className={`conf-badge ${h.activo ? "badge-activo" : "badge-inactivo"}`}>
                  {h.activo ? "Activo" : "Inactivo"}
                </span>
                <div className="conf-horario-acciones">
                  <button
                    className={h.activo ? "btn-desactivar" : "btn-activar"}
                    onClick={() => handleToggleHorario(h.id_horario)}
                  >
                    {h.activo ? "Desactivar" : "Activar"}
                  </button>
                  <button className="btn-eliminar" onClick={() => setConfirmando(h)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL CONFIRMAR ELIMINAR */}
      {confirmando && (
        <div className="modal-overlay" onClick={() => setConfirmando(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>¿Eliminar turno?</h2>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro que querés eliminar el turno de las <strong>{confirmando.hora}</strong>? Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar-modal" onClick={() => setConfirmando(null)}>Volver</button>
              <button className="btn-eliminar-confirm" onClick={() => handleEliminarHorario(confirmando.id_horario)}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Configuracion;