import { useState } from 'react';
import '../../styles/ReservaCard.css';

const ReservaCard = ({ reserva, onCancelar }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  const badgeLabel = {
    confirmada: 'Confirmada',
    pendiente: 'Pendiente',
    cancelada: 'Cancelada',
  };

  const handleCancelar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservas/${reserva.id_reserva}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setConfirmando(false);
        onCancelar(reserva.id_reserva); // avisa al padre para quitar la card
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="reserva-card">

        <div className="reserva-header">
          <div className="reserva-header-text">
            <p className="reserva-numero">Reserva #{String(reserva.id_reserva).padStart(3, '0')}</p>
            <p className="reserva-fecha">{reserva.fecha} · {reserva.Horario?.hora ?? '—'}</p>
          </div>
          <span className={`reserva-badge estado-${reserva.estado}`}>
            {badgeLabel[reserva.estado] ?? reserva.estado}
          </span>
        </div>

        <div className="reserva-info">
          <div className="reserva-row">
            <span className="reserva-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Hora
            </span>
            <span className="reserva-value">{reserva.Horario?.hora ?? '—'}</span>
          </div>

          <div className="reserva-divider" />
          <div className="reserva-row">
            <span className="reserva-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Personas
            </span>
            <span className="reserva-value">{reserva.cantidad_comensales}</span>
          </div>

          <div className="reserva-divider" />
          <div className="reserva-row">
            <span className="reserva-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11V3h18v8"/><path d="M3 11a9 9 0 0 0 18 0"/><line x1="12" y1="20" x2="12" y2="11"/><line x1="8" y1="20" x2="16" y2="20"/></svg>
              Mesa
            </span>
            <span className="reserva-value">{reserva.mesa ?? '—'}</span>
          </div>
        </div>

        <div className="reserva-actions">
          <button className="btn-detalle" onClick={() => setModalAbierto(true)}>
            Ver detalle
          </button>
          <button className="btn-cancelar" onClick={() => setConfirmando(true)}>
            Cancelar
          </button>
        </div>

      </div>

      {/* MODAL VER DETALLE */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reserva #{String(reserva.id_reserva).padStart(3, '0')}</h2>
              <button className="modal-close" onClick={() => setModalAbierto(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-row">
                <span>Fecha</span>
                <strong>{reserva.fecha}</strong>
              </div>
              <div className="modal-row">
                <span>Hora</span>
                <strong>{reserva.Horario?.hora ?? '—'}</strong>
              </div>
              <div className="modal-row">
                <span>Personas</span>
                <strong>{reserva.cantidad_comensales}</strong>
              </div>
              <div className="modal-row">
                <span>Mesa</span>
                <strong>{reserva.mesa ?? '—'}</strong>
              </div>
              <div className="modal-row">
                <span>Estado</span>
                <span className={`reserva-badge estado-${reserva.estado}`}>
                  {badgeLabel[reserva.estado] ?? reserva.estado}
                </span>
              </div>
              {reserva.observaciones && (
                <div className="modal-row">
                  <span>Observaciones</span>
                  <strong>{reserva.observaciones}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMACIÓN CANCELAR */}
      {confirmando && (
        <div className="modal-overlay" onClick={() => setConfirmando(false)}>
          <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>¿Cancelar reserva?</h2>
            </div>
            <div className="modal-body">
              <p>Esta acción no se puede deshacer. ¿Estás seguro que querés cancelar la reserva del <strong>{reserva.fecha}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-detalle" onClick={() => setConfirmando(false)}>
                Volver
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservaCard;
