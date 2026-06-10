import { useEffect, useState } from "react";
import "../../styles/GestionUsuarios.css";

const ROLES = [
  { id: 1, nombre: "super-admin" },
  { id: 2, nombre: "admin" },
  { id: 3, nombre: "cliente" },
];

const badgeRol = {
  "super-admin": "badge-superadmin",
  "admin": "badge-admin",
  "cliente": "badge-cliente",
};

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalUsuario, setModalUsuario] = useState(null);
  const [confirmando, setConfirmando] = useState(null);
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", telefono: "", id_rol: 3 });
  const [error, setError] = useState("");

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const abrirEditar = (usuario) => {
    setModalUsuario(usuario);
    setForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono ?? "",
      id_rol: usuario.id_rol,
    });
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/admin/usuarios/${modalUsuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.mensaje);
        return;
      }

      setModalUsuario(null);
      fetchUsuarios();
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  const handleToggle = async (usuario) => {
    try {
      await fetch(`http://localhost:3000/api/admin/usuarios/${usuario.id_usuario}/toggle`, {
        method: "PATCH",
      });
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEliminar = async (id_usuario) => {
    try {
      await fetch(`http://localhost:3000/api/admin/usuarios/${id_usuario}`, {
        method: "DELETE",
      });
      setConfirmando(null);
      setUsuarios((prev) => prev.filter((u) => u.id_usuario !== id_usuario));
    } catch (err) {
      console.error(err);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto = filtro.toLowerCase();
    return (
      u.nombre.toLowerCase().includes(texto) ||
      u.apellido.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="gestion-usuarios">

      <div className="gu-header">
        <h2>Gestión de Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="gu-buscador"
        />
      </div>

      <table className="gu-tabla">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="6" className="gu-vacio">No hay usuarios para mostrar</td>
            </tr>
          ) : (
            usuariosFiltrados.map((u) => (
              <tr key={u.id_usuario}>
                <td>
                  <span className="gu-nombre">{u.nombre} {u.apellido}</span>
                </td>
                <td>{u.email}</td>
                <td>{u.telefono ?? "—"}</td>
                <td>
                  <span className={`gu-badge ${badgeRol[u.Rol?.nombre] ?? ""}`}>
                    {u.Rol?.nombre ?? "—"}
                  </span>
                </td>
                <td>
                  <span className={`gu-badge ${u.activo ? "badge-activo" : "badge-inactivo"}`}>
                    {u.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="gu-acciones">
                  <button className="btn-editar" onClick={() => abrirEditar(u)}>Editar</button>
                  <button className="btn-toggle" onClick={() => handleToggle(u)}>
                    {u.activo ? "Desactivar" : "Activar"}
                  </button>
                  <button className="btn-eliminar" onClick={() => setConfirmando(u)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL EDITAR */}
      {modalUsuario && (
        <div className="modal-overlay" onClick={() => setModalUsuario(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar usuario</h2>
              <button className="modal-close" onClick={() => setModalUsuario(null)}>✕</button>
            </div>
            <div className="modal-body">
              <label className="gu-label">
                Nombre
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
              </label>
              <label className="gu-label">
                Apellido
                <input type="text" name="apellido" value={form.apellido} onChange={handleChange} />
              </label>
              <label className="gu-label">
                Email
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </label>
              <label className="gu-label">
                Teléfono
                <input type="text" name="telefono" value={form.telefono} onChange={handleChange} />
              </label>
              <label className="gu-label">
                Rol
                <select name="id_rol" value={form.id_rol} onChange={handleChange}>
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))}
                </select>
              </label>
              {error && <p className="gu-error">{error}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar-modal" onClick={() => setModalUsuario(null)}>Cancelar</button>
              <button className="btn-guardar" onClick={handleGuardar}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINAR */}
      {confirmando && (
        <div className="modal-overlay" onClick={() => setConfirmando(null)}>
          <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>¿Eliminar usuario?</h2>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro que querés eliminar a <strong>{confirmando.nombre} {confirmando.apellido}</strong>? Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar-modal" onClick={() => setConfirmando(null)}>Volver</button>
              <button className="btn-eliminar-confirm" onClick={() => handleEliminar(confirmando.id_usuario)}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionUsuarios;