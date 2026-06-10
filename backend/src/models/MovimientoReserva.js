import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const MovimientoReserva = sequelize.define("MovimientoReserva", {
  id_movimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accion: {
    type: DataTypes.ENUM("creacion", "modificacion", "cancelacion", "finalizacion"),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "movimientos_reserva",
  timestamps: true,
  createdAt: "fecha_movimiento",
  updatedAt: false,
});