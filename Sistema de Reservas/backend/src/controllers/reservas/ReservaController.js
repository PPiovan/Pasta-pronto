import { Op } from "sequelize";
import { Reserva } from "../../models/Reserva.js";
import { Usuario } from "../../models/Usuario.js";
import { Horario } from "../../models/Horario.js";
import { ConfiguracionRestaurante } from "../../models/ConfiguracionRestaurante.js";
import { MovimientoReserva } from "../../models/MovimientoReserva.js";

// Helper para registrar movimientos
const registrarMovimiento = async (id_reserva, id_usuario, accion, descripcion) => {
    await MovimientoReserva.create({ id_reserva, id_usuario, accion, descripcion });
};

export const crearReserva = async (req, res) => {
    try {
        const { id_usuario, id_horario, fecha, cantidad_comensales, observaciones } = req.body;

        const config = await ConfiguracionRestaurante.findOne({ where: { activo: true } });
        if (!config) {
            return res.status(500).json({ mensaje: "No hay configuración activa del restaurante" });
        }

        const reservasExistentes = await Reserva.findAll({
            where: {
                id_horario,
                fecha,
                estado: { [Op.in]: ["confirmada", "pendiente"] }
            }
        });

        const totalOcupado = reservasExistentes.reduce((acc, r) => acc + r.cantidad_comensales, 0);

        if (totalOcupado + cantidad_comensales > config.capacidad_maxima) {
            return res.status(400).json({
                mensaje: `No hay disponibilidad para ese turno. Quedan ${config.capacidad_maxima - totalOcupado} lugares.`
            });
        }

        const nuevaReserva = await Reserva.create({
            id_usuario, id_horario, fecha, cantidad_comensales, observaciones, estado: "confirmada"
        });

        await registrarMovimiento(
            nuevaReserva.id_reserva,
            id_usuario,
            "creacion",
            `Reserva creada para el ${fecha} con ${cantidad_comensales} comensales.`
        );

        return res.status(201).json({ mensaje: "Reserva confirmada correctamente", reserva: nuevaReserva });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al crear reserva" });
    }
};



export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            include: [
                { model: Usuario, attributes: ["nombre", "apellido", "email"] },
                { model: Horario, attributes: ["hora"] }
            ]
        });
        return res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener reservas" });
    }
};

export const obtenerReservasUsuario = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                id_usuario: req.params.id,
                estado: { [Op.notIn]: ["cancelada", "finalizada"] }
            },
            include: [{ model: Horario, attributes: ["hora"] }]
        });
        return res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener reservas" });
    }
};
export const cancelarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }

        const id_usuario = req.body.id_usuario ?? reserva.id_usuario;

        await registrarMovimiento(
            reserva.id_reserva,
            id_usuario,
            "cancelacion",
            `Reserva cancelada por el usuario.`
        );

        await reserva.destroy();

        return res.status(200).json({ mensaje: "Reserva cancelada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al cancelar reserva" });
    }
};