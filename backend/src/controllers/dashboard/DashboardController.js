import { Op } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Reserva } from "../../models/Reserva.js";
import { Usuario } from "../../models/Usuario.js";
import { Horario } from "../../models/Horario.js";

export const obtenerMetricas = async (req, res) => {
    try {

        const hoy = new Date().toISOString().split("T")[0];

        // Reservas de hoy
        const reservasHoy = await Reserva.findAll({
            where: { fecha: hoy },
            include: [{ model: Horario, attributes: ["hora"] }]
        });

        // Total comensales hoy
        const comensalesHoy = reservasHoy.reduce((acc, r) => acc + r.cantidad_comensales, 0);

        // Reservas por estado hoy
        const porEstado = reservasHoy.reduce((acc, r) => {
            acc[r.estado] = (acc[r.estado] || 0) + 1;
            return acc;
        }, {});

        // Reservas de la semana (últimos 7 días)
        const hace7dias = new Date();
        hace7dias.setDate(hace7dias.getDate() - 6);
        const desde = hace7dias.toISOString().split("T")[0];

        const reservasSemana = await Reserva.findAll({
            where: {
                fecha: { [Op.between]: [desde, hoy] },
                estado: { [Op.ne]: "cancelada" }
            }
        });

        // Agrupar por fecha para el gráfico
        const porFecha = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            porFecha[d.toISOString().split("T")[0]] = 0;
        }
        reservasSemana.forEach((r) => {
            if (porFecha[r.fecha] !== undefined) porFecha[r.fecha]++;
        });

        // Ocupación por turno hoy
        const porTurno = reservasHoy.reduce((acc, r) => {
            const hora = r.Horario?.hora ?? "Sin horario";
            if (!acc[hora]) acc[hora] = { total: 0, comensales: 0 };
            acc[hora].total++;
            acc[hora].comensales += r.cantidad_comensales;
            return acc;
        }, {});

        // Total usuarios registrados
        const totalUsuarios = await Usuario.count({ where: { id_rol: 3 } });

        // Total reservas del mes
        const inicioMes = new Date();
        inicioMes.setDate(1);
        const totalMes = await Reserva.count({
            where: {
                fecha: { [Op.gte]: inicioMes.toISOString().split("T")[0] },
                estado: { [Op.ne]: "cancelada" }
            }
        });

        return res.status(200).json({
            hoy: {
                totalReservas: reservasHoy.length,
                totalComensales: comensalesHoy,
                porEstado,
                porTurno,
            },
            semana: {
                porFecha,
                total: reservasSemana.length,
            },
            totales: {
                usuarios: totalUsuarios,
                reservasMes: totalMes,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener métricas" });
    }
};