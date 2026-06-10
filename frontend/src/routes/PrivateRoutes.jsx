import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Ruta solo para usuarios logueados
export const RutaPrivada = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Ruta solo para Admin (rol 2) y SuperAdmin (rol 1)
export const RutaAdmin = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (Number(user.rol) !== 1 && Number(user.rol) !== 2) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Ruta solo para SuperAdmin (rol 1)
export const RutaSuperAdmin = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (Number(user.rol) !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
};