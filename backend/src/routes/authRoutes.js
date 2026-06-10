import { Router } from "express";
import { login, register } from "../controllers/auth/AuthController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);

router.get("/test", (req, res) => {
    res.json({
        mensaje: "Funciona"
    });
});
export default router;