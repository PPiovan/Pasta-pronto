import { Mesa } from "../../models/Mesa.js";

export const obtenerMesas = async (req, res) => {
    try {

        const mesas = await Mesa.findAll({
            order: [["numero", "ASC"]]
        });

        return res.status(200).json(mesas);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener mesas" });

    }
};

export const crearMesa = async (req, res) => {
    try {

        const { numero, capacidad, ubicacion } = req.body;

        if (!numero || !capacidad) {
            return res.status(400).json({ mensaje: "Número y capacidad son obligatorios" });
        }

        const existe = await Mesa.findOne({ where: { numero } });
        if (existe) {
            return res.status(400).json({ mensaje: "Ya existe una mesa con ese número" });
        }

        const mesa = await Mesa.create({ numero, capacidad, ubicacion, activa: true });

        return res.status(201).json(mesa);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ mensaje: "Error al crear mesa" });

    }
};

export const modificarMesa = async (req, res) => {
    try {

        const mesa = await Mesa.findByPk(req.params.id);

        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        await mesa.update(req.body);

        return res.status(200).json(mesa);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ mensaje: "Error al modificar mesa" });

    }
};

export const eliminarMesa = async (req, res) => {
    try {

        const mesa = await Mesa.findByPk(req.params.id);

        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        await mesa.destroy();

        return res.status(200).json({ mensaje: "Mesa eliminada correctamente" });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ mensaje: "Error al eliminar mesa" });

    }
};

export const toggleMesa = async (req, res) => {
    try {

        const mesa = await Mesa.findByPk(req.params.id);

        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        await mesa.update({ activa: !mesa.activa });

        return res.status(200).json(mesa);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ mensaje: "Error al actualizar mesa" });

    }
};