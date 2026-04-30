import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Reserva = sequelize.define("Reserva", {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_horario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cantidad_comensales: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("confirmada", "cancelada", "modificada", "finalizada"),
    defaultValue: "confirmada",
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "reservas",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion",
});