import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Nav from "../components/layouts/Nav/Nav";
import FormReservas from "../components/reservas/FormReservas";
import Footer from "../components/layouts/Footer/Footer";

const Reservas = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

return (
  <>
    <Nav />
    <FormReservas />
  </>
);
};

export default Reservas;