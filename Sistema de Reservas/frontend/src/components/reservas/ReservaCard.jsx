import '../../styles/ReservaCard.css';

const ReservaCard = ({ reserva }) => {
  const badgeLabel = {
    confirmada: 'Confirmada',
    pendiente: 'Pendiente',
    cancelada: 'Cancelada',
  };

  return (
    <div className="reserva-card">

      <div className="reserva-header">
        <div className="reserva-header-text">
          <p className="reserva-numero">Reserva #{String(reserva.id_reserva).padStart(3, '0')}</p>
          <p className="reserva-fecha">{reserva.fecha} · {reserva.hora}</p>
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
        <button className="btn-detalle">Ver detalle</button>
        <button className="btn-cancelar">Cancelar</button>
      </div>

    </div>
  );
};

export default ReservaCard;
