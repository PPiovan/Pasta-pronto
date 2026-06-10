import { Router } from "express";

import {
    crearReserva,
    obtenerReservas,
    obtenerReservasUsuario,
    cancelarReserva
} from "../controllers/reservas/ReservaController.js";

import {
    obtenerHorarios
} from "../controllers/horarios/HorarioController.js";

const router = Router();

router.post("/reservas", crearReserva);
router.get("/reservas", obtenerReservas);
router.get("/reservas/usuario/:id", obtenerReservasUsuario);
router.delete("/reservas/:id", cancelarReserva);

router.get("/horarios", obtenerHorarios);

export default router;