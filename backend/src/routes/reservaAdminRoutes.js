import { Router } from "express";
import {
    obtenerTodasReservas,
    cambiarEstadoReserva,
    asignarMesa,
    obtenerHistorialReserva
} from "../controllers/reservas/ReservaControllerAdmin.js";

const router = Router();

router.get("/admin/reservas", obtenerTodasReservas);
router.patch("/admin/reservas/:id/estado", cambiarEstadoReserva);
router.patch("/admin/reservas/:id/mesa", asignarMesa);
router.get("/admin/reservas/:id/historial", obtenerHistorialReserva);

export default router;