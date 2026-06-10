import { Router } from "express";
import {
    obtenerConfiguracion,
    actualizarConfiguracion,
    obtenerHorarios,
    crearHorario,
    toggleHorario,
    eliminarHorario
} from "../controllers/configuracion/ConfiguracionController.js";

const router = Router();

router.get("/admin/configuracion", obtenerConfiguracion);
router.put("/admin/configuracion", actualizarConfiguracion);

router.get("/admin/horarios", obtenerHorarios);
router.post("/admin/horarios", crearHorario);
router.patch("/admin/horarios/:id/toggle", toggleHorario);
router.delete("/admin/horarios/:id", eliminarHorario);

export default router;