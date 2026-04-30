import { Router } from "express";
import { Reserva } from "../models/Reserva.js";

const router = Router();

// TEST: crear reserva
router.post("/reservas", async (req, res) => {
  try {
    const nueva = await Reserva.create(req.body);
    res.json(nueva);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear reserva" });
  }
});

export default router;