import { Router } from "express";
import { obtenerMetricas } from "../controllers/dashboard/DashboardController.js";

const router = Router();

router.get("/admin/metricas", obtenerMetricas);

export default router;