import express from "express";
import cors from "cors";

import { conectarDB, sequelize } from "./database/connection.js";
import "./models/associations.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const startServer = async () => {
  await conectarDB();

  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();