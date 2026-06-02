import { Router } from "express";

import {
    crearReserva,
    obtenerReservas,
    obtenerReservasUsuario
} from "../controllers/reservas/ReservaController.js";

const router = Router();

router.post("/reservas", crearReserva);
router.get("/reservas", obtenerReservas);
router.get(
    "/reservas/usuario/:id",
    obtenerReservasUsuario
);
export default router;