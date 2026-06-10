import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RutaPrivada, RutaAdmin, RutaSuperAdmin } from "./PrivateRoutes";

import Inicio from "../pages/Inicio";
import Reservas from "../pages/Reservas";
import Mesas from "../pages/Mesas";
import Usuarios from "../pages/Usuarios";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import ComoReservar from "../components/home/ComoReservar/ComoReservar";
import Dashboard from "../pages/Dashboard";
import MisReservas from "../pages/MisReservas";

export const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/comoreservar" element={<ComoReservar />} />

        {/* Rutas solo para clientes logueados */}
        <Route path="/reservas" element={
          <RutaPrivada><Reservas /></RutaPrivada>
        } />
        <Route path="/mis-reservas" element={
          <RutaPrivada><MisReservas /></RutaPrivada>
        } />

        {/* Rutas solo para Admin y SuperAdmin */}
        <Route path="/dashboard" element={
          <RutaAdmin><Dashboard /></RutaAdmin>
        } />
        <Route path="/mesas" element={
          <RutaAdmin><Mesas /></RutaAdmin>
        } />

        {/* Rutas solo para SuperAdmin */}
        <Route path="/usuarios" element={
          <RutaSuperAdmin><Usuarios /></RutaSuperAdmin>
        } />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
};