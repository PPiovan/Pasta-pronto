import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Inicio from "../pages/Inicio";
import Reservas from "../pages/Reservas";
import Mesas from "../pages/Mesas";
import Usuarios from "../pages/Usuarios";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import ComoReservar from "../components/home/ComoReservar";
export const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />

        <Route path="/reservar" element={<Reservas />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/usuarios" element={<Usuarios />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/comoreservar" element={<ComoReservar />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};