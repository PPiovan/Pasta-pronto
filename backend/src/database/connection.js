import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "sistema_reservas",     
  "root",            
  "admin",                
  {
    host: "localhost",
    dialect: "mysql",
     logging: false,
  }
);



export const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(" Error DB:", error);
  }
};