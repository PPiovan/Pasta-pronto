import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Horario = sequelize.define("Horario", {
  id_horario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "horarios",
  timestamps: false,
});