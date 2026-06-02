import { Reserva } from "../../models/Reserva.js";
import { Usuario } from "../../models/Usuario.js";
export const crearReserva = async (req, res) => {
    try {

        const nuevaReserva = await Reserva.create(req.body);

        return res.status(201).json(nuevaReserva);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear reserva"
        });

    }

};



export const obtenerReservas = async (req, res) => {
    try {

        const reservas = await Reserva.findAll({
            include: {
                model: Usuario,
                attributes: [
                    "nombre",
                    "apellido",
                    "email"
                ]
            }
        });

        return res.status(200).json(reservas);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener reservas"
        });

    }
};

export const obtenerReservasUsuario = async (req, res) => {
    try {

        const reservas = await Reserva.findAll({
            where: {
                id_usuario: req.params.id
            }
        });

        return res.status(200).json(reservas);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener reservas"
        });

    }
};