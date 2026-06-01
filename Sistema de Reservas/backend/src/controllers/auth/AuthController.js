import { Usuario } from "../../models/Usuario.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    // Verificar activo
    if (!usuario.activo) {
      return res.status(403).json({
        mensaje: "Usuario deshabilitado",
      });
    }

    // Comparar contraseña
    if (usuario.password !== password) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    return res.status(200).json({
      mensaje: "Login correcto",
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.id_rol,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};