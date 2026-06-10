import { Op } from "sequelize";
import { Reserva } from "../../models/Reserva.js";
import { Usuario } from "../../models/Usuario.js";
import { Horario } from "../../models/Horario.js";
import { Mesa } from "../../models/Mesa.js";
import { MovimientoReserva } from "../../models/MovimientoReserva.js";

const registrarMovimiento = async (id_reserva, id_usuario, accion, descripcion) => {
    await MovimientoReserva.create({ id_reserva, id_usuario, accion, descripcion });
};

export const obtenerTodasReservas = async (req, res) => {
    try {
        const { fecha, estado } = req.query;
        const where = {};
        if (fecha) where.fecha = fecha;
        if (estado) where.estado = estado;

        const reservas = await Reserva.findAll({
            where,
            include: [
                { model: Usuario, attributes: ["nombre", "apellido", "email"] },
                { model: Horario, attributes: ["hora"] },
                { model: Mesa, attributes: ["numero", "ubicacion"], required: false }
            ],
            order: [["fecha", "ASC"], [Horario, "hora", "ASC"]]
        });

        return res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener reservas" });
    }
};

export const cambiarEstadoReserva = async (req, res) => {
    try {
        const { estado, id_admin } = req.body;
        const estadosValidos = ["pendiente", "confirmada", "cancelada", "modificada", "finalizada"];

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ mensaje: "Estado inválido" });
        }

        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }

        const estadoAnterior = reserva.estado;
        await reserva.update({ estado });

        const accionMap = {
            cancelada: "cancelacion",
            finalizada: "finalizacion",
            modificada: "modificacion",
            confirmada: "modificacion",
            pendiente: "modificacion",
        };

        await registrarMovimiento(
            reserva.id_reserva,
            id_admin ?? reserva.id_usuario,
            accionMap[estado] ?? "modificacion",
            `Estado cambiado de "${estadoAnterior}" a "${estado}" por el administrador.`
        );

        return res.status(200).json({ mensaje: "Estado actualizado", reserva });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al cambiar estado" });
    }
};



export const asignarMesa = async (req, res) => {
    try {
        const { id_mesa, id_admin } = req.body;

        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });

        const mesa = await Mesa.findByPk(id_mesa);
        if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
        if (!mesa.activa) return res.status(400).json({ mensaje: "La mesa está inactiva" });

        await reserva.update({ id_mesa });

        await registrarMovimiento(
            reserva.id_reserva,
            id_admin ?? reserva.id_usuario,
            "modificacion",
            `Mesa ${mesa.numero} asignada por el administrador.`
        );

        return res.status(200).json({ mensaje: "Mesa asignada correctamente", reserva });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al asignar mesa" });
    }
};

export const obtenerHistorialReserva = async (req, res) => {
    try {
        const movimientos = await MovimientoReserva.findAll({
            where: { id_reserva: req.params.id },
            include: [{ model: Usuario, attributes: ["nombre", "apellido"] }],
            order: [["fecha_movimiento", "DESC"]]
        });
        return res.status(200).json(movimientos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener historial" });
    }
};

