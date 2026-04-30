import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const ConfiguracionRestaurante = sequelize.define("ConfiguracionRestaurante", {
  id_configuracion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  capacidad_maxima: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tolerancia_minutos: {
    type: DataTypes.INTEGER,
    defaultValue: 15,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "configuracion_restaurante",
  timestamps: false,
});