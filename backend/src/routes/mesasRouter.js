import { Router } from "express";
import {
    obtenerMesas,
    crearMesa,
    modificarMesa,
    eliminarMesa,
    toggleMesa
} from "../controllers/mesas/MesaController.js";

const router = Router();

router.get("/mesas", obtenerMesas);
router.post("/mesas", crearMesa);
router.put("/mesas/:id", modificarMesa);
router.delete("/mesas/:id", eliminarMesa);
router.patch("/mesas/:id/toggle", toggleMesa);

export default router;