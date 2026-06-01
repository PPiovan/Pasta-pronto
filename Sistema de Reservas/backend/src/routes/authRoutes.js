import { Router } from "express";
import { login } from "../controllers/auth/AuthController.js";

const router = Router();

router.post("/login", login);

export default router;