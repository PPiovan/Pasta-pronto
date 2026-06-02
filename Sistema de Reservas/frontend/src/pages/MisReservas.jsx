import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReservaCard from "../components/reservas/ReservaCard";
import Nav from "../components/layouts/Nav/Nav";
import Footer from "../components/layouts/Footer/Footer";
import "../styles/MisReservas.css";

const MisReservas = () => {

  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservas/usuario/${user.id}`
        );
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      obtenerReservas();
    }
  }, [user]);

  return (
    <div className="page-wrapper">
      <Nav />

      <main className="page-content">
        <h2 className="page-title">Mis Reservas</h2>

        {reservas.length === 0 ? (
          <p className="page-empty">No tenés reservas aún.</p>
        ) : (
          <div className="reservas-grid">
            {reservas.map((reserva) => (
              <ReservaCard key={reserva.id_reserva} reserva={reserva} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MisReservas;
