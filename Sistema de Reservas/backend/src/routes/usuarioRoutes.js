import { Router } from "express";
import {
    obtenerUsuarios,
    modificarUsuario,
    toggleUsuario,
    eliminarUsuario
} from "../controllers/usuarios/UsuarioController.js";

const router = Router();

router.get("/admin/usuarios", obtenerUsuarios);
router.put("/admin/usuarios/:id", modificarUsuario);
router.patch("/admin/usuarios/:id/toggle", toggleUsuario);
router.delete("/admin/usuarios/:id", eliminarUsuario);

export default router;