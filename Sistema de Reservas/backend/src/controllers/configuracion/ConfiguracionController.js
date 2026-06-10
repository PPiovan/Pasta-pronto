import { ConfiguracionRestaurante } from "../../models/ConfiguracionRestaurante.js";
import { Horario } from "../../models/Horario.js";

// ── CONFIGURACIÓN ──────────────────────────────────────────

export const obtenerConfiguracion = async (req, res) => {
    try {
        const config = await ConfiguracionRestaurante.findOne({ where: { activo: true } });
        return res.status(200).json(config);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener configuración" });
    }
};

export const actualizarConfiguracion = async (req, res) => {
    try {
        const { capacidad_maxima, tolerancia_minutos } = req.body;

        if (!capacidad_maxima || capacidad_maxima < 1) {
            return res.status(400).json({ mensaje: "La capacidad debe ser mayor a 0" });
        }

        const config = await ConfiguracionRestaurante.findOne({ where: { activo: true } });

        if (!config) {
            const nueva = await ConfiguracionRestaurante.create({
                capacidad_maxima,
                tolerancia_minutos: tolerancia_minutos ?? 15,
                activo: true
            });
            return res.status(201).json(nueva);
        }

        await config.update({ capacidad_maxima, tolerancia_minutos });
        return res.status(200).json({ mensaje: "Configuración actualizada", config });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al actualizar configuración" });
    }
};

// ── HORARIOS ───────────────────────────────────────────────

export const obtenerHorarios = async (req, res) => {
    try {
        const horarios = await Horario.findAll({ order: [["hora", "ASC"]] });
        return res.status(200).json(horarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener horarios" });
    }
};

export const crearHorario = async (req, res) => {
    try {
        const { hora } = req.body;

        if (!hora) {
            return res.status(400).json({ mensaje: "La hora es obligatoria" });
        }

        const existe = await Horario.findOne({ where: { hora } });
        if (existe) {
            return res.status(400).json({ mensaje: "Ya existe ese horario" });
        }

        const horario = await Horario.create({ hora, activo: true });
        return res.status(201).json(horario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al crear horario" });
    }
};

export const toggleHorario = async (req, res) => {
    try {
        const horario = await Horario.findByPk(req.params.id);

        if (!horario) {
            return res.status(404).json({ mensaje: "Horario no encontrado" });
        }

        await horario.update({ activo: !horario.activo });
        return res.status(200).json(horario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al actualizar horario" });
    }
};

export const eliminarHorario = async (req, res) => {
    try {
        const horario = await Horario.findByPk(req.params.id);

        if (!horario) {
            return res.status(404).json({ mensaje: "Horario no encontrado" });
        }

        await horario.destroy();
        return res.status(200).json({ mensaje: "Horario eliminado" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al eliminar horario" });
    }
};