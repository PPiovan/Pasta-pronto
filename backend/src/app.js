import express from "express";
import cors from "cors";

import { conectarDB, sequelize } from "./database/connection.js";
import "./models/associations.js";
import  authRoutes  from "./routes/authRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import mesaRoutes from "./routes/mesasRouter.js"
import reservaAdminRoutes from "./routes/reservaAdminRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import configuracionRoutes from "./routes/configuracionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", reservaRoutes);
app.use("/api", mesaRoutes);
app.use("/api", reservaAdminRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", configuracionRoutes);

const PORT = 3000;

const startServer = async () => {
  await conectarDB();

  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();