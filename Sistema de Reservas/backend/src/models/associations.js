import { Rol } from "./Rol.js";
import { Usuario } from "./Usuario.js";
import { Horario } from "./Horario.js";
import { Reserva } from "./Reserva.js";
import { MovimientoReserva } from "./MovimientoReserva.js";
import { Mesa } from "./Mesa.js";
import { ConfiguracionRestaurante } from "./ConfiguracionRestaurante.js";

// Relaciones 
// Para aprender el hasMany y el belongsto
// hasMany Usuario tiene MUCHAS reservas
// belongsTo Reserva pertenece a UN usuario


Rol.hasMany(Usuario, { foreignKey: "id_rol" });
Usuario.belongsTo(Rol, { foreignKey: "id_rol" });

Usuario.hasMany(Reserva, { foreignKey: "id_usuario" });
Reserva.belongsTo(Usuario, { foreignKey: "id_usuario" });

Horario.hasMany(Reserva, { foreignKey: "id_horario" });
Reserva.belongsTo(Horario, { foreignKey: "id_horario" });

Reserva.hasMany(MovimientoReserva, { foreignKey: "id_reserva" });
MovimientoReserva.belongsTo(Reserva, { foreignKey: "id_reserva" });

Usuario.hasMany(MovimientoReserva, { foreignKey: "id_usuario" });
MovimientoReserva.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Estos no tienen relación directa todavía,
// pero hay que importarlos para que Sequelize cree sus tablas
// Me paso un error que no los habia puesto y no lo creaba la base de datos pero ya se soluciono
Mesa;
ConfiguracionRestaurante;