import { Usuario } from "../../models/Usuario.js";
import { Rol } from "../../models/Rol.js";
import bcrypt from "bcrypt";

export const obtenerUsuarios = async (req, res) => {
    try {

        const usuarios = await Usuario.findAll({
            include: [{ model: Rol, attributes: ["nombre"] }],
            attributes: { exclude: ["password"] },
            order: [["fecha_creacion", "DESC"]]
        });

        return res.status(200).json(usuarios);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
};

export const modificarUsuario = async (req, res) => {
    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const { nombre, apellido, email, telefono, id_rol } = req.body;

        await usuario.update({ nombre, apellido, email, telefono, id_rol });

        return res.status(200).json({ mensaje: "Usuario actualizado", usuario });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al modificar usuario" });
    }
};

export const toggleUsuario = async (req, res) => {
    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        await usuario.update({ activo: !usuario.activo });

        return res.status(200).json({ mensaje: "Estado actualizado", usuario });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al actualizar usuario" });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        await usuario.destroy();

        return res.status(200).json({ mensaje: "Usuario eliminado correctamente" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al eliminar usuario" });
    }
};